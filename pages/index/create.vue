<script setup lang="ts">

import {useI18n} from "vue-i18n";

const {t} = useI18n();
const id = useId()

const shoppingList = ref<ShoppingList>({
  name: '',
  items: []
})

const router = useRouter()

async function handleCreate() {
  console.log(shoppingList.value)
  const localForage = useLocalForage()
  await localForage.setItem(id, {name: 'test'})

  router.push({name: 'index'})
}

</script>

<template>
  <v-dialog max-width="500" :model-value="true">
    <v-card>
      <v-form @submit.prevent="handleCreate">
        <v-text-field
            v-model="shoppingList.name"
            :label="t('Name')"
            required
        />

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn :text="t('Create')" type="submit"/>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>