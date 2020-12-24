<template>
  <div class="flex justify-center mt-16">
    <div class="max-w-md w-2/3 border">
      <form @submit.prevent="signIn">
        <div class="-space-y-px">
          <div><label for="username" class="sr-only">Login</label><input type="text" id="username"
                                                                         placeholder="Username"
                                                                         v-model="credentials.username"
                                                                         class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          </div>
          <div><label for="password" class="sr-only">Password</label><input type="password" id="password"
                                                                            placeholder="Password"
                                                                            v-model="credentials.password"
                                                                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          </div>

          <div class="pt-8">
            <button type="submit"
                    class="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "@vue/reactivity";
import axios from "axios";
import {useUserContext} from "./composables/user";

export default {
  name: "Login",
  setup() {
    const credentials = ref({
      username: null,
      password: null
    });

    const {user, setUser} = useUserContext();
    const signIn = async () => {
      const token = (await axios.post(`/auth/login`, credentials.value)).data;
      setUser(token);
    }

    return {credentials, signIn, user, setUser};
  }
}
</script>

<style scoped>

</style>
