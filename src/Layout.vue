<template>
  <div class="bg-indigo-500 text-gray-200 p-5 font-semibold mb-3 shadow">
    <div class="flex">
      <div class="mr-auto flex items-center">
        <router-link :to="{name: 'event-list'}" class="text-xl">Events</router-link>
      </div>

      <div v-if="!user.userId">
        <router-link :to="{name: 'login'}" class="ml-2 ml-2 rounded-md border border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900 p-2">Login</router-link>
        <router-link :to="{name: 'register'}" class="ml-2 ml-2 rounded-md border border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900 p-2">Register</router-link>
      </div>

      <div v-else>
        <router-link :to="{name: 'account'}"
                     class="ml-2 rounded-md border border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900 p-2">
          Account
        </router-link>
        <a @click.prevent="logout" href="#"
                class="font-semibold ml-2 rounded-md border border-indigo-200 hover:bg-indigo-200 hover:text-indigo-900 p-2">Logout
        </a>
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
    const {user, setUser, logout} = useUserContext();
    return {user, setUser, logout};
  },
  created() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      this.setUser(storedUser);
    }
  }
}
</script>
