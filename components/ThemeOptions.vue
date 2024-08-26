<template>
  <div>
    <div class="mb-3">
      <v-label :text="t('theme')" class="mb-2 font-weight-medium"/>

      <v-messages :messages="t('theme-message')" active/>
    </div>

    <v-radio-group
        v-model="userTheme"
        class="mb-2"
        color="primary"
        true-icon="mdi-check-circle-outline"
        hide-details
    >
      <v-radio
          v-for="(item, i) in items"
          :key="i"
          :value="item.value"
      >
        <template #label>
          <v-icon :icon="item.icon" start/>

          {{ item.text }}
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n()
const theme = useTheme()

const localForage = useLocalForage('settings')

let media: MediaQueryList

const systemTheme = ref('light')

const {data: userTheme} = await useAsyncData(
    async () => await localForage.getItem('theme') ?? 'light',
    {
      server: false,
      default: () => 'light'
    }
)

watch(userTheme, val => {
  if (val === 'system') {
    media = getMatchMedia()!
    media.addEventListener('change', onThemeChange)
    onThemeChange()
  } else if (media) {
    media.removeEventListener('change', onThemeChange)
  }
}, {immediate: true})

function onThemeChange() {
  systemTheme.value = media!.matches ? 'dark' : 'light'
  localForage.setItem('theme', userTheme.value)
}

watchEffect(() => {
  theme.global.name.value = (
      userTheme.value === 'system' ? systemTheme.value : userTheme.value
  )
})

function getMatchMedia() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

const items = [
  {
    text: t('light'),
    icon: 'mdi-white-balance-sunny',
    value: 'light',
  },
  {
    text: t('dark'),
    icon: 'mdi-weather-night',
    value: 'dark',
  },
  {
    text: t('system'),
    icon: 'mdi-desktop-tower-monitor',
    value: 'system',
  },
]
</script>