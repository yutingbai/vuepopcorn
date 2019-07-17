export default{
    path:'/cinema',
    component:()=>import('@/views/cinema'),
    children:[
        {
            path:'ciInfo/:cinemaId',
            components:{
                default : ()=> import('@/components/CiList'),
                ciInfo:()=>import('@/views/cinema/ciInfo')
            },
            props :{
                ciInfo:true
            },
            children:[
                {
                    path:'buyTicket/:hallId/:movieId',
                    components:{
                        buyTicket : ()=> import('@/components/buyTicket'),
                    },
                    props :{
                        buyTicket:true
                    } 
                    
                }
            ] 
            
        }
    ]
}