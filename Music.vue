<template>
    <div class="music">
        <div id="img-audio" ref="pat" @click="pMusic"><img :style="'transform:rotatez('+ rot+'deg);'" :src="useImgPath + 'ic_music@2x.png'"></div>
	    <audio id="player-audio" ref="pa" loop="loop" preload="auto" :src="MusicData"></audio>
    </div>
</template>
<script>
export default {
    data(){
        return {
            rot:0,
            time:0,
            removeAudio:false,
            flag:false,
            useImgPath:'',
            audioCtx:'',
            paused:false,
            source:''
        }
    },
    props:['MusicData'],
    methods:{
        pMusic(){
            var curURL = window.location.href;
            var music = this.$refs.pa;
            window.clearInterval(this.time);
            console.log('music.paused',music.paused)
            // if(music.paused && curURL.indexOf("luckDrawDetail") == -1 ){
            //     // music.play();
            //     this.audioCtx.close().then(function() {
            //        console.log('音乐暂停播放')
            //     });
            // }else{
            //     music.pause();
            //     window.clearInterval(this.time);
            // }
            if(!this.paused && curURL.indexOf("luckDrawDetail") == -1 ){
                this.audioCtx.suspend().then(function() {
                    console.log('暂停播放')
                })
                this.paused = true;
            }else{
                this.audioCtx.resume().then(function() {
                    console.log('开始播放')
                })
            }
        },
    },
    mounted(){
        var curURL = window.location.href;
        var that = this;
        var music = this.$refs.pa;
        if(!that.removeAudio && curURL.indexOf("luckDrawDetail") == -1 ){
            if(getData.page_main.status == 1 || (getData.page_main.status == 0 || getData.page_main.status == 2)){
                // console.log('音乐',music)
                // music.play();
                // that.removeAudio = true;
                that.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                let xhr = new XMLHttpRequest();
                xhr.open('GET', this.MusicData);
                xhr.responseType = 'arraybuffer';
                xhr.addEventListener('load', () => {
                    console.log('that.removeAudio',that.removeAudio)
                        if(!that.removeAudio && curURL.indexOf("luckDrawDetail") == -1 ){
                            that.removeAudio = true;
                            let playsound = (audioBuffer) => {
                            // console.log(audioBuffer);
                            that.source = that.audioCtx.createBufferSource();
                            that.source.buffer = audioBuffer;
                            that.source.connect(that.audioCtx.destination);
                            that.source.loop = true;
                            that.source.start(0);
                        };
                        that.audioCtx.decodeAudioData(xhr.response, function(data) {
                            // use the dec​oded data here
                            console.log('音乐播放1')
                            playsound(data);
                            window.clearInterval(that.time);
                            that.time = window.setInterval(()=>{
                                if(that.rot == 360){
                                    that.rot = 0;
                                }else{
                                    that.rot+=1;
                                }
                            },10);
                            that.removeAudio = true;   
                        });
                        }
                });
                xhr.send();
            }
        }





        if(imgPath){
            this.useImgPath = imgPath;
        }
        // var music = this.$refs.pa;
        // if(music){
        //     music.addEventListener('playing', ()=> {
        //         window.clearInterval(this.time);
        //         this.time = window.setInterval(()=>{
        //             if(this.rot == 360){
        //                 this.rot = 0;
        //             }else{
        //                 this.rot+=1;
        //             }
        //         },10);
        //         this.removeAudio = true;
        //     }, false);
        //      music.addEventListener('pause', ()=> {
        //         window.clearInterval(this.time);
        //     }, false);
        // }
        // if(music){
        //     var curURL = window.location.href;
        //     var that = this;
        //     document.addEventListener('touchstart', ()=> {
        //         if(!that.removeAudio && curURL.indexOf("luckDrawDetail") == -1 ){
        //             if(getData.page_main.status == 1 || (getData.page_main.status == 0 || getData.page_main.status == 2)){
        //                 // console.log('音乐',music)
        //                 // music.play();
        //                 // that.removeAudio = true;
        //                 let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        //                 let xhr = new XMLHttpRequest();
        //                 xhr.open('GET', this.MusicData);
        //                 xhr.responseType = 'arraybuffer';
        //                 xhr.addEventListener('load', () => {
        //                     console.log('that.removeAudio',that.removeAudio)
        //                      if(!that.removeAudio && curURL.indexOf("luckDrawDetail") == -1 ){
        //                          that.removeAudio = true;
        //                          let playsound = (audioBuffer) => {
        //                             // console.log(audioBuffer);
        //                             let source = audioCtx.createBufferSource();
        //                             source.buffer = audioBuffer;
        //                             source.connect(audioCtx.destination);
        //                             source.loop = true;
        //                             source.start();
        //                         };
        //                         audioCtx.decodeAudioData(xhr.response, function(data) {
        //                             // use the dec​oded data here
        //                             console.log('音乐播放')
        //                             playsound(data);   
        //                         });
        //                      }
        //                 });
        //                 xhr.send();
        //             }
        //         }
        //     },false);
        // }
        document.addEventListener("visibilitychange", (e) => {
            console.log('document.hidden',document.hidden)
            var curURL = window.location.href;
            if(document.hidden){
                music.pause();
                window.clearInterval(this.time);
            }
            // else{
            //     if(curURL.indexOf("luckDrawDetail") == -1 ){
            //         music.play();
            //     }
            // }
        })
    }
}
</script>
<style lang="scss" scoped>
#img-audio {
    position: fixed;
    right: 0.05rem;
    top: 0.15rem;
    z-index: 100;
    img {
        width: 0.4rem;
        height: 0.4rem;
        pointer-events: none;
    }
}
</style>

