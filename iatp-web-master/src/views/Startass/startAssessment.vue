<template>
    <div id="DIV" style="background-color: #ffffff;position: relative">
        <div class="timer" style="width: 100%;position:fixed;top: 129px;right: 0;z-index: 5">
            <p style="font-size: 28px;font-weight: bolder;color: #e81005;margin: 0 349px 0 0;text-align: right;float: right" class="addTime"><span v-if="this.zeroShow">0</span>{{ time.minutes }}:<span v-if="this.oShow">0</span>{{ time.seconds }}</p>
            <p style="color: #888;font-size: 14px;margin: 0;width: 70px;float: right;line-height: 32px">剩余时间：</p>
        </div>
        <div class="" style="width: 1200px;margin: 0 auto">
            <el-row style="padding-top: 20px">
                        <el-col :span="6">
                            <div class="grid-content" v-if="navcjl" style="font-size: 15px;text-align: left">
                                <span @click="toHome" style="cursor: pointer;color: #666;font-size: 12px">首页</span>><span style="color: #F39416;font-size: 12px;cursor: pointer" @click="cjlMyQuestion()" v-if="navcjl">{{navcjl}} > </span><span style="color: #F39416;font-size: 12px" @click="cjlMyQuestion()">{{ nav }}</span>
                            </div>
                            <div class="grid-content" v-else style="font-size: 15px;text-align: left">
                                <span @click="toHome" style="cursor: pointer;color: #666;font-size: 12px">首页</span><span style="color: #666;font-size: 12px" > > 学习考核 > </span><span style="color: #F39416;font-size: 12px;cursor: pointer" @click="cjlMyQuestion()" v-if="navcjl">{{navcjl}} > </span><span style="color: #F39416;font-size: 12px" @click="cjlMyQuestion()">{{ nav }}</span>
                            </div>
                        </el-col>
                        <el-col :span="3" :offset="15">
                            <div class="grid-content" style="font-size: 15px;text-align: right">
                                <span style="cursor: pointer;color: #F39416;font-size: 12px" @click="backTo">返回 ></span>
                            </div>
                        </el-col>
                    </el-row>
            <el-row class="DIV" style="background-color: white;position: relative">
<!--                        <div class="timer" style="width: 185px;overflow: hidden;position:fixed;top: 129px;right: 349px;background-color: #ffb51d;">-->
<!--                            <p style="font-size: 28px;font-weight: bolder;color: #e81005;margin: 0;float: right;text-align: right"><span v-if="this.zeroShow">0</span>{{ time.minutes }}:<span v-if="this.oShow">0</span>{{ time.seconds }}</p>-->
<!--                            <p style="color: #888;font-size: 14px;margin: 6px 0 0 0;float: right">剩余时间：</p>-->
<!--                        </div>-->
                        <el-col :span="24">
                            <div class="grid-content" style="width: 950px;margin: 0 auto">
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <p style="font-size: 22px;font-weight: bolder;color: #333;margin-bottom: 8px">{{ testPaper.title }}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content" style="padding-left: 19px">
                                            <p style="font-size: 14px;margin: 0 0;color: #666">共{{ this.length }}小题，共{{ testPaper.score }}分。</p>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row class="min_height" style="margin-top: 20px">
                                    <el-col :span="24">
                                        <el-row v-for="(user,index) in testPaper.topicList" :key="index" style="border: 1px solid #ddd;padding-top: 18px;padding-bottom: 2px;margin-top: 15px" class="shadow">
                                             <el-col :span="24">
                                            <div class="grid-content">
                                            <el-row>
                                                <el-col :span="2" style="width: 84px">
                                                    <div class="grid-content">
                                                        <p style="font-size: 22px;margin: 0 0 0 0;padding-left: 12px"> <span style="padding-right: 10px">{{index + 1 }}.</span><span style="font-size: 10px;color: gray;margin-left: 0">({{user.score}}分)</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :span="22" style="width: 90%">
                                                    <div class="grid-content">
                                                        <p style="font-size: 14px;color: #333;text-align: left;margin: 5px 0 0 0">{{user.topicStem}}</p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="23" :offset="1" style="width: 94%">
                                                    <div class="grid-content radio_color" style="text-align: left">
                                                        <el-radio-group v-model="user.userAnswer" style="font-size: 14px;color: #666">
                                                            <p style="margin: 0 0 16px 0;"><el-radio :label="1" style="font-size: 14px;color: #666;width: 100%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;">A . {{user.optionA}}</el-radio></p>
                                                            <p style="margin: 16px 0"><el-radio :label="2" style="font-size: 14px;color: #666;width: 100%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;">B . {{user.optionB}}</el-radio></p>
                                                            <p style="margin: 16px 0"><el-radio :label="3" style="font-size: 14px;color: #666;width: 100%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;">C . {{user.optionC}}</el-radio></p>
                                                            <p style="margin: 16px 0"><el-radio :label="4" style="font-size: 14px;color: #666;width: 100%;line-height: normal;word-wrap: break-word;word-break: break-all;white-space: pre-wrap !important;">D . {{user.optionD}}</el-radio></p>
                                                        </el-radio-group>
                                                    </div>
                                                </el-col>
                                            </el-row>
