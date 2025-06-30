import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const maxPages = 5;
    const page=ref(1);
    const meetup=ref();

    watch(page, () => {
      //console.info(page.value);
      loadMeetup();
    });
    
    const loadMeetup = async () => {
      meetup.value = await getMeetup(page.value);
    }

    onBeforeMount(loadMeetup);

    return {
      maxPages,
      page,
      meetup
    }

  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click="page--" :disabled="page <= 1" >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="i in maxPages" class="radio-group__button">
            <input
              :id="'meetup-id-'+i"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="i"
              v-model="page"
            />
            <label :for="'meetup-id-'+i" class="radio-group__label">{{i}}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" @click="page++" :disabled="page >= maxPages">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div v-if="meetup != null" class="meetup-cover">
          <h1 class="meetup-cover__title">{{meetup.title}}</h1>
        </div>
      </div>

    </div>
  `,
})
