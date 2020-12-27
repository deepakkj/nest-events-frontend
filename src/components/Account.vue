<template xmlns:AttendanceButtons="http://www.w3.org/1999/html">
  <div>
    <Breadcrumbs :links="links"></Breadcrumbs>

    <h1 class="text-2xl text-gray-800 mr-4">Events you attend</h1>
    <div class="border-b border-gray-300 mt-4 mb-4 mr-4"></div>

    <div class="grid grid-cols-12" v-if="!loading.attendedEvents">
      <div class="col-span-4 mb-3" v-for="event in attendedEventsWithoutDesc" :key="event.id">
        <EventOnList :event="event" class="h-full">
          <div class="border-b mt-4 mb-4"></div>
          <AttendanceButtons :event-id="event.id"></AttendanceButtons>
        </EventOnList>
      </div>
      <Pagination :page="1"></Pagination>
    </div>

    <div class="grid grid-cols-12" v-if="loading.attendedEvents">
      <div class="col-span-4" v-for="index in 3" :key="index">
        <Loader class="mb-3 p-4 mr-4"></Loader>
      </div>
    </div>

    <RequestFailed v-if="!loading.attendedEvents && attendedEvents === null"></RequestFailed>

    <div class="flex justify-between items-center mt-6 mr-4">
      <h1 class="text-2xl text-gray-800">Events you organize</h1>
      <div>
        <router-link :to="{name: 'account-create-event'}"
                     class="bg-indigo-600 hover:bg-indigo-500 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white border-transparent py-2 px-4 rounded-md shadow-sm font-semibold inline-flex justify-center">
          Create
        </router-link>
      </div>
    </div>
    <div class="border-b border-gray-300 mt-4 mb-4 mr-4"></div>

    <div class="mb-3">
      <div class="grid grid-cols-12" v-if="!loading.organizedEvents && organizedEvents">
        <div class="col-span-4 mb-3" v-for="event in organizedEventsWithoutDesc" :key="event.id">
          <EventOnList :event="event"></EventOnList>
        </div>
      </div>

      <div class="grid grid-cols-12" v-if="loading.organizedEvents">
        <div class="col-span-4" v-for="index in 3" :key="index">
          <Loader class="mb-3 p-4 mr-4"></Loader>
        </div>
      </div>

      <RequestFailed v-if="!loading.organizedEvents && organizedEvents === null"></RequestFailed>
    </div>
  </div>
</template>

<script>
import EventOnList from "@/components/EventOnList";
import AttendanceButtons from "@/components/AttendanceButtons";
import {computed, ref} from "@vue/reactivity";
import api from "@/api";
import {useUserContext} from "@/composables/user";
import Loader from "@/components/Loader";
import RequestFailed from "@/components/RequestFailed";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";

export default {
  name: "Account",
  components: {EventOnList, AttendanceButtons, Loader, RequestFailed, Breadcrumbs, Pagination},
  setup() {
    const organizedEvents = ref(null);
    const attendedEvents = ref(null);
    const loading = ref({
      organizedEvents: false,
      attendedEvents: false
    });
    const organizedEventsWithoutDesc = computed(
        () => (organizedEvents.value || []).map(e => ({...e, description: null}))
    );
    const attendedEventsWithoutDesc = computed(
        () => (attendedEvents.value || []).map(e => ({...e, description: null}))
    );
    const {user} = useUserContext();

    const fetchOrganizedEvents = async () => {
      organizedEvents.value = null;
      loading.value.organizedEvents = true;
      try {
        if (user.value.userId) {
          organizedEvents.value = (await api.get(`/user-events/${user.value.userId}`)).data.data;
        }
      } catch (e) {
        organizedEvents.value = null;
      } finally {
        loading.value.organizedEvents = false;
      }
    }
    const fetchAttendedEvents = async () => {
      attendedEvents.value = null;
      loading.value.attendedEvents = true;
      try {
        attendedEvents.value = (await api.get(`/events-attendance`)).data.data;
      } catch (e) {
        attendedEvents.value = null;
      } finally {
        loading.value.attendedEvents = false;
      }
    }

    return {
      loading,
      fetchOrganizedEvents,
      fetchAttendedEvents,
      user,
      attendedEvents,
      organizedEvents,
      organizedEventsWithoutDesc,
      attendedEventsWithoutDesc,
      links: [
        {
          label: 'Account',
          route: 'account',
          params: {}
        }
      ]
    }
  },
  async created() {
    await Promise.all([
      this.fetchOrganizedEvents(), this.fetchAttendedEvents()
    ]);
  }
}
</script>
