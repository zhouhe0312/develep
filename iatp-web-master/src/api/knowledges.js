import httpRequest from '@/util/http-request'
// 知识库类别列表
export function categoryList(Info) {
    if (Info.key ==''){
        // console.log(Info)
        return httpRequest({
            url:"/web/knowledge_info/categoryList",
            method: "post",
            params: {
                'typeId':Info.typeId,
            }
        })
    } else{
        return httpRequest({
            url:"/web/knowledge_info/categoryList",
            method: "post",
            params: {
                'typeId':Info.typeId,
                'key':Info.key
            }
        })
    }
}
// 知识库内容tree
export function tree(Info) {
    return httpRequest({
        url:"/web/knowledge_content/tree",
        method:"post",
        params:{
            pid:Info
        }
    })
}
// 知识库内容列表
export function listAll(Info) {
    return httpRequest({
        url:"/web/knowledge_content/listAll",
        method:"post",
        params:{
            pid:Info
        }
    })
}
// 知识库分页列表
export function knowList(Info) {
    return httpRequest({
        url:"/web/knowledge_info/list",
        method:"post",
        data:Info
    })
}
// 详情
export function Details(Info) {
    return httpRequest({
        url:"/web/knowledge_info/details",
        method:"get",
        params:{
            'id':Info
        }
    })
}
