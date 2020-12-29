<template>
  <div class="max-w-xl w-full mx-auto mb-4">
    <Breadcrumbs :links="links"></Breadcrumbs>

    <Loader v-if="efLoading" class="p-4" :blocks="5"></Loader>

    <div class="bg-white text-sm rounded-sm w-full mb-4" v-if="!efLoading">
      <Errors :errors="esErrors"></Errors>

      <form @submit.prevent="updateEvent">
        <div class="grid grid-cols-6 gap-6 p-5">
          <div class="col-span-6">
            <label for="name" class="block text-sm font-medium text-gray-700">Event name</label>
            <input type="text" id="name" v-model="eventData.name" :disabled="efLoading"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-6">
            <label for="description" class="block text-sm font-medium text-gray-700">Event description</label>
            <textarea id="description" v-model="eventData.description" :disabled="efLoading"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-32">
            </textarea>
          </div>

          <div class="col-span-6">
            <label for="address" class="block text-sm font-medium text-gray-700">Event address</label>
            <textarea id="address" v-model="eventData.address" :disabled="efLoading"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </textarea>
          </div>

          <div class="col-span-3">
            <label for="when" class="block text-sm font-medium text-gray-700">When does the event happen</label>
            <input type="datetime-local" id="when" v-model="eventData.when" :disabled="efLoading"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
        </div>

        <div class="col-span-6 flex justify-end bg-gray-100 p-5 rounded-b-sm">
          <ButtonSubmitIndigo label="Save Changes" :loading="false"></ButtonSubmitIndigo>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import ButtonSubmitIndigo from "@/components/ButtonSubmitIndigo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Errors from "@/components/Errors";
import {useRoute, useRouter} from "vue-router";
import {reactive} from "@vue/reactivity";
import api from "@/api";
import Loader from "@/components/Loader";
import {useEventSaving} from "@/composables/eventSaving";
import {useEventFetching} from "@/composables/eventFetching";

export default {
  name: "EditEvent",
  components: {ButtonSubmitIndigo, Breadcrumbs, Errors, Loader},
  async setup() {
    const router = useRouter();
    const route = useRoute();
    const eventData = reactive({
      name: null,
      description: null,
      address: null,
      when: null
    });
    const {esLoading, esErrors, storeEvent} = useEventSaving(api);
    const {efLoading, fetchEvent} = useEventFetching(api);

    const updateEvent = async () => {
      await storeEvent(eventData.value, route.params.id);
      await router.back();
    }

    const fetchTheEvent = async () => {
      const response = await fetchEvent(route.params.id);
      eventData.name = response.name;
      eventData.description = response.description;
      eventData.when = response.when;
      eventData.address = response.address;
    }

    await fetchTheEvent();

    return {
      links: [
        {
          label: 'Account',
          route: 'account',
          params: {}
        },
        {
          label: 'Edit Event',
          route: 'account-create-event',
          params: {}
        }
      ],
      eventData, fetchTheEvent, updateEvent, esErrors, esLoading, efLoading
    }
  },
}
</script>
