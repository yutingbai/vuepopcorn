<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影院详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <div >
        <Loading v-if="isLoading" />
            <ul>
                <li v-for="item in detailMovie" :key="item.index">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p><span class="person">{{ item.wish }}</span> 人想看</p>
                        <p>主演: {{ item.star }}</p>
                        <p>{{ item.rt }}上映</p>
                    </div>
                    <div class="btn_pre"  @click="handleByTicket(cinemaId,item.id,item.hallId)">
                        购票
                    </div>
                </li>
            </ul>
        </div>
        <router-view name="buyTicket" />
	</div>
    
</template>

<script>

import Header from '@/components/Header';
import { messageBox } from '@/components/JS';
import detailVue from '../movie/detail.vue';


export default {
    name : 'ciInfo',
    data(){
        return {
            ciInfor:[],
            detailMovie:[],
            isLoading : true,
            empty:true
        }
    },
    components : {
        Header
    },
    props : ['cinemaId'],
    methods : {
        handleToBack(){
            this.$router.back();
        },
        handleByTicket(cinemaId,movieId,hallId){
            // console.log(cinemaId,movieId,hallId)
            this.$router.push('/cinema/ciInfo/'+cinemaId+'/buyTicket/'+hallId+'/'+movieId);
        }
        
    },
    mounted(){
        let This = this;
        // console.log(this.cinemaId)
        let data = {'id':this.cinemaId};
        this.axios.post('http://localhost:8081/admin/findMov',data).then((res)=>{
            //  console.log(res.data)
            var msg = res.data.code;
            if(msg == 0){
                // console.log(res.data.message)
                this.isLoading = false;
                for(let i = 0; i < res.data.message.length;i++)
                {   
                    if(res.data.message[i].length != 0){
                         this.empty = false;
                        // console.log(res.data.message[i])
                       for(let j = 0; j<res.data.message[i].length;j++)
                       {
                           this.axios.get('/api/detailmovie?movieId='+res.data.message[i][j].id ).then((res)=>{
                               res.data.data.detailMovie.hallId=i+1
                               if(res.data.data.detailMovie.hallId != undefined){
                                  
                                   this.detailMovie.push(res.data.data.detailMovie);
                               }                       
                           })
                       }
                    }
                }
            }
            
        }).then(()=>{
            if(this.empty){ 
                messageBox({
                        title : '',
                        content : "I'm sorry, that's all",
                        ok : '确定',
                        handleOk(){
                          This.$router.push('/cinema');;
                        }
                    });}
        })
        
             
    }
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
#detailContrainer.slide-enter-active{ animation:.3s slideMove;}
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
 #content { flex:1; overflow:auto;}
     ul{ margin:0 12px; overflow: hidden;}
     ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
     .pic_show{ width:64px; height: 90px;}
     .pic_show img{ width:100%;}
     .info_list { margin-left: 10px; flex:1; position: relative;}
     .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
     .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
     .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
     .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
     .btn_mall ,  .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
     .btn_pre{ background-color: #f03d37;}
     .pullDown{ margin:0; padding:0; border:none;}
</style>
