import Vue from 'vue';
import Router from 'vue-router';
import Auth from './auth';
import Home from './components/home';

import SignIn from '@/views/signin';
import BankIndex from '@/views/banks';
import MemberIndex from '@/views/members';

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
                    component: BankIndex
                },
                {
                    path: '/member/:id',
                    component: MemberIndex
                }
            ]
        },
        {
            path: '/signin',
            component: SignIn
        }
    ]
});
