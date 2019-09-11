export default [
    {
        path: '/',
        component: () => import('@/components/TMain/index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/views/About.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
    },
];
