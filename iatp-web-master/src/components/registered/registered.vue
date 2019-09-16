<template>
    <div>
        <el-row>
            <el-col :span="3">
                <div style="cursor: pointer;text-align: right" class="grid-content paddingTop" @click="toHome">
                    <img src="@/assets/images/logo_03.jpg" alt="logo">
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content paddingTop2" style="text-align: left">
                    <p style="font-size:24px;font-weight: bolder;color: black;margin-left: 24px;padding-top: 3px">北京时代新威</p>
                </div>
            </el-col>
            <el-col :span="1" :offset="13">
                <div class="grid-content" style="padding-top: 58%">
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content" style="padding: 31px 0">
<!--                    <el-button type="text" style="color: #f29315;font-size: 14px" @click="toHome">网站首页</el-button>-->
                    <el-button type="text" style="color: black;font-size: 14px" @click="toLogin">登录</el-button>
                    <el-button type="text" style="color: black;font-size: 14px">注册</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="registerHeight">
                <div class="grid-content no_radius1" :style="{backgroundImage: 'url(' + bg + ')'}">
                    <el-row class="height100">
<!--                        <el-col :span="12" :offset="6" class="height100">-->
                            <div class="marginTop" style="background-color: white;width:720px;position: absolute;top:50%;left: 50%;margin-top: -190px;margin-left: -360px;padding-bottom: 35px">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <img style="width: 85%;margin-top: 10%" src="@/assets/images/login_03.jpg" alt="背景图">
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-row>
                                                <el-col :span="8" :offset="2">
                                                    <div class="grid-content" style="padding: 29% 0 10% 0;text-align: left;">
                                                        <img style="width: 90%" src="@/assets/images/logo_03.jpg"
                                                             alt="logo">
                                                    </div>
                                                </el-col>
                                                <el-col :span="5">
                                                    <div class="grid-content" style="padding-top: 54%;text-align: left;">
                                                        <span style="font-size: 14px;font-weight: bolder;color: #333">用户注册</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="23" :offset="1">
                                                    <div class="grid-content">
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content">
                                                                    <el-input maxlength="12" style="padding-bottom: 0%;width: 89%;"
                                                                              v-model="form.acount"
                                                                              placeholder="请设置用户名" @keyup.enter.native="toRegister" @blur="nickName" @focus="showName"></el-input>
                                                                </div>
                                                                <p v-if="tips" style="margin: 0;padding: 3% 0 3% 6%;font-size: 12px;color: #f56c6c;text-align:left;width: 90%">用户名必须由4-12个字母或字母+数字组成</p>
                                                                <p v-else style="margin: 0;padding: 3% 0 3% 6%;"></p>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content">
                                                                    <el-input style="padding-bottom: 5%;width: 89%"
                                                                              v-model="form.password" type="password"
                                                                              placeholder="请设置登录密码" @keyup.enter.native="toRegister" @blur="checkPassword" @focus="showTips2"></el-input>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content">
                                                                    <el-input style="padding-bottom: 0;width: 89%"
                                                                              v-model="form.confirmPassword" type="password"
                                                                              placeholder="请再次输入登录密码" @keyup.enter.native="toRegister" @blur="checkPassword" @focus="showTips2"></el-input>
                                                                </div>
                                                                <p v-if="tips2" style="margin: 0;padding: 3% 0 3% 6%;font-size: 12px;color: #f56c6c;text-align: left;width: 89%">{{ this.rules }}</p>
                                                                <p v-else style="margin: 0;padding: 3% 0 3% 6%;"></p>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="1">
                                                                <div class="grid-content">
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="13">
                                                                <div class="grid-content checkBOX2" style="padding-left: 3%;text-align: left">
                                                                    <el-checkbox v-model="checked"></el-checkbox><span style="font-size: 14px;color:#666;cursor: pointer" @click="toUserAgree">阅读并接受用户协议</span>
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <div class="grid-content" style="text-align: right;padding-right: 4%">
                                                                    <span style="font-size: 14px"><span style="cursor: pointer;color: #f49f36" @click="toLogin">登录</span></span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="23">
                                                                <div class="grid-content" style="padding: 0 0 0 0;">
                                                                    <el-button class="BTNColor" type="warning" style="width: 89%;font-size: 16px"
                                                                               @click="toRegister">注册
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
                <div class="grid-content" style="height: 70px;">
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
        name: "registered",
        data() {
            return {
                // 提示1
                tips: false,
                // 提示2
                tips2: false,
                isREG: false,
                isREG2: false,
                rules: '',
                bg: Bg,
                checked: true,
                form: {
                    acount: '',
                    password: '',
                    confirmPassword: ''
                }
            }
        },
        mounted(){
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('.registerHeight')
            let DIV2 = document.querySelector('.no_radius1')
            // let DIV3 = document.querySelector('.marginTop')
            DIV.style.height = (clientHeight - 175) + 'px'
            DIV2.style.height = (clientHeight - 175) + 'px'
            // DIV3.style.marginTop = (clientHeight - 575)/2 + 'px'
            // DIV3.style.marginLeft = (clientWidth - 720)/2 + 'px'
            this.getRules()
        },
        methods: {
            // 注册
            toRegister() {
                this.nickName()
                if (this.checked){
                    if (this.isREG && this.isREG2 && this.form.password == this.form.confirmPassword){
                        this.$store.dispatch("registered/registerAct", this.form).then(() => {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            });
                            this.$router.push({
                                path: '/login'
                            })
                        }).catch(() => {

                        })
                    }
                }else{
                    this.$message({
                        message: '同意并勾选用户协议后才能注册！',
                        type: 'error'
                    });
                }
            },
            // 跳转到登陆
            toLogin() {
                this.$router.push({
                    path: '/login'
                })
            },
        //    首页
            toHome(){
                this.$router.push({
                    path: '/'
                })
            },
        //    密码输入框失去焦点
            checkPassword(){
                this.isREG = false
                // console.log(this.form.password)
                this.$store.dispatch("registered/checkPasswordAct", this.form.password).then(() => {
                    this.isREG = true
                    this.tips2 = false
                }).catch(() => {

                })
            },
            showTips2(){
                this.tips2 = true
            },
            // 获取密码规则
            getRules(){
                this.$store.dispatch("registered/getRulesAct").then(() => {
                    this.rules = this.$store.state.registered.message
                }).catch(() => {

                })
            },
            // 用户名验证
            showName(){
                this.tips = true
            },
            nickName(){
                this.isREG2 = false
                this.tips = true
                let nameReg =/^(?!\d+$)[\da-zA-Z]+$/
                let v=this.form.acount;
                if (nameReg.test(v)){
                    if (v.length>=4 && v.length<=12) {
                        this.tips = false
                        this.isREG2 = true
                    }
                }else{
                    this.$message({
                                    message: '用户名不符合规则！',
                                    type: 'error'
                                });
                }
                // let flag=1;
                // let v=this.form.acount;
                // // [\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
                // let rx = /[a-z\d]/i;
                // let rxcn = /[\u4e00-\u9fa5]/;
                // let num = 0;
                // let chr;
                // for (let i = 0, j = v.length; i < j; i++) {
                //     chr = v.charAt(i);
                //     if (rx.test(chr)) num += 1;
                //     else if (rxcn.test(chr)) num += 2;
                //     else {
                //         flag=3;
                //         break;
                //     }
                // }
                // if(flag!=3){
                //     if (num > 12) {
                //         this.$message({
                //                     message: '长度最多为6个汉字或12个字母数字！',
                //                     type: 'error'
                //                 });
                //         this.tips = true
                //     } else if(num<1){
                //         this.$message({
                //             message: '用户名长度不能为空！',
                //             type: 'error'
                //         });
                //         this.tips = true
                //     }else{
                //         this.tips = false
                //         this.isREG2 = true
                //     }
                // } else{
                //     this.$message({
                //         message: '不能包含特殊符号！',
                //         type: 'error'
                //     });
                //     this.tips = true
                // }
            },
            // 查看用户协议
            toUserAgree(){
                let details = this.$router.resolve({
                    name: "userAgreement",
                });
                window.open(details.href, "_blank")
            }
        }
    }
