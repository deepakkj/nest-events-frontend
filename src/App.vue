<template>
  <div class="bg-indigo-700 text-white p-5 text-xl font-semibold mb-3">
    <div class="flex">
      <div class="mr-auto">
        <router-link :to="{name: 'event-list'}">Events</router-link>
      </div>
      <div>
        <router-link :to="{name: 'login'}" class="ml-2">Login</router-link>
        <router-link :to="{name: 'register'}" class="ml-2">Register</router-link>
      </div>
    </div>
  </div>
  <router-view class="container mx-auto"/>
</template>

<script>
import {useUserProvider} from "@/composables/user";

export default {
  name: "App",
  setup() {
    useUserProvider();
  }
}
</script>

<style scoped>

</style>
