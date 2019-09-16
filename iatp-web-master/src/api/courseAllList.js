import httpRequest from '@/util/http-request'

//课程，实验分页列表
export function courseList(val) {
    return httpRequest({
        url:"web/course/courseList",
        method:"post",
        data:{
        	"page": {
			    "current": val.current,
			    "size": val.size
			},
		    "params":{
                'classifyId':val.classifyId,
                'classifyPid':val.classifyPid,
                'searcType': val.searcType,
                'type': val.type
		  }
        }
    })
}