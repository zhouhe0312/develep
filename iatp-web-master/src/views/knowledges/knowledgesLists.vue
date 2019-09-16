<template>
    <div>
        <el-row class="DIV">
            <el-col :span="24">
                <div class="grid-content">
                    <el-col v-if="this.isInfo" :span="24">
                        <div class="grid-content" style="text-align: center">
                            <h2>暂时没有数据！</h2>
                        </div>
                    </el-col>
                    <el-row v-for="(item,index) in lists"
                            :key="index"
                            style="border-bottom: 1px solid #ececec;" :class="index===lists.length-1?'noBorder':''">
                        <el-col :span="24">
                            <div class="grid-content">
                                <p style="font-weight: bolder;font-size: 16px;cursor: pointer"
                                   @click="toDetails(item.id,item.title)">{{ item.title }}</p>
                                <p style="color: #666;font-size: 14px;line-height: 1.6em">{{ item.content }}</p>
                                <el-row v-if="item.subid =='0'" style="padding-top: 13px">
                                    <el-col :span="20">
                                        <div class="grid-content" style="font-size: 12px;color: #999">
                                        <p style="margin: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">发布单位：{{ item.issued }}&nbsp;&nbsp;&nbsp;&nbsp;版本号：{{ item.version }}&nbsp;&nbsp;&nbsp;&nbsp;发布日期：{{ item.releaseDate }}</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content">
                                            <p style="text-align: right;color: #f1951a;cursor: pointer;font-size: 12px;margin: 0" @click="modaShow(item.id)">简介 ></p>
                                        </div>
                                    </el-col>
<!--                                    <el-col :span="10">-->
<!--                                        <div class="grid-content" style="font-size: 12px;color: #999">-->
<!--                                          <p style="margin: 0;padding: 0;width: 60px;float: left">发布单位：</p><p style="margin: 0;float: left;padding: 0;max-width: 82%">{{ item.issued }}</p>-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="8">-->
<!--                                        <div class="grid-content bg-purple-dark" style="font-size: 12px;color: #999">-->
<!--                                            版本号：{{ item.version }}-->
<!--                                        </div>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="6">-->
<!--                                        <div class="grid-content bg-purple-dark" style="font-size: 12px;color: #999">-->
<!--                                            发布日期：{{ item.releaseDate }}-->
<!--                                        </div>-->
<!--                                    </el-col>-->
                                </el-row>
                                <el-row v-else>
                                    <el-col :span="24">
                                        <div class="grid-content" style="font-size: 12px;color: #999">
                                            {{ item.msg }}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <!--    模态框   -->
        <div class="modia">
            <div class="white_BGC">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content" style="border-bottom: 2px solid #F39416;border-radius: unset">
                            <p style="font-size: 18px;margin:0 0;padding-left: 20px;line-height: 42px;padding-top: 5px">详情展示</p>
                        </div>
                    </el-col>
                </el-row>
                <!-- 内容 -->
                <el-row style="padding-top:3%;font-size: 14px;color: #666">
                    <el-col :span="21" :offset="1">
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding-bottom: 18px">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">名称：</p>
<!--                                <div class="grid-content text-right" style="line-height: 1.5em">名称：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.name }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.name }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">摘要：</p>
<!--                                <div class="grid-content text-right">摘要：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.summary }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.summary }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">版本号：</p>
<!--                                <div class="grid-content text-right">版本号：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.version }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.version }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">发布日期：</p>
<!--                                <div class="grid-content text-right">发布日期：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.releaseDate }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.releaseDate }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">发布单位：</p>
<!--                                <div class="grid-content text-right">发布单位：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.issued }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.issued }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">关键字：</p>
<!--                                <div class="grid-content text-right">关键字：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.keyword }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.keyword }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">类别：</p>
<!--                                <div class="grid-content text-right">类别：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.category }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.category }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row style="border-bottom: 1px solid #dcdfe6;padding: 25px 0 25px 0">
                            <el-col :span="4">
                                <p class="lineHeight fotnWeight">小类：</p>
<!--                                <div class="grid-content text-right">小类：</div>-->
                            </el-col>
                            <el-col :span="18">
                                <p class="lineHeight">{{ detailsData.classes }}</p>
<!--                                <div class="grid-content text-left">{{ detailsData.classes }}</div>-->
                            </el-col>
                        </el-row>
                        <el-row>
<!--                            <el-col :span="6">-->
<!--                                <p class="lineHeight fotnWeight">所属领域：</p>-->
<!--&lt;!&ndash;                                <div class="grid-content text-right"></div>&ndash;&gt;-->
<!--                            </el-col>-->
<!--                            <el-col :span="18">-->
<!--                                <p class="lineHeight">{{ detailsData.fields }}</p>-->
<!--&lt;!&ndash;                                <div class="grid-content text-left"></div>&ndash;&gt;-->
<!--                            </el-col>-->
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content" style="text-align: right;padding: 15px 45px">
                            <el-button style="background-color: #F39416;border-color: #F39416" type="primary" size="small" @click="closeModia">关 闭</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--   分页     -->
        <el-row style="padding-bottom: 10px">
            <el-col :span="24">
                <div class="grid-content courseAssPagination" style="text-align: center">
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
</template>

