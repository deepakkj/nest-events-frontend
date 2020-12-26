<template xmlns:AttendanceButtons="http://www.w3.org/1999/html">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-3">Events you attend</h1>
    <div class="grid grid-cols-12" v-if="!loading.attendedEvents">
      <div class="col-span-4 mb-3" v-for="event in attendedEvents" :key="event.id">
        <EventOnList :event="event">
          <div class="border-b mt-4 mb-4"></div>
          <AttendanceButtons :event-id="event.id"></AttendanceButtons>
        </EventOnList>
      </div>
    </div>
    <div class="grid grid-cols-12" v-if="loading.attendedEvents">
      <div class="col-span-4" v-for="index in 3" :key="index">
        <Loader class="mb-3 p-4 mr-4"></Loader>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-gray-800 mb-3 mt-6">Events you organize</h1>
    <div class="mb-3">
      <div class="grid grid-cols-12" v-if="!loading.organizedEvents">
        <div class="col-span-4 mb-3" v-for="event in organizedEvents" :key="event.id">
          <EventOnList :event="event"></EventOnList>
        </div>
      </div>

      <div class="grid grid-cols-12" v-if="loading.organizedEvents">
        <div class="col-span-4" v-for="index in 3" :key="index">
          <Loader class="mb-3 p-4 mr-4"></Loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventOnList from "@/components/EventOnList";
import AttendanceButtons from "@/components/AttendanceButtons";
import {ref} from "@vue/reactivity";
import api from "@/api";
import {useUserContext} from "@/composables/user";
import Loader from "@/components/Loader";

export default {
  name: "Account",
  components: {EventOnList, AttendanceButtons, Loader},
  setup() {
    const organizedEvents = ref(null);
    const attendedEvents = ref(null);
    const loading = ref({
      organizedEvents: false,
      attendedEvents: false
    });
    const {user} = useUserContext();

    const fetchOrganizedEvents = async () => {
      organizedEvents.value = null;
      loading.value.organizedEvents = true;
      try {
        organizedEvents.value = (await api.get(`/user-events/${user.value.userId}`)).data.data;
      } finally {
        loading.value.organizedEvents = false;
      }
    }
    const fetchAttendedEvents = async () => {
      attendedEvents.value = null;
      loading.value.attendedEvents = true;
      try {
        attendedEvents.value = (await api.get(`/events-attendance`)).data.data;
      } finally {
        loading.value.attendedEvents = false;
      }
    }

    return {loading, fetchOrganizedEvents, fetchAttendedEvents, user, attendedEvents, organizedEvents}
  },
  async created() {
    await Promise.all([
      this.fetchOrganizedEvents(), this.fetchAttendedEvents()
    ]);
  }
}
</script>

<style scoped>

</style>
