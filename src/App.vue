<template>
	<div class="bg-indigo-700 text-white p-5 text-xl font-semibold mb-3">
		<router-link :to="{name: 'Events'}">Events</router-link>
	</div>
	<router-view class="container mx-auto" />
</template>

<script>
export default {
	name: "App"
}
</script>

<style scoped>

</style>
