<template>
    <div id="myquestionTheer">
        <el-row>
                <el-col :span="17" class="DesiredHeight" style="position: relative;left: 50%;margin-left: -575px;width: 800px;">
                    <div class="guankan">
                        <el-col :span="24" style="padding-top: 20px;background-color: white;">
                            <el-col :span="3" style="line-height: 30px;margin-right: 0px" :offset="15">
                                <span style="margin-left: 30px">试卷类型</span>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="value" placeholder="全部" style="width: 220px;color: #ddd;margin-left: 18px" @change="indexSelect($event)">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <div class="divH" ref="menuItem">
                            <div class="onests">
                            </div>
                            <el-col :span="24" class="divH_two" v-for="(item,index) in research">
                                <p style="text-align: left;margin-left: 20px;font-size: 14px;color: #333">
                                    <i class="el-icon-close " :class="'errorA'+item.id"></i>
                                    <span style="font-size: 24px">{{index+1}}.</span>
                                    <span style="font-size: 14px;color: darkgrey">（{{item.scoreValue}}分数）</span>
                                    {{item.topicStem}}</p>
                                <el-col :span="24" style="margin-left: 10px">
                                    <el-radio-group v-model="item.radio1" @change="ChooseAnswer($event,item.id)" style="float: left">
                                        <div style="float: left">
                                            <ul class="RadioButtons">
                                                <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="1" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;"><span style="font-size: 14px;color: #666">A. {{item.optionA}}</span></el-radio></li>
                                                <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="2" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;"><span style="font-size: 14px;color: #666">B. {{item.optionB}}</span></el-radio></li>
                                                <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="3" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;"><span style="font-size: 14px;color: #666">C. {{item.optionC}}</span></el-radio></li>
                                                <li style="padding-bottom: 20px;padding-right: 0;width: 98%"><el-radio :label="4" style="word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;"><span style="font-size: 14px;color: #666">D. {{item.optionD}}</span></el-radio></li><!--以上的四个是为实现答案框文字强制换行，且只在style中生效-->
                                            </ul>
                                        </div>

                                    </el-radio-group>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="12"  style="text-align: left;padding-left:20px;margin-top: 15px;margin-bottom: 15px">
                                        <span :class="'daAn'+item.id">&nbsp;</span>
                                        <span style="padding-left: 20px" :class="'daAnB'+item.id"></span>
                                        <span style="display:none" :class="'right'+item.id" >{{ item.topicAnswer }}</span>
                                    </el-col>
                                    <el-col :span="12" style="text-align: right;margin-top: 15px;margin-bottom: 15px;">
                                        <span class="CheckParsing" :class="'CheckParsingOne'+item.id" @click="CheckParsing($event,item.id,item.topicAnswer,item.topicAnalysis)">查看解析></span>
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
                    <p style="text-align: left;margin-left: 10px;font-weight: bold;font-size: 16px;">正确答案：<span class="correctDaAn" style="color: red;font-weight: bold;font-size: 16px;">{{ jx_crrect }}</span></p>
                    <p style="text-align: left;margin-left: 10px">答案解析：</p>
                    <p style="text-align: left;margin-left: 6px;padding:6px; font-size: 14px;color: #666;" class="correctPar">{{ jx_dis }}</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "myQuestionTheer",
        data() {
            return {
                jx_crrect:'',
                jx_dis:'',
                // activeClass: -1,
                activeName: 'first',
                test_input:'',
                navN: '',
                options: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '课程随堂'
                    },
                    {
                        value: '2',
                        label: '课程单元'
                    },
                    {
                        value: '3',
                        label: '课程'
                    },
                    {
                        value: '4',
                        label: '实验随堂'
                    },
                    // {
                    //     value: '5',
                    //     label: '实验单元'
                    // },
                    {
                        value: '6',
                        label: '实验'
                    },
                    {
                        value: '7',
                        label: '综合'
                    }
                ],
                value: '',
                input: '',
                radio1: '',
                research: [],
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
            this.wrongPages();
        },
        mounted(){
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('#myquestionTheer')
            DIV.style.minHeight = (clientHeight - 50) + 'px'

            window.addEventListener('scroll', this.handleScroll, true)

            this.myxiangyaoId =this.$route.query.searchId
            let thefatherCom = this.myxiangyaoId

            this.$emit('thefatherCom',this.myxiangyaoId)

        },
        methods: {
            handleScroll: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let scrollTopObj = document.querySelector('.correct')
                if (scrollTopObj!=null) {
                    if (scrollTop >= 186){
                        scrollTopObj.style.top = "-70px"
                    }else{
                        scrollTopObj.style.top = ''
                    }
                }

            },


            //这里是点击查看答案解析的点击事件
            CheckParsing(event,id,topicAnswer,topicAnalysis) {

                let Check = document.getElementsByClassName("correct")
                let titleguankan = document.getElementsByClassName("guankan")

                let clientHeight = document.documentElement.clientHeight-120;
                Check[0].style.height=clientHeight+18+"px"

                titleguankan[0].style.transition="all 0.5s"
                // titleguankan[0].style.minWidth="650px"
                titleguankan[0].style.transform = "translateX(-11%)"
                Check[0].style.transitionDelay = "0.5s"
                setTimeout(function(){
                    //这里的代码将在1000ms(1s后执行)
                    Check[0].style.display = "block"
                    Check[0].style.transition = "0.5s"
                    // Check[0].style.transitionDelay = "0.5s"
                    Check[0].style.transform = "translateX(0%)"
                },500)
                this.jx_crrect = topicAnswer;
                this.jx_dis = topicAnalysis;
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
            //这里是发起错题分页列表
            wrongPages() {
                this.$store.dispatch('myQuestion/wrongListAct', this.searchInfo).then(() => {
                    this.research = this.$store.state.myQuestion.wrongList;
                    this.pages = this.$store.state.myQuestion.wrongListPages;
                    if (this.research==""){
                        let onests = document.getElementsByClassName("onests");
                        onests[0].innerHTML="<h3>暂无相关错题</h3>"
                        onests[0].style.height="400px"
                        onests[0].style.backgroundColor="#ffffff"
                        onests[0].style.lineHeight="100px"
                    }else {
                        let onests = document.getElementsByClassName("onests");
                        onests[0].innerHTML=""
                        onests[0].style.height="0"
                        onests[0].style.backgroundColor="#ffffff"
                    }
                }).catch(() => {

                })
            },
            //下拉列表点击触发事件
            indexSelect(event){
                this.searchInfo.params.type = event;
                this.$store.dispatch('myQuestion/wrongListAct', this.searchInfo).then(() => {
                    this.research = this.$store.state.myQuestion.wrongList;
                    this.pages = this.$store.state.myQuestion.wrongListPages;
                    //这里是判断是否有错题，如果没有，就显示暂无相关错题
                    if (this.research==""){
                        let onests = document.getElementsByClassName("onests");
                        onests[0].innerHTML="<h3>暂无相关错题</h3>"
                        onests[0].style.height="400px"
                        onests[0].style.backgroundColor="#ffffff"
                        onests[0].style.lineHeight="100px"
                    }else {
                        let onests = document.getElementsByClassName("onests");
                        onests[0].innerHTML=""
                        onests[0].style.height="0"
                        onests[0].style.backgroundColor="#ffffff"
                    }

                }).catch(() => {

                })
            },
            //下面是判断用户回答是否正确
            ChooseAnswer(event,id){
                let CheckParsingOne = document.getElementsByClassName("CheckParsingOne"+id)
                CheckParsingOne[0].style.display="inline"

                let errorA = document.getElementsByClassName("errorA"+id)
                let daAn = document.getElementsByClassName("daAn"+id)
                let daAnB = document.getElementsByClassName("daAnB"+id)
                let right = document.getElementsByClassName("right"+id)
                let zhengquedaan = right[0].innerHTML
                if (event==1){
                    event="A"
                    if (zhengquedaan==event){
                        errorA[0].style.opacity="0"
                        daAn[0].innerHTML="恭喜你答对了啊"
                        daAn[0].style.fontSize="14px"
                        daAn[0].style.color="green"
                        daAnB[0].innerHTML=""
                    }else {
                        errorA[0].style.opacity="1"
                        daAn[0].innerHTML="抱歉，你答错了!"
                        daAn[0].style.color="red"
                        daAnB[0].innerHTML="正确答案: "+zhengquedaan
                        daAnB[0].style.fontSize="14px"
                        daAn[0].style.fontSize="14px"
                    }
                }else if(event==2){
                    event="B"
                    if (zhengquedaan==event){
                        errorA[0].style.opacity="0"
                        daAn[0].innerHTML="恭喜你答对了"
                        daAn[0].style.fontSize="14px"
                        daAn[0].style.color="green"
                        daAnB[0].innerHTML=""
                    }else {
                        errorA[0].style.opacity="1"
                        daAn[0].innerHTML="抱歉，你答错了!"
                        daAn[0].style.color="red"
                        daAnB[0].innerHTML="正确答案: "+zhengquedaan
                        daAnB[0].style.fontSize="14px"
                        daAn[0].style.fontSize="14px"
                    }
                }else if (event==3){
                    event="C"
                    if (zhengquedaan==event){
                        errorA[0].style.opacity="0"
                        daAn[0].innerHTML="恭喜你答对了"
                        daAn[0].style.fontSize="14px"
                        daAn[0].style.color="green"
                        daAnB[0].innerHTML=""
                    }else {
                        errorA[0].style.opacity="1"
                        daAn[0].innerHTML="抱歉，你答错了!"
                        daAn[0].style.color="red"
                        daAnB[0].innerHTML="正确答案: "+zhengquedaan
                        daAnB[0].style.fontSize="14px"
                        daAn[0].style.fontSize="14px"
                    }
                }else  if (event==4){
                    event="D"
                    if (zhengquedaan==event){
                        errorA[0].style.opacity="0"
                        daAn[0].innerHTML="恭喜你答对了"
                        daAn[0].style.fontSize="14px"
                        daAn[0].style.color="green"
                        daAnB[0].innerHTML=""
                    }else {
                        errorA[0].style.opacity="1"
                        daAn[0].innerHTML="抱歉，你答错了!"
                        daAn[0].style.color="red"
                        daAnB[0].innerHTML="正确答案: "+zhengquedaan
                        daAnB[0].style.fontSize="14px"
                        daAn[0].style.fontSize="14px"
                    }
                }
            },
        },
    }
