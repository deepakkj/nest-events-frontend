<template>
  <div class="xl:w-3/5 w-4/6 mt-3">
    <div v-if="!event && loading.event">
      <Loader v-for="index in 4" :key="index" class="mt-3"></Loader>
    </div>
    <div v-if="event && !loading.event">
      <div class="bg-white mr-4 p-4 shadow text-sm" v-if="event">
        <div class="font-semibold text-lg">
          {{ event.name }}
        </div>
        <div class="flex items-center">
          <div class="h-4 w-4 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>{{ event.when }}</div>
        </div>
        <div class="text-gray-500 flex items-center">
          <div class="h-4 w-4 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>{{ event.address }}</div>
        </div>
      </div>

      <div class="bg-white mr-4 p-4 shadow mt-3 text-sm">
        <div>{{ event.attendeeAccepted }} Going · {{ event.attendeeMaybe }}
          Interested · {{ event.attendeeRejected }} Not Interested
        </div>
      </div>

      <div class="bg-white mr-4 shadow mt-3" v-if="!loading.attendance">
        <div class="p-4">Are you going?</div>
        <div class="border-b"></div>
        <div class="p-4">
          <div class="flex -space-x-px text-gray-600">
            <button
                :class="{'bg-indigo-600': attendance && attendance.answer == 1, 'text-white': attendance && attendance.answer == 1}"
                @click="storeAttendanceAnswer(1)"
                class="outline-none focus:outline-none bg-gray-100 border border-gray-300 py-1 px-2 rounded-l-sm text-sm font-semibold">
              Going
            </button>
            <button
                :class="{'bg-indigo-600': attendance && attendance.answer == 2, 'text-white': attendance && attendance.answer == 2}"
                @click="storeAttendanceAnswer(2)"
                class="outline-none focus:outline-none bg-gray-100 border border-gray-300 py-1 px-2 text-sm font-semibold">
              Maybe
            </button>
            <button
                :class="{'bg-indigo-600': attendance && attendance.answer == 3, 'text-white': attendance && attendance.answer == 3}"
                @click="storeAttendanceAnswer(3)"
                class="outline-none focus:outline-none bg-gray-100 border border-gray-300 py-1 px-2 rounded-r-sm text-sm font-semibold">
              Not interested
            </button>
          </div>
        </div>
      </div>
      <div v-if="loading.attendance" class="mt-3">
        <Loader></Loader>
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
        <div v-if="userEvents && !loading.userEvents">
          <div class="p-4">More events by {{ event.organizer.username }}</div>
          <div class="border-b"></div>

          <div v-for="userEvent in userEventsOtherThanThis" :key="userEvent.id" class="hover:bg-gray-50">
            <router-link :to="{route: 'Event', params: {id: userEvent.id}}">
              <div class="px-4 pt-2 text-sm">{{ userEvent.name }}</div>
              <div class="text-gray-500 text-xs px-4 pb-2">{{ userEvent.when }} · {{ userEvent.address }}</div>
              <div class="border-b"></div>
            </router-link>
          </div>
        </div>

        <div v-if="loading.userEvents">
          <Loader></Loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "@vue/reactivity";
import api from "./api";
import {useRoute} from "vue-router";
import {watch} from "@vue/runtime-core";
import Loader from "./components/Loader";

export default {
  name: "Event",
  components: {Loader},
  setup() {
    const loading = ref({
      event: false,
      userEvents: false,
      attendance: false
    });
    const event = ref(null);
    const userEvents = ref(null);
    const userEventsOtherThanThis = computed(
        () => userEvents.value?.filter(e => e.id !== event.value.id)
    );
    const attendance = ref(null);
    const route = useRoute();
    const eventId = computed(() => Number(route.params.id));

    watch(eventId, (curr, prev) => curr !== prev && curr ? fetchEvent() : null);

    const fetchEvent = async () => {
      event.value = null;
      loading.value.event = true;

      try {
        event.value = (await api.get(`/events/${route.params.id}`)).data;
      } finally {
        loading.value.event = false;
      }

      if (event.value) {
        await Promise.all([
          fetchUserEvents(),
          fetchAttendance()
        ]);
      }
    }

    const fetchUserEvents = async () => {
      loading.value.userEvents = true;

      try {
        userEvents.value = (await api.get(`/user-events/${event.value.organizer.id}`)).data.data;
      } finally {
        loading.value.userEvents = false;
      }
    }

    const fetchAttendance = async () => {
      loading.value.attendance = true;

      try {
        attendance.value = (await api.get(`/events/${event.value.id}/attendance`)).data;
      } catch (e) {
        attendance.value = null;
      } finally {
        loading.value.attendance = false;
      }
    }

    const storeAttendanceAnswer = async (answer) => {
      loading.value.attendance = true;

      try {
        attendance.value = (await api.put(`/events/${event.value.id}/attendance`, {
          name: 'XXX',
          answer
        })).data;
      } catch (e) {
        attendance.value = null;
      } finally {
        loading.value.attendance = false;
      }
    }

    return {
      loading,
      event,
      userEvents,
      userEventsOtherThanThis,
      fetchEvent,
      fetchUserEvents,
      attendance,
      fetchAttendance,
      storeAttendanceAnswer
    };
  },
  async created() {
    await this.fetchEvent();
  }
}
</script>

<style scoped>

</style>
