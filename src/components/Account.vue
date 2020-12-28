<template>
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
      <div class="col-span-12 flex">
        <Pagination :page="1" route="account" page-parameter="attendedPage" :other-parameters="{organizedPage}" next-label="Next" prev-label="Previous"></Pagination>
      </div>
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
        <div class="col-span-12 flex">
          <Pagination :page="1" route="account" page-parameter="organizedPage" :other-parameters="{attendedPage}" next-label="Next" prev-label="Previous"></Pagination>
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
import {useRoute} from "vue-router";
import {watch} from "@vue/runtime-core";

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
    const route = useRoute();
    const organizedPage = computed(() => Number(route.query.organizedPage) || 1);
    const attendedPage = computed(() => Number(route.query.attendedPage) || 1);
    watch(
        organizedPage, async (c, p) => c !== p && c ? await fetchOrganizedEvents(c) : null
    );
    watch(
        attendedPage, async (c, p) => c !== p && c ? await fetchAttendedEvents(c) : null
    );

    const fetchOrganizedEvents = async (page = 1) => {
      organizedEvents.value = null;
      loading.value.organizedEvents = true;
      try {
        if (user.value.userId) {
          organizedEvents.value = (await api.get(`/user-events/${user.value.userId}?page=${page}`)).data.data;
        }
      } catch (e) {
        organizedEvents.value = null;
      } finally {
        loading.value.organizedEvents = false;
      }
    }
    const fetchAttendedEvents = async (page = 1) => {
      attendedEvents.value = null;
      loading.value.attendedEvents = true;
      try {
        attendedEvents.value = (await api.get(`/events-attendance?page=${page}`)).data.data;
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
      attendedPage,
      organizedPage,
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
      this.fetchOrganizedEvents(this.organizedPage),
      this.fetchAttendedEvents(this.attendedPage)
    ]);
  }
}
</script>
