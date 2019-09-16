<template>
    <div id="DIV" style="background-color: #ffffff;">
        <div class="padding_in" style="text-align: left;font-size: 12px;width: 1200px;margin: 0 auto;">
            <span class="cursor"><span style="color: #666;font-size: 12px"><router-link to="/">首页 > </router-link></span></span>
            <span class="cursor"><span style="color: #F39416;font-size: 12px">知识库</span></span>
        </div>
        <div style="width: 1200px;margin: 0 auto;">
            <el-row>
                    <!--  左   -->
                <el-col :span="5" style="width: 230px">
                        <div class="grid-content" style="padding-right: 20px">
                            <el-col :span="24">
                                <div class="grid-content"
                                     style="background-color: white;text-align: center;padding: 2px 0 0 0;border: 1px solid #dddddd;border-radius: unset;">
                                    <input type="text" placeholder="输入搜索内容" style="width: 80%;height: 30px;border: none"
                                           v-model="inputS" @keyup.enter.native="inconSea">
                                    <i class="el-icon-search" style="cursor: pointer" @click="inconSea"></i>
<!--                                    <div class="line"></div>-->
                                </div>
                            </el-col>
                            <el-col :span="24" style="margin-top: 15px;">
                                <div class="grid-content knowHeight" style="background-color: white;overflow-y: auto;border: 1px solid #DDDDDD;border-radius: unset;max-height: 675px">
                                    <el-row>
                                        <el-col :span="24" style="height: 40px">
                                            <div class="grid-content"
                                                 style="text-align: left;padding-top: 0;padding-left: 6%;height: 40px;">
                                                <p style="font-weight: bolder;font-size: 14px;margin: 4% 0 0 0"><i class="el-icon-collection"></i>&nbsp;&nbsp;
                                                    知识类型</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div id="knowledgesLists">
                                        <el-row v-for="(item,index) in list"  :key="index">
                                            <el-col :span="24">
                                                <div class="grid-content items hoverColor" @click="chooseItem(item.name,item.value,$event)">
                                                    <p style="font-size: 14px;margin: 9px 0 0 0;display: inline-block;max-width: 150px;float: left" class="line-limit-length">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p><p style="font-size: 14px;margin: 9px 0 0 0">（{{ item.count }}）</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </el-col>
                    <!--  右  -->
                <el-col :span="19" style="width: 970px;margin-top: -17px">
                    <div class="grid-content" style="background-color: white;text-align: left;padding: 0 0">
                        <router-view :key="$route.fullPath"></router-view>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "knowledges",
        data() {
            return {
                inputS: '',
                list:[],
                knowledgesList:{
                    typeId : '1130721577013395457',
                    key:''
                },
            }
        },
        created() {
            this.getList()
        },
        mounted(){
            let clientHeight = document.documentElement.clientHeight
            let DIV = document.querySelector('#DIV')
            // let DIV2 = document.querySelector('.knowHeight')
            DIV.style.minHeight = (clientHeight - 170) + 'px'
            // DIV2.style.height = (clientHeight - 215) + 'px'
        },
        methods: {
            inconSea() {
                this.$router.push({
                    path:"/knowledgesLists",
                    query:{
                        name:this.inputS,
                    }
                })
                this.getList()
            },
            // list点击
            chooseItem(name,value,ev) {
                let el = ev.currentTarget;
                let length = document.querySelector('#knowledgesLists').children.length
                for (let i=0;i<length;i++) {
                    let children = document.querySelector('#knowledgesLists').children[i].children[0].children[0]
                    children.classList.remove("choosed")
                    children.classList.remove("choose_border")
                }
                el.classList.add("choosed")
                el.classList.add("choose_border")
                if (el.parentElement.parentElement.nextElementSibling != null){
                    el.parentElement.parentElement.nextElementSibling.children[0].children[0].classList.add("choose_border")
                }
                this.$router.push({
                    path:"/knowledgesLists",
                    query:{
                        category:value,
                        // name:name,
                    }
                })
            },
        //  请求list
            getList(){
                this.knowledgesList.key = this.inputS
                this.$store.dispatch("knowledges/categoryListAct", this.knowledgesList).then(() => {
                    this.list = this.$store.state.knowledges.categoryList
                    // console.log(this.list)
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped>

    #DIV{
        /*padding-bottom: 30px;*/
    }
    .padding_in {
        padding: 24px 0;
    }

    input:focus {
        outline: none;
    }

    .line {
        border: 0.5px solid #bfbfbf;
        width: 90%;
        margin-left: 5%;
    }

    p {
        margin: 0;
    }

    .items {
        height: 39px;
        text-align: left;
        border-radius: unset;
        border-top: 1px solid #ececec;
        padding-left: 6%;
        cursor: pointer;
    }
    .choosed {
        background-color: #f39416;
        color: white;
    }
    .choose_border{
        border-top-color: #f8e7d3;
    }
    .hoverColor:hover{
        background-color: #f39416;
        color: white;
    }
    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>