</script>

<style scoped>
    .paddingTop {
        padding: 25px 0;
    }
    .paddingTop2 > p{
        margin: 0;
        line-height: 77px;
    }
    .height100{
        height: 100%;
    }
    .no_radius1{
        border-radius: unset;
        /*padding: 0 7%;*/
    }
    .BTNColor{
        background-color: #F39416;
    }
    .BTNColor:hover{
        background-color: #ffb351;
    }
        /*  单选框样式  */
    .checkBOX2 >>> .el-checkbox__input.is-checked+.el-checkbox__label{
            color: gray!important;
        }
    .checkBOX2 >>> .el-checkbox__input.is-checked .el-checkbox__inner, el-checkbox__input.is-indeterminate .el-checkbox__inner{
            background-color: #f3f4f6 !important;
            border-color: gray !important;
        }
    .checkBOX2 >>> .el-checkbox__inner:hover{
            border-color: #7E7E80!important;
        }
    .checkBOX2 >>> .el-checkbox__input.is-focus,
        .checkBOX2 >>> .el-checkbox__inner{
            border-color: gray!important;
        }
    .checkBOX2 >>> .el-checkbox__inner::after{
            border-color: #545454 !important;
        }
    .checkBOX2 >>> .el-checkbox{
        width: 18px;
        margin-right: 1px;
    }
</style>
