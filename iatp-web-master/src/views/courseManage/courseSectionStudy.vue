<template>
    <div style="background-color: rgba(27, 31, 34, 1.0)" :style="alltHeight" class="outermost">
        <el-row>
            <el-col :span="20" :style="contentWidth">
                <div class="stydyContent" :style="blackHeight"  style="background: #000;margin:10px 0px 0px 15px;border-radius:10px;padding-right:67px">
                    <div style="margin-left:35px;width:100%;">
                        <img @click="gobackCourse" style="position:absolute;left:50px;padding-top:9px;cursor:pointer;width:23px;height:16px" title="返回上级目录" src="@/assets/images/back.png">
                        <div style="margin-left:40px;width:75%;position:absolute;text-align:left;top:7px;">
                            <p style="float:right;display: inline-block;width:49%;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;color:#fff;font-size:12px;margin-right:17px">{{courseTitle}}</p>
                            <p style="display: inline-block;width:49%;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;color:#fff;font-size:12px">{{courses.courseName}}</p>
                        </div>
                    </div>
                   
                    <GeminiScrollbar v-show="haveChild == true" :autoshow="true" :forceGemini="true" class="list menuScrollbar" :style="concentHeight"  style="background:#fff;position:relative;top:35px;left:35px;">
                        <!-- 视频 -->
                        <div v-show="showTypeModules == 1">
                            <div id="mse" style=""></div>
                        </div>

                        <!--  pdf ppt -->
                        <div v-show="showTypeModules == 2 || showTypeModules == 3" >
                            <img  v-if="showLoadPic == true" src="@/assets/loading.gif"  style="width: 100%;height: 100%;margin-top:10%">
                            <swiper v-else :options="swiperOption" ref="fileSwiper" @slideNextTransitionEnd="swiperCallback" :style="concentHeight">
                                <swiper-slide v-for="(url,index) in onlinePreviewUrl.imgUrls" :key="index">
                                    <div class="swiper-zoom-container">
                                        <!-- <img :data-src="previewUrl+url" class="imgW swiper-lazy"> -->
                                        <!-- <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> -->
                                        <img v-lazy="previewUrl+url" class="imgW" style="" title="支持双击进行放大拖拽">
                                    </div> 
                                </swiper-slide>
                                <div slot="pagination" class="swiper-pagination" style="color:#F39416"></div>   
                            </swiper>
                        </div> 

                        <!-- 答题 -->
                        <div v-show="showTypeModules == 4">
                            <div v-if="!showErrorPic">
                                <p style="font-size:16px;font-weight:700">{{inClassTest.title?inClassTest.title:'默认试卷名'}}</p>
                                <p style="font-size:15px;font-weight:600;float:left;margin:-5px 0 10px 20px">{{'单选题共'}}{{inClassTest.topicList?inClassTest.topicList.length:"0"}}{{'小题，时间'}}{{inClassTest.paperDuration?inClassTest.paperDuration:''}}{{'分钟，总分'}}{{inClassTest.score?inClassTest.score:''}}{{'分。'}}</p>
                                <div style="min-height: 66vh;">
                                    <div style="clear:both;margin:10px 20px;text-align:left;" v-for="(item,index) in inClassTest.topicList" :key="index">
                                    <span style="font-weight:500;font-size:15px">{{index+1}}{{'、'}}</span>
                                    <span style="font-size:13px;margin-right:3px;color:#999">{{'('+item.score+'分)'}}</span>
                                    <span style="font-weight:500;font-size:15px">{{item.topicStem}}</span>
                                
                                    <div>
                                        <el-radio-group v-model="checkedAnswer[index]" class="testGroup"  style="margin:15px 0px 0px 50px"> 
                                                <el-radio :label="JSON.stringify(item)+'A'" key="1" style="display: flex;margin-top:3px">
                                                    <p style="margin-top:0px;font-size:14px">{{'A、'+item.optionA}}</p>
                                                </el-radio>
                                                <el-radio :label="JSON.stringify(item)+'B'"  key="2" style="display: flex;margin-top:3px">
                                                    <p style="margin-top:0px;font-size:14px">{{'B、'+item.optionB}}</p>
                                                </el-radio>
                                                <el-radio :label="JSON.stringify(item)+'C'" key="3" style="display: flex;margin-top:3px">
                                                    <p style="margin-top:0px;font-size:14px">{{'C、'+item.optionC}}</p>
                                                </el-radio>
                                                <el-radio :label="JSON.stringify(item)+'D'" key="4" style="display: flex;margin-top:3px">
                                                    <p style="margin-top:0px;font-size:14px">{{'D、'+item.optionD}}</p>
                                                </el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <el-button size="small" @click="comitPaper" style="margin-bottom:25px;color:#fff;background:#F39416;border:none;width:160px">提交试卷</el-button>
                            </div>
                            <div v-else>
                                <img src="@/assets/fileError2.png" alt="" style="margin-top:25%">
                            </div>
                        </div>
                        <!-- 查看试卷 -->
                         <div v-show="showTypeModules == 5">
                            <p style="font-size:16px;font-weight:700">{{paperResultDetail.title?paperResultDetail.title:'默认试卷名'}}</p>
                            <p style="font-size:14px">本次测试成绩：<span style="font-size:17px;color:#F39416">{{paperResultDetail.userScore?paperResultDetail.userScore:0}}</span><span style="color:#F39416"> 分</span></p>
                            <p style="font-size:15px;font-weight:600;float:left;margin:-5px 0 10px 40px">{{'单选题共'}}{{paperResultDetail.topicList?paperResultDetail.topicList.length:"0"}}{{'小题，时间'}}{{paperResultDetail.paperDuration?paperResultDetail.paperDuration:''}}{{'分钟，总分'}}{{paperResultDetail.score?paperResultDetail.score:''}}{{'分。'}}</p>
                            <div style="min-height: 66vh;">
                                <div style="clear:both;margin:10px 20px;text-align:left;" v-for="(item,index) in paperResultDetail.topicList" :key="index">
                                    <i class="el-icon-close" style="color:#DD2F2F;font-size:14px;font-weight:900;margin-right:5px" v-if="item.isCorrect == 2"></i>
                                    <span v-else style="margin-right:20px"></span>
                                    <span style="font-weight:500;font-size:15px">{{index+1}}{{'、'}}</span>
                                    <span style="font-size:13px;margin-right:3px;color:#999">{{'('+item.score+'分)'}}</span>
                                    <span style="font-weight:500;font-size:15px">{{item.topicStem}}</span>
                                
                                    <div>
                                        <el-radio-group v-model="resultAnswer[index]"  class="testCheckedGroup"  style="margin:15px 0px 0px 50px"> 
                                            <el-radio disabled label="A" style="display: flex;margin-top:3px">
                                                <p style="margin-top:0px;font-size:14px">{{'A、'+item.optionA}}</p>
                                            </el-radio>
                                            <el-radio disabled  label="B" style="display: flex;margin-top:3px">
                                                <p style="margin-top:0px;font-size:14px">{{'B、'+item.optionB}}</p>
                                            </el-radio>
                                            <el-radio disabled  label="C" style="display: flex;margin-top:3px">
                                                <p style="margin-top:0px;font-size:14px">{{'C、'+item.optionC}}</p>
                                            </el-radio>
                                            <el-radio disabled  label="D" style="display: flex;margin-top:3px">
                                                <p style="margin-top:0px;font-size:14px">{{'D、'+item.optionD}}</p>
                                            </el-radio>
                                        </el-radio-group>
                                    </div>
                                    <div>
                                        <el-collapse style="" class="checkedCollapse">
                                            <el-collapse-item style="">
                                                <template slot="title">
                                                    <span style="position:absolute;right:70px">查看解析</span>
                                                </template>
                                                <div style="">
                                                    <span style="font-size:14px;font-weight:600">正确答案：<span style="font-size:15px;color:#F39416;">{{item.topicAnswer}}</span></span>
                                                    <p style="">{{item.topicAnalysis}}</p>
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GeminiScrollbar> 
                    <div v-show="haveChild == false"  :style="concentHeight"  style="background:#fff;position:relative;top:35px;left:35px;">
                         <img src="@/assets/fileError2.png" alt="" style="margin-top:25%">
                         <p style="font-size:14px;color:#999;margin-top:-5px">此章节下暂无学习资源哦...</p>
                    </div>
                <!-- <span @click="handleFullScreen" class="fullscreen" style="padding-top:45px;margin-right:-35px;float:right;color:#999;font-size:12px;cursor:pointer">全屏</span> -->
                </div>
            </el-col>
            <el-col :span="3" style=" width: 15%;right:23px" v-if="switchMenu1 == false">
                <div class="rightMenu" :style="menuheight"><!-- 文件类型：1：视频，2：ppt，3：pdf，4:随堂测 -->
                    <GeminiScrollbar class="menuScrollbar" :autoshow="true" :forceGemini="true" :style="menuContentheight"> 
                        <el-collapse accordion v-model="currIndex" style="margin-left:10px;" class="_collapse">
                            <el-collapse-item v-for=" (item,index) in courseResourceList.resourceList" :key="index" style="" :name="item.id">
                                <template slot="title">
                                    <div style="width: 100%;text-align: left;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;" @click="tcurrName(item.child,item)">
                                        <div v-if="currActivePoint == item.id" style="border:2px solid #F39416;border-radius:50%;display:inline-block;margin:0px 5px 2px 1px;"></div>
                                        <span v-if="currActivePoint == item.id" style="font-weight:600;margin-left:0px" :title="item.name">{{item.name}}</span>
                                        <span v-else style="font-weight:600;margin-left:10px" :title="item.name">{{item.name}}</span>
                                    </div>
                                </template>
                                <div v-for=" (data,_index) in item.child" :key="_index" class="curritem" :class="currActive == data.id? 'stydyActive':''" @click="getResourceData(data,_index)" style="width:99%;text-align: left;cursor:pointer;;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">
                                    <i v-if="data.resourceType ==1" class="el-icon-video-play" style="margin:0px 10px 10px 13px"></i>
                                    <i v-if="data.resourceType ==2" class="el-icon-notebook-2" style="margin:0px 10px 10px 13px"></i>
                                    <i v-if="data.resourceType ==3" class="el-icon-document" style="margin:0px 10px 10px 13px"></i>
                                    <i v-if="data.resourceType ==4" class="el-icon-edit-outline" style="margin:0px 10px 10px 13px"></i>
                                    <span v-if="data.resourceType ==4" style="font-size:14px;" class="menuName">随堂测</span>
                                    <span v-if="data.resourceType ==4 && data.resultId !== null" @click.stop="achievements(data,'查看随堂测成绩')" style="cursor:pointer;position: relative;left: 25px;color:#666;font-size:12px">查看成绩</span>
                                    <span v-if="data.resourceType !== 4" style="font-size:14px" class="menuName">{{data.name}}</span>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </GeminiScrollbar> 
                    <el-button v-if="courseResourceList.unitTest && courseResourceList.unitTest[0] && isClicked"  size="small" style="margin-top:20px;color:#fff;background:#F39416;border:none;">单元测试</el-button>
                    <el-button v-if="courseResourceList.unitTest && courseResourceList.unitTest[0] && !isClicked" size="small" @click="getUnitTestData" style="margin-top:20px;color:#fff;background:#F39416;border:none;">单元测试</el-button>
                    <el-button size="small" v-if="unitResultId" @click="achievements" style="color:#666;background:#242527;border-color:#464647;" >查看成绩</el-button>
                </div>  
            </el-col>
             <el-col :span="1" :style="switchheight" style="position:fixed;right:0px;background:rgba(27, 31, 34, 1.0);width:20px;float:right">
                <div>
                    <i  class="el-icon-right" @click="switchMenu" v-if="switchMenu1 == false" style="top:50%;color:#fff;position: absolute;right: 5px;cursor:pointer"></i>
                    <i  class="el-icon-back" @click="switchMenu" v-if="switchMenu1 == true" style="top:50%;color:#fff;position: absolute;right: 5px;cursor:pointer"></i>
                </div>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="showTip" title="友情提示" width="30%" center  :close-on-click-modal="false">
            <span>试题还未答完，确定要交卷么</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showTip = false">取消</el-button>
                <el-button type="primary" @click="submitTest">确 定</el-button>
            </span>
        </el-dialog>
    </div>
   
