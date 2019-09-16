<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <div class="Head">
          <img src="../../assets/images/banner01.jpg">
        </div>
      </el-col>
      <!--下面是课程推荐-->
      <el-col :span="24" style="padding-top: 60px;width: 300px;position: relative;left: 50%;margin-left: -135px">
        <div style="float: left;">
          <img src="../../assets/images/Homeimg_01.jpg" style="padding-bottom: 60px;float: left" />
          <span style="font-size: 22px;color: #1d1d1d;padding: 0 20px 0 20px;float: left;letter-spacing:5px;font-family: 'Microsoft YaHei'">推/荐/课/程</span>
          <img src="../../assets/images/Homeimg_02.jpg" />
        </div>
        <!--<el-col :span="1" :offset="10"><img src="../../assets/images/Homeimg_01.jpg" style="padding-bottom: 60px;" /></el-col>-->
        <!--<el-col :span="2"><span style="font-size: 22px;color: #1d1d1d; border: 1px solid red">推/荐/课/程</span></el-col>-->
        <!--<el-col :span="1"><img src="../../assets/images/Homeimg_02.jpg"/></el-col>-->
      </el-col>
      <el-col :span="24">
        <el-col :span="20" :offset="2">
          <el-row style="margin-left: -48px">
            <el-col style="width: 1250px;position: relative;left: 50%;margin-left: -577px;"><!--限制最多只能渲染8条-->
              <div class="grid-content bg-purple" style="float: left;margin-bottom: 110px;margin-right: 48px;" v-for="(item,index) in Recommended"  :key="index" v-if="index<8" @click="OnCourseJump(item)">
                <img v-if="item.fileId" class="homeImg" :src="downloadUrl(item.fileId)" style="width: 100%">
                <img v-else src="@/assets/images/coverPic.jpg" class="homeImg"  style="width: 100%">
                <span class="myCourse_span">{{item.courseName}}</span>
                <span v-if="item.num!=0" style="float: left;color: #999;font-size: 14px;margin-top: 5px">共{{item.num}}章</span>
                <span v-else style="float: left;color: #999;font-size: 14px;margin-top: 5px">暂无内容</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-col>
      <!--下面是推荐实验-->
      <el-col :span="24" style="padding-top: 10px;width: 300px;position: relative;left: 50%;margin-left: -135px">
        <div style="float: left;">
          <img src="../../assets/images/Homeimg_01.jpg" style="padding-bottom: 60px;float: left" />
          <span style="font-size: 22px;color: #1d1d1d;padding: 0 20px 0 20px;float: left;letter-spacing:5px;font-family: 'Microsoft YaHei'">推/荐/实/验</span>
          <img src="../../assets/images/Homeimg_02.jpg" />
        </div>
        <!--<el-col :span="1" :offset="10"><img src="../../assets/images/Homeimg_01.jpg" style="margin-top: 15px;padding-bottom: 60px;" /></el-col>-->
        <!--<el-col :span="2"><p style="font-size: 22px;color: #333;font-weight: bold"></p></el-col>-->
        <!--<el-col :span="1"><img src="../../assets/images/Homeimg_02.jpg" style="margin-top: 15px" /></el-col>-->
      </el-col>

      <el-col :span="24">
        <el-col :span="20" :offset="2">
          <el-row style="margin-left: -48px">
            <el-col style="width: 1250px;position: relative;left: 50%;margin-left: -577px"><!--限制最多只能渲染8条-->
              <div class="grid-content bg-purple" style="float: left;margin-bottom: 110px;margin-right: 48px;"  v-for="(item,index) in experiment" :key="index" v-if="index<8" @click="OnexperimentJump(item)">
                <img v-if="item.fileId"  class="homeImg"  :src="downloadUrl(item.fileId)" style="width: 100%">
                <img v-else src="@/assets/images/coverPic.jpg" class="homeImg" style="width: 100%">
                <span class="myCourse_span">{{item.courseName}}</span>
                <span v-if="item.num!=0" style="float: left;color: #999;font-size: 14px;margin-top: 5px">共{{item.num}}章</span>
                <span v-else style="float: left;color: #999;font-size: 14px;margin-top: 5px">暂无内容</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-col>
      <!--这里是知识库-->
      <el-col :span="24" style="padding-top: 10px;width: 300px;position: relative;left: 50%;margin-left: -135px">
        <div style="float: left;">
          <img src="../../assets/images/Homeimg_01.jpg" style="padding-bottom: 60px;float: left" />
          <span style="font-size: 22px;color: #1d1d1d;padding: 0 20px 0 20px;float: left;letter-spacing:5px;font-family: 'Microsoft YaHei'">知/识/库/</span>
          <img src="../../assets/images/Homeimg_02.jpg" />
        </div>

        <!--<el-col :span="1" :offset="10"><img src="../../assets/images/Homeimg_01.jpg" style="margin-top: 15px;margin-left: 15px;padding-bottom: 60px;"/></el-col>-->
        <!--<el-col :span="2"><p style="font-size: 22px;color: #333;font-weight: bold">知/识/库</p></el-col>-->
        <!--<el-col :span="1"><img src="../../assets/images/Homeimg_02.jpg" style="margin-top: 15px;margin-left: -25px"></el-col>-->
      </el-col>
        <div style="width: 1250px;position: relative;left: 50%;margin-left: -577px">
            <el-col :span="24" style="padding-bottom: 60px;margin-left: -24px">
                <img src="../../assets/images/HomeImg_15.jpg" alt="yemian" style="width: 486px;height: 290px;border-radius: 8px;float: left;padding-right: 24px;margin-top: 4px;">
                <el-col :span="13" class="knowledBase">
                    <el-col :span="24" style="height: 60px;margin-bottom:38px;" v-for="(item,index) in article"  :key="index">
                        <h5 class="knowledgeTile" @click="OnKnowledge(item)">{{item.name}}</h5>
                        <span style="float: right;margin-top: -35px;font-size: 12px;color: #999">{{item.releaseDate}}</span>
                        <span class="artiCont" style="text-align: left;font-size: 14px;color: #666">{{item.summary}}</span>
                    </el-col>
                </el-col>
            </el-col>
        </div>

    </el-row>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { constants } from "@/util/common";
  import {getValue,setValue} from "@/util/localStorage"

  export default {
    name: 'home',
    data(){
      return{
        Recommended:[],
        experiment:[],
        baseDownloadUrl: constants.downloadUrl,
        article:[]
      }
    },
    mounted(){
      this.IndexList();
      this.IndexExperiment();
      this.IndexHomeKnowLedge();
    },
    methods:{
      IndexList(){
        this.$store.dispatch("home/courseIndexListAct").then(() =>{
          this.Recommended=this.$store.state.home.courseIndexList;
        }).catch(() =>{

        })
      },
      IndexExperiment(){
        this.$store.dispatch("home/courseIndexListTwoAct").then(()=>{
          this.experiment = this.$store.state.home.courseIndexListTwo;
        })
      },
      IndexHomeKnowLedge(){
        this.$store.dispatch("home/knowLedgeAct").then(()=>{
          this.article = this.$store.state.home.knowLedge;
        })
      },

      downloadUrl(fileId) {
         // console.log(fileId)
          if(fileId){
            return this.baseDownloadUrl + fileId
          }
      },
        //首页课程的的点击跳转事件事件
        OnCourseJump(item){
          console.log(item)
          setValue('COURSEDATA',item)
          this.$router.push({
              path:'/courseSection',   
          })
      },
        //首页的实验的点击跳转页面事件
        OnexperimentJump(item){
            console.log(item)
          setValue('TESTDATA',item)
          this.$router.push({
              path:'/testSection',
          })
        },

        //知识库标题点击跳转页面事件
        OnKnowledge(item){
            let id = item.id
            let name = item.name
            this.$router.push({
                path:'/knowledgesDetails',
                query:{
                    pid:id,
                    name:name
                }
            })
      }

    },
  }
