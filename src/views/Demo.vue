<template>
  <portal
    :header-config="headerConfig"
    :side-menu-config="sideMenuConfig"
    :tab-config="tabConfig"
  >
  </portal>
</template>
<script>
import Vue from 'vue'
import { Portal } from '../../dist/web-layout.common'
import '../../dist/web-layout.css'

Vue.use(Portal)
export default {
  data () {
    return {
      topMenuList: [{
        code: 'q32a',
        title: '店铺管理'
      }, {
        code: 'q3a',
        title: '订单'
      }, {
        code: 'q4qq',
        title: '用户管理'
      }, {
        code: 'qa51',
        title: '信息'
      }],
      sideMenuConfig: {
        props: {
          menuList: [{
            code: 'qa',
            title: '订单',
            icon: 'el-icon-menu'
          }, {
            code: 'qqq',
            title: '用户管理',
            icon: 'el-icon-menu'
          }, {
            code: 'q',
            title: '商品',
            icon: 'el-icon-location',
            children: [{
              code: 'q1',
              title: '组合商品',
              children: [{
                code: 'ada',
                title: '打算'
              }]
            }]
          }, {
            code: 'qa1',
            title: '信息',
            icon: 'el-icon-menu'
          }, {
            code: 'q3a',
            title: '店铺管理',
            icon: 'el-icon-menu'
          }, {
            code: 'sas',
            title: '供应商管理',
            icon: 'el-icon-menu'
          }, {
            code: 'we',
            title: '不知道叫什么',
            icon: 'el-icon-menu'
          }],
          defaultActive: this.$route.name,
          backgroundColor: '#212529',
          textColor: '#ADB5BD',
          activeTextColor: '#fff'
        },
        on: {
          open: (name) => { console.log('下22拉', name) }
        }
      },
      tabList: [{
        name: 'ada',
        label: '打算'
      }],
      activeTab: 'ada'
    }
  },
  created () {
    setTimeout(() => {
      // this.topMenuList = [{
      //   code: 'sas',
      //   title: '供应商管理',
      //   icon: 'el-icon-menu'
      // }, {
      //   code: 'we',
      //   title: '不知道叫什么',
      //   icon: 'el-icon-menu'
      // }]
    }, 15000)
    // this.addTab(this.$route)
  },
  computed: {
    headerConfig () {
      return {
        props: {
          systemName: '系统名称ad',
          menuList: this.topMenuList,
          defaultActive: 'q32a',
          userIcon: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          dropMenus: [{
            code: 'ad',
            title: '用户信息'
          }, {
            code: 'logout',
            title: '退出登录'
          }]
        },
        on: {
          select: (index) => {
            console.log(index)
          },
          command: (name) => { console.log('下拉', name) }
        }
      }
    },
    tabConfig () {
      return {
        props: {
          list: this.tabList,
          active: this.activeTab
        },
        on: {
          'tab-change': this.tabChange
        }
      }
    }
  },
  components: {
    Portal
  },
  watch: {
    $route (newValue) {
      this.addTab(newValue)
    }
  },
  methods: {
    addTab (data) {
      const tabData = {
        label: data.meta.title,
        name: data.name
      }
      // 判断是否在对应激活页下激活
      const curTabActive = data.meta.newTab === false
      this.activeTab = data.name
      const tabIndex = this.tabList.findIndex(item => {
        // tab页签下存在直接激活当前页
        if (item.name === data.name) {
          return true
        }
        // curTabActive为true，查找tab页签是否存在
        if (curTabActive && item.name === data.meta.related) {
          return true
        }
      })
      // 未查找到，新开页面
      if (tabIndex === -1) {
        this.tabList.push(tabData)
        return
      }
      if (curTabActive) {
        this.$set(this.tabList, tabIndex, tabData)
      }
    },
    tabChange (list) {
      this.tabList = list
    }
  }
}
</script>
