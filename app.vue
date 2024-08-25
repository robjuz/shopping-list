<template>
  <v-app>
    <v-app-bar>

      <v-app-bar-title>
        <router-link to="/">Shopping Lists</router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn prepend-icon="mdi-plus" :to="{name: 'index-create'}">
        {{ t('New shopping list') }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <NuxtPage/>
    </v-main>
  </v-app>
</template>
<script setup>
const {t} = useI18n()
</script>