<template>
    <div id="myquestion">
        <!--<h1>这里是我的题库</h1>-->
        <el-row>
            <el-col :span="24" style="width: 1200px;position: relative;margin-left: -575px;left: 50%;">
                <el-col :span="20" :offset="2" style="text-align: left;margin-left: 0;margin-top: 24px;">
                    <span style="cursor: pointer;color: #666;font-size: 12px" @click="tohome">首页</span> > <span style="color: #F39416;font-size: 12px">我的题库</span>
                </el-col>
                <el-col :span="24"  style="margin-left: 0;margin-top: 18px;">
                    <el-menu router :default-active="myxiangyaoId" class="el-menu-demo" background-color="#fff" active-text-color="#F29415" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1" class="elMenu_li" @click="ToAnMyQuestion1"><span style="margin-left: -20px">已答试卷</span></el-menu-item>
                        <el-menu-item index="2" class="elMenu_li" @click="ToAnMyQuestion2"><span style="margin-left: -20px">收藏试卷</span></el-menu-item>
                        <el-menu-item index="3" class="elMenu_li" @click="ToAnMyQuestion3"><span style="margin-left: -20px">错题攻关</span></el-menu-item>
                    </el-menu>
                </el-col>
            </el-col>
            <el-col>
                <router-view :key="$route.fullPath" @thefatherCom="showMsg" ></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "myQuestion",
        data() {
            return {
                // activeClass: -1,
                activeName: 'first',
                test_input:'',
                value: '',
                input: '',
                myxiangyaoId:"1",
                radio1: '',
                //分页
                currentPage: 1,
                pageSize: 5,
                pages: {
                    total: 0,
                    size: 10,
                    current: 1
                },
                searchInfo: {
                    page: {
                        current: 1,
                        size: 10
                    },
                    params: {
                        title: '',
                        type: 0
                    }
                },
            }
        },
        created() {
            this.showMsg()
            // this.wrongPages();
            // // console.log(this.$router.query)
            this.myxiangyaoId =this.$route.query.searchId
            // console.log(this.myxiangyaoId)

        },
        methods: {
            showMsg(val){
                this.myxiangyaoId = val
            },
            //  面包屑—首页
            tohome(){
                this.$router.push({
                    path:'/'
                })
            },
            handleSelect(key, keyPath) {

            },
            ToAnMyQuestion1() {
                this.$router.push({
                    path: '/myQuestionTwo',
                    query: {
                        searchId: '1'
                    }
                })
            },
            ToAnMyQuestion2() {
                this.$router.push({
                    path: '/myQuestionTwo',
                    query: {
                        searchId: '2'
                    }
                })
            },
            ToAnMyQuestion3() {
                this.$router.push({
                    path: '/myQuestionTheer',
                    query: {
                        searchId: '3'
                    }
                })
            },
        },
    }
</script>
<style scoped>
    /*这里是吧div覆盖了页面来实现修改body背景颜色的*/
    #myquestion{
        background-color: white;
        min-height: 582px;
    }
    .RadioButtons{
        padding: 0;
    }
    .elMenu_li:hover{
        background-color: white !important;
    }
    .elMenu_li{
        width: 60px !important;
        height: 40px !important;
        line-height: 40px!important;
        margin-right: 20px !important;
        background-color: white !important;
    }
    .el-menu-demo{
        border: 0px !important;
    }


    .RadioButtons li{
        padding: 10px;
        width: 600px;
        text-align: left;
    }
    .el-icon-close{
        color: red;
        opacity: 1;
    }



    .correct{
        background-color: white;
        height: auto;
        opacity: 0;
    }
    .el-button--info.is-plain:hover{
        background-color: #F39416;
        border-color: #F39416;
    }
    .el-icon-star-on:hover{
        color: #f39416;
    }
    .el-icon-star-on{
        cursor: pointer;
    }
    .el-button--primary{
        background-color: #f39416;
        border-color: #F39416;
    }
    .el-button--primary:hover{
        background-color: #bf651a;
        border-color: #bf651a;
    }
    .direction_li{
        list-style: none;
        text-align: left;
        float: left;
        /*border-radius: 20%;*/
        margin-left: 20px;
        height: 20px;
        line-height: 20px;
        padding: 5px;
        cursor: pointer;
    }
    .active {
        /* background: #eee; */
        color: #000;
        font-weight: bolder;
        border-bottom: 2px solid #F3A43B;

    }
</style>