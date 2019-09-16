<template>
    <div id="personData">
        <el-row>
            <el-col id="personData_Div">
                <el-col :span="24" style="font-size: 16px;color: #333;font-weight: bold;margin-top: 30px">
                    <span>个人资料</span>
                </el-col>
                <el-col :span="24">
                    <div class="uploadOn">点击上传</div>
                </el-col>
                <el-upload
                        :action="actionUrl"
                        :headers="headers"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :on-progress="progressAce"
                        :on-success="onSuccess"
                        :limit="1" style="margin-bottom: 30px;">
                    <img v-if="userInfo.avatar" style="width: 100%;height: 100%;border-radius: 50%" :src="downloadUrl(userInfo.avatar)" alt="">
                    <img v-else style="width: 100%;height: 100%;border-radius: 50%"  src="../../assets/images/default.jpg" alt="">
                    <!--<i class="el-icon-plus"></i>-->
                </el-upload>
                <!--            <el-dialog :visible.sync="dialogVisible">-->
                <!--                <img width="100%" :src="dialogImageUrl" alt="">-->
                <!--            </el-dialog>-->

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="account" class="personalData ">
                        <el-input v-model="ruleForm.account" readonly="readonly"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name" class="personalData">
                        <el-input v-model="ruleForm.name" ref="userName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="resource" class="personalData" style="text-align: left;">
                        <el-radio-group v-model="ruleForm.resource" ref="userResource">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" class="personalData">
                        <el-input v-model.trim="ruleForm.phone" ref="userPhone" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item
                            class="personalData"
                            prop="email"
                            label="邮箱">
                        <el-input v-model="ruleForm.email" ref="userEmail"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" class="DataBon" round @click="submitForm('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>




        </el-row>
    </div>
</template>

<script>
    import {getValue} from  '@/util/localStorage'
    import { constants } from "@/util/common";
    export default {
        name: "personalData",
        data(){
            return{
                IDname:[],
                fileList:[],
                actionUrl:process.env.VUE_APP_BASE_API+"/fileserver/file/upload",
                headers:{},
                dialogImageUrl: '',
                dialogVisible: true,
                ruleForm:{
                    id:'',
                    name:"",
                    resource:"",
                    account:'',
                    phone:'',
                    nickname:'',
                    email:'',
                    avatar:''
                },
                rules:{
                    phone:[
                        { required: false, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11 个数字', trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2到4 个汉字', trigger: 'blur' }
                    ],
                    nickname:[
                        { required: false, message: '请输入您的昵称', trigger: 'blur' },
                        { min: 2, max: 6, message: '长度在 2到6 个字', trigger: 'blur' }
                    ],
                },
                userInfo: {
                    avatar: ""              // 初始图片
                },
                baseDownloadUrl: constants.downloadUrl,
            }
        },
        mounted(){
            // 获取用户屏幕分辨率
             let clientHeight =screen.availHeight
            // console.log(clientHeight)
            // let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('#personData')
            DIV.style.minHeight = (clientHeight - 191) + 'px'
            let DivPerson = document.getElementById("personData_Div")
            // console.log(DivPerson)
            // console.log(DIV.style.minHeight)
            DivPerson.style.height=(clientHeight-220)+"px"
            if (clientHeight<=738){
                // console.log(clientHeight)
                let DivPerson = document.getElementById("personData_Div")
                let uploadOn = document.getElementsByClassName("uploadOn")
                DivPerson.style.height=(clientHeight-225)+"px"
                let inputHeight = document.getElementsByClassName("el-input__inner")
                let inputDivHeight = document.getElementsByClassName("personalData")
                let DataBon = document.getElementsByClassName("DataBon")
                let DivHeight = document.getElementsByClassName("demo-ruleForm")
                DivHeight[0].style.marginBottom="-20px"
                DataBon[0].style.marginTop="10px"
                uploadOn[0].style.marginTop="5px"
                // console.log(inputHeight)
                for (let i=0;i<inputHeight.length;i++){
                    inputHeight[i].style.height="30px"
                    inputDivHeight[i].style.height="30px"
                }
            }
            if (clientHeight>738){
                // console.log(clientHeight)
                let inputHeight = document.getElementsByClassName("el-input__inner")
                let inputDivHeight = document.getElementsByClassName("personalData")
                let DivHeight = document.getElementsByClassName("demo-ruleForm")
                let DataBon = document.getElementsByClassName("DataBon")
                DivHeight[0].style.marginBottom="-20px"
                DataBon[0].style.marginTop="15px"
                // console.log(inputHeight)
                for (let i=0;i<inputHeight.length;i++){
                    inputHeight[i].style.height="40px"
                    inputDivHeight[i].style.height="35px"
                }
            }


            this.IndexID();
            this.HeadPortrait();
            this.beforeAvatarUpload();
            this.baseHeadtype()
        },
        methods:{

            baseHeadtype(){
                let mytou = document.getElementsByClassName("el-upload")
                // console.log(mytou)
                mytou[0].style.webkitBorderRadius="50%"
                mytou[0].style.lineHeight="116px"
                mytou[0].style.height="64px"
                mytou[0].style.width="64px"
                mytou[0].style.border="0px"
            },


            // 用户移入头像显示上方的div
            HeadPortrait(){
                let mytou = document.getElementsByClassName("el-upload")
                let xianshi = document.getElementsByClassName("uploadOn")
                mytou[0].onmouseover = function () {
                    xianshi[0].style.opacity=1
                    xianshi[0].style.transition="all 1s"
                }
                mytou[0].onmouseout = function () {
                    xianshi[0].style.opacity=0
                    xianshi[0].style.transition="all 1s"
                }


            },

            handleRemove(file, fileList) {
                let mytou = document.getElementsByClassName("el-upload")
                mytou[0].style.opacity="1"
                mytou[0].style.display=""

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //文件上传时的钩子
            progressAce(event, file, fileList){
                let mytou = document.getElementsByClassName("el-upload")
                let mytoutwo = document.getElementsByClassName("el-upload-list__item")
                mytoutwo[0].style.transition="0s"
                mytou[0].style.borderRadius="50%"
                mytoutwo[0].style.borderRadius="50%"
                mytoutwo[0].style.width="64px"
                mytoutwo[0].style.height="64px"
                mytoutwo[0].style.border="0px"
                mytou[0].style.opacity="0"
                mytou[0].style.display="none"
                // mytoutwo[0].style.marginLeft="150px"


                // this.headers = {
                //     Authorization:'bearer '+ getValue('token')
                // }
                // console.log(this.headers);
                // let formData = new FormData();
                // formData.append("file",file)
                // this.fileList
            },
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUpload(file) {
                // console.log('1')
                this.headers = {Authorization:'bearer '+ getValue('token')}
                // console.log(this.headers)
                // const isJPG = file.type === 'image/jpeg/';
                // const isPNG = file.type === 'image/png';
                // const isJPEG = file.type === 'image/jpeg';
                // const isBMP = file.type === 'image/bmp';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                //
                // if (!isJPG && !isPNG && !isJPEG &&!isBMP) {
                //     this.$message.error('上传头像图片只能是 JPG和PNG JPEG BMP 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isPNG && isJPEG && isBMP &&  isLt2M;
            },
            onSuccess(file,res,fileList){
                // console.log("成功")
                // console.log(res);
                this.ruleForm.id = res.response.data.id
                // console.log(this.ruleForm.id)
                // this.ruleForm.avatar = res.data
                // console.log(file);
                // console.log(fileList)  // 这里可以获得上传成功的相关信息
            },



            IndexID(){
                this.$store.dispatch('personal/detailsAct').then(()=>{
                    this.userDetails = this.$store.state.personal.details;
                    // console.log(this. userDetails)
                    this.ruleForm.account=this.userDetails.acount;
                    this.ruleForm.name = this.userDetails.username;
                    this.ruleForm.phone = this.userDetails.phone;
                    this.ruleForm.email = this.userDetails.email;
                    this.ruleForm.nickname=this.userDetails.nickname;
                    this.userInfo.avatar = this.userDetails.avatar;
                    // console.log(this.ruleForm.avatar)
                    let userId = this.userDetails.id
                    // console.log(userId)
                    let mysex = this.userDetails.sex;
                    if (mysex==1){
                        this.ruleForm.resource="男"
                    }else if (mysex==0) {
                        this.ruleForm.resource="女"
                    }
                }).catch(()=>{

                })
            },
            //获取到个人信息发起然后修改请求
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.getUserNickname = this.$refs.userNickname.value;    //这里是获取到昵称
                        this.getUserUserName = this.$refs.userName.value;
                        this.getUserPhone = this.$refs.userPhone.value;
                        this.getUserEmail = this.$refs.userEmail.value;
                        this.getUserSex = this.$refs.userResource.value;
                        if (this.getUserSex=='女'){
                            this.getUserSex=0
                        }else if (this.getUserSex=='男') {
                            this.getUserSex=1
                        }
                        // console.log("getUserSex")
                        this.getUserId = this.userDetails.id;/*获取到用户ID*/
                        let userModifyInfo = {
                            id:this.getUserId,
                            // nickname:this.getUserNickname,
                            username:this.getUserUserName,
                            sex:this.getUserSex,
                            phone:this.getUserPhone,
                            email:this.getUserEmail,
                            avatar:this.ruleForm.id,
                        }
                        this.$store.dispatch('personal/updateUserAct',userModifyInfo).then(() => {
                            this.usechangesinfo = this.$store.state.personal.details;
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.push({
                                path: '/homeContent',
                            })
                            window.location.reload()
                        }).catch(() => {

                        })
                    } else {
                        return false;
                    }
                });
            },
            downloadUrl(fileId) {
                return this.baseDownloadUrl + fileId       //请求获得地址
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
    #personData{
        background-color: white;
    }
    .personalData{
        width: 500px;
        position: relative;
        left: 50%;
        height: 25px;
        margin-left: -290px;
    }

    .item_bock {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:94px;
        width: 300px;
        padding:0px 24px 0px 38px;
        border-bottom: 1px solid #f7f7f7;
        background: #fff;
        margin-left: 43%;
    }
    .head_p {
        height:132px;
    }
    .head_img{
        height: 100px;
    }
    .head_img img{
        width:90px;
        height:90px;
        border-radius:50px
    }


    .setting_right{
        display: flex;
        height: 37px;
        justify-content: flex-end;
        align-items: center;
    }
    /*头像移入出现的div样式*/
    .uploadOn{
        width: 100px;
        height: 30px;
        background-color: black;
        color: white;
        margin-top: 35px;
        line-height: 30px;
        position: relative;
        left: 50%;
        margin-left: -50px;
        margin-bottom: 10px;
        opacity: 0;
        border-radius: 10px;
        cursor: pointer;
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
    #personData_Div{
        margin-top: 15px;
        background-color: white;
        border: 1px solid #ddd;
        width: 1200px;
        position: relative;
        left: 50%;
        margin-left: -600px;
        height: 100%;
    }
    div >>> .el-radio__input.is-checked .el-radio__inner {
        background-color: #F39416;
        border-color: #F39416;
    }
    div >>> .el-radio__input.is-checked+.el-radio__label{
        color: #F39416;
    }
     div>>> .el-input__inner{
        border-radius: 2px !important;
    }

</style>