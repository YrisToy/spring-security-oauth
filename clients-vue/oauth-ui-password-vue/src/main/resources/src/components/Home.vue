<template>
    <div class="container" >
        <div class="content">
            <span class="display-2">Welcome !!</span>
            <v-btn class="float-right" color="primary" @click="logout">Logout</v-btn>
        </div>
        <v-col cols="6" class="mr-6">
            <foo-details></foo-details>
        </v-col>
    </div>
</template>

<script>
    import FooDetails from './FooDetails';

    export default {
        components:{
            FooDetails
        },
        name: "Home",
        methods: {
            logout () {
                this.$cookie.delete('access_token');
                this.$router.push({ name: 'login' });
            }
        },
        mounted() {
            if (!this.$cookie.get('access_token')){
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>

<style scoped>

</style>