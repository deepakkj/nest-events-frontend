<template>
  <button type="submit"
          class="outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white border-transparent py-2 px-4 rounded-md shadow-sm text-sm font-semibold">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "ButtonSubmitIndigo",
  props: ['label']
}
</script>

<style scoped>

</style>
