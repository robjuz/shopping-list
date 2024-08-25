<template>
  <v-container>
    <v-row>
      <v-col
          v-for="shoppingList in shoppingLists"
          :key="shoppingList.name"
          cols
          sm="6"
          md="4"
          lg="3"
      >
        <v-card :to="{name: 'index-id', params: {id: shoppingList.id }}">
          <v-toolbar>
            <v-toolbar-title>
              {{ shoppingList.name }}
            </v-toolbar-title>

            <v-toolbar-items>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn @click.prevent icon="mdi-dots-vertical" variant="text" v-bind="props"/>
                </template>

                <v-list>
                  <v-list-item
                      prepend-icon="mdi-pen"
                      base-color="primary"
                      :to="{name: 'index-id-edit', params: {id: shoppingList.id}}"
                  >
                    {{ t('Edit') }}
                  </v-list-item>
                  <v-list-item
                      prepend-icon="mdi-delete"
                      base-color="error"
                      @click="deleteList(shoppingList)"
                  >
                    {{ t('Delete') }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-toolbar>

          <v-list class="pt-0" height="150">
            <v-list-item
                v-for="shoppingListItem in shoppingList.items.filter(({completed}) => !completed)"
                :title="shoppingListItem.name"
                :subtitle="shoppingListItem.expirationDate?.toLocaleDateString()"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <NuxtPage/>
</template>

<script setup lang="ts">
const route = useRoute()
const {t} = useI18n();
const localForage = useLocalForage()


const {data: shoppingLists, refresh} = await useAsyncData(
    'shoppingLists',
    async () => {
      const keys = await localForage.keys()
      const data = []
      for (let key of keys) {
        let item = await localForage.getItem(key)
        data.push({...item, id: key} as ShoppingList)
      }
      return data
    }, {
      server: false,
      transform: (value) => {
        return value as Array<ShoppingList>
      },
    }
)

watch(() => route.path, (path) => {
  if (path === '/') refresh()
})

async function deleteList(list: ShoppingList) {
  const index = shoppingLists.value?.indexOf(list)
  if (index !== undefined) {
    await localForage.removeItem(list.id)
    shoppingLists.value?.splice(index, 1)
  }

}
</script>