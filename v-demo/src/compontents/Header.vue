<template>
    <div>
        <h2>这是一个头部方法</h2>
        <button @click="run">执行run方法</button>
    
    </div>

</template>
<script>
    export default{
        data(){
            return{
                msg:'头部数据'
            }
        },
        methods:{
            run(){
                alert(this.msg);
            }
        }
    }
</script>