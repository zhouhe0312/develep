<template>
    <div id="DIV" class="div_bgc">
        <el-row>
            <el-col :span="24" style="width: 1200px;position: relative;left:50%;margin-left: -600px;">
                <div class="grid-content">
                    <div class="table_box">
                        <el-row>
                            <el-col :span="2" :offset="11">
                                <span style="line-height: 32px;margin-left: 30px">试卷类型</span>
                            </el-col>
                            <el-col :span="4" style="margin-left: 25px;">
                                <el-select v-model="value" placeholder="全部" @change="indexSelect($event)">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7" style="width: auto;margin-left: 10px">
                                <div class="grid-content padding_in10">
                                    <div class="grid-content padding_in10 input_radius" style="text-align: right">
                                        <el-input style="width: 220px" clearable v-model="test_input" @keyup.enter.native="myTitleSearch"
                                                  placeholder="请输入试卷名称"></el-input>
                                        <el-button class="border_rud" style="background-color: #F39416;width: 80px;height: 32px;" type="warning" @click="myTitleSearch"><i class="el-icon-search"></i><span>搜索 </span>
                                        </el-button>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <!--    表格        -->
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content table_border">
                                    <el-table
                                            stripe
                                            :header-cell-style="{background:'#eef1f6',color:'#323232',height:'50px',fontSize:'15px'}"
                                            style="width: 100%;font-size: 14px;color: #323232;"
                                            :row-style="{height:'0'}"
                                            :cell-style="{padding:'5px'}"
                                            :data="tableData.slice((currentPage-pagefen)*pageSize,currentPage*pageSize)">
                                        <el-table-column
                                                prop="number"
                                                label="序号"
                                                align="center"
                                                type="index"
                                                width="110">
                                        </el-table-column>
                                        <el-table-column
                                                align="left"
                                                prop="testTitle"
                                                label="试卷名称"
                                                label-class-name="123"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="left"
                                                prop="testType"
                                                label="试卷类型"
                                                :formatter="formatEX"
                                                label-class-name="123"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="left"
                                                prop="courseName"
                                                label="所属课程"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="left"
                                                prop="score"
                                                label="得分"
                                                :formatter="formatScore"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="id"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-row>
                                                    <el-col :span="24">
                                                        <div class="grid-content" style="padding-left: 8%">
                                                            <el-col :span="7">
                                                                <div class="grid-content" style="padding-top: 6%;margin-left: -20px">
                                                                    <i v-if="scope.row.collected == 1"
                                                                       style="cursor: pointer;font-size: 20px;margin-top: 4px"
                                                                       class="el-icon-star-on"
                                                                       @click="collection_star(scope.row,$event)"></i>
                                                                    <i v-else
                                                                       style="cursor: pointer;font-size: 20px;margin-top: 7px"
                                                                       class="el-icon-star-off"
                                                                       @click="collection_star(scope.row,$event)"></i>
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="7">
                                                                <div class="grid-content" style="margin-left: -20px;">
                                                                    <el-button v-if="scope.row.resultId == null" disabled
                                                                               type="text"
                                                                               @click="watchPaper(scope.row)"
                                                                               style="color: #999;padding-top: 10px">
                                                                        <i class="el-icon-view" style="font-size: 18px"></i>
                                                                    </el-button>
                                                                    <el-button v-else style="color: black;padding-top: 10px" type="text"
                                                                               @click="watchPaper(scope.row)">
                                                                        <i class="el-icon-view" style="font-size: 18px"></i>
                                                                    </el-button>
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="7">
                                                                <div class="grid-content" style="padding-top: 4%">
                                                                    <el-button v-if="scope.row.resultId == null"
                                                                               size="small"
                                                                               type="warning"
                                                                               plain class="reTest"
                                                                               @click="testB(scope.row)">开始考核
                                                                    </el-button>
                                                                    <el-button
                                                                            style="border-color: #dcdcdc;color: #888888;"
                                                                            v-else
                                                                            size="small" plain class="reTest"
                                                                            @click="testB(scope.row)">重新考核
                                                                    </el-button>
                                                                </div>
                                                            </el-col>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="courseAssPagination" v-if="this.pages.total>5">
                                    <el-pagination
                                            background
                                            @current-change="handleCurrentChange"
                                            v-show="isShow"
                                            :current-page.sync="pages.current"
                                            :page-size="pages.size"
                                            prev-text="上一页"
                                            next-text="下一页"
                                            layout="prev, pager, next"
                                            :total="pages.total"
                                            style="margin-top: 20px">
                                    </el-pagination>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>


    export default {
        name: 'Course_assessment',
        data() {
            return {
                navN: '',
                // 输入框
                test_input: '',
                // 表和数据
                tableData: [],
                pagefen: 1,
                // 分页
                currentPage: 1,
                pageSize: 5,
                isShow:true,//true为显示分页
                ischeck:true,//true为显示分页
                // 初始请求
                pages: {
                    total: 0,
                    size: 5,
                    current: 1
                },
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
                searchInfo: {
                    page: {
                        current: 1,
                        size: 5
                    },
                    params: {
                        searchType: 2,
                        testType: 0,
                        title: '',
                        type: 0
                    }
                },
                searchInfoTwo: {
                    page: {
                        current: 1,
                        size: 5
                    },
                    params: {
                        searchType: 1,
                        testType: 0,
                        title: '',
                        type: 0
                    }
                },

            }
        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('#DIV')
            DIV.style.minHeight = (clientHeight - 281) + 'px'
            // this.CollectionTopic()
            this.myxiangyaoId =this.$route.query.searchId
            let thefatherCom = this.myxiangyaoId
            this.$emit('thefatherCom',this.myxiangyaoId)
            if (this.myxiangyaoId==undefined){
                this.HoveAnswer()

            }
            if (this.myxiangyaoId=="1"){
                this.HoveAnswer()
            }
            if (this.myxiangyaoId=="2"){
                this.options = [
                    {
                        value: '0',
                        label: '全部'
                    },

                    {
                        value: '7',
                        label: '综合'
                    },
                    {
                        value: '3',
                        label: '课程'
                    },
                    {
                        value: '6',
                        label: '实验'
                    },
                ]

                this.CollectionTopic()
            }

            // this.handleList()
        },
        methods: {
            // 下面是发起已答试卷列表的请求
            HoveAnswer() {
                this.$store.dispatch('courseExam/courseExamListAct',this.searchInfoTwo).then(() => {
                    this.tableData = this.$store.state.courseExam.courseExamList;
                    // console.log(this.tableData)
                    this.pages = this.$store.state.courseExam.courseExamPage;
                    this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                    this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    if (this.pages.total>5){
                        this.isShow=true;
                    }else {
                        this.isShow=false;
                    }
                }).catch(() => {

                })
            },
            // //下面是发起收藏试卷分页列表
            CollectionTopic() {
                this.$store.dispatch('courseExam/courseExamListAct',this.searchInfo).then(() => {
                    this.tableData = this.$store.state.courseExam.courseExamList;
                    this.pages = this.$store.state.courseExam.courseExamPage;
                    this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                    this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    if (this.pages.total>5){
                        this.isShow=true;
                    }else {
                        this.isShow=false;
                    }
                }).catch(() => {

                })
            },
            //下面是搜索功能
            myTitleSearch(){
                if (this.myxiangyaoId=="1") {
                    this.searchInfoTwo.params.title = this.test_input
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfoTwo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        // console.log(this.tableData)
                        this.pages = this.$store.state.courseExam.courseExamPage;
                        this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    }).catch(() => {

                    })
                }
                if (this.myxiangyaoId=="2"){
                    this.searchInfo.params.title = this.test_input;
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        // console.log(this.tableData)
                        this.pages = this.$store.state.courseExam.courseExamPage;
                        this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    }).catch(() => {

                    })
                }
                
            },

            //下拉列表点击触发事件
            indexSelect(event){
                // this.searchInfo.params.type = event;
                // console.log(this.myxiangyaoId)
                if (this.myxiangyaoId=="2"){
                    this.searchInfo.params.type = event;
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        this.pages = this.$store.state.courseExam.courseExamPage;
                        this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    }).catch(() => {

                    })
                }
                if (this.myxiangyaoId=="1"){
                    this.searchInfoTwo.params.type = event;
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfoTwo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        // console.log(this.tableData)
                        this.pages = this.$store.state.courseExam.courseExamPage;
                        this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    }).catch(() => {

                    })
                }


            },


            // 收藏
            collection_star(row,event) {
                if (this.myxiangyaoId=="1") {
                    let id ='/' + row.id;
                    let params = ""
                    if (row.collected=="2"){
                        params=id+"/1"
                    } else if (row.collected=="1") {
                        params=id+"/2"
                    }
                    this.collection(params)
                }else if (this.myxiangyaoId=="2"){
                    let id ='/' + row.id;
                    let params = ""
                    if (row.collected=="2"){
                        params=id+"/1"
                    } else if (row.collected=="1") {
                        params=id+"/2"
                    }
                    this.collection(params)
                }
            },

            collection: function (val) {
                this.$store.dispatch("courseExam/collectionAct",val).then(() => {
                    // console.log(this.myxiangyaoId)
                    if (this.myxiangyaoId=="1") {
                        this.HoveAnswer()
                    }
                    if (this.myxiangyaoId=="2"){
                        this.CollectionTopic()
                    }
                }).catch(() => {

                })
            },

            // 查看功能
            watchPaper(vl){
                // console.log(vl)
                let id = vl.id
                let resultId = vl.resultId
                if (resultId==null){
                    this.ischeck=true
                    this.$message({
                        showClose: true,
                        message: '抱歉，您还没有提交过试卷哦！',
                        type: 'warning'
                    });
                }else {
                    this.ischeck=false
                    this.myxiangyaoId =this.$route.query.searchId
                    let searchId=this.myxiangyaoId
                    let value = "/"+id+"/"+resultId
                    this.$store.dispatch('myQuestion/paperResultDetailAct',value).then(() => {
                        this.examinaData = this.$store.state.myQuestion.paperResultDetail;
                        const arr = this.examinaData
                        // console.log(arr)
                        this.$router.push({
                            name:'examination',
                            params:{ArrData:arr,searID:searchId}
                        })

                    }).catch(() => {

                    })
                }
                // console.log(resultId)


            },
            // 开始/重新考核
            testB(vl){
                let id ='/' + vl.id
                // console.log(id)
                if (this.$route.query.searchId==1){
                    this.$route.query.searchId=4
                }
                if (this.$route.query.searchId==2){
                    this.$route.query.searchId=5
                }
                this.$router.push({
                    path:'/startAssessment',
                    query:{
                        testPaperId: id,
                        myQuestionId: this.$route.query.searchId
                    }
                })
            },
            formatScore: function (row, col) {
                if (row.score==null){
                    return  '----'
                } else {
                    return row.score
                }
            },
            //
            formatEX:function(row,col){
                let Iname = ''
                if (row.testType==1){
                    Iname = "课程随堂"
                }
                if (row.testType==2){
                    Iname = "课程单元"
                }
                if (row.testType==3){
                    Iname = "课程"
                }
                if (row.testType==4){
                    Iname = "实验随堂"
                }
                if (row.testType==5){
                    Iname = "实验单元"
                }
                if (row.testType==6){
                    Iname = "实验"
                }
                if (row.testType==7){
                    Iname = "综合"
                }

                return Iname
            },
            // 分页
            handleCurrentChange(val) {
                if (this.myxiangyaoId=="2"){
                    this.currentPage = val
                    // console.log(`当前页: ${val}`)
                    this.searchInfo.page.current =  this.currentPage;
                    this.pagefen = this.currentPage;
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        // console.log(this.tableData)
                        // this.pages = this.$store.state.courseExam.courseExamPage;
                        // this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        // this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                        // console.log(this.pages)
                        // console.log(this.pages.size)
                        // console.log(this.pages.total)
                    }).catch(() => {

                    })
                }
                if (this.myxiangyaoId=="1") {
                    // console.log(this.myxiangyaoId)
                    this.currentPage = val
                    // console.log(`当前页: ${val}`)
                    this.searchInfoTwo.page.current =  this.currentPage;
                    this.pagefen = this.currentPage;
                    this.$store.dispatch('courseExam/courseExamListAct',this.searchInfoTwo).then(() => {
                        this.tableData = this.$store.state.courseExam.courseExamList;
                        // this.pages = this.$store.state.courseExam.courseExamPage;
                        // this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                        // this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    }).catch(() => {

                    })
                }


            },
        },
    }
