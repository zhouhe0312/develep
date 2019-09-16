<template>
    <div id="examination">
        <el-row style="position: relative;width: 1200px;margin-left: -600px;left: 50%;">
            <el-col :span="24">
                <el-col :span="15" :offset="4" style="margin-left: 140px">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="Bread">
                        <el-breadcrumb-item><span style="cursor: pointer;color: #666;font-size: 12px" @click="toHome">首页</span></el-breadcrumb-item>
                        <el-breadcrumb-item><span style="cursor: pointer;color: #f39416;font-size: 12px" @click="esuperiorTiele($event)">我的题库</span></el-breadcrumb-item>
                        <el-breadcrumb-item><span style="cursor: pointer;color: #f39416;font-size: 12px" @click="esuperiorTiele($event)" >{{superior}}</span></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="1" style="margin-left: 160px">
                    <span @click="esuperiorTiele($event)" style="position: absolute;margin-top: 24px;margin-left:75px;color:#F38B1C;cursor: pointer;font-size: 12px">返回></span>
                </el-col>
            </el-col>

            <el-col :span="24" style="margin-top: 20px;margin-bottom: 90px;width: 1200px;position: relative;left: 50%;margin-left: -600px;">
                <el-col :span="17" :offset="4">
                    <el-col :span="18">
                        <div class="guankan">
                            <el-col :span="24" class="guankan_div">
                                <span style="font-size: 22px;color: #333;font-weight: bold;">{{this.title }}</span>
                                <p style="text-align: left;margin-left: 30px;padding: 10px 0 0px 0px;font-size: 14px;color: #666;text-align: center;margin-top: 14px"> 共{{ this.length }}小题，共{{ this.scorefen }}分</p>
                            </el-col>
                            <div ref="divH" >
                                <el-col :span="24" class="divH_el" v-for="(item,index) in research" >
                                    <p style="text-align: left;margin-left: 20px;font-size: 14px;color: #333">
                                        <i v-if="item.userAnswer === item.topicAnswer"  class="el-icon-close errorA"></i>
                                        <i v-else class="el-icon-close errorA wrong"></i>
                                        <span style="font-size: 24px;">{{index+1}}.</span>
                                        <span style="font-size: 14px;color: darkgrey">（{{item.score}}分数）</span>
                                        <span style="font-size: 14px;color: #333">{{item.topicStem}}</span></p>
                                    <el-col :span="24" style="float: left">
                                        <el-radio-group v-model="item.userAnswerNumber" style="float: left">
                                            <div style="float: left;margin-left: 2%">
                                                <ul class="RadioButtons">
                                                    <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="1" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;pointer-events: none;"><span style="font-size: 14px;color: #666">A. {{item.optionA}}</span></el-radio></li>
                                                    <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="2" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;pointer-events: none;"><span style="font-size: 14px;color: #666">B. {{item.optionB}}</span></el-radio></li>
                                                    <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="3" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;pointer-events: none;"><span style="font-size: 14px;color: #666">C. {{item.optionC}}</span></el-radio></li>
                                                    <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="4" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;pointer-events: none;"><span style="font-size: 14px;color: #666">D. {{item.optionD}}</span></el-radio></li><!--以上的四个是为实现答案框文字强制换行，且只在style中生效-->
                                                </ul>
                                            </div>

                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-col :span="12" v-if="item.userAnswer === item.topicAnswer" style="text-align: left;padding-left:20px;margin-top: 15px;margin-bottom: 15px">
                                            <span :class="'daAn'+item.id" style="color: green;font-size: 14px;">&nbsp;恭喜你答对了</span>
                                            <span style="padding-left: 20px;font-size: 12px" :class="'daAnB'+item.id"></span>
                                        </el-col>
                                        <el-col v-else :span="12" style="text-align: left;padding-left:20px;margin-top: 15px;margin-bottom: 15px">
                                            <span :class="'daAn'+item.id" style="color: red;font-size: 14px">&nbsp;抱歉，你答错了!</span>
                                            <span style="padding-left: 20px;font-size: 14px" :class="'daAnB'+item.id">正确答案: {{ item.topicAnswer }}</span>
                                        </el-col>
                                        <el-col :span="12" style="text-align: right;margin-top: 15px;margin-bottom: 15px">
                                            <span class="CheckParsing" @click="CheckParsing($event,item.topicId)">查看解析></span>
                                        </el-col>
                                        <!--<div style="border-bottom: 1px solid #F3F4F6;margin-top: 30px;width: 94%;margin-left: 3%"></div>-->
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="5" class="correct">
                        <div>
                            <div class="iconTu">
                                <i class="el-icon-close oula" @click="CloseParsing"></i>
                            </div>
                            <p style="font-size: 16px;text-align: left;margin-left: 10px;">1.正确答案以及解析</p>
                            <p style="text-align: left;margin-left: 10px;font-size: 16px;">正确答案：<span class="correctDaAn" style="color: red;font-size: 16px;">{{ jl_crrect }}</span></p>
                            <p style="text-align: left;margin-left: 10px">答案解析：</p>
                            <p style="text-align: left;margin-left:6px;padding:6px;font-size: 14px;color: darkgrey" class="correctPar">{{ jl_dis }}</p>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "examination",
        data(){
            return{
                length:null,
                superior:'',
                jl_crrect:'',
                jl_dis:'',
                radio1: '',
                scorefen:'',
                navN:'',
                research: [],
                title:'',
            }
        },
        mounted(){
            //  设置高度
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('#examination')
            let DIV2 = document.querySelector('.guankan')
            DIV.style.minHeight = (clientHeight - 50) + 'px'
            DIV2.style.height = (clientHeight - 180) + 'px'
            window.addEventListener('scroll', this.handleScroll, true)

            this.checkData = this.$route.params.ArrData;
            this.title = this.checkData.title
            this.scorefen = this.checkData.score
            this.length = this.checkData.topicList.length;
            this.searID = this.$route.params.searID;
            this.research = this.checkData.topicList
            if (this.searID=="1"){
                this.superior="已答试卷"
            }
            if (this.searID=="2"){
                this.superior="收藏试卷"
            }
            for (let i = 0; i < this.research.length; i++) {
                switch (this.research[i].userAnswer) {
                    case 'A':
                        this.$set(this.research[i],'userAnswerNumber',1)
                        break;
                    case 'B':
                        this.$set(this.research[i],'userAnswerNumber',2)
                        break;
                    case 'C':
                        this.$set(this.research[i],'userAnswerNumber',3)
                        break;
                    case 'D':
                        this.$set(this.research[i],'userAnswerNumber',4)
                        break;
                }

            }


        },
        methods:{
            handleScroll: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let scrollTopObj = document.querySelector('.correct')
                if (scrollTopObj!=null) {
                    if (scrollTop >= 190){
                        scrollTopObj.style.top = "-105px"
                    }else{
                        scrollTopObj.style.top = ''
                    }
                }
            },

            // 跳转到首页哦
            toHome() {
                this.$router.push({
                    path:'/'
                })
            },
            esuperiorTiele(event){
                if (this.searID=="1"){
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '1'
                        }
                    })
                }
                if (this.searID=="2"){
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '2'
                        }
                    })
                }
            },
            //这里是点击获取解析事件
            CheckParsing(event,id,topicId) {
                let Check = document.getElementsByClassName("correct")
                let titleguankan = document.getElementsByClassName("guankan")
                let clientHeight = document.documentElement.clientHeight;
                let clientWidth = document.documentElement.clientWidth;
                if (clientWidth>1700){
                    Check[0].style.marginLeft="850px"
                }

                Check[0].style.height=clientHeight-160+"px"
                titleguankan[0].style.transition="all 0.5s"
                titleguankan[0].style.transform = "translateX(-12%)"
                Check[0].style.transitionDelay = "0.5s"
                setTimeout(function(){
                    //这里的代码将在1000ms(1s后执行)
                    Check[0].style.display = "block"
                    Check[0].style.transition = "0.5s"
                    // Check[0].style.transitionDelay = "0.5s"
                    Check[0].style.transform = "translateX(0%)"
                },500)
                this.research.forEach(item=>{
                    if (item.topicId==id){
                        this.jl_crrect = item.topicAnswer;
                        this.jl_dis = item.topicAnalysis;
                    }
                })
            },
            //这里是点击关闭事件
            CloseParsing(){
                let Check = document.getElementsByClassName("correct")
                let titleguankan = document.getElementsByClassName("guankan")
                Check[0].style.transform = "translateX(0px)"
                // Check[0].style.opacity = "0"
                // titleguankan[0].style.minWidth="950px"
                Check[0].style.display = "none"
                Check[0].style.transitionDelay = "0s"
                titleguankan[0].style.transition="0"
                titleguankan[0].style.transform = "translateX(0%)"
            },


        },
    }
