<template>
  <div class="grid grid-cols-12">
    <div class="col-span-3">
      <div class="font-bold text-gray-700 uppercase mb-2">Time</div>
      <div class="text-sm">
        <Time label="All" :value="1" @clicked="time=1" :active="time"></Time>
        <Time label="Today" :value="2" @clicked="time=2" :active="time"></Time>
        <Time label="Tomorrow" :value="3" @clicked="time=3" :active="time"></Time>
        <Time label="This Week" :value="4" @clicked="time=4" :active="time"></Time>
        <Time label="Next Week" :value="5" @clicked="time=5" :active="time"></Time>
      </div>
    </div>
    <div class="col-span-6">
      <div v-if="events">
        <EventOnList class="mb-3" v-for="event in events.data" :event="event" :key="event.id"></EventOnList>
        <div class="mt-2 mb-6 mr-4 flex justify-end">
          <nav class="inline-flex shadow-sm text-xs font-semibold -space-x-px">
            <router-link :to="{ route: 'Events', query: {page: Math.max(1, page - 1)}}" href="#"
                         class="bg-white px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">«
            </router-link>
            <router-link v-for="p in [...Array(10).keys()].map(e => e + page)" :key="p"
                         :to="{ route: 'Events', query: {page: p}}" href="#"
                         class="flex bg-white justify-center items-center justify-items-center w-10 border border-gray-300 text-gray-700 hover:bg-gray-50">
              {{ p }}
            </router-link>
            <router-link :to="{ route: 'Events', query: {page: page + 1}}" href="#"
                         class="bg-white px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
              »
            </router-link>
          </nav>
        </div>
      </div>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<script>
import EventOnList from "./components/EventOnList";
import {computed, ref} from "@vue/reactivity";
import axios from 'axios';
import Time from "@/components/Time";
import {watch} from "@vue/runtime-core";
import {useRoute} from "vue-router";

export default {
  name: "EventList",
  components: {EventOnList, Time},
  setup() {
    const loading = ref(null);
    const events = ref([]);
    const time = ref(1);
    const route = useRoute();
    const page = computed(() => Number(route.query.page || 1));

    const fetchEvents = async () => {
      loading.value = true;
      events.value = (await axios.get(`/events?when=${time.value}&page=${page.value}`)).data;
    }

    watch(time, (v, p) => v !== p ? fetchEvents() : null);
    watch(page, (v, p) => v !== p ? fetchEvents() : null);

    return {loading, events, time, page, fetchEvents};
  },
  async created() {
    await this.fetchEvents();
  }
}
</script>

<style>

</style>