</script>

<style scoped>
    #DIV{
        padding-bottom: 40px;
    }

    .div_bgc {
        background-color: white;
        margin-top: 20px;

    }

    .table_box {
        border: 1px solid white;
        padding: 20px 20px;
        background-color: white;
    }

    .padding_in10 {
        padding-bottom: 10px;
    }

    .float_L {
        float: left;
    }

    .border_rud {
        border-radius: unset;
        background-color: #F39416;width: 80px;height: 32px;
    }

    .table_border {
        border: 1px solid #e9ecf3;
    }

    .el-icon-star-on {
        color: #f09511;
        font-size: 23px !important;
    }
    .reTest:hover{
        background-color: #f09511!important;
        color: white!important;
        border-color: #f09511!important;
    }
    .reTest{
        font-size: 12px;
        color: #888;
        border: 1px solid #dcdcdc;
        background-color: white!important;
    }
    .courseAssPagination .el-pagination.is-background .el-pager li:not(.disabled).active{
        /*border-radius: 50%;*/
        background-color: #f49217!important;
    }
    .courseAssPagination .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        background-color: white!important;
    }
    a:hover,
    a:active,
    a:visited,
    a:link{
        text-decoration: none;
        color: #7E7E80;
    }

    .input_radius >>> .el-input__inner{
        border-radius: 0;
        height: 32px;
        line-height: 32px;
    }
    .input_radius >>> .el-button{
        border-radius: 0;
        height: 32px;
        margin-top: -30px;
        padding-top: 8px;
    }

    .el-select >>> .el-input__inner{
        height: 32px !important;
        border-radius: 0;
    }
    .el-input >>> .el-input__icon{
        margin-top: -3px;
    }
</style>
