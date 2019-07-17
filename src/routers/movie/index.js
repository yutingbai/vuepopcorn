export default{
    path:'/movie',
    component:()=>import('@/views/movie'),
    children:[
        {
        path:'City',
        component:()=>import('@/components/City')
        }, 
        {
            path:'NowPlaying',
            component:()=>import('@/components/NowPlaying')
        }, 
        {
            path:'ComingSon',
            component:()=>import('@/components/ComingSon')
        },
        {
            path:'Search',
            component:()=>import('@/components/Search')
        },
        {
            path : 'detail/1/:movieId',
            components : {
                default : ()=> import('@/components/NowPlaying'),
                detail : ()=> import('@/views/movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : ()=> import('@/components/ComingSon'),
                detail : ()=> import('@/views/movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path:'/movie',
            redirect:'/movie/NowPlaying'
        }
    ]
}