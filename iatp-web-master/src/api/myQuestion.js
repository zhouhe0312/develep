import httpRequest from '@/util/http-request'


export function wrongList(search) {
    return httpRequest({
        url:"web/exam/wrongList",
        method:"post",
        data:search
    })
}
export function paperResultDetail(value) {
    let url = "web/exam/paperResultDetail" + value
    return httpRequest({
        url:url,
        method:"get",
    })
}