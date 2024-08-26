<template>
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
        <v-icon :icon="item.icon" start />

        {{ item.text }}
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
const { t } = useI18n()
const theme = useTheme()

const localForge = useLocalForage('settings')

let media: MediaQueryList

const systemTheme = ref('light')
const userTheme = ref('light')

systemTheme.value =  await localForge.getItem('theme') ?? 'light'

watch(userTheme, val => {
  if (val === 'system') {
    media = getMatchMedia()!
    media.addListener(onThemeChange)
    onThemeChange()
  } else if (media) {
    media.removeListener(onThemeChange)
  }
}, { immediate: true })
function onThemeChange () {
  systemTheme.value = media!.matches ? 'dark' : 'light'
  localForge.setItem('theme', systemTheme.value)
}

watchEffect(() => {
  theme.global.name.value = (
      userTheme.value === 'system' ? systemTheme.value : userTheme.value
  )
})

function getMatchMedia () {
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