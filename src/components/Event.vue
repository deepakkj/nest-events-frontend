<template>
	<div class="bg-white mr-4 p-4 shadow text-sm">
		<div class="font-semibold text-lg">
			<router-link :to="{name: 'Event', params: {id:event.id}}">{{ event.name }}</router-link>
		</div>
		<div>Mon 7:30 PM UTC+01 · Online Event</div>
		<div class="text-gray-500">2,116 people</div>
		<div class="border-b mt-2 mb-2"></div>
		<div class="text-gray-500 text-xs">{{ event.description }}</div>
	</div>
</template>

<script>
export default {props: ['event']}
</script>
