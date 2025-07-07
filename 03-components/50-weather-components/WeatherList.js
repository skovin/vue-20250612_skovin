import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard
  },

  props: {
    weatherData: {
      type: Object,
      required: false,
      default: () => [],
    }
  },

  setup() {
    function timeToInt(t) {
      return parseInt(t.replace(":",""));
    };

    function isNight(current) {
      let now = timeToInt(current.dt);
      let sunrise = timeToInt(current.sunrise);
      let sunset = timeToInt(current.sunset);
      return now < sunrise || now > sunset;
    };

    return {
      isNight,
    }
  },


  template: `
    <ul class="weather-list unstyled-list">
      <li v-for="item in weatherData" class="weather-card" :class="{'weather-card--night' : isNight(item.current)}">
        <WeatherCard :weatherData="item" />
      </li>
    </ul>
  `,
})
