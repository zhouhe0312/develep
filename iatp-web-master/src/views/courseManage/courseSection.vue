<template>
    <div id="courseSection">
        <div style="background-color: #f0f2f5" :style="contontHeight" class="list">
            <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;background:#fff">
                    <el-col style="width:1200px">
                        <div style="text-align: left;margin-top:20px">
                        <router-link to="/" class="topJump">首页</router-link>
                        <span> > </span>
                        <router-link to="/courseAllList" class="topJump">全部课程</router-link>
                        <span> > </span>
                        <span style=" color:#F39416;font-size:14px">{{data.courseName}}</span>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="background-color: #f0f2f5" >
                    <div style="display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;">
                        <div style="display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;width:100%;background:#fff">
                            <div style="width:1200px;margin-bottom:30px;margin-top:30px">
                                <div style="height: 240px;width: 410px;display:inline-block;float:left">
                                    <img v-if="sectionDetails.fileId" :src="previewPic+sectionDetails.fileId" style="width: 100%;height: 100%;border-radius:5px" title="">
                                    <img v-else style="width: 100%;height: 100%;border-radius:5px" src="../../assets/images/coverPic.jpg"/>
                                </div>
                                <div style="text-align: left;height: 240px;width: 69%;margin-left: 442px;margin-top: 5px;">
                                    <div style="overflow:hidden;text-overflow: ellipsis;white-space:nowrap;width:94%">
                                        <span style="font-size:22px;color:#333;">{{sectionDetails.courseName?sectionDetails.courseName:"暂无课程名称"}}</span>
                                    </div>
                                    <p style="width:93%;font-size:14px;color:#666;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 7;-webkit-box-orient: vertical;">{{sectionDetails.introduce?sectionDetails.introduce:"暂无课程简介"}}</p>
                                    <span style="position:absolute;top:250px;color:#999;font-size:14px;">{{'共 '}}{{sectionDetails.chapterCount?sectionDetails.chapterCount:'0'}}{{' 章'}}</span>
                                    <span style="position:absolute;top:250px;margin-left:70px;color:#999;font-size:14px">{{'学习人数：'}}{{sectionDetails.studyCount?sectionDetails.studyCount:'未知'}}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="width:1200px;background-color: #f0f2f5;min-height:400px">
                            <p style="float:left"><i class="el-icon-s-unfold" style="margin:18px 0px 5px 5px"></i>课程章节</p>
                            <div class="chapter" v-for="(item,index) in sectionList" :key="index">
                                <p style="font-weight:600;font-size:15px;margin-left:9px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;width:98%">{{item.name}}</p>
                                <div class="div_chapter" v-for="(data,_index) in item.child" :key="_index" @click="jumpCourseStudy(data)">
                                    <p style="padding: 10px 0px 10px 2px !important;margin-left:15px;font-size:12px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;width:91%">{{data.name}}</p>
                                    <p v-if="data.studyStatus == 0" style="font-size: 12px;color:#fb851e;position: absolute;top: -3px;right:5px;margin-right:7px;">开始学习</p>
                                    <p v-if="data.studyStatus == 1" style=" font-size: 12px;color:#fb851e;position: absolute;top: -3px;right:5px;margin-right: 7px;">继续学习</p>
                                    <p v-if="data.studyStatus == 2" style=" font-size: 12px;color:#fb851e;position: absolute;top: -3px;right:5px;margin-right: 7px;">完成学习</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { constants } from '@/util/common'
    import { getValue,setValue } from "@/util/localStorage";
    export default {
        name: "courseSection",
        data(){
            return{
                data:{},
                sectionList:[],
                sectionDetails:{},
                previewPic:"",
                contontHeight:'min-height:'+(window.innerHeight-120)+'px',
            }
        },
        mounted(){
            this.previewPic = constants.downloadUrl
            this.data = getValue('COURSEDATA')
            this.getCourseListAct(this.data.id)//章节列表
            this.getSectionDetail(this.data.id)//详情
            this.addPageView(this.data.id)//增加浏览量
           // console.log(this.data)
        },
        methods:{
           
            //跳转资源
            jumpCourseStudy(data){
                setValue('SECTIONRESOURCE',data)
                this.$router.push({
                    path:'/courseSectionStudy',
                    query:{
                        index:data.id
                    }
                })
            },
            //获取课程下的章节
            getCourseListAct(id){
                var val = {
                    id:id,
                    uid:0
                }
                this.$store.dispatch('personal/detailsAct').then(() => {
                    val.uid= this.$store.state.personal.details.id
                    this.$store.dispatch('courseSection/getCourseListAct',val).then(() => {
                        this.sectionList = this.$store.state.courseSection.courseList;
                        console.log(this.sectionList,'--章节列表--');
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$store.dispatch('courseSection/getCourseListAct',val).then(() => {
                    this.sectionList = this.$store.state.courseSection.courseList;
                        console.log(this.sectionList,'--章节列表--');
                    }).catch(() => {
                    })
                })
                
            },
            //获取课程详情
            getSectionDetail(id){
                this.$store.dispatch('courseSection/getCourseDetailAct',id).then(() => {
                    this.sectionDetails = this.$store.state.courseSection.courseDeatils;
                    console.log(this.sectionDetails,'--课程详情--');
                }).catch(() => {

                })
            },
            //增加浏览量
            addPageView(id){
                this.$store.dispatch('courseSection/addPageView',id).then((response) => {
                    //console.log('增加浏览量：',response)
                }).catch(() => {

                })
            },
        },

    }
</script>

<style>
    #courseSection{
        background:#f0f2f5
    }
    .topJump{
       color:#666;
       font-size:14px;
       text-decoration: none;
    }
    .topJump:hover{
        color:#F39416
    }
    .chapter{
        clear:both;
        padding: 10px 5px 20px 20px;
        text-align: left;
        margin: 12px 0px 12px 0px;
        background-color: #fff;
        border-radius: 5px;
    }
    .chapter:hover{
        box-shadow: 3px 3px 3px 3px #E7EAED;
    }
    .chapterLearn{
        color:none;
        padding: 10px 0px 10px 0px !important;
        margin-left:15px;
        font-size:12px;
    }
     .div_chapter{
         padding-right:15px !important;
         margin-right:25px !important;
         margin-left:10px !important;
         position: relative;
     }
     .div_chapter:hover, .div_chapter:hover.div_chapter>p{
        background-color: #FDF0E8 !important;
        cursor: pointer;
        color: #fb851e !important;
        border-radius: 4px
    }
    #footerHome .el-col-24{
        background-color: #3c3c3c !important;
    }
   
</style>