</template>

<script>
   import { constants } from '@/util/common'
   import { getValue,setValue } from "@/util/localStorage";
   import Player from 'xgplayer';
import { setTimeout } from 'timers';

    export default {
        name: "courseSectionStudy",
        data() {
            return {
                alltHeight:'min-height:'+window.innerHeight+'px',
                blackHeight:'min-height:'+(window.innerHeight-25)+'px',
                concentHeight:'height:'+(window.innerHeight-95)+'px',
                menuheight:'height:'+window.innerHeight+'px',
                menuContentheight:'height:'+(window.innerHeight-75)+'px',
                switchheight:'height:'+window.innerHeight+'px',
                data:{},
                courses:{},
                switchMenu1:false,
                courseResourceList:[],
                isClicked:false,
                isClickedQuiz:false,
                contentWidth:"",
                showTypeModules:"",//区分资源类型
                inClassTest:{},//随堂测/单元测试试题
                courseTitle:'',//标题
                checkedAnswer:[],//选中的答案
                resultAnswer:[],//查看试卷回显选过的答案
                startTimestamp:"",//考试开始时间
                msg:{}, 
                showErrorPic:false,
                numQuiz:"",
                paperResultDetail:{},//查看试卷
                showTip:false,
               // intervalTime:0,
                intervalQuizTime:0,
              //  num:'',
                coerce:false,//到时间强制交卷
                isSubmit:false,//随堂测是否答题
                fullscreen: false,
                haveChild:true,
                unitResultId:null,
                classTestData:{},
                previewUrl:'',
                player:null,
                showLoadPic:true,
                currId:'',
                currActive:"",
                currActivePoint:"",
                onlinePreviewUrl:{},
                valData:{},//视频打点参数
                valFileData:{},//文件打点参数
                currIndex:this.$route.query.index,
                swiperOption: {
                    //lazy: true,
                     zoom: true,
                    direction:'vertical',
                    notNextTick: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    autoHeight: true,
                    slidesPerView: 1,
                    mousewheel: true,
                    mousewheelControl: true,
                   // height: window.innerHeight, 
                    resistanceRatio: 0,
                    observeParents: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                },

            };
        },
        // created() {
        //     let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        //     isFullscreen = !!isFullscreen;
        //     this.fullscreen = isFullscreen;
        //     document.addEventListener('fullscreenchange', () => {
        //         this.fullscreen = !this.fullscreen
        //     });
        //     document.addEventListener('mozfullscreenchange', () => {
        //         this.fullscreen = !this.fullscreen
        //     });
        //     document.addEventListener('webkitfullscreenchange', () => {
        //         this.fullscreen = !this.fullscreen
        //     });
        //     document.addEventListener('msfullscreenchange', () => {
        //         this.fullscreen = !this.fullscreen
        //     });
        // },
        mounted(){
            this.previewUrl = constants.downloadUrl
            this.data = getValue('SECTIONRESOURCE')
            this.courses = getValue('COURSEDATA')
            this.getCouResourceAct(this.data)
            //console.log(this.courses,this.data)
        },
        destroyed() {
            window.onbeforeunload = null
        },
        //  beforeRouteLeave: function(to, from , next){
        //     if(this.courseTitle == "单元测试" || this.courseTitle == "随堂测" ){
        //         if(this.isSubmit == false){
        //             next(false)
        //             this.$confirm('您还未交卷，确定需要退出吗?', '提示', {
        //                 confirmButtonText: '确定',
        //                 cancelButtonText: '取消',
        //                  showClose:false,
        //                  closeOnClickModal:false,
        //                 type: 'warning'
        //             }).then(() => {
        //                 next()
        //             })
        //         }else{
        //             next()
        //         }
        //     }else(next())
        // },
        methods: {
             gobackCourse(){
                //window.clearInterval(this.num); 
               // this.intervalTime = 0 
                this.intervalQuizTime = 0
                window.clearInterval(this.numQuiz); 
                this.$router.back()
            },
            //文件&视频打点
            mycallback(data){
                    this.$store.dispatch('courseSectionStudy/studyRecordAct',data)
                    .then((response) => {
                        console.log('文件打点：',response.message,'已看：',this.valFileData.schedule,'进度type:',this.valFileData.type)
                    }).catch((error) => {
                        console.log(error)
                    })
            },
             //文件轮播打点
            swiperCallback(totalNum){
                let temp = 0;
                var activeIndex = this.$refs.fileSwiper.swiper.activeIndex+1 //当前页数
                var totalIndex = this.$refs.fileSwiper.swiper.slidesGrid.length //总页数
                //console.log('当前页:',activeIndex,this.$refs.fileSwiper.swiper,'总页数：',totalIndex)
                //console.log(totalNum,'====')
                if(totalNum && totalNum == 1){
                    this.valFileData.schedule =1
                    this.valFileData.type = 2
                    this.mycallback(this.valFileData)
                }
                if(!totalNum && totalIndex >= 2){ 
                   if(totalIndex/5 >= 1){
                       if(activeIndex == 2){
                            if(temp !== activeIndex) {
                                temp = activeIndex
                                this.valFileData.schedule = temp
                                this.valFileData.type = 1
                            }
                           this.mycallback(this.valFileData)
                        }
                        if(activeIndex%5 === 0 && totalIndex != activeIndex){
                            if(temp !== activeIndex) {
                                temp = activeIndex
                                this.valFileData.schedule = temp
                                this.valFileData.type = 1
                            }
                            this.mycallback(this.valFileData)
                        }
                        if(totalIndex == activeIndex){
                            if(temp !== activeIndex) {
                                temp = activeIndex
                                this.valFileData.schedule = temp
                            }
                            this.valFileData.type = 2
                            this.mycallback(this.valFileData)
                        }
                    }else{
                        if(temp !== activeIndex) {
                            temp = activeIndex
                            this.valFileData.schedule = temp
                        }
                        if(totalIndex == 2){
                            this.valFileData.type = 2
                            this.mycallback(this.valFileData)
                        }else if(totalIndex == 3 || totalIndex == 4){
                            if(activeIndex == 2){
                                this.valFileData.type = 1
                                this.mycallback(this.valFileData)
                            }
                            if(totalIndex == activeIndex){
                                this.valFileData.type = 2
                                this.mycallback(this.valFileData)
                            }
                        }
                    }
                }
                
            },
            //视频
            initPlayer(id){
                if(this.player) {
                    const url = this.player.src;
                    if(!url.includes(id)) {
                       // this.player.start(constants.downloadUrl+id)
                        this.player.src = constants.videoUrl+id
                        this.player.reload()
                    }
                    return
                }
                this.player = new Player({
                    id:'mse',
                    lang: 'zh-cn',
                    autoplay: false,
                    //autoplayMuted: true,//自动播放时使用
                    fluid: true,
                    volume: 0.6,
                    keyShortcut: 'on',//键盘快捷键:按 → 键快进10秒， 按 ← 键后退10秒，按 ↑ 键调高音量，按 ↓ 键调低音量，按 space 键切换播放/暂停状态
                    url:constants.videoUrl+id,
                    poster: require("@/assets/images/study.jpg"),
                    videoInit: true,//初始化显示视频首帧(不设置封面)
                    playbackRate: [0.5, 0.75, 1, 1.5, 2],
                    defaultPlaybackRate: 1,
                    definitionActive: 'click',
                    height: window.innerHeight,
                    width: window.innerWidth,
                    whitelist: ['']
                });
                var that = this
                let temp = 0;
                this.player.on("play",function(p){
                    var currTime = parseInt(p.currentTime) //当前时间
                    var totalTime = parseInt(that.player.duration) //总时长
                    if(currTime == 0){
                        that.valData.schedule = 1
                        that.valData.type = 1
                        that.$store.dispatch('courseSectionStudy/studyRecordAct',that.valData)
                        .then((response) => {
                            console.log(response.message)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })
                this.player.on("ended",function(p){
                    var currTime = parseInt(p.currentTime) //当前时间
                    var totalTime = parseInt(that.player.duration) //总时长
                    that.valData.schedule = currTime
                    that.valData.type = 2
                    that.$store.dispatch('courseSectionStudy/studyRecordAct',that.valData)
                    .then((response) => {
                        console.log(response.message)
                    }).catch((error) => {
                        console.log(error)
                    })
                })

                this.player.on("timeupdate",function(p){
                    var currTime = parseInt(p.currentTime) //当前时间
                    var totalTime = parseInt(that.player.duration) //总时长
                    if((currTime%5) === 0){
                        if(temp !== currTime) {
                            temp = currTime
                            that.valData.schedule = temp
                            if(totalTime - temp < 5){//播放结束
                                that.valData.type = 2
                            }else{
                                that.valData.type = 1
                            }
                           // console.log(currTime,totalTime,'-----',that.valData.schedule,that.valData.type)
                            that.$store.dispatch('courseSectionStudy/studyRecordAct',that.valData)
                            .then((response) => {
                                console.log(response.message)
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }
                })
            },
            //获取资源菜单
            getCouResourceAct(data){
                var val = {
                    'chapterPid':data.pid,
                    'courseId':this.courses.id
                }
                this.$store.dispatch('courseSectionStudy/getCourseResourceListAct',val).then(() => {
                    this.courseResourceList = this.$store.state.courseSectionStudy.courseCourseList;
                    console.log(this.courseResourceList.resourceList,'--课程章节资源--');
                    if(this.courseResourceList.unitTest[0]){
                        this.unitResultId = this.courseResourceList.unitTest[0].resultId
                    }
                    var obj2 = {}
                    this.courseResourceList.resourceList.map((item,_index)=>{
                        if(this.currIndex == item.id){
                            if(item.child){
                                this.haveChild = true
                            }else{
                                this.haveChild = false
                            }
                            if(!this.isSubmit && this.showTypeModules !== 4){
                                this.currActivePoint = item.id
                                this.getResourceData(item.child[0],0)
                            }
                        }
                    })
                    if(this.courseTitle == '单元测试'){
                        this.achievements('','')
                    }
                    if(this.courseTitle == '随堂测'){  
                        this.courseResourceList.resourceList.map((item,_index)=>{
                            item.child.map((data,index)=>{
                                console.log('@@',this.currId , data.id)
                                if(this.currId == data.id){
                                    obj2 = {
                                        'id':data.id,
                                        'resultId':data.resultId
                                    }
                                    this.achievements(obj2,'查看随堂测成绩')
                                }
                            })                          
                        })
                    }
                }).catch(() => {

                })
            },
            //右侧菜单开关
            switchMenu(){
                this.switchMenu1 = !this.switchMenu1
                if(this.switchMenu1){
                    this.contentWidth = 'width:98.5%'
                }else{
                    this.contentWidth = ''
                }
            },
            //单元测试
            getUnitTestData(){
                if (this.player !== null) {
                   this.player.pause();
                }
                this.isClicked = true
                this.isClickedQuiz = false
                document.getElementsByClassName('list')[0].style.background = '#fff'
                this.isSubmit = false
               // window.clearInterval(this.num); 
                //this.intervalTime = 0 
                this.intervalQuizTime = 0
                window.clearInterval(this.numQuiz); 
                this.showTypeModules = 4
                this.courseTitle = "单元测试"
                this.checkedAnswer = []
                this.startTimestamp = new Date().getTime()
                var id = this.courseResourceList.unitTest[0].id
                this.$store.dispatch('courseSectionStudy/getInClassTestAct',id).then(() => {
                this.showErrorPic = false
                this.inClassTest = this.$store.state.courseSectionStudy.InClassTestList;
                    var time = parseInt(this.inClassTest.paperDuration)*60
                    this.numQuiz = setInterval(()=>{
                        this.intervalQuizTime++ 
                       // console.log(this.intervalQuizTime,'##')
                        if(this.intervalQuizTime == time){
                            window.clearInterval(this.numQuiz); 
                            this.intervalQuizTime = 0
                            this.coerce = true
                            this.$message({
                                message: '答题时间到，即将自动交卷！',
                                type: 'success',
                                duration: 2 * 1000,
                                showClose: true,
                            });
                                this.submitTest()
                                this.coerce = false
                        }
                    },1000)
                }).catch((error) => {
                    if(error){
                         this.showErrorPic = true
                    }
                })
            },
            //查看成绩
            achievements(item,text){
                 this.isClicked = false
                 this.isClickedQuiz = false
                 document.getElementsByClassName('list')[0].style.background = '#fff'
                console.log(item.id,text)
                if (item.resourceType !== 1 && this.player !== null) {
                   this.player.pause()
                }
                this.currActive = item.id
                this.showTypeModules = 5
                this.intervalQuizTime = 0
                window.clearInterval(this.numQuiz); 
               // window.clearInterval(this.num); 
               // this.intervalTime = 0 
                this.resultAnswer = []
                if(text=== "查看随堂测成绩"){
                    this.courseTitle = "查看随堂测成绩"
                    var val = {  
                        'id' : item.id,
                        'resultId' : item.resultId
                    }
                }else{
                    this.courseTitle = "查看单元测成绩"
                    var val = { 
                        'id' : this.courseResourceList.unitTest[0].id,
                        'resultId' : this.unitResultId
                    }
                }
                this.$store.dispatch('courseSectionStudy/paperResultDetailAct',val).then(() => {
                    this.paperResultDetail = this.$store.state.courseSectionStudy.ResultDetail;
                    console.log(this.paperResultDetail)
                    this.paperResultDetail.topicList.reverse().map((data,index)=>{
                        this.resultAnswer.push(data.userAnswer)
                    })
                }).catch(() => {
                })
            },
            getOnlinePreviewAct(val){
                this.onlinePreviewUrl = {}
                this.$store.dispatch('courseSectionStudy/onlinePreviewAct',val)
                .then((response) => {
                    this.showLoadPic = false
                    this.onlinePreviewUrl = this.$store.state.courseSectionStudy.PreviewUrl;
                    this.swiperCallback(this.onlinePreviewUrl.imgUrls.length)
                }).catch(() => {

                })
            },
            tcurrName(data,item){
                this.currActivePoint = item.id
                if(data){
                    this.haveChild = true
                    // this.$message({
                    //     message: '此章节下暂无学习资源！',
                    //     type: 'warning',
                    //     duration: 2 * 1000,
                    //     showClose: true,
                    // });
                }else{
                    this.haveChild = false
                }
            },
            //获取具体资源数据
            getResourceData(data,index){
                console.log(data,index,'====被点击的当前节点=====')
                if (data.resourceType !== 1 && this.player !== null) {
                    this.player.pause()
                }
                this.isClicked = false
                this.currActive = data.id
                // this.intervalQuizTime = 0
                // window.clearInterval(this.numQuiz); 
               // window.clearInterval(this.num); 
                //this.intervalTime = 0
                if(data.resourceType == 1){
                    document.getElementsByClassName('list')[0].style.background = '#000'
                }else{
                    document.getElementsByClassName('list')[0].style.background = '#fff'
                }
                if(data.resourceType == 1){//视频
                    this.intervalQuizTime = 0
                    window.clearInterval(this.numQuiz); 
                    this.isClickedQuiz = false
                    this.showTypeModules = data.resourceType
                    this.courseTitle = data.name
                    this.initPlayer(data.fileId)
                    this.valData = {
                        "courseId": this.courses.id,//课程，实验id
                        "chapterId": this.data.pid,//章节id
                        "sectionId": data.pid,//小节id
                        "resourceId": data.id,//资源文件id
                        "schedule": '',//学习进度 单位秒数 / 页数 
                        "type": 1//学习状态：1 正在学习；2学习完成
                    }
                        
                }else if(data.resourceType == 2 || data.resourceType == 3){//pdf
                    this.intervalQuizTime = 0
                    window.clearInterval(this.numQuiz); 
                    this.isClickedQuiz = false
                    var val = data.fileId+'.'+ data.fileExtensions
                    this.getOnlinePreviewAct(val)
                    this.courseTitle = data.name
                    this.showTypeModules = data.resourceType
                    if(this.$refs.fileSwiper){//初始化当前页码
                        this.$refs.fileSwiper.swiper.activeIndex = 0
                    }
                    this.valFileData = {
                        "courseId": this.courses.id,//课程，实验id
                        "chapterId": this.data.pid,//章节id
                        "sectionId": data.pid,//小节id
                        "resourceId": data.id,//资源文件id
                        "schedule": '',//学习进度 单位秒数 / 页数 
                        "type": 1//学习状态：1 正在学习；2学习完成
                    }
                }else if(data.resourceType == 4 && !this.isClickedQuiz){//随堂测
                    this.intervalQuizTime = 0
                    window.clearInterval(this.numQuiz); 
                    this.isClickedQuiz = true
                    this.isSubmit = false
                    this.checkedAnswer = []
                    this.startTimestamp = new Date().getTime()
                    this.courseTitle = "随堂测"
                    this.showTypeModules = data.resourceType
                    this.currId = data.id
                    var id = data.id
                    this.$store.dispatch('courseSectionStudy/getInClassTestAct',id).then(() => {
                        this.showErrorPic = false
                        this.inClassTest = this.$store.state.courseSectionStudy.InClassTestList;
                        var time = parseInt(this.inClassTest.paperDuration)*60
                        this.numQuiz = setInterval(()=>{
                            this.intervalQuizTime++ 
                           // console.log(this.intervalQuizTime,'----')
                            if(this.intervalQuizTime == time){
                                window.clearInterval(this.numQuiz); 
                                this.intervalQuizTime = 0 
                                this.coerce = true
                                this.$message({
                                    message: '答题时间到，即将自动交卷！',
                                    type: 'success',
                                    duration: 2 * 1000,
                                    showClose: true,
                                });
                                    this.submitTest()
                                    this.coerce = false
                            }
                        },1000)
                    }).catch((error) => {
                        if(error){
                             this.showErrorPic = true
                        }
                    })
                }
            },
           
            submitTest(){
                //window.clearInterval(this.num); 
                 this.intervalQuizTime = 0
                window.clearInterval(this.numQuiz); 
                //this.intervalTime = 0
                this.showTip = false
                var arr = []
                this.checkedAnswer.map((data,index)=>{
                    arr.push({
                        checked:data.substr(data.length-1,1),
                        item:JSON.parse(data.substr(0,data.length-1))
                    })
                })
                var timestamp = new Date().getTime()
                this.msg = {
                    "courseId":this.inClassTest.courseId,
                    "id": this.inClassTest.id,
                    "type": this.inClassTest.type,
                    "startTime": this.startTimestamp,
                    "endtime": timestamp,
                    "list": []
                }
                if(arr.length !== 0 &&  arr.length < this.inClassTest.topicList.length){
                   arr.map((data,index)=>{
                        this.msg.list.push({
                            "answer":data.checked,
                            "id": data.item.id,
                            "score": data.item.score,
                            "topicId": data.item.topicId
                        })
                    })
                    var arr2 = JSON.parse(JSON.stringify(this.inClassTest.topicList))
                     arr.map((data,index)=>{
                        arr2.map((item,_index)=>{
                            if(item.id == data.item.id){
                                arr2.splice(arr2.indexOf(item),1)
                            }
                        })
                    })
                    arr2.map((item,_index)=>{
                        this.msg.list.push({
                            "answer":"",
                            "id": item.id,
                            "score": item.score,
                            "topicId": item.topicId
                        })
                    })
                }
                if(arr.length == 0){
                    this.inClassTest.topicList.map((item,_index)=>{
                         this.msg.list.push({
                            "answer": "",
                            "id": item.id,
                            "score": item.score,
                            "topicId": item.topicId
                        })
                    })
                }
                if(this.coerce){ 
                    if(arr.length == this.inClassTest.topicList.length){
                        this.msg.endtime = this.startTimestamp+10*60*1000
                        arr.map((data,index)=>{
                            this.msg.list.push({
                                "answer": data.checked,
                                "id": data.item.id,
                                "score": data.item.score,
                                "topicId": data.item.topicId
                            })
                        })
                    }
                }
                this.$store.dispatch('courseSectionStudy/submitPaperAct',this.msg)
                .then((response) => {
                    this.msg = {}
                    this.checkedAnswer = []
                    this.isSubmit = true
                    this.$message({
                        message: '试卷提交成功啦！',
                        type: 'success',
                        showClose: true,
                    });
                    this.getCouResourceAct(this.data)
                }).catch(() => {
                })
                
                
            },
            //交卷
            comitPaper(){
                this.intervalQuizTime = 0
                window.clearInterval(this.numQuiz); 
               // window.clearInterval(this.num); 
                //this.intervalTime = 0 
                var arr = []
                this.checkedAnswer.map((data,index)=>{
                    arr.push({
                        checked:data.substr(data.length-1,1),
                        item:JSON.parse(data.substr(0,data.length-1))
                    })
                })
                 if(arr.length !== this.inClassTest.topicList.length){
                    this.showTip = true
                    return
                 }
                var timestamp = new Date().getTime()
                this.msg = {
                    "courseId":this.inClassTest.courseId,//课程id
                    "id": this.inClassTest.id,//试卷id
                    "type": this.inClassTest.type,//试卷类型
                    "startTime": this.startTimestamp,//开始考试时间
                    "endtime": timestamp,//结束考试时间
                    "list": []
                }
                arr.map((data,index)=>{
                    this.msg.list.push({
                        "answer": data.checked,//用户选项ABCD
                        "id": data.item.id,//试卷试题id
                        "score": data.item.score,//分值
                        "topicId": data.item.topicId//题库id
                    })
                })
                console.log(this.msg)
                this.$store.dispatch('courseSectionStudy/submitPaperAct',this.msg)
                .then((response) => {
                    this.msg = {}
                    this.checkedAnswer = []
                    this.isSubmit = true
                    this.$message({
                        message: '试卷提交成功啦！',
                        type: 'success',
                        showClose: true,
                    });
                     this.getCouResourceAct(this.data)
                }).catch(() => {
                })
                 
            },
            // 全屏事件
            // handleFullScreen(){
            //     let element = document.documentElement;
            //     if (this.fullscreen) {
            //         document.getElementsByClassName('fullscreen')[0].innerHTML = '全屏'
            //         if (document.exitFullscreen) {
            //             document.exitFullscreen();
            //         } else if (document.webkitCancelFullScreen) {
            //             document.webkitCancelFullScreen();
            //         } else if (document.mozCancelFullScreen) {
            //             document.mozCancelFullScreen();
            //         } else if (document.msExitFullscreen) {
            //             document.msExitFullscreen();
            //         }
            //     } else {
            //         document.getElementsByClassName('fullscreen')[0].innerHTML = '取消全屏'
            //         if (element.requestFullscreen) {
            //             element.requestFullscreen();
            //         } else if (element.webkitRequestFullScreen) {
            //             element.webkitRequestFullScreen();
            //         } else if (element.mozRequestFullScreen) {
            //             element.mozRequestFullScreen();
            //         } else if (element.msRequestFullscreen) {
            //             // IE11
            //             element.msRequestFullscreen();
            //         }
            //     }
            // },
        },
    }
</script>

<style>
    #mse{
        position: fixed !important;
        padding-top: 0px !important;
        height: 100% !important;
    }
    .xgplayer-skin-default .xgplayer-time{
        min-width: 120PX !important
    }
    .menuScrollbar .gm-scrollbar{
        /* display:none !important */
    } 
    .menuScrollbar .gm-scrollbar.-vertical {
        /* background-color: transparent */
        display:none !important

    }
    .menuScrollbar .gm-scrollbar.-horizontal {
        /* background-color: transparent */
        display:none !important

    }
    /* .gm-scrollbar .thumb {
        background-color: #ccc !important;
    }
    .gm-scrollbar .thumb:hover {
        background-color: #F39416 !important;
    }
    .menuScrollbar .gm-scrollbar .thumb{
        background-color: transparent !important;
    } */
    img[lazy=loading] {
        width: 100% !important;
        height: 100% !important;
        vertical-align: middle;
        text-align: center;
    }
    img[lazy=error] {
        width: 100% !important;
        height: 100% !important;
        vertical-align: middle;
        text-align: center;
    }
     .swiper-slide{
        /* height: auto !important; */
    }
    .imgW{
        max-width: 100%;
        max-height: 100%;
    }
   .xgplayer-skin-default .xgplayer-definition ul{
       margin-left:1px
   }
   .xgplayer-skin-default .xgplayer-definition .name{
       right:-10px
   }
   .testCheckedGroup .el-radio__input.is-disabled+span.el-radio__label{
       color:#666
   }
    .testCheckedGroup .is-checked .el-radio__label{
       color:#F39416 !important
   }
    .testCheckedGroup .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
        background-color:#fff
    }
    .testCheckedGroup .el-radio__input.is-disabled.is-checked .el-radio__inner{
        border-color: #F39416;
        background: #F39416;
    }
    .testGroup .el-radio__input.is-checked .el-radio__inner{
        border-color: #F39416;
        background: #F39416;
    }
    .testGroup .el-radio__inner:hover{
        border-color: #F39416;
    }
    .testGroup .el-radio__input.is-checked+.el-radio__label{
        color: #F39416;
    }
    ._collapse .el-collapse-item__header, ._collapse .el-collapse-item__content{
        color:#fff;
        background:#232627;
        border:none
    }
    ._collapse, .checkedCollapse{
        border:none !important
    }
    ._collapse .el-collapse-item__content{
        padding-bottom:0px
    }
    .checkedCollapse .el-collapse-item__wrap{
       background:#F4F4F4;
       margin-left:12px;
       margin-right:10px;
       border-radius:5px;
       padding:10px 16px
   }
   .checkedCollapse .el-collapse-item__content{
       padding-bottom: 0px
   }
  
     ._collapse .el-collapse-item__wrap, .checkedCollapse .el-collapse-item__wrap, .checkedCollapse .el-collapse-item__header{
         border:none
    }
    .checkedCollapse .el-collapse-item__arrow{
        margin:0 15px 0 auto
    }
     ._collapse .el-collapse-item__arrow{
        color:#666769
    }
    .rightMenu{
       background: rgba(35, 38, 39, 1.0);
    }
    .stydyActive{
        color: rgba(241, 137, 22, 1.0);
    }
    .rightMenu .el-collapse-item__content .curritem:hover{
        color: rgba(241, 137, 22, 1.0) !important
    }
    .rightMenu .el-collapse-item__content .curritem:not(.stydyActive){
        color:#ccc
   }
  
</style>