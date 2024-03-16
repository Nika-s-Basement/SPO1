import {createRouter, createWebHistory} from 'vue-router'

import FrontView from "@/views/FrontView.vue";
import Field from "@/views/Field.vue";
import UserForm from "@/components/UserForm.vue";
import Rooms from "@/views/RoomsView.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: FrontView},
        {path: '/game', component: Field},
        {path: '/registration', component: UserForm},
        {path: '/rooms', component: Rooms}
    ]
})


export default router
