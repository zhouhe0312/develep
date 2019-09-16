const constants = {
     //上传URL
     uploadUrl: process.env.VUE_APP_BASE_API + "/fileserver/file/upload",
     //下载URL
     downloadUrl: process.env.VUE_APP_BASE_API + "/fileserver/file/download/",
     //预览URL
     videoUrl: process.env.VUE_APP_BASE_API + "/fileserver/file/video/"
}

export { constants }