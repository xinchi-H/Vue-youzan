import './index.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

import mixin from 'js/mixin'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false, //为true时，滚动加载效果不会被触发
        allLoading: false,
        bannerLists: null,
    },
    created() {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists() {
            //判断是否加载完毕
            if (this.allLoading) return
            //是否加载中
            this.loading = true
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                //判断所有数据是否加载完毕
                if (curLists.length < this.pageSize) {
                    this.allLoading = true
                }
                if (this.lists) {
                    this.lists = this.lists.concat(curLists)
                } else {
                    //第一次请求数据
                    this.lists = curLists
                }
                //此次加载完成，可以再次调用getLists
                this.loading = false
                this.pageNum++
            })
        },
        getBanner() {
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Foot,
        Swipe
    },
    mixins: [mixin]
})       