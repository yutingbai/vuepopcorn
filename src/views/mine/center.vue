<template>
    <div class="mineBox">
        <div class="info">个人中心</div>
        <div class="info">当前用户：{{ $store.state.user.name }} <a href="javascript:;" @touchstart="handleToLogout">退出 ></a></div>
        <div class="info">用户身份：普通会员</div>
        <div class="imgBox">
            <img class="userHead" :src="$store.state.user.userHead">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
    name : 'center',
    methods : {
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    localStorage.removeItem('name');
                    this.$store.commit('user/USER_NAME',{ name : '' , userHead : '' });
                    this.$router.push('/mine/login');
                }
            });
        }
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
                next('/mine/login');
            }
        });
    }
}
</script>

<style scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
.imgBox{
    border: 1px solid #e6e6e6;
    width:100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left:-50px;
}
.mineBox{
    margin-top: 50px;
}
img{
    width: 100px;
    height: 100px;
}
.info{
    /* background-color: #e6ec66; */
    width: 100%;
    position: relative;
    top: 120px;
    border: 1px solid #e6e6e6;
    font-size: 18px;
    line-height: 40px;
    padding-left: 50px;
    color: #888
}
a{
    color: #e54847;
    text-decoration: none;
    margin-left: 80px;
    
}
</style>
