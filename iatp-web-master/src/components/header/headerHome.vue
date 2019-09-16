<template>
    <div class="top_padding">
        <el-row class="height100">
            <el-col :span="4" class="height100">
                <div class="grid-content height100">
                    <router-link to="/homeContent"><img style="width: 135px;height: 88%;margin-top: 1%;border: 0;"
                                                        src="@/assets/images/u12.png" alt="时代新威"></router-link>
                </div>
            </el-col>
            <el-col :span="8" class="height100" style="margin-left: 35px">
                <div class="grid-content height100">
                    <el-col :span="4" class="height100">
                        <div class="grid-content height100">
                            <router-link to="/" style="color: white;">
                                <el-button class="nav_color navfocus isFocus" type="text" v-on:click="navClick">首页
                                </el-button>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="4" class="height100">
                        <div class="grid-content height100">
                            <router-link to="/courseAllList" style="color: white;">
                                <el-button class="nav_color navfocus" type="text" v-on:click="navClick">课程</el-button>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="4" class="height100">
                        <div class="grid-content height100">
                            <router-link to="/testAllList" style="color: white;">
                                <el-button class="nav_color navfocus" type="text" v-on:click="navClick">实验</el-button>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="4" class="height100" v-on:mouseover.native="ShowStudy" v-on:mouseout.native="HiddenStudy">
                        <div class="grid-content height100" style="position: relative">
                            <el-button class="nav_color navfocus" type="text" v-on:click="navClick">学习考核</el-button>
                            <div class="height125" style="display: none">
                                <div style="width: 100%;height: 33%" class="hoverColor" @click="toCourseAssessment1">
                                    <p style="margin: 0;line-height: 41.25px;font-size: 14px">课程考核</p>
                                </div>
                                <div style="width: 100%;height: 33%" class="hoverColor" @click="toCourseAssessment2">
                                    <p style="margin: 0;line-height: 41.25px;font-size: 14px">实验考核</p>
                                </div>
                                <div style="width: 100%;height: 33%" class="hoverColor" @click="toCourseAssessment3">
                                    <p style="margin: 0;line-height: 41.25px;font-size: 14px">综合考核</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" class="height100">
                        <div class="grid-content height100">
                            <router-link to="/knowledges" style="color: white;">
                                <el-button class="nav_color navfocus" type="text" @click="navClick">知识库</el-button>
                            </router-link>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <!--            <el-col :span="1" :offset="7" class="height100 InputShow">-->
            <!--                <div class="grid-content height100">-->
            <!--                    <el-button class="search_nav_color" type="text" @click="trigg($event)"><i-->
            <!--                            class="el-icon-search"></i></el-button>-->
            <!--                </div>-->
            <!--            </el-col>-->
            <!--            <el-col :span="3" :offset="5" class="height100 InputHidden">-->
            <!--                <div class="grid-content height100">-->
            <!--                    <el-input v-model="inputSearch" placeholder="请输入内容" size="small" class="search_input"-->
            <!--                              @blur.prevent="InputHidden($event)" ref="gain"><i-->
            <!--                            class="el-icon-search el-input__icon cursorP"-->
            <!--                            slot="suffix">-->
            <!--                    </i></el-input>-->
            <!--                </div>-->
            <!--            </el-col>-->
            <el-col :span="1" class="height100" style="float: right;width: 3.7%">
                <div class="grid-content height100">
                </div>
            </el-col>
            <!--     已登录       -->
            <el-col v-if="this.isLogin" :span="5" class="height100" style="float: right;margin-right: 35px">
                <div class="grid-content height100">
                    <el-col :span="24" class="height100" v-on:mouseover.native="ShowPerson" v-on:mouseout.native="HiddenPerson">
                        <div class="grid-content height100">
                            <span class="cursor name_position left_10" @click="personIn" style="float: right">{{ this.nickname }}</span>
                            <div class="circle cursor" style="float: right">
                                <img @click="personIn" v-if="this.touXiang" :src="downloadUrl(userInfo.avatar)" alt="">
                                <img @click="personIn" v-else src="@/assets/images/userheader.png" alt="">
                            </div>

                            <div class="height164" @blur="loseFocuse" style="display: none">
                                <div style="width: 100%;height: 25%;font-size: 14px" class="hoverColor"
                                     @click="ToAnMyQuestion1">
                                    <p style="margin: 0;line-height: 41px;">我的题库</p>
                                </div>
                                <div style="width: 100%;height: 25%" class="hoverColor" @click="personData">
                                    <p style="margin: 0;line-height: 41px;">个人资料</p>
                                </div>
                                <div style="width: 100%;height: 25%" class="hoverColor" @click="accountSet">
                                    <p style="margin: 0;line-height: 41px;">账号设置</p>
                                </div>
                                <div style="width: 100%;height: 25%" class="hoverColor" @click="loginOut">
                                    <p style="margin: 0;line-height: 41px;">退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <!--     未登录       -->
            <el-col v-else :span="7" class="height100" style="float: right;margin-right: 35px">
                <div class="grid-content height100">
                    <el-col :span="5" class="height100" style="float: right">
                        <div class="grid-content height100">
                            <el-button type="text" class="login login_register" @click="toRegi">注 册</el-button>
                            <span class="col-line">|</span>
                            <el-button type="text" class="register login_register" @click="toLog">登 录</el-button>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {removeValue} from '@/util/localStorage'
    import {constants} from "@/util/common";

    export default {
        name: 'Header',
        data() {
            return {
                touXiang: false,
                display: false,
                display2: false,
                // 页头搜索
                inputSearch: '',
                userInfo: {
                    avatar: ""              // 初始图片
                },
                baseDownloadUrl: constants.downloadUrl,
                nickname: '',
                isLogin: false,
            }
        },
        created() {
            document.addEventListener('click', (e) => {
                if (!this.$el.contains(e.target)) {
                    this.display2 = false;
                    this.display = false;
                }
            })
        },
        mounted() {
            this.getUser()
            // console.log(this.$route.path)
            let collection = document.querySelectorAll(".navfocus");
            if (this.$route.path == '/courseSection' || this.$route.path == '/courseAllList') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                collection[1].classList.add("isFocus")
            } else if (this.$route.path == '/testSection' || this.$route.path == '/testAllList') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                collection[2].classList.add("isFocus")
            } else if (this.$route.path == '/courseAssessment' || this.$route.path == '/startAssessment' || this.$route.path == '/checkAssessment') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                collection[3].classList.add("isFocus")
            } else if (this.$route.path == '/detailsPaper' || this.$route.path == '/knowledgesLists') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                collection[4].classList.add("isFocus")
            } else if (this.$route.path == '/homeContent') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                collection[0].classList.add("isFocus")
            }else if (this.$route.path == '/userAgreement' || this.$route.path == '/myQuestionTwo' || this.$route.path == '/personData' || this.$route.path == '/accountSet' || this.$route.path == '/myQuestionTheer') {
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
            }
        },
        watch: {
            $route(to, from) {
                let collection = document.querySelectorAll(".navfocus");
                // console.log(to.path)
                if (to.path == '/courseSection') {
                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                    collection[1].classList.add("isFocus")
                } else if (to.path == '/testSection') {
                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                    collection[2].classList.add("isFocus")
                } else if (to.path == '/courseAssessment') {
                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                    collection[3].classList.add("isFocus")
                } else if (to.path == '/detailsPaper') {
                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                    collection[4].classList.add("isFocus")
                } else if (to.path == '/homeContent') {

                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                    collection[0].classList.add("isFocus")
                }else if (to.path == '/userAgreement' || to.path == '/myQuestionTwo' || to.path == '/personData' || to.path == '/accountSet' || to.path == '/myQuestionTheer') {
                    for (let value of collection) {
                        value.classList.remove("Unfocus")
                        value.classList.remove("isFocus")
                    }
                }
            },
        },
        methods: {
            // 获取用户信息
            getUser() {
                this.$store.dispatch('personal/detailsAct').then(() => {
                    this.isLogin = true
                    this.nickname = this.$store.state.personal.details.username
                    this.userInfo.avatar = this.$store.state.personal.details.avatar
                    // console.log(this.$store.state.personal.details)
                    if (this.userInfo.avatar == '') {
                        this.touXiang = false
                    } else {
                        this.touXiang = true
                    }
                }).catch(() => {

                })
            },
            downloadUrl(fileId) {
                return this.baseDownloadUrl + fileId       //请求获得地址
            },
            // 点击显示输入框
            // trigg(event) {
            //     let target = event.currentTarget.parentElement.parentElement
            //     target.classList.remove("InputShow")
            //     target.classList.add("InputHidden")
            //     target.nextElementSibling.classList.remove("InputHidden")
            //     target.nextElementSibling.classList.add("InputShow")
            //     this.$refs.gain.focus()
            // },
            // // 隐藏搜索框
            // InputHidden(event) {
            //     let target = event.currentTarget.parentElement.parentElement.parentElement
            //     // console.log(target)
            //     target.classList.remove("InputShow")
            //     target.classList.add("InputHidden")
            //     target.previousElementSibling.classList.remove("InputHidden")
            //     target.previousElementSibling.classList.add("InputShow")
            // },
            // 跳转注册
            toRegi() {
                this.$router.push({
                    path: '/registered'
                })
            },
            // 跳转登录
            toLog() {
                this.$router.push({
                    path: '/login'
                })
            },
            // 学习考核下拉
            ShowStudy: function () {
                let height125 = document.querySelector('.height125')
                height125.style.display = 'block'

            },
            HiddenStudy: function () {
                let height125 = document.querySelector('.height125')
                height125.style.display = 'none'

            },
            // 个人中心下拉
            ShowPerson: function () {
                let height164 = document.querySelector('.height164')
                height164.style.display = 'block'

            },
            HiddenPerson: function () {
                let height164 = document.querySelector('.height164')
                height164.style.display = 'none'

            },
            //  切换样式
            navClick: function () {
                this.display2 = false
                let el = event.currentTarget;
                // if (el.children[0].innerHTML == '学习考核') {
                //     if (this.display == true) {
                //         this.display = false
                //     } else {
                //         this.display = true
                //     }
                // } else {
                //     this.display = false
                // }
                let collection = document.querySelectorAll(".navfocus");
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                    value.classList.add("Unfocus")
                }
                el.classList.remove("Unfocus")
                el.classList.add("isFocus")
            },
            //   退出
            loginOut() {
                this.display2 = false
                removeValue('token')
                removeValue('COURSEDATA')
                removeValue('TESTDATA')
                removeValue('SECTIONRESOURCE')
                removeValue('TESTSECTIONRESOURCE')

                this.$router.push({
                    path: '/login',
                })
            },
            // 课程考核
            toCourseAssessment1: function () {
                this.display = false
                this.$router.push({
                    path: '/courseAssessment',
                    query: {
                        searchId: '1'
                    }
                })
            },
            // 实验考核
            toCourseAssessment2: function () {
                this.display = false
                this.$router.push({
                    path: '/courseAssessment',
                    query: {
                        searchId: '2'
                    }
                })
            },
            // 综合考核
            toCourseAssessment3: function () {
                this.display = false
                this.$router.push({
                    path: '/courseAssessment',
                    query: {
                        searchId: '3'
                    }
                })
            },
            //已答试卷
            ToAnMyQuestion1() {
                this.display2 = false
                this.$router.push({
                    path: '/myQuestionTwo',
                    query: {
                        searchId: '1'
                    }
                })
            },
            // 个人资料
            personData() {
                this.display2 = false
                this.$router.push({
                    path: '/personData',

                })
            },
            //账号设置
            accountSet() {
                this.display2 = false
                this.$router.push({
                    path: '/accountSet',
                })
            },
            personIn() {
                let collection = document.querySelectorAll(".navfocus");
                for (let value of collection) {
                    value.classList.remove("Unfocus")
                    value.classList.remove("isFocus")
                }
                // if (this.display2 == true) {
                //     this.display2 = false
                // } else {
                //     this.display2 = true
                // }
            },
            loseFocuse() {
                this.display2 = false
            }
        },
    }
