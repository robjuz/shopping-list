<script setup lang="ts">
const {t} = useI18n();
const localForage = useLocalForage()
const router = useRouter()

const shoppingList = ref<ShoppingList>({
  name: '',
  items: [
    {
      name: '',
      quantity: 1,
      expirationDate: undefined,
      completed: false,
    }
  ]
})

async function handleCreate() {
  await localForage.setItem(String((new Date).getTime()), JSON.parse(JSON.stringify(shoppingList.value)))

  router.push({name: 'index'})
}
</script>

<template>
 <shopping-list-dialog
     v-model="shoppingList"
     @submit="handleCreate"
 />
</template>