<template>
  <div class="max-w-xl mx-auto">
    <Breadcrumbs :links="links"></Breadcrumbs>
  </div>

  <div class="bg-white text-sm rounded-sm max-w-xl w-full mx-auto">
    <form @submit.prevent="register">
      <div class="grid grid-cols-6 gap-6 p-5">
        <div class="col-span-6">
          <label for="name" class="block text-sm font-medium text-gray-700">Event name</label>
          <input type="text" id="name"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>

        <div class="col-span-6">
          <label for="description" class="block text-sm font-medium text-gray-700">Event description</label>
          <textarea id="description"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-32">
            </textarea>
        </div>

        <div class="col-span-6">
          <label for="address" class="block text-sm font-medium text-gray-700">Event address</label>
          <textarea id="address"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </textarea>
        </div>

        <div class="col-span-3">
          <label for="when" class="block text-sm font-medium text-gray-700">When does the event happen</label>
          <input type="datetime-local" id="when"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
      </div>

      <div class="col-span-6 flex justify-end bg-gray-100 p-5 rounded-b-sm">
        <ButtonSubmitIndigo label="Create"></ButtonSubmitIndigo>
      </div>

    </form>
  </div>
</template>

<script>
import ButtonSubmitIndigo from "@/components/ButtonSubmitIndigo";
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "CreateEvent",
  components: {ButtonSubmitIndigo, Breadcrumbs},
  setup() {
    return {
      links: [
        {
          label: 'Account',
          route: 'account',
          params: {}
        },
        {
          label: 'Create Event',
          route: 'account-create-event',
          params: {}
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
