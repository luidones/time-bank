<template>
    <div class="no-menu">
        <app-header />

        <div class="content-wrapper">
            <router-view />
        </div>

        <app-footer />
    </div>
</template>

<script>
import AppHeader from './header.vue'
import AppFooter from './footer.vue'

export default {
    components: {
        AppHeader,
        AppFooter
    }
}
</script>