</script>

<style scoped>
    #examination{
        background-color: white;
    }
    .RadioButtons{
        padding: 0;
        margin: 0;
    }
    .Bread{
        margin-top: 24px;
        margin-left: -130px;
    }

    .RadioButtons li{
        padding: 10px;
        min-width: 600px;
        text-align: left;
    }
    .el-icon-close{
        color: red;
        opacity: 0;
        margin-left: -20px;
    }
    .CheckParsing{
        color: #999;
        font-size: 12px;
        margin-right: 15px;
        margin-bottom: 15px;
    }

    .CheckParsing:hover{
        color: #F38B1C;
        cursor: pointer;
    }

    .oula{
        opacity: 1;
        color: black;
    }
    .iconTu{
        text-align: right;
        line-height: 50px;
        margin-right: 20px;
        cursor: pointer;
    }
    .guankan{
        background-color: #fff;
        min-width: 950px;
        margin-bottom: 90px;
        margin-left: -80px;
    }
    .guankan_div{
        background-color: white;
        text-align: center;
        margin-top: 10px;
    }
    .divH_el{
        background-color: white;
        height: auto;
        padding: 10px;
        border: 1px solid #ddd;
        margin-top: 10px;
    }
    .divH_el:hover{
        -webkit-box-shadow: #e8e8e8 0px 3px 2px ;
        -moz-box-shadow: #E8E8E8 0px 3px 2px ;
        box-shadow: #E8E8E8 0px 3px 2px ;
    }


    .guankan::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
    }


    .correct{
        background-color: white;
        /*height: 665px;*/
        display: none;
        /*left: 220px;*/
        width: 220px;
        border: 1px solid #ddd;
        margin-top: 105px;

        /*top: 206px;*/
        position: fixed;
        margin-left: 780px;
        /*margin-top: -205px;*/
        overflow:auto;overflow-x:hidden;
        /*width: 270px;*/
    }
    .correct::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
    }


    /*改变elementUi自带的颜色*/
    li >>> .el-radio__input.is-checked .el-radio__inner{
        background-color: #F39416;
        border-color: #F39416;
    }
    li >>> .el-radio__input.is-checked+.el-radio__label{
        color: #F39416;
    }
    li >>> .el-radio__inner:hover{
        border-color: #F39416;
    }
</style>