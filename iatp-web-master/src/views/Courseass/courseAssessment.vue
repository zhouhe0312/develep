<template>
    <div class="div_bgc" id="DIV">
        <div class="padding_in" style="min-height: 14px;text-align: left;width: 1200px;margin: 0 auto;">
            <span class="cursor"><span style="font-size: 12px;color: #666"><router-link
                    to="/">首页</router-link></span></span>
            <span style="font-size: 12px;color: #666"> > 学习考核 > </span>
            <span class="cursor"><span style="color: #F39416;font-size: 12px">{{ navN }}</span></span>
        </div>
        <!--  表格框  -->
        <div style="width: 1200px;margin: 0 auto">
            <div class="table_box">
                <el-row>
                    <el-col :span="8" :offset="16">
                        <div class="grid-content padding_in10 input_radius" style="text-align: right">
                            <el-input style="width: 220px;height: 32px" clearable v-model="test_input"
                                      placeholder="请输入试卷名称"></el-input>
                            <el-button style="background-color: #F39416;width: 80px;height: 32px;" class="border_rud" type="warning">
                                <i class="el-icon-search"></i> <span @click="handleList"> 搜索 </span>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <!--    表格        -->
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content table_border">
                            <el-table
                                    class="tableHeight"
                                    stripe
                                    :cell-style="tableRowStyle"
                                    :header-cell-style="{background:'#eef1f6',color:'#323232',fontSize:'15px',height:'50px'}"
                                    style="width: 100%"
                                    :data="tableData">
                                <el-table-column
                                        align="center"
                                        prop="number"
                                        label="序号"
                                        type="index"
                                        width="110">
                                </el-table-column>
                                <el-table-column
                                        align="left"
                                        prop="testTitle"
                                        label="试卷名称"
                                        label-class-name="123"
                                        width="350">
                                    <template slot-scope="scope">
                                        <p style="margin: 0;text-align: left">{{ scope.row.testTitle }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        v-if="this.navN =='实验考核'"
                                        align="left"
                                        prop="courseName"
                                        label="所属实验"
                                        width="350">
                                    <template slot-scope="scope">
                                        <p style="margin: 0;text-align: left">{{ scope.row.courseName }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        v-if="this.navN =='课程考核' || this.navN =='综合考核'"
                                        align="left"
                                        prop="courseName"
                                        label="所属课程"
                                        width="350">
                                    <template slot-scope="scope">
                                        <p style="margin: 0;text-align: left">{{ scope.row.courseName }}</p>
                                    </template>
                                </el-table-column>
<!--                                <el-table-column-->
<!--                                        v-if="this.navN !='综合考核'"-->
<!--                                        align="left"-->
<!--                                        prop="testType"-->
<!--                                        label="试卷类型"-->
<!--                                        :formatter="formatTestType"-->
<!--                                        show-overflow-tooltip>-->
<!--                                </el-table-column>-->
                                <el-table-column
                                        align="center"
                                        prop="score"
                                        label="得分"
                                        :formatter="formatScore"
                                        width="100">
                                </el-table-column>
                                <!--             <el-table-column-->
                                <!--                     align="center"-->
                                <!--                     prop="collected"-->
                                <!--                     label=""-->
                                <!--                     min-width="50"-->
                                <!--                     show-overflow-tooltip>-->
                                <!--                 <template slot-scope="scope">-->
                                <!--                     <i v-if="scope.row.collected == 1"-->
                                <!--                        style="cursor: pointer;font-size: 20px" class="el-icon-star-on"-->
                                <!--                        @click="collection_star(scope.row,$event)"></i>-->
                                <!--                     <i v-else style="cursor: pointer;font-size: 20px"-->
                                <!--                        class="el-icon-star-off"-->
                                <!--                        @click="collection_star(scope.row,$event)"></i>-->
                                <!--                 </template>-->
                                <!--             </el-table-column>-->
                                <el-table-column
                                        align="center"
                                        prop="id,collected,resultId"
                                        label="操作"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-row>
                                            <el-col :span="24">
                                                <div class="grid-content" style="padding-left: 8%">
                                                    <el-col :span="7">
                                                        <div class="grid-content" style="padding-top: 6%">
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
                                                        <div class="grid-content">
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
                                                    <el-col :span="7" style="margin-left: 7%">
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
                                <!--                                        <el-table-column-->
                                <!--                                                align="center"-->
                                <!--                                                prop="resultId"-->
                                <!--                                                label=""-->
                                <!--                                                show-overflow-tooltip>-->
                                <!--                                            <template slot-scope="scope">-->
                                <!--                                                <el-button  v-if="scope.row.resultId == null" size="small" type="warning"-->
                                <!--                                                           plain class="reTest" @click="testB(scope.row)">开始考核-->
                                <!--                                                </el-button>-->
                                <!--                                                <el-button style="border-color: #dcdcdc;color: #888888;" v-else size="small" plain class="reTest"-->
                                <!--                                                           @click="testB(scope.row)">重新考核-->
                                <!--                                                </el-button>-->
                                <!--                                            </template>-->
                                <!--                                        </el-table-column>-->
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div v-if="this.showPages" class="courseAssPagination">
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
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
    </div>
</template>

<script>

    export default {
        name: 'Course_assessment',
        components: {},
        data() {
            return {
                idF: '',
                navN: '',
                // 输入框
                test_input: '',
                // 显示分页
                showPages: false,
                // 表和数据
                tableData: [],
                // 分页
                pages: {
                    total: 0,
                    size: 5,
                    current: 1
                },
                // 初始请求
                searchInfo: {
                    page: {
                        current: 1,
                        size: 12
                    },
                    params: {
                        searchType: 0,
                        testType: null,
                        title: '',
                        type: 0
                    }
                },
            }
        },
        mounted() {
            this.handleList()
            switch (this.$route.query.searchId) {
                case '1':
                    this.navN = "课程考核";
                    this.searchInfo.params.type = '3'
                    break;
                case '2':
                    this.navN = "实验考核";
                    this.searchInfo.params.type = '6'
                    break;
                case '3':
                    this.navN = "综合考核";
                    break;
            }
            let clientHeight = document.documentElement.clientHeight
            // console.log(document.documentElement.clientWidth)
            let DIV = document.querySelector('#DIV')
            let table_box = document.querySelector('.table_box')
            DIV.style.minHeight = (clientHeight - 150) + 'px'
            table_box.style.minHeight = (clientHeight - 234) + 'px'
        },
        methods: {
            // 表头样式
            tableRowStyle({row, rowIndex}) {
                return 'color: #323232;font-size:14px;height:50px'
            },
            // open() {
            //     this.$alert('还没有考试不能查看！', '提示', {
            //         confirmButtonText: '确定',
            //         // callback: action => {
            //         //     this.$message({
            //         //     });
            //         // }
            //     });
            // },
            // 收藏
            collection_star(row, event) {
                let el = event.currentTarget;
                let id = '/' + row.id
                if (el.className === 'el-icon-star-off') {
                    el.classList.remove("el-icon-star-off")
                    el.classList.add("el-icon-star-on")
                    el.style.marginTop = 4 + 'px'
                    let params = id + '/1'
                    this.collection(params)
                } else {
                    el.classList.remove("el-icon-star-on")
                    el.classList.add("el-icon-star-off")
                    el.style.marginTop = 7 + 'px'
                    let params = id + '/2'
                    this.collection(params)
                }
            },
            collection: function (val) {
                this.$store.dispatch("courseExam/collectionAct", val).then(() => {

                }).catch(() => {

                })
            },
            // 查看
            watchPaper(val) {
                if (val.resultId == null) {

                } else {
                    this.$router.push({
                        path: '/checkAssessment',
                        query: {
                            resultId: val.resultId,
                            testPaperId: this.$route.query.searchId,
                            Id: val.id
                        }
                    })
                }
            },
            // 开始/重新考核
            testB(vl) {
                let id = '/' + vl.id
                this.$router.push({
                    path: '/startAssessment',
                    query: {
                        testPaperId: id,
                        testId: this.$route.query.searchId
                    }
                })
            },
            // 表格数据初始请求
            handleList() {
                this.searchInfo.params.title = this.test_input
                this.searchInfo.params.testType = this.$route.query.searchId
                this.$store.dispatch("courseExam/courseExamListAct", this.searchInfo).then(() => {
                    this.tableData = this.$store.state.courseExam.courseExamList
                    // console.log(this.tableData)
                    this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                    this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    if (this.pages.size >= this.pages.total) {
                        this.showPages = false
                    } else {
                        this.showPages = true
                    }
                    // console.log(this.pages)
                }).catch(() => {

                })
            },
            // 分数
            formatScore: function (row, col) {
                if (row.score == null) {
                    return '----'
                } else {
                    return row.score
                }
            },
            // 试卷类型
            // formatTestType: function (row, col) {
            //     switch (row.testType) {
            //         case 1:
            //             return '课程随堂';
            //         case 2:
            //             return '课程单元';
            //         case 3:
            //             return '课程';
            //         case 4:
            //             return '实验随堂';
            //         case 5:
            //             return '课程单元';
            //         case 6:
            //             return '实验';
            //         case 7:
            //             return '综合';
            //     }
            // },
            // 分页
            handleCurrentChange(val) {
                this.pages.current = val
                this.searchInfo.params.title = this.test_input
                this.searchInfo.page.current = val
                // console.log(`当前页: ${val}`)
                this.searchInfo.params.testType = this.$route.query.searchId
                this.$store.dispatch("courseExam/courseExamListAct", this.searchInfo).then(() => {
                    this.tableData = this.$store.state.courseExam.courseExamList
                    // console.log(this.tableData)
                    this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                    this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                    // console.log(this.pages)
                }).catch(() => {

                })
            },
        },
        beforeRouteUpdate(to, from, next) {
            // console.log(to.query.searchId)
            switch (to.query.searchId) {
                case '1':
                    this.navN = "课程考核";
                    this.searchInfo.params.type = '3'
                    break;
                case '2':
                    this.navN = "实验考核";
                    this.searchInfo.params.type = '6'
                    break;
                case '3':
                    this.navN = "综合考核";
                    this.searchInfo.params.type = '0'
                    break;
            }

            this.searchInfo.params.testType = to.query.searchId
            this.$store.dispatch("courseExam/courseExamListAct", this.searchInfo).then(() => {
                this.tableData = this.$store.state.courseExam.courseExamList
                // console.log(this.$store.state.courseExam.courseExamPage)
                this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                // console.log(this.tableData)
                // console.log(this.searchInfo)
                if (this.pages.size >= this.pages.total) {
                    this.showPages = false
                } else {
                    this.showPages = true
                }
                // console.log(this.pages)
            }).catch(() => {

            })
            next();
        },
    }
</script>

<style>
    .padding_in {
        padding: 24px 0 0 0;
    }

    .div_bgc {
        background-color: #FFFFFF;
        padding-bottom: 30px;
    }

    .table_box {
        border: 1px solid white;
        padding: 12px 0;
        background-color: white;
    }

    .padding_in10 {
        padding-bottom: 10px;
    }

    .float_L {
        float: left;
    }

    .table_border {
        border: 1px solid #e9ecf3;
        border-radius: unset!important;
    }

    .el-icon-star-on {
        color: #F39416;
        font-size: 23px !important;
    }

    .reTest:hover {
        background-color: #F39416 !important;
        color: white !important;
        border-color: #F39416 !important;
    }

    .reTest {
        background-color: white !important;
    }

    .courseAssPagination .el-pagination.is-background .el-pager li:not(.disabled).active {
        border-radius: 50%;
        background-color: #F39416 !important;
    }

    .courseAssPagination .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        background-color: white !important;
    }

    a:hover,
    a:active,
    a:visited,
    a:link {
        text-decoration: none;
        color: #7E7E80;
    }
    .tableHeight th,
    .tableHeight td {
        padding: 5px 4px 0!important;
    }
</style>

<style scoped>
    .input_radius >>> .el-input__inner {
        border-radius: 0 0 0 0;
        height: 32px;
        border-color: #ddd;
    }

    .input_radius >>> .el-button {
        border-radius: 0 0 0 0;
        padding: 8px 2px 8px 0;
    }
    .el-input >>> .el-input__icon{
        margin-top: -3px;
    }

</style>