<script>
    export default {
        name: "knowledgesLists",
        data() {
            return {
                isInfo: false,
                // 列表数据
                lists: [],
                // 分页
                pages: {
                    total: 0,
                    size: 4,
                    current: 1
                },
                //  请求数据格式
                postData: {
                    page: {
                        current: 1,
                        size: 4
                    },
                    params: {
                        category: '',
                        name: ''
                    }
                },
                //  详情数据
                detailsData: {},
            }
        },
        created() {
            // document.addEventListener('click', (e) => {
            //     if (!this.$el.contains(e.target)){
            //         this.centerDialogVisible = false;
            //
            //     }
            // })
            this.thisLIst()
        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('.DIV')
            DIV.style.minHeight = (clientHeight - 233) + 'px'
        },
        methods: {
            // 进入详情页面
            toDetails(id, name) {
                this.$store.dispatch("knowledges/DetailsAct", id).then(() => {
                    let filename = this.$store.state.knowledges.Details.filename
                    // console.log(filename)
                    this.$router.push({
                        path: '/knowledgesDetails',
                        query: {
                            pid: id,
                            name: name,
                            filename: filename,
                        }
                    })
                    // console.log(this.detailsData)
                }).catch(() => {

                })
            },
            // 列表数据请求
            thisLIst() {
                if (this.$route.query.category) {
                    this.postData.params.category = this.$route.query.category
                }
                if (this.$route.query.name) {
                    this.postData.params.name = this.$route.query.name
                }
                this.postData.page.current = this.pages.current
                this.postData.page.size = this.pages.size
                // console.log(this.postData.page,this.postData.params)
                // console.log(this.postData)
                this.$store.dispatch("knowledges/knowListAct", this.postData).then(() => {
                    this.lists = this.$store.state.knowledges.knowList
                    // console.log(this.lists)
                    if (this.lists.length == 0){
                       this.isInfo = true
                    }else{
                        this.isInfo = false
                        // console.log('1')
                    }
                    this.pages.size = parseInt(this.$store.state.knowledges.pages.size)
                    this.pages.current = parseInt(this.$store.state.knowledges.pages.current)
                    this.pages.total = parseInt(this.$store.state.knowledges.pages.total)
                    // console.log(this.lists)
                    // console.log(this.lists.slice((this.pages.current-1)*this.pages.size,this.pages.current*this.pages.size))
                }).catch(() => {
                })
            },
            //  左滑模态框---详情
            modaShow(id) {
                document.querySelector(".modia").style.zIndex = "3256"
                let modia_box = document.querySelector(".white_BGC")
                modia_box.style.transition = "1s"
                modia_box.style.transform = "translateX(-98%)"
                this.$store.dispatch("knowledges/DetailsAct", id).then(() => {
                    this.detailsData = this.$store.state.knowledges.Details
                    // console.log(this.detailsData)
                }).catch(() => {

                })
            },
            // 关闭模态框
            closeModia(){
                let timer;
                let modia_box = document.querySelector(".white_BGC")
                modia_box.style.transition = "1s"
                modia_box.style.transform = "translateX(95%)"
                timer = setTimeout(function(){
                    document.querySelector(".modia").style.zIndex = "-2008"
                    clearTimeout(timer)
                }, 450);
            },
            // 分页
            handleCurrentChange(val) {
                this.pages.current = val

                // console.log(`当前页: ${val}`)
                if (this.$route.query.category) {
                    this.postData.params.category = this.$route.query.category
                }
                if (this.$route.query.name) {
                    this.postData.params.name = this.$route.query.name
                }
                this.postData.page.current = val
                this.postData.page.size = this.pages.size
                // console.log(this.postData.page,this.postData.params)
                this.$store.dispatch("knowledges/knowListAct", this.postData).then(() => {
                    this.lists = this.$store.state.knowledges.knowList
                    // console.log(this.lists)
                    if (this.lists.length == 0){
                        this.isInfo = true
                    }else{
                        this.isInfo = false
                        // console.log('1')
                    }
                    this.pages.size = parseInt(this.$store.state.knowledges.pages.size)
                    this.pages.current = parseInt(this.$store.state.knowledges.pages.current)
                    this.pages.total = parseInt(this.$store.state.knowledges.pages.total)
                    // console.log(this.lists)
                    // console.log(this.lists.slice((this.pages.current-1)*this.pages.size,this.pages.current*this.pages.size))
                }).catch(() => {
                })
            },
        }
    }
</script>

<style>
    .noBorder{
        border-bottom: unset!important;
    }
    .fotnWeight{
        font-weight: bolder;
    }
    .lineHeight{
        margin: 0;
        line-height: 1.5em;
        text-align: left;
    }
    .text-right {
        text-align: left;
    }

    .text-left {
        text-align: left;
    }

    #thisDia > .el-dialog .el-dialog--center {
        margin-top: 0 !important;
    }

    .modia {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -2008;
        background-color: rgba(126, 126, 128, 0.58);
    }

    .white_BGC {
        width: 30%;
        height: 100%;
        background-color: white;
        position: absolute;
        top: 0;
        right: -30.7%;
    }

    .courseAssPagination .el-pagination.is-background .el-pager li:not(.disabled).active {
        border-radius: 50%;
        background-color: #f49217 !important;
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
</style>

