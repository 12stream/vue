<template>
    <div>
        {{msg}}
        <h2>这是一个New组件</h2>
        <router-link to="/new/newcontent">新闻详情页</router-link>
        <router-link to="/new/newonce">新闻一点通</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                msg:'这是新闻哦'
            }
        },
    }
</script>