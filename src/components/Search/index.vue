<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>					
        </div>
        <div class="search_result">
            <div class="movies_content">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img"><img :src=" item.img | setWH('128.180') "></div>
                    <div class="info">
                        <p><span>{{ item.nm }}</span><span>{{ item.sc }}</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                </li>
            </ul>
            </div>
            <div class="cinemas_content">
            <h3>影院/演出厅</h3>
            <ul>
                <p>
            <li v-for="item in cinemaList" :key="item.id">
                <div>
                    <p class="name">{{ item.nm }}</p>
                    <p class="q"><span class="price">{{ item.sellPrice }}</span> 元起</p>
                </div>
                <p>
                <div class="address">
                    <span>{{ item.addr }}</span>
                    <!-- <span>{{ item.distance }}</span> -->
                </div>
            </li>
        </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Search',
    data(){
        return {
            message : '',
            moviesList : [],
            cinemaList : []
        }
    },
    methods : {
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
    },
    watch : {
        message(newVal){
            var that = this;
            var cityId = this.$store.state.city.id;
            this.cancelRequest();
            this.axios.get('/api/searchList?cityId='+ cityId +'&kw='+newVal,{
                cancelToken: new this.axios.CancelToken(function(c){
                    that.source = c;
                })
            }).then((res)=>{
                var msg = res.data.msg;
                var movies = res.data.data.movies;
                if(msg && movies){
                    console.log(res.data)
                    this.moviesList = res.data.data.movies.list;
                    this.cinemaList = res.data.data.cinemas.list;
                }
            }).catch((err) => {
                if (this.axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            });
        }
    }
}
</script>

<style>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result  h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result .movies_content li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .movies_content .img{ width: 60px; float:left; }
.search_body .search_result .movies_content .img img{ width: 100%; }
.search_body .search_result .movies_content .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .movies_content .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .movies_content .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .movies_content .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}

.search_body .search_result .cinemas_content li{  border-bottom:1px #c9c9c9 dashed; margin-bottom: 20px; padding: 15px;}
.search_body .search_result .cinemas_content div{ margin-bottom: 10px;}
.search_body .search_result .cinemas_content .q{ font-size: 11px; color:#f03d37;}
.search_body .search_result .cinemas_content .price{ font-size: 15px;}
.search_body .search_result .cinemas_content .address{ font-size: 13px; color:#666;}
.search_body .search_result .cinemas_content .address span:nth-of-type(2){ float:right; }
</style>
