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

const {data: shoppingList, status} = await useAsyncData(
    `shoppingList-${id}`,
    async () => await localForage.getItem(id), {
      server: false,
      transform: (value) => {
        return {...value, id} as ShoppingList
      },
    }
)

watch(() => shoppingList, async (shoppingList) => {
  await localForage.setItem(id, JSON.parse(JSON.stringify(shoppingList.value)))
}, {
  deep: true
})

</script>
<template>
  <v-dialog
      :model-value="true"
      max-width="500"
      scrollable
      @after-leave="router.push({name: 'index'})"
  >
      <v-card :loading="status == 'pending'">
        <v-toolbar>
          <v-toolbar-title>
            {{ shoppingList.name }}
          </v-toolbar-title>
        </v-toolbar>

        <v-list class="pt-0">
          <v-list-item
              v-for="shoppingListItem in shoppingList?.items"
              :title="shoppingListItem.name"
              :subtitle="shoppingListItem.expirationDate?.toLocaleDateString()"

          >
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="shoppingListItem.completed"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
  </v-dialog>
</template>