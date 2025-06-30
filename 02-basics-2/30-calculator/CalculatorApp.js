import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const a = ref(0);
    const b = ref(0);
    const op = ref("sum");
    const c = computed(() => {
      let res;
      switch(op.value) {
        case "sum": res = a.value + b.value; break;
        case "subtract": res = a.value - b.value; break;
        case "multiply": res = a.value * b.value; break;
        case "divide": res = a.value / b.value; break;
        default: res = 0;
      }
      return res;
    })

    return {
      a,b,c,op,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="a"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="op"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="op"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="op"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="op"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="b"/>

      <div>=</div>

      <output>{{c}}</output>
    </div>
  `,
})
