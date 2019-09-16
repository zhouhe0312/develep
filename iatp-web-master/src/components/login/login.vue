<template>
    <div>
        <el-row>
            <el-col :span="3">
                <div style="cursor: pointer;text-align: right" class="grid-content paddingTop" @click="toHome">
                    <img src="@/assets/images/logo_03.jpg" alt="logo">
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content paddingTop2" style="text-align: left;">
                    <p style="font-size:24px;font-weight: bolder;color: black;margin-left: 24px;padding-top: 3px">北京时代新威</p>
                </div>
            </el-col>
            <el-col :span="1" :offset="13">
                <div class="grid-content" style="padding-top: 58%">
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content" style="padding: 31px 0">
<!--                    <el-button type="text" style="color: #f39415;font-size: 14px" @click="toHome">网站首页</el-button>-->
                    <el-button type="text" style="color: black;font-size: 14px">登录</el-button>
                    <el-button type="text" style="color: black;font-size: 14px" @click="toReg">注册</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content no_radius" :style="{backgroundImage: 'url(' + bg + ')'}">
                    <el-row>
<!--                        <el-col :span="12" :offset="6">-->
                            <div class="marginTop" style="background-color: white;width: 720px;height: 362px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <img style="width: 85%;margin-top: 9%" src="@/assets/images/login_03.jpg"
                                                 alt="背景图">
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-row>
                                                <el-col :span="8" :offset="2">
                                                    <div class="grid-content"
                                                         style="padding: 30% 0 25% 0;text-align: left;">
                                                        <img style="width: 90%" src="@/assets/images/logo_03.jpg"
                                                             alt="logo">
                                                    </div>
                                                </el-col>
                                                <el-col :span="6">
                                                    <div class="grid-content"
                                                         style="padding-top: 45%;text-align: left;">
                                                        <span style="font-size: 14px;font-weight: bolder;color: #333">用户登录</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <!--  登录  -->
                                            <el-row>
                                                <el-col :span="23" :offset="1">
                                                    <div class="grid-content">
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content" style="padding-left: 5%">
                                                                    <el-form :model="ruleForm" :rules="rules" ref="ruleName"
                                                                             class="demo-ruleForm" style="width: 92%">
                                                                        <el-form-item prop="name">
                                                                            <el-input v-model="ruleForm.name"
                                                                                      placeholder="请输入用户名"
                                                                                      @keyup.enter.native="onLogin('ruleName')"></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item prop="password">
                                                                            <el-input v-model="ruleForm.password"
                                                                                      placeholder="请输入密码"
                                                                                      type="password"
                                                                                      @keyup.enter.native="onLogin('ruleName')"></el-input>
                                                                        </el-form-item>
                                                                    </el-form>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="1">
                                                                <div class="grid-content" style="padding-left: 0">

                                                                </div>
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <div class="grid-content checkBOX" style="padding-left: 2%;text-align: left">
                                                                    <el-checkbox v-model="checked"><span
                                                                                 style="font-size: 14px;color: #666">下次自动登录</span>
                                                                    </el-checkbox>
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="11" :offset="2">
                                                                <div class="grid-content"
                                                                     style="text-align: right;padding-right: 7%">
                                                                    <span style="font-size: 14px">还没有账号，<span
                                                                            style="cursor: pointer;color: #f49f36"
                                                                            @click="toReg">去注册</span></span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content" style="padding: 7% 2% 10% 0;">
                                                                    <el-button class="BTNColor" type="warning" style="width: 90%;font-size: 16px"
                                                                               @click="onLogin('ruleName')">登录
                                                                    </el-button>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
<!--                        </el-col>-->
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content" style="height: 70px;border-bottom: 1px solid #ceced0">
                    <p style="margin: 0;line-height: 70px;font-size: 12px;color: #999">Copyright©2019 时代新威 京ICP10064895-921</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Bg from '@/assets/images/logo_06.jpg'
    import router from '@/router'

    export default {
        name: "login",
        data() {
            return {
                bg: Bg,
                pass: '',
                checked: false,
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        // { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        // { min:1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            let clientHeight = document.documentElement.clientHeight
            let clientWidth = document.documentElement.clientWidth
            let DIV = document.querySelector('.no_radius')
            let DIV2 = document.querySelector('.marginTop')
            DIV.style.height = (clientHeight - 173) + 'px'
            DIV2.style.marginTop = (clientHeight - 173 - 362)/2 + 'px'
            DIV2.style.marginLeft = (clientWidth - 720)/2 + 'px'
            // console.log(DIV2.style.height)
        },
        methods: {
            onLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch("user/loginAct", this.ruleForm).then(() => {
                            if (this.$route.query.redirect === location.hostname) {
                                this.$router.go(-1)
                            } else {
                                router.push({path: '/'})
                            }
                        }).catch(() => {

                        })
                    } else {
                        this.$message.error('请输入账号和密码');
                        return false;
                    }
                });

            },
            toReg() {
                this.$router.push({
                    path: '/registered'
                })
            },
            //    首页
            toHome(){
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
</script>

<style>
    .el-form-item.is-success .el-input__inner{
        border-color: #F39416!important;
    }
    .el-input__inner:focus{
        border-color: #F39416!important;
    }
    .paddingTop {
        padding: 25px 0;
    }

    .paddingTop2 > p{
       margin: 0;
       line-height: 77px;
        width: 150px;
    }

    .no_radius {
        border-radius: unset;
        /*padding: 0 7%;*/
    }
    .BTNColor{
        background-color: #F39416!important;
    }

</style>

<style scoped>
    .el-form-item.is-success .el-input__inner{
        border-color: #F39416!important;
    }
    .el-input__inner:focus{
        border-color: #F39416!important;
    }
    /*  单选框样式  */
    .checkBOX >>> .el-checkbox__input.is-checked .el-checkbox__inner, el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: #F39416 !important;
        border-color: #F39416 !important;
    }
    .checkBOX >>> .el-checkbox__inner:hover{
        border-color: #7E7E80!important;
    }
    .checkBOX >>> .el-checkbox__input.is-focus,
    .checkBOX >>> .el-checkbox__inner{
        border-color: gray!important;
    }
    .checkBOX >>> .el-checkbox__inner::after{
        border-color: white !important;
    }
</style>
