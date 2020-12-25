<template>
  <div class="flex justify-center">
    <div class="bg-white mr-4 p-4 shadow text-sm rounded-sm max-w-xl w-full">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-3">
          <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
          <input type="text" id="firstName"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-3">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
          <input type="text" id="lastName"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input type="text" id="email"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-3">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-3">
          <label for="retypePassword" class="block text-sm font-medium text-gray-700">Re-type password</label>
          <input type="password" id="retypePassword"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-6 flex justify-end">
          <button class="outline-none focus:outline-none bg-indigo-700 text-white border border-indigo-200 py-2 px-4 rounded-md text-sm font-semibold">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register"
}
</script>
