<script setup lang="ts">
import { ref } from 'vue'
import { UiContainer } from '@shgk/vue-course-ui'
import UiSelect from './UiSelect.vue'

type SelectValue = '' | '1' | '2' | '3'

const options = [
  { value: '', text: 'Выберите значение…' } as const,
  { value: '1', text: 'Один' } as const,
  { value: '2', text: 'Два' } as const,
  { value: '3', text: 'Три' } as const,
]

const selected = ref<SelectValue>('')

function handleUpdate(newValue: SelectValue) {
  console.info(newValue)
}
</script>

<template>
  <UiContainer>
    <p>Выбрано: {{ selected }}</p>
    <!-- Если тип компонента будет некорректным, использование handleUpdate приведёт здесь к ошибке TS -->
    <UiSelect v-model="selected" :options @update:model-value="handleUpdate" xxx="yyy"/> <!-- strictTemplates не сработал !? -->
  </UiContainer>
</template>
