<template>
	<div class="grid grid-cols-12">
		<div class="col-span-3">
			<div class="font-bold text-gray-700 uppercase mb-2">Time</div>
			<div class="text-sm">
				<Time label="All" :value="1" @clicked="time=1" :active="time"></Time>
				<Time label="Today" :value="2" @clicked="time=2" :active="time"></Time>
				<Time label="Tomorrow" :value="3" @clicked="time=3" :active="time"></Time>
				<Time label="This Week" :value="4" @clicked="time=4" :active="time"></Time>
				<Time label="Next Week" :value="5" @clicked="time=5" :active="time"></Time>
			</div>
		</div>
		<div class="col-span-6">
			<Event class="mb-3" v-for="event in events" :event="event" :key="event.id"></Event>
		</div>
		<div class="col-span-3"></div>
	</div>
</template>

<script>
import Event from "./components/Event";
import {ref} from "@vue/reactivity";
import axios from 'axios';
import Time from "@/components/Time";
import {watch} from "@vue/runtime-core";

export default {
	name: 'App',
	components: {Event, Time},
	setup() {
		const loading = ref(null);
		const events = ref([]);
		const time = ref(1);

		const fetchEvents = async () => {
			loading.value = true;
			events.value = (await axios.get(`/events?when=${time.value}`)).data;
		}

		watch(time, (val, prev) => {
			console.log(prev, val);
			if (val !== prev) fetchEvents();
		});

		return {loading, events, time, fetchEvents};
	},
	async created() {
		await this.fetchEvents();
	}
}
</script>

<style>

</style>
