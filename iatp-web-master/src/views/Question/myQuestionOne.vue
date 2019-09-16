<template>
    <div class="div_bgc" style="">
        <el-row>
            <el-col :span="2">
                <div class="grid-content padding_in">
          <span class="cursor">
            <span><router-link to="/">首页</router-link></span>
          </span> >
                    <span class="cursor">
            <span>{{ navN }}</span>
          </span>
                </div>
            </el-col>
        </el-row>
        <!--  表格框  -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <div class="table_box">
                        <el-row>
                            <el-col :span="2"  :offset="10">
                                <span style="line-height: 40px">试卷类型</span>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="value" placeholder="全部" @change="indexSelect($event)">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content padding_in10">
                                    <el-input style="width: 65%" clearable v-model="test_input"
                                              placeholder=""></el-input>
                                        <el-button class="border_rud" type="warning"><span @click="HoveAnswer">搜索</span> <i class="el-icon-search"></i>
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <!--    表格        -->
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content table_border">
                                    <el-table
                                            stripe
                                            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                            style="width: 100%"
                                            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                                        <el-table-column
                                                prop="number"
                                                label="序号"
                                                align="center"
                                                type="index"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="testTitle"
                                                label="试卷名称"
                                                label-class-name="123"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="courseName"
                                                label="试卷类型"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="courseName"
                                                label="所属课程"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="score"
                                                label="得分"
                                                :formatter="formatScore"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="collected"
                                                label=""
                                                min-width="50"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <i v-if="scope.row.collected == 1" style="cursor: pointer;font-size: 20px" class="el-icon-star-on" @click="collection_two(scope.row,$event)"></i>
                                                <i v-else style="cursor: pointer;font-size: 20px" class="el-icon-star-off" @click="collection_two(scope.row,$event)"></i>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="id"
                                                label="操作"
                                                width="60">
                                            <template slot-scope="scope">
                                                <el-button style="color: black" type="text" @click="watchPaper(scope.row)">
                                                    查看
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="resultId"
                                                label=""
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-button v-if="scope.row.resultId == null" size="small" type="warning" plain class="reTest" @click="testB(scope.row)">开始考核</el-button>
                                                <el-button v-else size="small" plain class="reTest" @click="testB(scope.row)">重新考核</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content">
                                    <el-pagination
                                            background
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="pages.current"
                                            :page-size="pages.size"
                                            prev-text="上一页"
                                            next-text="下一页"
                                            layout="prev, pager, next"
                                            :total="pages.total">
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
                    {
                        value: '5',
                        label: '实验单元'
                    },
                    {
                        value: '6',
                        label: '实验'
                    },
                    {
                        value: '7',
                        label: '综合'
                    }],
                value: '',
                navN: '',
                // 输入框
                test_input: '',
                // 表和数据
                tableData: [],
                // 分页
                currentPage: 1,
                pageSize: 5,
                // 初始请求
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
                        searchType: 1,
                        testType: 0,
                        title: '',
                        type: 0
                    }
                },
            }
        },
        mounted() {
            this.HoveAnswer();
            // this.handleList()
            switch (this.$route.query.searchId) {
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
        },
        methods: {
            //下面是发起已答试卷分页列表
            HoveAnswer() {
                this.searchInfo.params.title = this.test_input

                this.$store.dispatch('courseExam/courseExamListAct',this.searchInfo).then(() => {
                    this.tableData = this.$store.state.courseExam.courseExamList;
                    console.log(this.tableData)
                    this.pages = this.$store.state.courseExam.courseExamPage;
                    this.pages.size = parseInt(this.$store.state.courseExam.courseExamPage.size)
                    this.pages.total = parseInt(this.$store.state.courseExam.courseExamPage.total)
                }).catch(() => {

                })
            },
            // 收藏
            collection_two(row,event) {
                let el = event.currentTarget;
                let id ='/' + row.id
                if (el.className === 'el-icon-star-off'){
                    el.classList.remove("el-icon-star-off")
                    el.classList.add("el-icon-star-on")
                    let params = id + '/1'
                    this.collection(params)
                }
                else{
                    el.classList.remove("el-icon-star-on")
                    el.classList.add("el-icon-star-off")
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
            watchPaper(vl){

            },

            // 开始/重新考核
            testB(vl){
                let id ='/' + vl.id
                this.$router.push({
                    path:'/startAssessment',
                    query:{
                        testPaperId: id,
                        testId: this.$route.query.searchId
                    }
                })
            },
            // 表格数据初始请求
            // handleList() {
            //     this.searchInfo.params.title = this.test_input
            //     this.searchInfo.params.textType = this.$route.query.searchId
            //     this.$store.dispatch("courseExam/courseExamListAct", this.searchInfo).then(() => {
            //         this.tableData = this.$store.state.courseExam.courseExamList
            //         console.log(this.tableData)
            //         this.pages = this.$store.state.courseExam.courseExamPage;
            //     }).catch(() => {
            //
            //     })
            // },
            // 分数
            formatScore: function (row, col) {
                // return row.score == null ? '----' : row.score > 0 ? 'score' : ''
                if (row.score==null){
                    return  '----'
                } else {
                    return row.score
                }
            },
            // 判断按钮

            // 判断是否收藏

            // 分页
            handleCurrentChange(val) {
                this.currentPage = val
                // console.log(`当前页: ${val}`)
            },
        },
        computed: {

        },
    }
</script>

<style scoped>
    .padding_in {
        padding: 20px 0;
    }

    .div_bgc {
        background-color: #f3f4f6;
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
</style>
