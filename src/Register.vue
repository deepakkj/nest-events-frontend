<template>
  <div class="flex justify-center">
    <div class="bg-white mr-4 shadow text-sm rounded-sm max-w-xl w-full">
      <div v-if="errors.length" class="bg-red-50 p-5 flex rounded-t-sm">
        <div class="w-8 h-8 mr-4 text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <div class="text-red-700 font-semibold mb-2 text-lg">There were some errors</div>
          <div class="text-red-600 text-xs">
            <ul class="list-disc list-inside">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>
        </div>
      </div>

      <form @submit.prevent="register">
        <div class="grid grid-cols-6 gap-6 p-5">
          <div class="col-span-3">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" id="firstName" v-model="userData.firstName"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-3">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" id="lastName" v-model="userData.lastName"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input type="text" id="email" v-model="userData.email"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-3">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" v-model="userData.password"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-3">
            <label for="retypePassword" class="block text-sm font-medium text-gray-700">Re-type password</label>
            <input type="password" id="retypePassword" v-model="userData.retypedPassword"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
        </div>

        <div class="col-span-6 flex justify-end bg-gray-100 p-5 rounded-b-sm">
          <ButtonSubmitIndigo label="Register"></ButtonSubmitIndigo>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import {ref} from "@vue/reactivity";
import {useRouter} from "vue-router";
import ButtonSubmitIndigo from "@/components/ButtonSubmitIndigo";

export default {
  name: "Register",
  components: {ButtonSubmitIndigo},
  setup() {
    const router = useRouter();
    const userData = ref({
      email: null,
      password: null,
      retypedPassword: null,
      firstName: null,
      lastName: null
    });
    const errors = ref([]);
    const register = async () => {
      errors.value = [];

      try {
        (await api.post(`/users`, userData.value)).data;
        await router.push({name: 'event-list'});
      } catch (e) {
        if (400 === e.response?.status) {
          errors.value = e.response.data.message;
        }
      }
    }

    return {userData, register, errors};
  }
}
</script>
