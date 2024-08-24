<script setup lang="ts">
const {t} = useI18n();
const id = useId()

const shoppingList = ref<ShoppingList>({
  name: '',
  items: []
})

newItem()

const router = useRouter()

async function handleCreate() {
  const localForage = useLocalForage()
  await localForage.setItem(id, JSON.parse(JSON.stringify(shoppingList.value)))

  router.push({name: 'index'})
}

function newItem() {
  shoppingList.value.items.push({
    name: '',
    quantity: 1,
    expirationDate: undefined,
    completed: false,
    editing: true
  })
}



</script>

<template>
  <v-dialog max-width="500" :model-value="true">
    <form @submit.prevent="handleCreate">
      <v-card>
        <v-text-field
            v-model="shoppingList.name"
            :label="t('Name')"
            required
        />

        <v-list>
          <v-list-item v-for="(item, index) in shoppingList.items" :key="index" o>
            <v-list-item-title>
              <v-text-field v-model="item.name" required hide-details/>
            </v-list-item-title>

            <template #prepend>
              <v-list-item-action start>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                        icon="mdi-calendar"
                        v-bind="props"
                    />
                  </template>

                  <v-date-picker
                      v-model="item.expirationDate"
                      :title="t('Expiration date')"
                      hide-header
                      :min="(new Date()).toDateString()"
                  />
                </v-menu>
              </v-list-item-action>
            </template>

            <template #append>
              <v-list-item-action end>
                <v-btn
                    icon="mdi-delete"
                    :title="t('Remote item')"
                    color="error"
                />
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>

          <v-btn
              icon="mdi-plus"
              class="mx-auto"
              :title="t('New item')"
              @click="newItem"
          />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="t('Create')" type="submit"/>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<style scoped>

</style>