</script>

<style scoped>
    
    .InputHidden {
        display: none;
    }

    .InputShow {
        display: unset;
    }

    .height100 {
        height: 100%;
    }

    .cursorP {
        cursor: pointer;
    }

    .cursor {
        cursor: pointer;
        color: white;
    }

    .circle {
        /*border: 1px solid white;*/
        border-radius: 50%;
        height: 30px;
        width: 30px;
        float: left;
        overflow: hidden;
        display: inline-block;
        margin-top: 9px;
    }

    .circle > img {
        width: 30px;
        height: 30px;
    }

    .name_position {
        float: left;
        height: 100%;
        line-height: 50px;
        font-size: 15px;
    }

    .left_10 {
        padding-left: 15px;
    }

    .width_100 {
        height: 100%;
        width: 95%;
    }

    .top_padding {
        height: 50px;
        background-color: #03112c;
        color: white;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    /* 5 */
    button:hover {
        color: white;
        border-radius: 0;
    }

    .nav_color {
        color: white;
        font-size: 15px;
        width: 100%;
        height: 100%;
    }

    .nav_color:focus, .study_test:focus {
        background-color: #f39416;
        color: white;
        border-radius: 0;
    }

    .nav_color:hover, .study_test:hover {
        background-color: #f39416;
    }

    .study_test {
        color: white;
        font-size: 16px;
        width: 100%;
        height: 100%;
        /*padding: 17% 0;*/
    }

    /* 导航 */
    /*.el-menu-item{*/
    /*    padding: 0 0;*/
    /*    width: 15%;*/
    /*    font-size: 15px;*/
    /*}*/
    /*.el-menu-item:hover{*/
    /*    background-color: #03112c!important;*/
    /*}*/
    /*.el-submenu__title:focus, .el-submenu__title:hover{*/
    /*    background: #03112c!important;*/
    /*}*/
    /*.el-menu--popup{*/
    /*    min-width: 20px!important;*/
    /*}*/
    .search_nav_color, .news {
        color: white;
        font-size: 16px;
        width: 100%;
        height: 100%;
    }

    .news:focus {
        color: white !important;
        outline: 0;
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: #606266;
    }

    a:hover {
        text-decoration: none;
        color: #f39416;
    }

    .Unfocus {
        background-color: #03112c;
        border-radius: 0;
    }

    .isFocus {
        background-color: #f39416;
        border-radius: 0;
    }

    .search_input {
        text-align: center;
        padding: 10px 0;
        /*margin-top: 8%;*/
    }

    .search_input >>> .el-input__inner {
        background-color: #03112b !important;
        border-color: #3a3a3c;
        color: white;
    }

    .messIcon {
        width: 100%;
        height: 100%;
        margin: 0;
        line-height: 50px;
        cursor: pointer;
    }

    .col-line {
        display: inline-block;
        width: 10%;
        height: 100%;
        line-height: 50px;
        font-size: 12px;
    }

    .login_register {
        width: 40%;
        height: 100%;
        color: white;
    }

    .login_register:focus {
        color: white !important;
    }

    .height125 {
        cursor: pointer;
        font-size: 14px;
        color: #6e6e6e;
        background-color: white;
        position: absolute;
        /*left: 3%;*/
        z-index: 52;
        height: 125px;
        width: 100%;
        min-width: 77px;
        -webkit-box-shadow: #A6A6A6 0px 3px 5px ;
        -moz-box-shadow: #A6A6A6 0px 3px 5px ;
        box-shadow: #A6A6A6 0px 3px 5px ;
    }

    .hoverColor:hover {
        background-color: #f4f4f4;
        color: #ef951a;
    }

    .height164 {
        cursor: pointer;
        z-index: 52;
        color: #6e6e6e;
        /*border-radius: 4px;*/
        position: absolute;
        top: 50px;
        right: 5.4%;
        font-size: 14px;
        height: 164px;
        width: 95px;
        background-color: white;
        -webkit-box-shadow: #A6A6A6 0px 3px 5px;
        -moz-box-shadow: #A6A6A6 0px 3px 5px;
        box-shadow: #A6A6A6 0px 3px 5px;
    }
</style>