</script>

<style scoped>
    #myquestionTheer{
        background-color: white;
        margin-top: 30px;
        padding-bottom: 40px;
        width: 1200px;
        position: relative;
        left: 50%;
        margin-left: -600px;
    }
    .RadioButtons{
        padding: 0;
    }
    .RadioButtons li{
        padding: 10px;
        min-width: 600px;
        text-align: left;
    }
    .el-icon-close{
        color: red;
        opacity: 1;
        margin-left: -20px;
    }
    .el-icon-close{
        color: red;
        opacity: 0;
    }
    .CheckParsing{
        font-size: 14px;
        margin-right: 20px;
        color: #888;
        display:none;
    }
    .CheckParsing:hover{
        color: #F38B1C;
        cursor: pointer;
    }
    .divH_two{
        background-color: white;
        height: auto;
        padding: 10px;
        border: 1px solid #ddd;
        margin-top: 10px;
    }
    .divH_two:hover{
        -webkit-box-shadow: #e8e8e8 0px 3px 2px ;
        -moz-box-shadow: #E8E8E8 0px 3px 2px ;
        box-shadow: #E8E8E8 0px 3px 2px ;
    }


    .guankan{
        /*height: 820px;*/
        /*overflow:auto;overflow-x:hidden;*/
        background-color: white;
        width: 950px;
        /*border: 1px solid #ddd;*/
        margin-left: 95px;
    }
    .guankan::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
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
    .correct{
        background-color: white;
        /*height: 665px;*/
        display: none;
        /*left: 220px;*/
        margin-top: 62px;
        width: 220px;
        /*top: 206px;*/
        position: fixed;
        margin-left: 980px;
        border: 1px solid #ddd;
        /*margin-top: -205px;*/
        overflow:auto;overflow-x:hidden;
        /*width: 270px;*/
    }
    .correct::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
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
    .padding_in {
        padding: 20px 0;
    }
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

    .el-select >>> .el-input__inner{
        height: 32px !important;
        border-radius: 0;
    }
</style>