</script>
<style>
  body{
    background-color: white;
  }
  .Head{
    width: 100%;
    /*position:relative;*/
    /*z-index:1;*/

  }
  .Head>img{
    width: 100%;
    /*height: 400px;*/
    /*osition:absolute;*/
    /*top:0;*/
    /*bottom:0;*/
    /*left:0;*/
    /*right:0;*/
    /*width:100%;*/
    /*margin:auto;*/
    /*z-index: -1;*/
    /**zoom:1;*/
  }
  .knowledgeTile{
    text-align: left;
    font-size: 16px;
    color: #333;
    margin-top: 0px;
    margin-bottom: 18px;
    cursor: pointer;
  }
  .knowledgeTile:hover{
    color: #F39419;
  }
  .Head:before {
    /*content: "";*/
    /*display: inline-block;*/
    /*padding-bottom: 20%;*/
    /*width: 0.1px;	!*必须要有数值，否则无法把高度撑起来*!*/
    /*vertical-align: middle;*/
  }
  .grid-content {
       border-radius: 4px;
       min-height: 36px;
     }

  /*最下面文章内容第二行内容超出部分隐藏起来变为省略号*/
  .artiCont{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  /*首页课程标题样式*/
  .myCourse_span{
    float: left;
    margin-top: 10px;
    color: #333;
    width: 263px;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 16px;
  }

  /*首页自知识库的样式*/
  .knowledBase{
    margin-top: 5px;
    height: 290px;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */

  }

  /*首页图片的样式*/
  .homeImg{
    width: 264px;
    height: 156px;
    cursor: pointer;
    border-radius: 5px;
  }
    /*首页图片外的div样式*/
  .bg-purple{
    width: 264px;
    height: 156px;
    cursor: pointer;
    border-radius: 5px;
  }

</style>
