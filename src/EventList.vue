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
          <Pagination :page="page"></Pagination>
        </div>
      </div>

      <div v-if="!loading && (!events || !events.data?.length)">
        <RequestFailed></RequestFailed>
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
import Pagination from "@/components/Pagination";
import RequestFailed from "@/components/RequestFailed";

export default {
  name: "EventList",
  components: {EventOnList, Loader, Time, Pagination, RequestFailed},
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