<!--                                            <div style="border-bottom: 1px solid #ededed;width: 92%;margin-left: 4%;margin-top: 5px;margin-bottom: 8px"></div>-->
                                        </div>
                                    </el-col>
                                </el-row>
                                    </el-col>
                                </el-row>
                                <el-row style="padding-top: 1%">
                                    <el-col :span="24">
                                        <div class="grid-content" style="font-size: 15px;padding-top:18px;padding-bottom: 6px">
                                            <el-button v-if="this.disabled" type="warning" style="width: 160px;margin-bottom: 20px;background-color: #F39416;" @click="submitBTN" >提交试卷</el-button>
                                            <el-button v-else type="warning" style="width: 160px;margin-bottom: 20px;background-color: #F39416;" disabled>提交试卷</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
        </div>
        <!--      模态框      -->
<!--    成绩    -->
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="400px"
            center>
        <div style="text-align: center">
            <img src="@/assets/images/ScoreAvatar.jpg" alt="得分">
            <p style="color: #f29311;margin-top: 0px"><span style="font-size: 54px;">{{ this.score.score }}</span>分</p>
            <p style="margin-bottom: 0px">本次考试成绩</p>
        </div>
        <span slot="footer" class="dialog-footer"><el-button class="watchTest" @click="toWatch">查看试卷</el-button></span>
    </el-dialog>

        <!--       自动提交     -->
        <el-dialog
                :visible.sync="timeDialogVisible"
                width="400px"
                center>
            <div style="text-align: center">
                <img src="@/assets/images/time_03.jpg" alt="得分">
                <p style="color: #333;margin: 0px;font-size: 14px">本次考试时间已经结束</p>
            </div>
            <span slot="footer" class="dialog-footer"><el-button class="watchTest" @click="toWatch2">提交试卷（{{ this.submitSeconds }}s）</el-button></span>
        </el-dialog>

        <!--   未答题     -->
        <el-dialog title="提示" :visible.sync="questionDialogVisible" width="400px" style="text-align: left" class="dialogBorder">
           <p style="font-size: 16px;color: #333">当前试卷中还有没答的试题，确定要提交试卷吗？</p>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="questionDialogVisibleSure" style="width: 80px;height: 30px;background-color: #F39416;border-color: #f39416;font-size: 14px;padding: 0">确 定</el-button>
                <el-button @click="questionDialogVisible = false" style="width: 80px;height: 30px;font-size: 14px;color: #666;padding: 0">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "StartAssessment",
        components: {

        },
        data () {
            return {
                disabled: true,
                zeroShow: false,
                oShow: true,
                length: null,
                // 未选择
                noChoose:false,
                // 模态框
                centerDialogVisible: false,
                timeDialogVisible: false,
                questionDialogVisible: false,
                resource: '',
                // 导航
                nav: '',
                navcjl:'',
                // 试卷数据
                testPaper:{},
            //  提交试卷
                submitTestPaper: {
                    courseId:0,
                    endtime:0,
                    id:0,
                    list: [{
                        answer: '',
                        id:0,
                        score:0,
                        topicId:0,
                    }],
                    startTime:0,
                    type:0,
                },
            //    停止倒计时
                stopAdd: true,
            //  选项
                selection: {},
            //    分数
                score: {},
                //   倒计时
                time:{
                    minutes: 0,
                    seconds: 0
                },
                submitSeconds: 5,
                clientWidth: document.documentElement.clientWidth,
            };
        },
        created() {
            this.restartTest()
            this.myQuestion = this.$route.query.myQuestionId
            if (this.$route.query.myQuestionId=="4"){
                this.nav = "已答试卷";
                this.navcjl = '我的题库'
            }
            if (this.$route.query.myQuestionId=="5"){
                this.nav = "收藏试卷";
                this.navcjl = '我的题库'
            }
        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight
            // let clientWidth = document.documentElement.clientWidth
            let DIV = document.querySelector('#DIV')
            let DIV2 = document.querySelector('.DIV')
            // let timer = document.querySelector('.timer')
            // let min_height = document.querySelector('.min_height')
            // timer.style.left = (clientWidth - 1200)/2 +1153+ 'px'
            DIV.style.minHeight = (clientHeight - 120) + 'px'
            DIV2.style.minHeight = (clientHeight - 180) + 'px'
            // timer.style.width = clientWidth + 'px'
            switch (this.$route.query.testId) {
                case '1':
                    this.nav = "课程考核";
                    break;
                case '2':
                    this.nav = "实验考核";
                    break;
                case '3':
                    this.nav = "综合考核";
                    break;
            }
            this.submitTestPaper.startTime = (new Date()).getTime()
            this.add()
            this.addTime()
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let scrollTopObj = document.querySelector('.timer')
                // console.log(scrollTop)
                if (scrollTopObj !=null) {
                    if (scrollTop >= 86) {
                        scrollTopObj.style.top = 0
                        scrollTopObj.style.backgroundColor = 'white'
                    } else {
                        scrollTopObj.style.top = 130 + 'px'
                        scrollTopObj.style.backgroundColor = 'rgba(255,255,255,0)'
                    }
                }
            },
            // 倒计时
            add: function() {
                let _this =this
                let time = window.setInterval(function() {
                    if(_this.stopAdd){
                        if (_this.time.seconds === 0 && _this.time.minutes !== 0) {
                            _this.time.seconds = 59;
                            _this.time.minutes -= 1;
                        } else if (_this.time.minutes === 0 && _this.time.seconds === 0) {
                            _this.time.seconds = 0;
                            _this.time.minutes = 0;
                            _this.timeDialogVisible = true
                            _this.timeReduce()
                            window.clearInterval(time);
                        } else {
                            _this.time.seconds -= 1;
                        }
                        if (_this.time.seconds<=9){
                            _this.oShow =true
                        } else{
                            _this.oShow =false
                        }
                        if (_this.time.minutes<=9){
                            _this.zeroShow =true
                        } else{
                            _this.zeroShow =false
                        }
                    }else{
                        window.clearInterval(time);
                    }
                }, 1000);
            },
            // 模态框倒计时
            timeReduce: function(){
                let _this =this
                _this.submitSeconds = 5
                let timeReduce = window.setInterval(function() {
                    if (_this.submitSeconds>0){
                        _this.submitSeconds -= 1;
                    }else{
                        _this.submitSeconds = 0
                        _this.toWatch2()
                        window.clearInterval(timeReduce);
                    }
                }, 1000);
            },
            // 初始请求试卷
            restartTest() {
                let id =this.$route.query.testPaperId
                this.$store.dispatch("testPaper/startTestAct", id).then(() => {
                    this.testPaper = this.$store.state.testPaper.startTestList
                    // console.log(this.testPaper)
                    this.length = this.testPaper.topicList.length
                    let time = parseInt(this.$store.state.testPaper.startTestList.paperDuration)
                    if(time<=9){
                        this.zeroShow =true
                        this.time.minutes = time
                    }else{
                        this.zeroShow =false
                        this.time.minutes = time
                    }
                    // console.log(this.testPaper)
                }).catch(() => {

                })
            },
            // 跳转首页
            toHome() {
                this.$router.push({
                    path:'/'
                })
            },

            cjlMyQuestion(){
                if (this.$route.query.myQuestionId==4){
                    this.$router.push({
                        path:'/myQuestionTwo',
                        query:{
                            searchId:'1'
                        }
                    })
                }
                if (this.$route.query.myQuestionId==5){
                    this.$router.push({
                        path:'/myQuestionTwo',
                        query:{
                            searchId:'2'
                        }
                    })
                }
            },
        // 返回考核
            backTo() {
                switch (this.$route.query.testId) {
                    case '1':
                        this.$router.push({
                            path:'/courseAssessment',
                            query:{
                                searchId:'1'
                            }
                        })
                        break;
                    case '2':
                        this.$router.push({
                            path:'/courseAssessment',
                            query:{
                                searchId:'2'
                            }
                        })
                        break;
                    case '3':
                        this.$router.push({
                            path:'/courseAssessment',
                            query:{
                                searchId:'3'
                            }
                        })
                        break;
                }
                if (this.$route.query.myQuestionId==4){
                    this.$router.push({
                        path:'/myQuestionTwo',
                        query:{
                            searchId:'1'
                        }
                    })
                }
                if (this.$route.query.myQuestionId==5){
                    this.$router.push({
                        path:'/myQuestionTwo',
                        query:{
                            searchId:'2'
                        }
                    })
                }
            },
            submitB() {
                this.noChoose = false
                this.submitTestPaper.courseId = this.testPaper.courseId
                this.submitTestPaper.id = this.testPaper.id
                this.submitTestPaper.type = this.testPaper.type
                let OBJ = []
                OBJ=JSON.parse(JSON.stringify(this.testPaper.topicList).replace(/userAnswer/g,"answer"))
                for (let i=0;i<OBJ.length;i++){
                    delete OBJ[i].isCorrect
                    delete OBJ[i].optionA
                    delete OBJ[i].optionB
                    delete OBJ[i].optionC
                    delete OBJ[i].optionD
                    delete OBJ[i].topicAnalysis
                    delete OBJ[i].topicAnswer
                    delete OBJ[i].topicStem
                    switch (OBJ[i].answer) {
                        case 1:
                            OBJ[i].answer = "A";
                            break;
                        case 2:
                            OBJ[i].answer = "B";
                            break;
                        case 3:
                            OBJ[i].answer = "C";
                            break;
                        case 4:
                            OBJ[i].answer = "D";
                            break;
                        default:
                            this.noChoose = true
                            break;
                    }
                }
                this.submitTestPaper.list = OBJ
                // console.log(OBJ)
                this.submitTestPaper.endtime = (new Date()).getTime()
                // console.log(OBJ)
                    this.$store.dispatch("testPaper/submitPaperAct", this.submitTestPaper).then(() => {
                        this.score = this.$store.state.testPaper.testScore
                        // console.log(this.score)
                        this.centerDialogVisible = true
                        this.disabled = false
                    }).catch(() => {

                    })
            },
            // 提交试卷
            submitBTN() {
                this.stopAdd=false
                this.noChoose = false
                this.submitTestPaper.courseId = this.testPaper.courseId
                this.submitTestPaper.id = this.testPaper.id
                this.submitTestPaper.type = this.testPaper.type
                let OBJ = []
                OBJ=JSON.parse(JSON.stringify(this.testPaper.topicList).replace(/userAnswer/g,"answer"))
                for (let i=0;i<OBJ.length;i++){
                    delete OBJ[i].isCorrect
                    delete OBJ[i].optionA
                    delete OBJ[i].optionB
                    delete OBJ[i].optionC
                    delete OBJ[i].optionD
                    delete OBJ[i].topicAnalysis
                    delete OBJ[i].topicAnswer
                    delete OBJ[i].topicStem
                    switch (OBJ[i].answer) {
                        case 1:
                            OBJ[i].answer = "A";
                            break;
                        case 2:
                            OBJ[i].answer = "B";
                            break;
                        case 3:
                            OBJ[i].answer = "C";
                            break;
                        case 4:
                            OBJ[i].answer = "D";
                            break;
                        default:
                            this.noChoose = true
                            break;
                    }
                }
                this.submitTestPaper.list = OBJ
                // console.log(OBJ)
                this.submitTestPaper.endtime = (new Date()).getTime()
                // console.log(OBJ)
                if (this.noChoose){
                    this.questionDialogVisible = true
                }else{
                    this.$store.dispatch("testPaper/submitPaperAct", this.submitTestPaper).then(() => {
                        this.score = this.$store.state.testPaper.testScore
                        // console.log(this.score)
                        this.centerDialogVisible = true
                        this.disabled = false
                    }).catch(() => {

                    })
                }
            },
            // 未答题-提交
            questionDialogVisibleSure: function(){
                this.questionDialogVisible = false
                this.$store.dispatch("testPaper/submitPaperAct", this.submitTestPaper).then(() => {
                    this.score = this.$store.state.testPaper.testScore
                    // console.log(this.score)
                    this.centerDialogVisible = true
                    this.disabled = false
                }).catch(() => {

                })
            },
            // 查看试卷
            toWatch: function () {
                this.centerDialogVisible = false
                this.$router.push({
                    path:'/checkAssessment',
                    query:{
                        Id: this.score.id,
                        resultId: this.score.resultId,
                        testPaperId: this.$route.query.testId,
                        myquestionID:this.myQuestion
                    }
                })
            },
            toWatch2: function () {
                this.timeDialogVisible = false
                this.submitB()
            },
            // open() {
            //     this.$alert('<div style="text-align: center">\n' +
            //         '                <img src="@/assets/images/score.jpg" alt="得分">\n' +
            //         '                <p style="color: #f29311;margin-top: 0px"><span style="font-size: 54px;">{{ this.score.score }}</span>分</p>\n' +
            //         '                <p style="margin-bottom: 0px">本次考试成绩</p>\n' +
            //         '            </div>\n' +
            //         '            <span slot="footer" class="dialog-footer">\n' +
            //         '    <el-button class="watchTest" @click="toWatch">查看试卷</el-button>\n' +
            //         '  </span>', '', {
            //         dangerouslyUseHTMLString: true
            //     });
            // },
        //   倒计时位置
           addTime(){
                // let _this = this
               // let timePosition = window.setInterval(function() {
               //
               // },500)
               // console.log(this.clientWidth)
               if(this.clientWidth < 1800){
                   let addTime = document.querySelector('.addTime')
                   addTime.style.marginRight=70+"px"
               }
           }
        },
    }
