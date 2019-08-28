import Home from "../components/Home";
import Login from "../components/Login";

import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [{
        name: 'home',
        path: '/',
        component: Home
    }, {
        name: 'login',
        path: '/login',
        component: Login
    }]
})
