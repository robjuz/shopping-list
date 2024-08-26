<template>
  <v-app>
    <v-navigation-drawer
        id="settings-drawer"
        v-model="drawer"
        :location="isRtl ? 'left' : 'right'"
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

      <v-divider />

      <v-container class="px-3 py-3">
        <ThemeOptions/>
      </v-container>

    </v-navigation-drawer>

    <v-app-bar density="compact">
      <v-app-bar-title>
        Shopping Lists
      </v-app-bar-title>

      <v-spacer />

      <v-btn icon="mdi-cog" @click="drawer = true"/>
    </v-app-bar>

    <v-main>
      <NuxtPage/>
    </v-main>
  </v-app>
</template>
<script setup>
const {t} = useI18n()
const { isRtl } = useRtl()

const drawer = ref(true)
</script>