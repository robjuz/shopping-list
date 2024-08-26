<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})

const {t} = useI18n();
const localForage = useLocalForage('lists')
const router = useRouter()
const route = useRoute()

const id = route.params.id

const {data: shoppingList, status} = await useAsyncData(
    `shoppingList-${id}-edit`,
    async () => await localForage.getItem(id), {
      server: false,
      lazy: true,
      transform: (value) => {
        return {...value, id} as ShoppingList
      },
    }
)

async function handleSave() {
  await localForage.setItem(id, JSON.parse(JSON.stringify(shoppingList.value)))

  router.push({name: 'index'})
}


</script>

<template>
  <v-dialog
      v-if="!shoppingList || status == 'pending'"
      :model-value="true"
      max-width="500"
      persistent
  >
    <v-progress-circular indeterminate class="mx-auto"/>
  </v-dialog>

  <ShoppingListDialog
      v-else
      v-model="shoppingList"
      @submit="handleSave"
  />
</template>