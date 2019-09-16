<template>
    <div id="DIV" style="background-color: #FFFFFF;">
        <el-row class="icon_btn">
            <el-col :span="10">
                <div class="grid-content paddingIn" style="text-align: left">
                    <span style="color: #666;font-size: 12px"><router-link to="/">首页 </router-link></span>
                    <span style="color: #666;font-size: 12px" class="cursor" @click="backToPre"> > 知识库</span>
                    <span style="color: #F39416;font-size: 12px" class="cursor"> > {{ this.name }}</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <!--  左   -->
                        <div class="treeBox" style="border: 1px solid #DDDDDD;width: 233px;overflow-y: auto;padding-bottom: 9px;padding-top: 8px;background-color: #ffffff;opacity: 1;z-index: 5">
                                <el-tree
                                        :data="data"
                                        :props="defaultProps"
                                        @node-click="handleNodeClick">
                                <span class="slot-t-node" slot-scope="{ node, data }" style="background-color: #fff;">
                                    <p style="margin: 0;text-align: left;font-size: 14px;max-width: 212px;height: 40px;line-height: 40px;background-color: #fff;" class="line-limit-length" >{{ node.label }}</p>
                                </span>
                                </el-tree>
                        </div>
                    <!-- 右 -->
                    <el-col class="InHeight" :span="20" style="margin-bottom: 10px;background-color: white;width: 985px">
                        <div class="grid-content" style="background-color: white;text-align: left;padding: 0 25px">
                            <router-view :key="$route.fullPath"></router-view>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "knowledgesDetails",
        data() {
            return {
                name: '',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                id: '',
            }
        },
        created() {
            this.getTree()
            this.name = this.$route.query.name
        },
        mounted(){
            // let clientHeight = document.documentElement.clientHeight
            // let DIV = document.querySelector('.leftDIV')
            let icon_btn = document.querySelector('.icon_btn')
            // DIV.style.height = (clientHeight - 180) + 'px'
            let clientWidth = document.documentElement.clientWidth
            let clientHeight = document.documentElement.clientHeight
            let DIV3 = document.querySelector('.treeBox')
            let DIV2 = document.querySelector('.InHeight')
            DIV3.style.marginLeft = (clientWidth - 1200)/2 + 'px'
            DIV3.style.maxHeight = (clientHeight - 150) + 'px'
            icon_btn.style.marginLeft = (clientWidth - 1200)/2 + 'px'
            DIV2.style.marginLeft = (clientWidth - 1200)/2 + 240 + 'px'
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let scrollTopObj = document.querySelector('.treeBox')
                // console.log(scrollTop)
                if (scrollTopObj !=null) {
                    if (scrollTop >= 106) {
                        scrollTopObj.style.top = 0
                    } else {
                        scrollTopObj.style.top = 113 + 'px'
                    }
                }
            },
            // 回到上一页
            backToPre() {
                this.$router.push({
                    path: '/knowledgesLists',
                })
            },
            // 树形点击事件
            handleNodeClick(data) {
                 // console.log(data)
                this.$router.push({
                    path: '/detailsPaper',
                    query: {
                        pid: data.pid,
                        name:this.$route.query.name,
                        filename:this.$route.query.filename,
                    }
                })
            },
            //  请求树形数据
            getTree() {
                this.id = this.$route.query.pid
                // console.log(this.$route.query.pid)
                this.$store.dispatch("knowledges/treeAct", this.id).then(() => {
                    this.data = this.$store.state.knowledges.treeDate[0].children
                    // console.log(this.data)
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped>
    #DIV{
        padding-bottom: 40px;
    }
    .paddingIn {
        padding-top: 24px;
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: #606266;
    }

    a:hover {
        text-decoration: none;

    }

    .cursor {
        cursor: pointer;
    }
    .line-limit-length {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .line-limit-length:hover{
        width: auto;
    }
    .treeBox{
        background-color: white;
        width: 240px;
        position: fixed;
        padding: 5px 5px;
        top: 112px;
    }
    .treeBox::-webkit-scrollbar {
        width:0 !important;   /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */  /*隐藏滚动条内容依然可以用*/
    }

</style>
