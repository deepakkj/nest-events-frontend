import {createRouter, createWebHistory} from "vue-router";
import Event from "@/Event";
import EventList from "@/EventList";
import Login from "@/Login";
import Register from "@/Register";
import Account from "@/components/Account";

const routes = [
    {
        path: "/",
        name: "event-list",
        component: EventList,
    },
    {
        path: "/event/:id",
        name: "event",
        component: Event,
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/account",
        name: "account",
        component: Account
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
