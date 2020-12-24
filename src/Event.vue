<template>
  <div class="xl:w-3/5 w-4/6 mt-3">
    <div v-if="event">
      <div class="bg-white mr-4 p-4 shadow text-sm" v-if="event">
        <div class="font-semibold text-lg">
          {{ event.name }}
        </div>
        <div>{{ event.when }}</div>
        <div class="text-gray-500">{{ event.address }}</div>
      </div>

      <div class="bg-white mr-4 p-4 shadow mt-3 text-sm">
        <div>{{ event.attendeeAccepted }} Going · {{ event.attendeeMaybe }}
          Interested · {{ event.attendeeRejected }} Not Interested
        </div>
        <div class="mt-2 flex -space-x-px">
          <button
              class="outline-none focus:outline-none bg-indigo-600 hover:bg-indigo-400 border border-gray-300 py-1 px-2 rounded-l-sm text-sm text-white font-semibold ">
            Going
          </button>
          <button
              class="outline-none focus:outline-none bg-gray-100 hover:bg-gray-50 border border-gray-300 py-1 px-2 text-sm text-gray-600 font-semibold ">
            Maybe
          </button>
          <button
              class="outline-none focus:outline-none bg-gray-100 hover:bg-gray-50 border border-gray-300 py-1 px-2 rounded-r-sm text-sm text-gray-600 font-semibold ">
            Not interested
          </button>
        </div>
      </div>

      <div class="bg-white mr-4 shadow mt-3">
        <div class="p-4">Details</div>
        <div class="border-b"></div>
        <div class="text-gray-500 text-xs p-4">{{ event.description }}</div>
      </div>

      <div class="bg-white mr-4 shadow mt-3">
        <div class="p-4">Hosted by</div>
        <div class="border-b"></div>
        <div class="text-gray-500 text-xs p-4">{{ event.organizer.username }}</div>
      </div>

      <div class="bg-white mr-4 shadow mt-3">
        <div class="p-4">More events by {{ event.organizer.username }}</div>
        <div class="border-b"></div>
        <div v-if="userEvents">
          <div v-for="userEvent in userEventsOtherThanThis" :key="userEvent.id" class="hover:bg-gray-50">
            <router-link :to="{route: 'Event', params: {id: userEvent.id}}">
              <div class="px-4 pt-2 text-sm">{{ userEvent.name }}</div>
              <div class="text-gray-500 text-xs px-4 pb-2">{{ userEvent.when }} · {{ userEvent.address }}</div>
              <div class="border-b"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "@vue/reactivity";
import axios from "axios";
import {useRoute} from "vue-router";
import {watch} from "@vue/runtime-core";

export default {
  name: "Event",
  setup() {
    const loading = ref({
      event: false,
      userEvents: false
    });
    const event = ref(null);
    const userEvents = ref(null);
    const userEventsOtherThanThis = computed(
        () => userEvents.value?.filter(e => e.id !== event.value.id)
    );
    // const attendance = ref(null);
    const route = useRoute();
    const eventId = computed(() => Number(route.params.id));

    watch(eventId, (curr, prev) => curr !== prev && curr ? fetchEvent() : null);

    const fetchEvent = async () => {
      loading.value.event = true;
      event.value = (await axios.get(`/events/${route.params.id}`)).data;
      loading.value.event = false;
      await fetchUserEvents();
    }

    const fetchUserEvents = async () => {
      loading.value.userEvents = true;
      userEvents.value = (await axios.get(`/user-events/${event.value.organizer.id}`)).data.data;
      loading.value.userEvents = false;
    }

    // const fetchAttendance = async () => {
    //   attendance.value = (await axios.get(`/events/${event.value.id}/attendees/`)
    // }

    return {loading, event, userEvents, userEventsOtherThanThis, fetchEvent, fetchUserEvents};
  },
  async created() {
    await this.fetchEvent();
  }
}
</script>

<style scoped>

</style>
