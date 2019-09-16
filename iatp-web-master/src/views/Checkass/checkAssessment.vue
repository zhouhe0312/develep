<template>
    <div id="examination">
        <el-row>
            <el-row>
                <el-col :span="5" style="width: 166px" class="icon_BTN">
                    <div class="grid-content padding_in" v-if="navcjl" style="text-align: left">
                        <span class="cursor" style="color: #666;font-size: 12px"><span><router-link
                                to="/">首页</router-link></span></span> <span style="color: #666;font-size: 12px"> > </span>
                        <span class="cursor" style="color: #F39416;font-size: 12px;cursor: pointer"
                              @click="cjlMyQuestion()" v-if="navcjl">{{navcjl}}<span
                                style="color: #666;font-size: 12px"> > </span></span>
                        <span class="cursor" style="color: #F39416;font-size: 12px"><span>{{ navN }}</span></span>
                    </div>
                    <div class="grid-content padding_in" v-else style="text-align: left">
                        <span class="cursor" style="color: #666;font-size: 12px"><span><router-link
                                to="/">首页</router-link></span></span> <span style="color: #666;font-size: 12px"> > 学习考核 > </span>
                        <span class="cursor" style="color: #F39416;font-size: 12px;cursor: pointer"
                              @click="cjlMyQuestion()" v-if="navcjl">{{navcjl}}<span
                                style="color: #666;font-size: 12px"> > </span></span>
                        <span class="cursor" style="color: #F39416;font-size: 12px"><span>{{ navN }}</span></span>
                    </div>
                </el-col>
                <el-col :span="3" class="back_BTN" style="width: 70px;float: left">
                    <div class="grid-content padding_in" style="text-align: right;">
                        <span style="cursor: pointer;color: #F39416;font-size: 12px" @click="backTo">返回 ></span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col :span="24" style="position: relative;">
                        <el-col class="DIV" :span="17" style="background-color: #fff;width: 950px">
                            <el-col :span="24" style="background-color: white;text-align: center">
                                <p style="font-size: 22px;color: #333;font-weight: bolder;margin-bottom: 16px">{{ this.title }}</p>
                                <p style="font-size: 14px;color: #666;margin: 0 0 35px 0">
                                    共{{ this.length }}小题，共{{ research.score }}分</p>
                            </el-col>
                            <div ref="divH">
                                <el-col :span="24"
                                        style="background-color: white;height: auto;padding: 18px 0 0 8px;border: 1px solid #ddd;margin-top: 15px"
                                        v-for="(item,index) in research.topicList" ref="xiangyao" :key="index" class="shadow">
                                    <p style="text-align: left;margin: 0;width: 84px;float: left">
                                        <i v-if="item.userAnswer === item.topicAnswer" class="el-icon-close errorA"></i>
                                        <i v-else class="el-icon-close errorA wrong"></i>
                                        <span style="font-size: 20px">{{ index+1 }}.</span>&nbsp;&nbsp;
                                        <span style="font-size: 12px;color: gray;">({{ item.score }}分)</span>
                                    </p>
                                    <p style="display: inline-block;float: left;width: 89%;margin: 0px;text-align: left;padding-top: 2px;font-size: 14px;color: #333">
                                        {{item.topicStem}}</p>
                                    <el-col :span="24" style="clear: left;text-align: left">
                                        <el-radio-group v-model="item.userAnswerNumber">
                                            <ul class="RadioButtons">
                                                <li style="padding-bottom: 2px;padding-right: 0;width: 98%">
                                                    <el-radio :label="1" style="width: 98%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;font-size: 14px;color: #666">A. {{item.optionA}}</el-radio>
                                                </li>
                                                <li style="padding-bottom: 2px;padding-right: 0;width: 98%">
                                                    <el-radio :label="2" style="width: 98%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;font-size: 14px;color: #666">B. {{item.optionB}}</el-radio>
                                                </li>
                                                <li style="padding-bottom: 2px;padding-right: 0;width: 98%">
                                                    <el-radio :label="3" style="width: 98%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;font-size: 14px;color: #666">C. {{item.optionC}}</el-radio>
                                                </li>
                                                <li style="padding-bottom: 0;padding-right: 0;width: 98%">
                                                    <el-radio :label="4" style="width: 98%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;font-size: 14px;color: #666">D. {{item.optionD}}
                                                    </el-radio>
                                                </li><!--以上的四个是为实现答案框文字强制换行，且只在style中生效-->
                                            </ul>
                                        </el-radio-group>
                                    </el-col>
                                    <el-row>
                                        <el-col :span="24">
