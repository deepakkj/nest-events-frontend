<template>
  <div class="xl:w-3/5 w-4/6 mt-3">
    <div v-if="!event && loading.event">
      <Loader v-for="index in 4" :key="index" class="mt-3 p-4"></Loader>
    </div>
    <div v-if="event && !loading.event">
      <div class="bg-white mr-4 p-4 text-sm rounded-sm" v-if="event">
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
        <EventAddress :address="event.address"></EventAddress>
      </div>

      <div class="bg-white mr-4 p-4 mt-3 text-sm rounded-sm">
        <div>{{ event.attendeeAccepted }} Going · {{ event.attendeeMaybe }}
          Interested · {{ event.attendeeRejected }} Not Interested
        </div>
      </div>

      <div class="bg-white mr-4 mt-3 rounded-sm" v-if="user.userId">
        <div class="p-4">Are you going?</div>
        <div class="border-b"></div>
        <div class="p-4">
          <AttendanceButtons :event-id="event ? event.id : null"></AttendanceButtons>
        </div>
      </div>

      <div class="bg-white mr-4 mt-3 rounded-sm">
        <div class="p-4">Details</div>
        <div class="border-b"></div>
        <div class="text-gray-500 text-xs p-4">{{ event.description }}</div>
      </div>

      <div class="bg-white mr-4 mt-3 rounded-sm">
        <div class="p-4">Hosted by</div>
        <div class="border-b"></div>
        <div class="text-gray-500 text-xs p-4">{{ event.organizer.username }}</div>
      </div>

      <div class="bg-white mr-4 mt-3 rounded-sm mb-3">
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
          <Loader class="p-4"></Loader>
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
import EventAddress from "@/components/EventAddress";
import {useUserContext} from "@/composables/user";
import AttendanceButtons from "@/components/AttendanceButtons";

export default {
  name: "Event",
  components: {Loader, EventAddress, AttendanceButtons},
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
    const route = useRoute();
    const {user} = useUserContext();

    watch(() => Number(route.params.id), (curr, prev) => curr !== prev && curr ? fetchEvent() : null);

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
          fetchUserEvents()
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

    return {
      loading,
      event,
      userEvents,
      userEventsOtherThanThis,
      fetchEvent,
      fetchUserEvents,
      user
    };
  },
  async created() {
    await this.fetchEvent();
  }
}
</script>
