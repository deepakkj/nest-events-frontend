<template>
  <nav class="inline-flex text-xs font-semibold -space-x-px">
    <router-link :to="{ route: 'Events', query: {page: Math.max(1, page - 1)}}" href="#"
                 class="bg-white px-2 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-l-md w-10 flex justify-center">
      <div class="h-4 w-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </div>
    </router-link>

    <div v-if="showPages" class="flex -space-x-px">
      <router-link v-for="p in [...Array(pages).keys()].map(e => e + page)" :key="p"
                   :to="{ route: 'Events', query: {page: p}}" href="#"
                   class="flex bg-white justify-center items-center justify-items-center w-10 border border-gray-200 text-gray-700 hover:bg-gray-50">
        {{ p }}
      </router-link>
    </div>

    <router-link :to="{ route: 'Events', query: {page: page + 1}}" href="#"
                 class="flex bg-white px-2 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-r-md w-10 justify-center">
      <div class="h-4 w-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number
    },
    pages: {
      type: Number,
      default: 10
    },
    showPages: {
      type: Boolean,
      default: false
    }
  }
}
</script>
