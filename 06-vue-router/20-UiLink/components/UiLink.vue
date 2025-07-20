<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">

const props = defineProps<{
  to?: RouteLocationRaw,
  href?: string,
}>()

defineSlots<{
  default: void
}>()


const comp = computed(() => props.to ? "RouterLink" : "a");

</script>

<template>  
   <component :is="comp" :to="to" :href="href">
      <slot/>
   </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
