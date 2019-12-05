import Vue from 'vue';
import Router from 'vue-router';
import Auth from './auth';
import Home from './components/home';

import Dashboard from '@/views/dashboard';
import SignIn from '@/views/signin';

// import Settings from '@/views/settings';

// import UserAccount from '@/views/settings/user/account';
// import UserProfile from '@/views/settings/user/profile';

Vue.use(Router);

const authenticatedGuard = (to, from, next) => {
    if (Auth.isAuthenticated) {
        next();

        let interval = null;
        interval = setInterval(() => {
            try {
                $.AdminLTE.layout.fix();
                clearInterval(interval);
            }
            catch (e) {}
        }, 100);
    }
    else
        next('/signin');
};

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    component: Dashboard,
                    // beforeEnter: showMenu
                }
            ],
            // beforeEnter: authenticatedGuard
        },
        {
            path: '/signin',
            component: SignIn
        }
    ]
});
