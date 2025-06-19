import { defineComponent, createApp } from 'vue'

const App = defineComponent({
    name: "TodayApp",

    setup() {

        function now() {
            return new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });
        }

        return {
            now,
        }
    },

    template: `<div>Сегодня {{now()}}</div>`,

});

createApp(App).mount("#app");
