<template>
    <div id="accountSet">
        <el-row>
            <el-col class="accountSet_Div">
                <el-col :span="24" style="font-weight: bold;font-size: 16px;color: #333;margin-top: 20px">
                    <h4>账号设置</h4>
                </el-col>
                <el-col :span="18" :offset="3" style="margin-top: 100px">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="name" class="SettingInput ">
                            <el-input v-model="ruleForm.name" ref="userAccount"></el-input>
                        </el-form-item>
                        <el-form-item label="原密码" prop="originPassword" class="SettingInput ">
                            <el-input type="password" v-model="ruleForm.originPassword" ref="useroriginpwd"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="passWord"  class="SettingInput ">
                            <el-input type="password" v-model="ruleForm.passWord" ref="userNewPwd" autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass"  class="SettingInput ">
                            <el-input type="password" v-model="ruleForm.checkPass" ref="userchckPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" class="DataBon" round @click="submitForm('ruleForm')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {removeValue} from '@/util/localStorage'
    import {constants} from "@/util/common";

    export default {
        name: "accountSet",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.passWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    display2: false,
                    name: '',
                    passWord: '',
                    checkPass: '',
                    originPassword: "",
                },
                rules: {
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    originPassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    passWord: [
                        {validator: validatePass, trigger: 'blur'},
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'},
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                },
            }
        },
        mounted() {
            let clientHeight =screen.availHeight;
            // console.log("屏幕的高度是:"+clientHeight)
            let DIV = document.querySelector('#accountSet')
            DIV.style.minHeight = (clientHeight - 191) + 'px'

            let DivAccountSet = document.getElementsByClassName("accountSet_Div")
            DivAccountSet[0].style.height=(clientHeight-220)+"px"
            // console.log(DivAccountSet)



            this.IndexID();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getUserAccount =this.$refs.userAccount.value;     /*获取到账户*/
                        this.getUserOriginpwd =this.$refs.useroriginpwd.value;    /*获取到原来的密码*/
                        this.getUserNewPwd =this.$refs.userNewPwd.value;          /*获取到新密码*/
                        this.getUserchckPass =this.$refs.userchckPass.value;      /*获取到重复输入的新密码*/
                        this.getUserId = this.userDetails.id;/*获取到用户ID*/
                        const UserUpdatePwdVo ={
                            id:this.getUserId,
                            acount:this.getUserAccount,
                            oldPassword:this.getUserOriginpwd,
                            newPassword:this.getUserNewPwd,
                            repPassword:this.getUserchckPass,
                        };
                        this.$store.dispatch('personal/updatePwdAct',UserUpdatePwdVo).then(() => {
                            this.usechangespwd = this.$store.state.personal.updatePwd;
                            this.$message({
                                message: '修改成功，请重新登陆',
                                type: 'success'
                            });


                            this.display2 = false
                            removeValue('token')
                            removeValue('COURSEDATA')
                            removeValue('TESTDATA')
                            removeValue('SECTIONRESOURCE')
                            removeValue('TESTSECTIONRESOURCE')
                            this.$router.push({
                                path: '/login',
                            })

                        }).catch(() => {
                            // this.$message({
                            //     message: '修改密码失败',
                            //     type: 'success'
                            // });
                        })

                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            IndexID() {
                this.$store.dispatch('personal/detailsAct',).then(() => {
                    this.userDetails = this.$store.state.personal.details;
                    this.ruleForm.name = this.userDetails.acount;
                }).catch(() => {

                })
            },
        },
    }
</script>

<style scoped>
    html,body{
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        overflow: hidden;
    }
    .SettingInput{
        width: 500px;
        position: relative;
        left: 50%;
        margin-left: -290px;

    }
    #accountSet{
        background-color: white;
        width:100%;
        height:100%;
        margin:0 auto;

    }
    .DataBon{
        background-color: #f38916;
        width: 118px;
        height: 36px;
        margin-left: -360px;
    }
    .el-button.is-round{
        border-radius: 2px;
    }
    .DataBon:hover{
        background-color: #ffb351;
    }
    .accountSet_Div{
        background-color: white;
        border: 1px solid #ddd;
        margin-top: 15px;
        margin-bottom: 15px;
        width: 1200px;
        position: relative;
        left:50%;
        margin-left: -600px;
    }
    div>>> .el-input__inner{
        border-radius: 2px !important;
    }

</style>