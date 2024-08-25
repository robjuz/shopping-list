<script setup lang="ts">
const {t} = useI18n()
const router = useRouter()
const date = useDate()

const shoppingList = defineModel<ShoppingList>({required: true})

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
      persistent
  >
    <form @submit.prevent="emit('submit')">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            <v-text-field
                v-model="shoppingList.name"
                :label="t('List name')"
                hide-details
                required
                variant="plain"
            />
          </v-toolbar-title>


          <v-toolbar-items>
            <v-btn icon="mdi-close" :to="{name: 'index'}"/>
          </v-toolbar-items>
        </v-toolbar>


        <v-card-text>
          <v-text-field
              v-for="(item, index) in shoppingList.items" :key="index"
              v-model="item.name"
              :label="t('Product name')"
              required
              variant="outlined"
          >
            <template #append-inner>
              <v-btn-group>
                <v-btn
                    :color="item.expirationDate ? 'primary' : ''"
                    :title="t('Expiration date')"
                >
                  <v-icon>mdi-calendar</v-icon>

                  <v-menu activator="parent">
                    <v-date-picker
                        :model-value="item.expirationDate ? date.date(item.expirationDate) : undefined"
                        :title="t('Expiration date')"
                        :min="(new Date()).toDateString()"
                        hide-header
                        @update:model-value="item.expirationDate = $event"
                    >
                      <template #actions>
                        <v-btn @click="item.expirationDate = undefined">
                          {{ t('Clear') }}
                        </v-btn>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-btn>

                <v-btn
                    :title="t('Remote product')"
                    color="error"
                    icon="mdi-delete"
                    size="small"
                    @click="deleteItem(item)"
                />
              </v-btn-group>
            </template>
          </v-text-field>
        </v-card-text>

        <v-btn
            :title="t('New item')"
            prepend-icon="mdi-plus"
            class="mx-auto"
            size="small"
            @click="newItem"
        >
          {{ t('Next product') }}
        </v-btn>

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