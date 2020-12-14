<template>
	<div class="xl:w-3/5 w-4/6 mt-3">
		<div class="bg-white mr-4 p-4 shadow text-sm" v-if="event">
			<div class="font-semibold text-lg">
				{{ event.name }}
			</div>
			<div>Mon 7:30 PM UTC+01 · Online Event</div>
			<div class="text-gray-500">2,116 people</div>
			<div class="border-b mt-2 mb-2"></div>
			<div class="text-gray-500 text-xs">{{ event.description }}</div>
		</div>
	</div>
</template>

<script>
import {ref} from "@vue/reactivity";
import axios from "axios";
import {useRoute} from "vue-router";

export default {
	name: 'Event',
	setup() {
		const loading = ref(null);
		const event = ref(null);
		const route = useRoute();

		const fetchEvents = async () => {
			loading.value = true;
			event.value = (await axios.get(`/events/${route.params.id}`)).data;
		}

		return {loading, event, fetchEvents};
	},
	async created() {
		await this.fetchEvents();
	}
}
</script>

<style scoped>

</style>
