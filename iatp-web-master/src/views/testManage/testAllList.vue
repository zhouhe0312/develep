<template>
    <div id="testAllList">
           <div style="background-color: #f3f4f6"  :style="contontHeight" class="list">
            <el-row>

           <!-- <div style="background-color: #f3f4f6;height: 807px;" class="list"> -->
             <!-- <el-row> -->
            <!-- 顶部条件筛选 后期需要-->
            <!-- <el-col :span="24" style="background:#fff;margin-bottom:10px">
                   <el-col :span="24" style="display:flex;justify-content:center;">
                        <el-col style="width:1248px;margin-left:48px">
                            <p style="font-size:16px;float:left;margin-top:18px">方向</p>
                            <ul class="classify">
                                <li class="classify_li" :class="searchActiveClass1 == index ? 'active':'0'" v-for="(item,index) in search[0]" :key="index" @click="getSearch(item,index)">
                                    {{item.li}}
                                </li>
                            </ul>
                        </el-col>  
                    </el-col>
                    <el-col :span="24" style="display:flex;justify-content:center;">
                        <el-col style="width:1248px;margin-left:48px">
                            <p style="font-size:16px;float:left;margin-top:0px">分类</p>
                            <ul class="classify" style="margin-top:0px">
                                <li class="classify_li" :class="searchActiveClass2 == index ? 'active':'0'" v-for="(item,index) in search[1]" :key="index" @click="getSearch2(item,index)">
                                    {{item.li}}
                                </li>
                            </ul>
                        </el-col>
                    </el-col>
                </el-col> -->
                <el-col :span="24" style="display:flex;justify-content:center;">
                    <el-col style="width:1248px;margin-left:48px">
                        <div style="display:block">
                            <ul class="classification">
                                <li class="direction_li" :class="activeClass == index ? 'active':'0'" v-for="(item,index) in couLi" :key="index" @click="getItme(item,index)">
                                    {{item.li}}
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24" style="display:flex;justify-content:center;">
                    <el-col style="width:1248px;margin-left:48px">
                        <div style="float: left;margin-bottom:77px;margin-right:48px;width: 264px;height: 156px;display:inline-block" v-for="(item,index) in testList" :key="index">
                            <div style="float:left;width: 264px;height: 156px;border-radius: 5px;display:block;">
                                <img v-if="item.fileId" :src="previewTest+item.fileId" class="image" @click="toJumpCourse(item, index)" title="点击查看章节">
                                <img v-else src="@/assets/images/coverPic.jpg" class="image" @click="toJumpCourse(item, index)" title="点击查看章节">
                                <div style="overflow:hidden;text-overflow: ellipsis;white-space:nowrap;width:100%;text-align: left;">
                                    <span style="padding-top:5px;font-size:16px;color:#333;">{{item.courseName}}</span>
                                </div>
                                <span style="float:left;font-size:14px;color:#999;margin-top:3px">共{{item.num?item.num:'0'}}章</span>
                            </div>
                        </div>
                    </el-col>
                </el-col>
        </el-row>
        <el-row>
			<el-col>
                <div class="testPagination">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="Number(allInfo.total)"
                        :size="Number(allInfo.size)"
                        :current-page="Number(allInfo.current)"
                        @current-change = "currentChange"
                        :page-size="12"
                        prev-text="上一页"
                        next-text="下一页"
                        :hide-on-single-page = "true"
                    >
                    </el-pagination>
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
        name: "testAllList",
        data(){
            return{
                activeClass: 0,
                searchActiveClass1:0,
                searchActiveClass2:0,
                allInfo:{},
                testList:[],
                headers:{},
                contontHeight:'min-height:'+(window.innerHeight-120)+'px',
                previewTest:"",
                couLi:[
                    {
                        li:"热门",
                        bol:false
                    },
                    {
                        li:"最新",
                        bol:false
                    },
                ],
                search:[
                    [
                        {
                            li:"全部",
                        },
                        {
                            li:"前端",
                        },
                        {
                            li:"会计",
                        },
                        {
                            li:"移动端",
                        },
                        {
                            li:"小程序",
                        },
                        {
                            li:"UI",
                        },
                        {
                            li:"大数据",
                        },
                        {
                            li:"手绘",
                        },
                        {
                            li:"游戏",
                        }
                    ],
                    [
                         {
                            li:"全部",
                        },
                        {
                            li:"JAVA",
                        },
                        {
                            li:"网页设计",
                        },
                        {
                            li:"HTML/CSS",
                        },
                        {
                            li:"公众号",
                        },
                        {
                            li:"ios开发",
                        },
                        {
                            li:"安卓开发",
                        }
                    ]
                ],
                msg:{
					current:1,
                    size:12,
                    classifyId:"",
                    classifyPid:"",
                    searcType: 1,//1热门；2最新
                    type: 2//1课程；2实验
				},

            }
        },
        created(){
            this.headers = {"Authorization":'bearer '+getValue("token")}
            this.previewTest = constants.downloadUrl
            this.getCourseAllData(this.msg)
        },

        mounted(){

        },
        methods:{
            getCourseAllData(msg){
                this.$store.dispatch('courseAllList/courseListAct',msg).then(() => {
                    this.testList = this.$store.state.courseAllList.courseList;
                    this.allInfo = this.$store.state.courseAllList.allInfo;
                   // console.log(this.testList, this.allInfo,'--实验列表--');
                }).catch(() => {
                })
            },
            toJumpCourse(item,index){
                 setValue('TESTDATA',item)
                 this.$router.push({
                    path:'/testSection',
                })
            },
            // 分页
            currentChange(current) {
                this.msg.size = this.allInfo.size
                this.msg.current = current
                this.getCourseAllData(this.msg)
            },

            getItme(item,index) {
                console.log(item,index+1)
                this.activeClass = index; 
                this.msg = {
					current:1,
                    size:12,
                    classifyId:"",
                    classifyPid:"",
                    searcType: index+1,//1热门；2最新
                    type: 2//1课程；2实验
                }
                this.getCourseAllData(this.msg)
            },
            //顶部筛选条件
            getSearch(item,index){
                this.searchActiveClass1 = index
            },
            getSearch2(item,index){
                this.searchActiveClass2 = index
            }
        }
    }

