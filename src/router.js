import {createRouter, createWebHistory} from "vue-router";
import Event from "@/Event";
import Events from "@/Events";

const routes = [
	{
		path: "/",
		name: "Events",
		component: Events,
	},
	{
		path: "/event/:id",
		name: "Event",
		component: Event,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
