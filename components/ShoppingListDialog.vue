<script setup lang="ts">
 const {t} = useI18n()
 const router = useRouter()

 const shoppingList = defineModel<ShoppingList>({ required: true })

 const emit = defineEmits<{
   submit: []
 }>()

 function newItem() {
   shoppingList.value.items.push({
     name: '',
     quantity: 1,
     expirationDate: undefined,
     completed: false,
   })
 }

 function deleteItem(item: ShoppingListItem) {
   const index = shoppingList.value.items.indexOf(item)
   shoppingList.value.items.splice(index, 1)
 }
</script>

<template>
  <v-dialog
      :model-value="true"
      max-width="500"
      scrollable
      @after-leave="router.push({name: 'index'})"
  >
    <form @submit.prevent="emit('submit')">
      <v-card>
        <v-text-field
            v-model="shoppingList.name"
            :label="t('Name')"
            required
        />

        <v-card-text>
          <v-row v-for="(item, index) in shoppingList.items" :key="index">
            <v-col>
              <v-text-field v-model="item.name" required hide-details/>
            </v-col>

            <v-col cols="auto" align-self="center">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                      v-bind="props"
                      :color="item.expirationDate ? 'primary' : ''"
                      icon="mdi-calendar"
                  />
                </template>

                <v-date-picker
                    v-model="item.expirationDate"
                    :title="t('Expiration date')"
                    :min="(new Date()).toDateString()"
                    hide-header
                >
                  <template #actions>
                    <v-btn
                        :text="t('Clear')"
                        @click="item.expirationDate = undefined"
                    />
                  </template>
                </v-date-picker>
              </v-menu>

              <v-btn
                  :title="t('Remote item')"
                  class="ms-3"
                  color="error"
                  icon="mdi-delete"
                  size="small"
                  @click="deleteItem(item)"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-btn
            :title="t('New item')"
            icon="mdi-plus"
            class="mx-auto"
            size="small"
            @click="newItem"
        />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              :text="shoppingList.id ? t('Save') : t('Create')"
              type="submit"
              prepend-icon="mdi-floppy"
          />
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<style scoped>

</style>