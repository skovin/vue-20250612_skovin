import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    let timer;
    const t = ref(now());

    function now() {
      return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    }

    onBeforeMount(() => {
      timer = setInterval(() => {
      t.value = now();
    }, 1000);

    })

    onBeforeUnmount(() => {
      clearTimeout(timer);
    })

    return {
      t
    }
  },

  template: `<div class="clock">{{t}}</div>`,
})
