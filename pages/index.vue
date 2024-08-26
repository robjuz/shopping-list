<script setup lang="ts">
const route = useRoute()
const {t} = useI18n();
const localForage = useLocalForage('lists')
const date = useDate()


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
    },
    {
      transform: (value) => {
        return value as Array<ShoppingList>
      },
    }
)

watch(() => route.path, (path) => {
  if (path === '/') refresh()
})

async function handleSave(shoppingList: ShoppingList) {
  await localForage.setItem(shoppingList.id as string, JSON.parse(JSON.stringify(shoppingList)))
}

async function deleteList(list: ShoppingList) {
  if (!shoppingLists.value) return
  if (!list.id) return

  const index = shoppingLists.value?.indexOf(list)

  if (index === undefined) return

  await localForage.removeItem(list.id)
  shoppingLists.value.splice(index, 1)

}
</script>

<template>
  <v-container>
    <v-fab
        app
        color="primary"
        icon="mdi-plus"
        :title="t('New list')"
        :to="{name: 'index-create'}"
    />

    <v-row>
      <v-col
          v-for="shoppingList in shoppingLists"
          :key="shoppingList.name"
          cols
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
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
                      :to="{name: 'index-id', params: {id: shoppingList.id as string}}"
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

          <v-list>
            <v-list-item v-for="shoppingListItem in shoppingList.items">
              <v-list-item-title :class="{'text-decoration-line-through': shoppingListItem.completed}">
                {{ [shoppingListItem.quantity, shoppingListItem.name].join(' &times; ') }}
              </v-list-item-title>

              <v-list-item-subtitle v-if="shoppingListItem.expirationDate">
                {{ date.format(shoppingListItem.expirationDate, 'fullDate') }}
              </v-list-item-subtitle>

              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn v-model="shoppingListItem.completed" @input="handleSave(shoppingList)"/>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <NuxtPage/>
</template>