<template>
  <v-container>
    {{ keys }}
    <v-row>
      <v-col
          v-for="shoppingList in shoppingLists"
          :key="shoppingList.name"
          cols="4"
      >
        <v-card
            height="200"
            :title="shoppingList.name"
        >
          <v-list>
            <v-list-item
                v-for="shoppingListItem in shoppingList.items"
                :title="shoppingListItem.name"
                :subtitle="shoppingListItem.expirationDate?.toLocaleDateString()"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-fab app :to="{name: 'index-create'}" icon="mdi-plus" :title="t('New list')"/>
  </v-container>

  <NuxtPage/>
</template>

<script setup lang="ts">
const {t} = useI18n();

const localForage = useLocalForage()


const { data: shoppingLists, status, error, refresh, clear } = await useAsyncData(
    'shoppingLists',
    async () => {
      const keys = await localForage.keys()
      const data = []
      for (let key of keys) {
        data.push(
            await localForage.getItem(key) as ShoppingList
        )
      }
      return data
    }, {
      server: false
    }
)

</script>