</script>

<style scoped>
    .el-dialog__body{
        padding: 25px 25px 5px!important;
    }
    .watchTest{
        font-size: 16px;
        background-color: #f39416;
        color: white;
        /*width: 50%;*/
        width: 190px;
        height: 38px;
        border-radius: 4px;
        border: #f39416;
    }
    .watchTest:hover{
        background-color: #ffb351;
        color: white;
        border: #ffb351;
    }
    p >>> .el-radio__input.is-checked .el-radio__inner{
        background-color: #F39416;
        border-color: #F39416;
    }
    p >>> .el-radio__input.is-checked+.el-radio__label{
        color: #F39416;
    }
    p >>> .el-radio__inner:hover{
        border-color: #F39416;
    }
    .dialogBorder >>> .el-dialog__header{
        border-bottom: 1px solid #F39416;
    }
    .dialogBorder >>> .el-dialog__title{
        font-size: 16px!important;
        color: #666!important;
    }
    .dialogBorder >>> .el-dialog__footer{
        border-top: 1px solid #efefef;
    }
    .shadow:hover{
        -webkit-box-shadow: #e8e8e8 0px 5px 6px;
        -moz-box-shadow: #E8E8E8 0px 5px 6px;
        box-shadow: #E8E8E8 0px 5px 6px;
    }
</style>
