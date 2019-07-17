<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="买票页">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <div >
        <Loading v-if="isLoading" />
            <div class="seatBox">
                <div class="cenTv">荧幕中央</div>
                <div  v-for="i in 8" :key="i" class="seatList" style="width:20px; height:25px;display:inline-block;margin-left:20px">
                    <div @click="checkSeat(`${j}`,`${i}`)" :id="`${j}${i}`" v-for="j in 5" :key="j" class="zw" style="width:25px; height:25px;background-size:25px;display:inline-block;margin-left:20px"></div>
                </div>
            </div>
        </div>
        <div class="example">
             <div class="zw" style="width:25px; height:25px;background-size:25px;display:inline-block;margin-left:20px">
                 <div class="wenzi">可选</div>
             </div>
              <div class="yx" style="width:25px; height:25px;background-size:25px;display:inline-block;margin-left:20px">
                  <div class="wenzi">不可选</div>
              </div>
               <div class="xz" style="width:25px; height:25px;background-size:25px;display:inline-block;margin-left:20px">
                   <div class="wenzi">已选</div>
               </div>

        </div>
        <div class="hanglie" v-show="(this.hang)!=-1 ">
            {{this.hang }}行{{this.lie}}列
        </div>
        <div class="Buy" @click="buyIt()">确认选座</div>
        <router-view name="buyTicket" />
	</div>
    
</template>

<script>

import Header from '@/components/Header';
import { messageBox } from '@/components/JS';
import axios from 'axios';



export default {
    name : 'buyTicket',
    data(){
        return {
            lie:-1,
            hang:-1,
            isLoading : true,
        }
    },
    components : {
        Header
    },
    props : ['cinemaId','movieId','hallId'],
    methods : {
        handleToBack(){
            this.$router.back();
        },
        checkSeat(j,i){
            
            var Mylie = document.getElementsByClassName('seatList')[i-1].children[j-1]
            if( Mylie.classList.value == 'zw' &&this.lie==-1 ){
                Mylie.classList.remove('zw');
                Mylie.classList.add('xz');
                this.hang = j,this.lie=i;
            }else if( Mylie.classList.value == 'zw'){
                document.getElementsByClassName('seatList')[this.lie-1].children[this.hang-1].classList.remove('xz')
                document.getElementsByClassName('seatList')[this.lie-1].children[this.hang-1].classList.add('zw')
                Mylie.classList.remove('zw');
                Mylie.classList.add('xz');
                this.hang = j,this.lie=i;
            }
            else if(Mylie.classList.value == 'xz'){
                Mylie.classList.remove('xz');
                Mylie.classList.add('zw');
                this.lie=-1;
                this.hang=-1
            }else{
                return;
            }
            
            console.log(this.hang,this.lie)
        },
        buyIt(){
           let data = {'cinema':this.cinemaId,'hall':this.hallId,'hang':this.hang,'lie':this.lie,'movie':this.movieId,'userId':'xxx'};
            this.axios.post('http://localhost:8081/admin/buyMov',data).then((res)=>{
                 console.log(res)
                var status = res.data.code
                var This = this;
                if(status === 0){
                    messageBox({
                        title : '购票',
                        content : '购票成功',
                        ok : '确定',
                        handleOk(){
                            This.$router.push('/cinema');
                        }
                    });
                }
                else{
                     messageBox({
                        title : '购票',
                        content : res.data.message,
                        ok : '确定'
                    });
                }
            })
            
        }
        
    },
    mounted(){
        // console.log(this.cinemaId,this.movieId,this.hallId)
         let data = {'cinema':this.cinemaId,'hall':this.hallId,'hang':'','lie':'','movie':this.movieId,'userId':''};
        this.axios.post('http://localhost:8081/admin/findSeat',data).then((res)=>{
            this.isLoading = false;
            let is;
            let output = res.data;
            // console.table(res.data);
               for(let i = 0; i <output.message.length; i++){
                    is = (output.message[i][0]).toString()+(output.message[i][1]);
                    // console.log(is);
                    var Mylie = document.getElementsByClassName('seatList')
                    for(let j  = 0; j < Mylie.length; j++){
                        for(let i = 0; i < Mylie[j].children.length;i++){
                                
                                 if(Mylie[j].children[i].id== is) {
                                    
                                    Mylie[j].children[i].classList.remove('zw');
                                    Mylie[j].children[i].classList.add('yx');
                                 }
                        }
                    }
                }
            
            
        })
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser').then((res)=>{
            var status = res.data.status;
            
            if(status === 0){
                next(vm => {
                    // console.log(res)
                    localStorage.setItem('name',res.data.data.username);
                    vm.$store.commit('user/USER_NAME',{ 
                        name : res.data.data.username , 
                        userHead : res.data.data.userHead
                    });
                });
            }
            else{
                 messageBox({
                        title : '登录',
                        content : '您还没有登陆',
                        ok : '确定',
                        handleOk(){
                            next('/mine/login')
                        }
                    });
            }
        });
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
.yx{
    background-image: url(../../../public/images/yx.jpg);
    }
.zw{
    background-image: url(../../../public/images/zw.jpg)        
}
.xz{
    background-image: url(../../../public/images/xz.jpg)        
}
.cenTv{
    font-size: 10px;
    position:absolute;
    left: 50%;
    top:120px;
    margin-left: -90px;
    padding-left: 70px;
    padding-right: 70px;
    border: 1px solid #e6e6e6;
    border-bottom-right-radius:100%;
    border-bottom-left-radius:100%;
}
.seatBox{
    margin-top: 120px;
    border: 1px solid #e6e6e6;
    padding-top:30px; 
}
.example{
    position: absolute;
    left:50%;
    margin-left: -112.5px;
}
.example .xz,.example .zw, .example .yx{
    position: relative;
    margin: 30px;
}
.wenzi{
    font-size: 12px;
    position: absolute;
    top: 30px;
    width: 60px;
}
.Buy{
    width: 300px;
    height: 60px;
    border: 1px solid #e6e6e6;
    font-size: 20px;
    color: #e6e6e6;
    line-height: 60px;
    text-align: center;
    background-color: #e54847;
    position: relative;
    left: 40px;
    top:150px;
}
.hanglie{
    position: relative;
    top: 120px;
    left: 50%;
    font-size: 12px;
    margin-left: -30px;
    background-color: #e2a0a0;
    color: #fff;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 15%;
}
</style>
