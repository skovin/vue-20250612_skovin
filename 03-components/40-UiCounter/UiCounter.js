import { computed, defineComponent, toRef} from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      required: false,
      default: 0,
    },

    max: {
      type: Number,
      required: false,
      default: Infinity,
    },

    count: {
      type: Number,
      required: true,
    }
  }, 


  setup(props, setup) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const count = toRef(props, 'count');

    function inc() {
      setup.emit("update:count", count.value+1)
    };

    function dec() {
      setup.emit("update:count", count.value-1)
    };

    return {
      count,
      inc, 
      dec,
    }

  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="dec">➖</UiButton>
      <span class="count" data-testid="count">{{count}}</span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="inc">➕</UiButton>
    </div>
  `,
})
