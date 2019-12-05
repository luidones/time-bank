<i18n>
pt-BR:
    "TB": "BT"
    "Time Bank" : "Banco do Tempo"
    "Toggle navigation": "Mostrar/Esconder Menu"
    "Language": "Idioma"
    "English": "Inglês"
    "Portuguese": "Português"
    "Sign Out": "Sair"
</i18n>


<style scoped>
li.read {
    background-color: #f9f9f9;
}
li.read i {
    color: #999;
}
</style>
<template>
    <header class="main-header">
        <router-link to="/" class="logo">
            <span class="logo-mini"><b>TB</b></span>
            <span class="logo-lg"><b>Time Bank</b></span>
        </router-link>

        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-language"></i>
                            {{ $t('Language') }}
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" @click="changeLocale('en')">
                                    <i :class="'fa ' + (locale == 'en' ? 'fa-check-circle' : 'fa-circle-o')"></i>
                                    {{ $t('English') }}
                                </a>
                            </li>
                            <li>
                                <a href="#" @click="changeLocale('pt-BR')">
                                    <i :class="'fa ' + (locale == 'pt-BR' ? 'fa-check-circle' : 'fa-circle-o')"></i>
                                    {{ $t('Portuguese') }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" @click="signout()">
                            <i class="fa fa-sign-out"></i>
                            {{ $t('Sign Out') }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import { UpdateLocale } from '@/core/locale';
import auth from '@/core/auth';

export default {
    data: function() {
        return {
            locale: this.$root.$i18n.locale        }
    },
    methods: {
        changeLocale: function (value) {
            this.locale = value;
            UpdateLocale(value, this.$root);
        },
        signout: function () {
            auth.token = null;
            this.$router.push('/signin');
        }
    }
}
</script>
