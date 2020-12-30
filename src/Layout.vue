<template>
  <div class="bg-indigo-500 text-gray-200 p-5 text-xl font-semibold mb-3 shadow">
    <div class="flex">
      <div class="mr-auto">
        <router-link :to="{name: 'event-list'}">Events</router-link>
      </div>
      <div v-if="!user.userId">
        <router-link :to="{name: 'login'}" class="ml-2">Login</router-link>
        <router-link :to="{name: 'register'}" class="ml-2">Register</router-link>
      </div>
      <div v-else>
        <router-link :to="{name: 'account'}" class="ml-2">Account</router-link>
      </div>
    </div>
  </div>
  <router-view class="container mx-auto mb-24"/>
</template>

<script>
import {useUserContext} from "@/composables/user";

export default {
  name: "Layout",
  setup() {
    const {user, setUser} = useUserContext();
    return {user, setUser};
  },
  created() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      this.setUser(storedUser);
    }
  }
}
</script>