</script>

<style >
    #testAllList{
        min-width:1366px
    }
    .image {
        width: 264px;
        height: 156px;
        border-radius: 5px;
        cursor: pointer;
   }
   .classify{
        padding: 0px 0px 10px 10px;
        height: 25px;
        float: left;
   }
   .classify_li{
        list-style: none;
        text-align: left;
        float: left;
        border-radius: 20px;
        margin-left: 5px;
        height: 20px;
        line-height: 20px;
        padding: 8px 13px;
        cursor: pointer;
        font-size: 14px
   }
    .classification{
        padding: 0;
        height: 25px;
        float: left;
    }
   
    .direction_li{
        list-style: none;
        text-align: left;
        float: left;
        border-radius: 20px;
        margin-left: 5px;
        height: 20px;
        line-height: 20px;
        padding: 4px 13px;
        cursor: pointer;
        font-size: 14px
    }
    .active {
        color: rgba(241, 137, 22, 1.0);
        /* background-color:#e5e5e5  */
    }
    .testPagination{
       margin-bottom:10px
    }
   .testPagination .el-pagination.is-background .el-pager li:not(.disabled).active{
        border-radius: 50%;
        background-color: #f49217 !important;
    }
    .testPagination .el-pagination.is-background .btn-next, .testPagination .el-pagination.is-background .btn-prev, .testPagination  .el-pagination.is-background .el-pager li{
        background-color: #F3F4F6 !important;
    }
    .testPagination .el-pagination.is-background .el-pager li:not(.active):hover{
        color: #f49217 !important;
    }
</style>