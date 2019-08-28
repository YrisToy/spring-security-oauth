<template>
    <v-col cols="12" sm="8" md="4">
        <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn color="primary" @click="login">Login</v-btn>
    </v-col>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        validations: {
            name: { required },
            password: { required }
        },
        data: () => ({
            name: '',
            password: ''
        }),
        computed: {
            nameErrors () {
                const errors = [];
                if (!this.$v.name.$dirty) return errors;
                !this.$v.name.required && errors.push('Name is required.');
                return errors
            },
            passwordErrors () {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Password is required.');
                return errors
            },
        },
        methods: {
            login () {
                //this.$v.touch();
                this.$store.dispatch('obtainAccessToken',{username: this.name, password: this.password});
            },
            clear () {
                this.$v.reset();
                this.name = '';
                this.password = '';
            }
        },
        name: "Login"
    }
</script>

<style scoped>

</style>