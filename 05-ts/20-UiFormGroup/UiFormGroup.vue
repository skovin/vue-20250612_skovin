<script setup lang="ts">

const props = defineProps<{
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}>()

defineSlots<{
  // Документация предлагает описывать слот, как функцию, возвращающую any или void.
  
  // Если тип написать any, то eslint ругается: Unexpected any. Specify a different type.
  // При этом в тестах ошибка:  UiFormGroup должен быть описан через TS с defineProps<...>()
  // Пол-дня искал, где в defineProps тип any !? 
  //
  // Затем догадался в тесте, после линтера написать console.log (result[0]);
  // и увидел конкретную строку кода, которая не нравится линтеру.  
  // Оказалось она не в секции defineProps, как это сказано в тексте тестов, а в секции defineSlots !!!

  //Так что any здесь писать нельзя. Хотя официально - можно. Очень странно.

  default(): void,
  label(): void,
  description(): void,
}>()

</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">

      <!-- eslint на for реагирует, видимо как на попытку написать цикл и выдайт ошибку 'Argument expression expected' 
           Если бы не подправил тесты и не написал после линтера console.log (result[0]);
           Никогда бы не догадался в какой строеке ошибка! Хотя нашел нечто аналогичное:
           https://stackoverflow.com/questions/63946146/parsing-error-argument-expression-expected-eslint-with-typescript-map-functi

           p.s. можно написать и не объявляя в script setup-е const props = ...:
           <label :for="$props.for" class="form-group__label">
       -->

      <label :for="props.for" class="form-group__label">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <div class="form-group__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <div class="form-group__control">
      <slot></slot>
    </div>

    <!-- Если бы не исходный код тестов, никогда бы не понял какое именно условие здесь нужно записать -->
    <div v-if="hint" class="form-group__hint" :class="invalid && 'form-group__hint--invalid'">
      {{ (showHint || invalid) ? hint : '' }}
    </div>

  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
