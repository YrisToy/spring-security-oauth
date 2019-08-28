import Vue from 'vue';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import router from '../router';


Vue.use(Vuex);
Vue.use(VueCookie);

export default new Vuex.Store({
    state: {
        logged: false
    },
    mutations: {
        LOGIN(state) {
            state.logged = true;
        },
        LOGOUT(state) {
            state.logged = false;
        }
    },
    actions: {
        obtainAccessToken({ dispatch }, loginData) {
            const params = new URLSearchParams();
            params.set('grant_type', 'password');
            params.set('client_id', 'fooClientIdPassword');
            params.set('username', loginData.username);
            params.set('password', loginData.password);
            console.log(params);
            window.fetch('http://localhost:8081/spring-security-oauth-server/oauth/token',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Authorization': 'Basic ' + btoa("fooClientIdPassword:secret")
                },
                body: params
            })
                .catch(() => alert('Invalid credentials'))
                .then(response => response.json())
                .then(data => dispatch('saveToken' ,data))


        },
        async saveToken({commit},token) {
            if (token.access_token) {
                const expireDate = new Date(new Date().getTime() + (1000 * token.expires_in));
                Vue.cookie.set('access_token', token.access_token, { expires: expireDate });
                console.log('Obtained Access token');
                commit('LOGIN');
                router.push({name: 'home'});
            } else {
                alert('Invalid token');
            }

        },
        async logout({commit}) {
            Vue.cookie.delete('access_token');
            commit('LOGOUT');
        }
    }
});
