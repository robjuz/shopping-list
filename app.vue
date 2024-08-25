<template>
  <v-app>
    <v-app-bar>

      <v-app-bar-title>
        <router-link to="/">Shopping Lists</router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-plus" :to="{name: 'index-create'}"/>
    </v-app-bar>

    <v-main>
      <NuxtPage/>
    </v-main>
  </v-app>
</template>
<script setup>
</script>