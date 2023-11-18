export default [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import(/* webpackChunkName: "home" */ '../LandingComponent.vue'),
            },
        ],
    }
]