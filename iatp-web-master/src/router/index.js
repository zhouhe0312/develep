import Vue from 'vue'
import Router from 'vue-router'
import homeContent from '@/views/homeContent/homeContent'
import userAgreement from '@/views/userAgreement/userAgreement'
import checkAssessment from '@/views/Checkass/checkAssessment'
import startAssessment from '@/views/Startass/startAssessment'
import courseAssessment from '@/views/Courseass/courseAssessment'
import myQuestion from '@/views/Question/myQuestion'
import login from '@/components/login/login'
import registered from '@/components/registered/registered'
import Home from '../views/Home'
import personData from "@/views/personal/personData"
import accountSet from "@/views/personal/accountSet"
import myQuestionTwo from "@/views/Question/myQuestionTwo"
import examination from  "@/views/examinationTest/examination"
import myQuestionTheer from  "@/views/Question/myQuestionTheer"
import knowledges from '@/views/knowledges/knowledges'
import knowledgesLists from '@/views/knowledges/knowledgesLists'
import knowledgesDetails from '@/views/knowledges/knowledgesDetails'
import detailsPaper from '@/views/knowledges/detailsPaper'
// import onlineCourses from '@/views/onlineCourses/onlineCourses'

/////////////////课程/实验///////////////////////////
import courseAllList from "@/views/courseManage/courseAllList"
import courseSection from  "@/views/courseManage/courseSection"
import courseSectionStudy from '@/views/courseManage/courseSectionStudy'
import testAllList from "@/views/testManage/testAllList"
import testSection from  "@/views/testManage/testSection"
import testSectionStudy from '@/views/testManage/testSectionStudy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // 页头页尾
      path: '/',
      name: 'Home',
      component: Home,
      meta:{showFooter:true,showHeader:true},
      redirect: '/homeContent',
      children: [
        {
          // 首页
          path: '/homeContent',
          name: 'homeContent',
          meta:{showFooter:true,showHeader:true},
          component: homeContent
        }
          ,{
        // 课程考核/实验考核
        path: '/courseAssessment',
        name: 'courseAssessment',
        meta:{showFooter:true,showHeader:true},
        component: courseAssessment
      }
        ,{
          // 查看考核
          path: '/checkAssessment',
          name: 'checkAssessment',
          meta:{showFooter:true,showHeader:true},
          component: checkAssessment
        }
        ,{
          // 开始考核
          path: '/startAssessment',
          name: 'startAssessment',
          meta:{showFooter:true,showHeader:true},
          component: startAssessment
        }
        ,{
          // 知识库
          path: '/knowledges',
          name: 'knowledges',
          meta:{showFooter:true,showHeader:true},
          component: knowledges,
          redirect:'/knowledgesLists',
              children: [{
                  path: '/knowledgesLists',
                  name: 'knowledgesLists',
                  meta:{showFooter:true,showHeader:true},
                  component: knowledgesLists,
              }]
        },
        {
          // 知识库详情
          path: '/knowledgesDetails',
          name: 'knowledgesDetails',
          meta:{showFooter:true,showHeader:true},
          component: knowledgesDetails,
          redirect:detailsPaper,
          children: [{
            path: '/detailsPaper',
            name: 'detailsPaper',
            meta:{showFooter:true,showHeader:true},
            component: detailsPaper,
          }]
        }
        ,
        {
          // 我的题库
          path: '/myQuestion',
          name: 'myQuestion',
          component: myQuestion,
          meta:{showFooter:true,showHeader:true},
          redirect:"/myQuestionTwo",
          children:[
            {
              path:"/myQuestionTwo",
              name:"myQuestionTwo",
              meta:{showFooter:true,showHeader:true},
              component:myQuestionTwo,
            },
            {
              path:"/myQuestionTheer",
              name:"myQuestionTheer",
              meta:{showFooter:true,showHeader:true},
              component:myQuestionTheer,
            },
          ]
        },
          // 查看已答试卷
          {
              path: '/examination',
              name: 'examination',
              meta:{showFooter:true,showHeader:true},
              component: examination
          },
        {
          // 个人资料
          path: '/personData',
          name: 'personData',
          meta:{showFooter:true,showHeader:true},
          component: personData
        }

        ,{
          // 账号设置
          path: '/accountSet',
          name: 'accountSet',
          meta:{showFooter:true,showHeader:true},
          component: accountSet
        },
         /////////课程////////////
        {
          // 课程列表（1级页面）
          path: '/courseAllList',
          name: 'courseAllList',
          meta:{showFooter:true,showHeader:true},
          component: courseAllList
        },
        {
          // 课程章节（2级页面）
          path: '/courseSection',
          name: 'courseSection',
          meta:{showFooter:true,showHeader:true,keepAlive:false},
          component: courseSection
        },
        {
          // 章节学习和考试（3级页面）
          path: '/courseSectionStudy',
          name: 'courseSectionStudy',
          meta:{showFooter:false,showHeader:false},          
          component: courseSectionStudy
        },

        /////////实验///////////
        {
        // 实验列表（1级页面）
         path: '/testAllList',
         name: 'testAllList',
         meta:{showFooter:true,showHeader:true},
         component: testAllList
       },
       {
         // 实验章节（2级页面）
         path: '/testSection',
         name: 'testSection',
         meta:{showFooter:true,showHeader:true,keepAlive:false},
         component: testSection
       },
       {
          // 章节学习和考试（3级页面）
          path: '/testSectionStudy',
          name: 'testSectionStudy',
          meta:{showFooter:false,showHeader:false},
          component: testSectionStudy
        },
        {
          // 用户协议
          path: '/userAgreement',
          name: 'userAgreement',
          meta:{showFooter:true,showHeader:true},
          component: userAgreement
        },
        // {
        //   // 帮助中心
        //   path: '/onlineCourses',
        //   name: 'onlineCourses',
        //  meta:{showFooter:false,showHeader:false},//是否显示底部和头部
        //   component: onlineCourses
        // }
        // ,{
        //   // 关于我们
        //   path: '/onlineCourses',
        //   name: 'onlineCourses',
        //   meta:{showFooter:false,showHeader:false},
        //   component: onlineCourses
        // }
        // ,{
        //   // 人才招聘
        //   path: '/onlineCourses',
        //   name: 'onlineCourses',
        //   meta:{showFooter:false,showHeader:false},
        //   component: onlineCourses
        // }
        // ,{
        //   // 企业合作
        //   path: '/onlineCourses',
        //   name: 'onlineCourses',
        //   meta:{showFooter:false,showHeader:false},
        //   component: onlineCourses
        // }
      ]
    },
    {
      // 登录页面
      path: '/login',
      name: 'login',
      meta:{showFooter:false,showHeader:false},
      component: login
    },{
      // 注册页面
      path: '/registered',
      name: 'registered',
      meta:{showFooter:false,showHeader:false},
      component: registered
    },
  ]
})
