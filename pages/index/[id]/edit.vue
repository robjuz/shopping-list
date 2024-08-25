<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})

const {t} = useI18n();
const localForage = useLocalForage()
const router = useRouter()
const route = useRoute()

const id = route.params.id

const {data: shoppingList} = await useAsyncData(
    `shoppingList-${id}-edit`,
    async () => await localForage.getItem(id), {
      server: false,
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
 <shopping-list-dialog
     v-if="shoppingList"
     v-model="shoppingList"
     @submit="handleSave"
 />
</template>