<!--                                            <el-col v-if="item.userAnswer === item.topicAnswer" :span="12"-->
<!--                                                    style="text-align: left;padding-left:40px;font-size: 14px">-->
<!--&lt;!&ndash;                                                <span :class="'daAn'+item.id" style="color: green">&nbsp;恭喜你答对了</span>&ndash;&gt;-->
<!--&lt;!&ndash;                                                <span style="padding-left: 20px" :class="'daAnB'+item.id"></span>&ndash;&gt;-->
<!--                                            </el-col>-->
<!--                                            <el-col v-else :span="12"-->
<!--                                                    style="text-align: left;padding-left:40px;font-size: 14px">-->
<!--&lt;!&ndash;                                                <span :class="'daAn'+item.id" style="color: red">&nbsp;抱歉，你答错了!</span>&ndash;&gt;-->
<!--&lt;!&ndash;                                                <span style="padding-left: 20px" :class="'daAnB'+item.id">正确答案: {{ item.topicAnswer }}</span>&ndash;&gt;-->
<!--                                            </el-col>-->
                                            <el-col :span="12" :offset="12" style="text-align: right;padding-right: 15px;padding-bottom: 11px">
                                                <span class="hoverColor" style="cursor: pointer;font-size: 12px;color: #888" @click="CheckParsing(item.topicAnswer,item.topicAnalysis,index)">查看解析 ></span>
                                            </el-col>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </div>
                        </el-col>
                        <!----------------  解析  ----------------->
                        <el-col :span="6" class="correct">
                                <div style="padding: 10px 10px">
                                    <div style=";text-align: right;cursor: pointer">
                                        <i class="el-icon-close oula" @click="CloseParsing"></i>
                                    </div>
                                    <p style="margin: 0;text-align: left;font-size: 16px">{{ jx_num }}.正确答案及解析</p>
                                    <p style="text-align: left;font-size: 16px;font-weight: bolder">正确答案：<span class="correctDaAn"
                                                                                            style="color: red">{{ jx_crrect }}</span>
                                    </p>
                                    <p style="text-align: left;font-size: 14px;color: #666;">解析：</p>
                                    <p style="text-align: left;font-size: 14px;color: #666;"
                                       class="correctPar">{{ jx_dis }}</p>
                                </div>
                        </el-col>
                    </el-col>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "examination",
        data() {
            return {
                length: null,
                jx_crrect: '',
                jx_dis: '',
                jx_num: '',
                radio1: 1,
                navN: '',
                navcjl: '',
                research: [],
                title: '',
            }
        },
        created() {
            this.getPaperData()
            if (this.$route.query.myquestionID == "4") {
                this.navN = "已答试卷"
                this.navcjl = '我的题库'
            }
            if (this.$route.query.myquestionID == "5") {
                this.navN = "收藏试卷"
                this.navcjl = '我的题库'
            }
        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight
            let clientWidth = document.documentElement.clientWidth
            let DIV = document.querySelector('#examination')
            let DIV2 = document.querySelector('.DIV')
            let icon_BTN = document.querySelector('.icon_BTN')
            let DIV3 = document.querySelector('.correct')
            let back_BTN = document.querySelector('.back_BTN')
            DIV2.style.marginLeft = (clientWidth - 1200-15) / 2+ 125 + 'px'
            back_BTN.style.marginLeft = 961 + 'px'
            icon_BTN.style.marginLeft = (clientWidth - 1213) / 2 + 'px'
            DIV3.style.left = (clientWidth - 1200) / 2 + 960 + 'px'
            DIV.style.minHeight = (clientHeight - 50) + 'px'
            DIV2.style.minHeight = (clientHeight - 50) + 'px'
            DIV3.style.height = (clientHeight - 160) + 'px'

            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let scrollTopObj = document.querySelector('.correct')
                if (scrollTopObj !=null){
                    if (scrollTop >= 136) {
                        scrollTopObj.style.top = 0
                    } else {
                        scrollTopObj.style.top = 248 + 'px'

                    }
                }
            },
            backTo() {
                if (this.$route.query.myquestionID == 4) {
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '1'
                        }
                    })
                }
                if (this.$route.query.myquestionID == 5) {
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '2'
                        }
                    })
                }
                switch (this.$route.query.testPaperId) {
                    case '1':
                        this.$router.push({
                            path: '/courseAssessment',
                            query: {
                                searchId: '1'
                            }
                        })
                        break;
                    case '2':
                        this.$router.push({
                            path: '/courseAssessment',
                            query: {
                                searchId: '2'
                            }
                        })
                        break;
                    case '3':
                        this.$router.push({
                            path: '/courseAssessment',
                            query: {
                                searchId: '3'
                            }
                        })
                        break;
                }

            },
            // 初始请求
            getPaperData() {
                switch (this.$route.query.testPaperId) {
                    case '1':
                        this.navN = "课程考核";
                        break;
                    case '2':
                        this.navN = "实验考核";
                        break;
                    case '3':
                        this.navN = "综合考核";
                        break;
                }
                let id = '/' + this.$route.query.Id + '/' + this.$route.query.resultId
                // console.log(id)
                this.$store.dispatch('myQuestion/paperResultDetailAct', id).then(() => {
                    this.title = this.$store.state.myQuestion.paperResultDetail.title
                    this.research = this.$store.state.myQuestion.paperResultDetail;
                    this.length = this.research.topicList.length
                    for (let i = 0; i < this.research.topicList.length; i++) {
                        switch (this.research.topicList[i].userAnswer) {
                            case 'A':
                                this.$set(this.research.topicList[i], 'userAnswerNumber', 1)
                                break;
                            case 'B':
                                this.$set(this.research.topicList[i], 'userAnswerNumber', 2)
                                break;
                            case 'C':
                                this.$set(this.research.topicList[i], 'userAnswerNumber', 3)
                                break;
                            case 'D':
                                this.$set(this.research.topicList[i], 'userAnswerNumber', 4)
                                break;
                        }
                    }
                    // console.log(this.research)
                }).catch(() => {

                })
            },

            // 这里是如果是来自我的题库的话，所展示的面包屑导航事件
            cjlMyQuestion() {
                if (this.$route.query.myquestionID == 4) {
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '1'
                        }
                    })
                }
                if (this.$route.query.myquestionID == 5) {
                    this.$router.push({
                        path: '/myQuestionTwo',
                        query: {
                            searchId: '2'
                        }
                    })
                }

            },
            // 这里是点击获取解析事件
            CheckParsing(topicAnswer, topicAnalysis,index) {
                let theLeft = document.querySelector('.DIV')
                theLeft.style.transition = "1s"
                theLeft.style.transform = "translateX(-125px)"
                let Check = document.getElementsByClassName("correct")
                let timer;
                timer = setTimeout(function () {
                    Check[0].style.display = "block"
                    clearTimeout(timer)
                }, 900);
                this.jx_crrect = topicAnswer;
                this.jx_dis = topicAnalysis;
                this.jx_num = index+1;
            },
            // 这里是点击关闭事件
            CloseParsing() {
                let Check = document.getElementsByClassName("correct")
                Check[0].style.display = "none"
                let timer;
                let theLeft = document.querySelector('.DIV')
                timer = setTimeout(function () {
                    theLeft.style.transition = "1s"
                    theLeft.style.transform = "translateX(0%)"
                    clearTimeout(timer)
                }, 150);
            },
        },
    }
