<i18n>
pt-BR:
    "Time Bank": "Banco do Tempo"
    "Password": "Senha"
    "Choose": "Selecionar"
    "Sign In": "Entrar"
    "Sign in to start": "Identifique-se para começar"
    "I forgot my password": "Esqueci minha senha"
</i18n>

<template>
    <div class="login-box">
        <div class="login-logo">
            <h1>{{ $t('Time Bank') }}</h1>
        </div>
        <div class="login-box-body">
            <p class="login-box-msg">{{ $t('Sign in to start') }}</p>

            <form v-if="!authenticated" @keypress="onFormKeyPress($event)">
                <div :class="{'form-group has-feedback': true, 'has-error': errors.has('email')}">
                    <input type="email" class="form-control" name="email" v-model="email" :placeholder="$t('E-mail')" v-validate="'required|email'">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>

                    <div class="help-block" v-show="errors.has('email')">
                        {{ errors.first('email') }}
                    </div>
                </div>
                <div :class="{'form-group has-feedback': true, 'has-error': errors.has('password')}">
                    <input type="password" class="form-control" name="password" v-model="password" :placeholder="$t('Password')" v-validate="'required'">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>

                    <div class="help-block" v-show="errors.has('password')">
                        {{ errors.first('password') }}
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-block btn-flat" @click="signin">{{ $t('Sign In') }}</button>
                <br>
                <a href="/esqueci-minha-senha">{{ $t('I forgot my password') }}</a>
            </form>

            <form v-if="authenticated">
                <div :class="{'form-group has-feedback': true, 'has-error': errors.has('organization')}">
                    <select class="form-control" name="organization" v-model="organization" v-validate="'required'">
                        <option v-for="org in organizations" :value="org.id">{{ org.name }}</option>
                    </select>
                    <div class="help-block" v-show="errors.has('organization')">
                        {{ errors.first('organization') }}
                    </div>
                </div>

                <button type="button" class="btn btn-primary btn-block btn-flat" @click="choose">{{ $t('Choose') }}</button>
            </form>
        </div>
    </div>
</template>

<script>
// import http from '@/core/http';
import auth from '@/core/auth';

export default {
    data: function() {
        return {
            authenticated: false,
            email: '',
            password: '',
            organizations: [],
            organization: null
        }
    },
    methods: {
        onFormKeyPress: function(e) {
            if (e.keyCode == 13)
                this.signin();

            return false;
        },
        signin: async function() {
            const isValid = await this.$validator.validateAll();

            if (!isValid) return;

            this.organizations = await http.fetch('account/access', {
                method: 'post',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });

            if (this.organizations.length == 1) {
                this.organization = this.organizations[0].id;
                await this.choose();
            }
            else
                this.authenticated = !!this.organizations.length;
        },
        choose: async function() {
            const isValid = await this.$validator.validateAll();

            if (!isValid) return;

            const token = await http.fetch('account/token', {
                method: 'post',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    organization: this.organization
                })
            });

            if (token) {
                auth.token = token;
                this.$router.push('/');
            }
        }
    },
    mounted: function() {
        document.body.classList.add('login-page');
        document.getElementById('app').classList.remove('wrapper')
    },
    destroyed: function() {
        document.body.classList.remove('login-page');
        document.getElementById('app').classList.add('wrapper');
    }
}
</script>
