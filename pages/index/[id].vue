<script setup lang="ts">
import type {RouteLocationNormalizedLoadedTyped} from "vue-router";
import type {RouteNamedMap} from "vue-router/auto";

definePageMeta({
  validate: async (route: RouteLocationNormalizedLoadedTyped<RouteNamedMap, "index-id">) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})

const {t} = useI18n();
const localForage = useLocalForage('lists')
const router = useRouter()
const route = useRoute('index-id')

const id = route.params.id

const {data: shoppingList, status} = await useAsyncData(
    `shoppingList-${id}`,
    async () => await localForage.getItem(id), {
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
  <ShoppingListDialog
      v-model="shoppingList"
      @submit="handleSave"
  />
</template>