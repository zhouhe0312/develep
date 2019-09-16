<template>
    <div id="footerHome">
        <el-row>
            <el-col :span="24">
                <span class="footerSpan">Copyright©2019 时代新威 京ICP10064895-921</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "footerHome"
    }
</script>

<style scoped>
    #footerHome{
        background-color: #3c3c3c;
        height: 70px;
    }
    .footerSpan{
        color: #999;
        font-size: 12px;
        line-height: 70px;
    }

</style>