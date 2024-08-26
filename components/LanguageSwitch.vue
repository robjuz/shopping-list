<script setup lang="ts">
const { t, locales, locale: currentLocale, setLocale  } = useI18n()
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
          icon="mdi-translate"
          v-bind="props"
      >
      </v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="locale in locales"
          :key="locale"
          :active="currentLocale === locale.code"
          :title="locale.name"
          @click="setLocale(locale.code)"

      />
    </v-list>
  </v-menu>
</template>
