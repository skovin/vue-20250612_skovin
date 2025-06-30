import { computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const c = ref(0);
    const incDisabled = computed(() => c.value >= 5);
    const decDisabled = computed(() => c.value <= 0);

    function inc() {
      c.value++;
    }

    function dec() {
      c.value--;
    }

    return {
      c,
      inc,
      dec,
      decDisabled,
      incDisabled,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="decDisabled"
        @click="dec"
      >➖</button>

      <span class="count" data-testid="count">{{c}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="incDisabled"
        @click="inc"
      >➕</button>
    </div>
  `,
})
