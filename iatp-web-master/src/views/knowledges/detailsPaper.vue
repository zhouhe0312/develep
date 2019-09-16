<template>
    <div class="min_height">
        <el-row>
            <el-col :span="24">
                <div class="grid-content" style="text-align: center">
                    <h3 style="font-size: 18px;text-align: left;margin: 0">{{ this.$route.query.name }}</h3>
                </div>
            </el-col>
                <el-button v-if="this.$route.query.filename" type="text" class="downBTN" @click="downPaper()"><i class="el-icon-download" />下载</el-button>
        </el-row>
        <el-row v-for="(item,index) in content" :key="index">
            <el-col :span="24" style="font-size: 15px">
                <div class="grid-content" style="font-weight: bolder;min-height: 22px;padding-top: 5px"><p style="margin: 0;line-height: 1.5em">{{ item.name }}</p></div>
            </el-col>
            <el-col v-if="item.content" :span="24" style="font-size: 15px;">
                <div class="grid-content"><p style="margin: 0;line-height: 2em">{{ item.content }}</p></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "detailsPaper",
        data() {
            return {
                content: [],

            }
        },
        created() {
            this.getData()
        },
        mounted(){
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('.min_height')
            DIV.style.height = (clientHeight - 4) + 'px'
        },
        methods: {
            //  获取内容
            getData() {
                let id = this.$route.query.pid
                // console.log(this.$route.query.pid)
                this.$store.dispatch("knowledges/listAllAct", id).then(() => {
                    this.content = this.$store.state.knowledges.content
                    // console.log(this.content)
                }).catch(() => {

                })
            },
        //  下载
            downPaper(){
                let id = this.$route.query.filename
                let a = document.createElement('a')
                a.href =process.env.VUE_APP_BASE_API+"/fileserver/file/download"+"/"+id
                a.click();
            }
        },

    }
</script>

<style scoped>
.downBTN{
    position: absolute;
    top: -7px;
    right: 0;
    color: #f29217;
}
.downBTN:hover,
.downBTN:focus
{
    color: #f29217;
}
</style>