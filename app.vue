<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        width="350"
        disable-route-watcher
        temporary
        touchless
    >
      <v-toolbar :title="t('settings')" flat>
        <template #append>
          <v-btn
              icon="mdi-close"
              variant="flat"
              @click="drawer = false"
          />
        </template>
      </v-toolbar>

      <v-divider/>

      <v-container class="px-3 py-3">
        <ThemeOptions/>
      </v-container>

    </v-navigation-drawer>

    <v-app-bar density="compact">
      <v-app-bar-title>
        {{ t('app-name') }}
      </v-app-bar-title>

      <v-spacer/>

      <LanguageSwitch/>
      <v-btn icon="mdi-cog" @click="drawer = true"/>
    </v-app-bar>

    <v-main>
      <NuxtPage/>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">

const {t} = useI18n()
const drawer = ref(false)

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})

</script>