</script>

<style scoped>
    /*!*滚动条样式*!*/
    /*.List::-webkit-scrollbar {*/
    /*    !*滚动条整体样式*!*/
    /*    width: 0; !*高宽分别对应横竖滚动条的尺寸*!*/
    /*    height: 0;*/
    /*}*/
    /*.List::-webkit-scrollbar-thumb {*/
    /*    !*滚动条里面小方块样式*!*/
    /*    border-radius: 5px;*/
    /*    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    /*    background: #06c5d2;*/
    /*}*/
    /*.List::-webkit-scrollbar-track {*/
    /*    !*滚动条里面轨道样式*!*/
    /*    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    /*    border-radius: 0;*/
    /*    background: rgba(0, 0, 0, 0.1);*/
    /*}*/
    .shadow:hover{
        -webkit-box-shadow: #e8e8e8 0px 5px 6px;
        -moz-box-shadow: #E8E8E8 0px 5px 6px;
        box-shadow: #E8E8E8 0px 5px 6px;
    }
    .padding_in {
        padding: 21px 0 5px 0;
    }

    .cursor {
        cursor: pointer;
    }

    #examination {
        background: #FFFFFF;
        padding-bottom: 40px;
    }

    .RadioButtons {
        padding: 0 0 0 35px;
    }

    .RadioButtons li {
        padding: 10px;
        width: 100%;
        /*width: 600px;*/
        text-align: left;
    }

    .el-icon-close {
        color: red;
        opacity: 0;
    }

    .oula {
        opacity: 1;
        color: black;
    }

    .correct {
        border: 1px solid #ddd;
        background-color: white;
        display: none;
        position: fixed;
        z-index: 50;
        top: 248px;
        width: 240px;
        overflow-x: hidden;
    }
    .correct::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
    }

    a:link,
    a:visited,
    a:active,
    a:hover {
        text-decoration: none;
        color: #7E7E80;
    }
    .hoverColor:hover{
        color: #F39416!important;
    }

    .wrong {
        opacity: 1;
    }

    li >>> .el-radio__input.is-checked .el-radio__inner {
        background-color: #F39416;
        border-color: #F39416;
    }

    li >>> .el-radio__input.is-checked + .el-radio__label {
        color: #F39416;
    }

    li >>> .el-radio__inner:hover {
        border-color: #F39416;
    }
</style>