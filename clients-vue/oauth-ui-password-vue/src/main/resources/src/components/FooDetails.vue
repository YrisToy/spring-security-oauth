<template>
    <v-card>
        <v-card-title class="mr-sm-12">Foo Details</v-card-title>
        <v-card-text>
            <div class="headline"><label class="mr-sm-3">ID</label> <span>{{foo.id}}</span></div>
            <div class="headline"><label class="mr-sm-3">Name</label> <span>{{foo.name}}</span></div>
        </v-card-text>
        <v-card-actions class="mr-sm-12">
            <v-btn color="primary" @click="getFoo" type="submit">New Foo</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { Foo } from '../classes/Foo.js';

    const url = 'http://localhost:8082/spring-security-oauth-resource/foos/';

    export default {
        name: "FooDetails",
        data: () => ({
            foo: new Foo(1, 'sample foo')
        }),
        methods: {
            getFoo() {
                const token = this.$cookie.get('access_token');
                window.fetch(url + this.foo.id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response => response.json())
                    .then(data => {
                        this.foo = data;
                    })
            }
        }
    }
</script>

<style scoped>

</style>