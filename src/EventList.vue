<template>
  <div class="grid grid-cols-12 max-w-2xl">
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
    <div class="col-span-9">
      <div v-if="!events && loading">
        <Loader class="mb-3 p-4" v-for="index in 10" :key="index"></Loader>
      </div>

      <div v-if="events && !loading">
        <EventOnList class="mb-3" v-for="event in events.data" :event="event" :key="event.id"></EventOnList>
        <div class="mt-2 mb-6 mr-4 flex justify-end" v-if="events.data.length">
          <nav class="inline-flex text-xs font-semibold -space-x-px">
            <router-link :to="{ route: 'Events', query: {page: Math.max(1, page - 1)}}" href="#"
                         class="bg-white px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-l-md">
              <div class="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                </svg>
              </div>
            </router-link>
            <router-link v-for="p in [...Array(10).keys()].map(e => e + page)" :key="p"
                         :to="{ route: 'Events', query: {page: p}}" href="#"
                         class="flex bg-white justify-center items-center justify-items-center w-10 border border-gray-300 text-gray-700 hover:bg-gray-50">
              {{ p }}
            </router-link>
            <router-link :to="{ route: 'Events', query: {page: page + 1}}" href="#"
                         class="bg-white px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-r-md">
              <div class="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </router-link>
          </nav>
        </div>
      </div>

      <div v-if="!loading && (!events || !events.data?.length)">
        <div class="flex flex-col w-full text-gray-700 text-center items-center">
          <div class="h-32 w-32 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="text-xl">Sorry, we have nothing to show.</div>
          <div class="text-gray-400">Try refreshing the page or changing the filters.</div>
        </div>
      </div>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<script>
import EventOnList from "./components/EventOnList";
import Loader from "./components/Loader";
import {computed, ref} from "@vue/reactivity";
import api from "@/api";
import Time from "@/components/Time";
import {watch} from "@vue/runtime-core";
import {useRoute} from "vue-router";

export default {
  name: "EventList",
  components: {EventOnList, Loader, Time},
  setup() {
    const loading = ref(null);
    const events = ref(null);
    const time = ref(1);
    const route = useRoute();
    const page = computed(() => Number(route.query.page || 1));

    const fetchEvents = async () => {
      events.value = null;
      loading.value = true;

      try {
        events.value = (await api.get(`/events?when=${time.value}&page=${page.value}`)).data;
      } finally {
        loading.value = false;
      }
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
