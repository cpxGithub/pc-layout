<script>
/**
 * portal页组件
 * 由三部分组成顶部，侧边菜单栏，内容区域
 * props:
 *  headerConfig: 顶部配置，见src/components/header/Header.vue组件
 *  sideMenuConfig: 侧边菜单栏配置，见src/components/menu/Menu.vue组件
 *  tabConfig: tab页签配置，见src/components/tab/Tab.vue组件
 *  keepAlive: 是否使用keepAlive
 *  linkType: 路由跳转方式 name: 以路由名称跳转，path: 以路由路径跳转
 */
import SideMenu from '@/components/menu'
import TopHeader from '@/components/header'
import XsTab from '@/components/tab'
export default {
  name: 'Portal',
  props: {
    headerConfig: {
      type: Object,
      default: () => {}
    },
    sideMenuConfig: {
      type: Object,
      default: () => {}
    },
    tabConfig: {
      type: Object,
      default: () => {}
    },
    keepAlive: {
      type: Boolean,
      default: true
    },
    linkType: {
      type: String,
      default: 'name'
    }
  },
  provide () {
    return {
      linkType: this.linkType,
      parent: this
    }
  },
  data () {
    return {
      isCollapse: false,
      cachePages: []
    }
  },
  created () {
    this.addCachePage(this.$route.meta.componentName)
  },
  watch: {
    $route (route) {
      this.addCachePage(route.meta.componentName)
    }
  },
  components: {
    SideMenu,
    TopHeader,
    XsTab
  },
  methods: {
    addCachePage (name) {
      // 添加缓存页面
      if (!name) return
      this.cachePages.push(name)
    },
    removeCachePage (name) {
      // 移除缓存页面
      this.cachePages = this.cachePages.filter(item => item !== name)
    },
    renderHeader () {
      // 渲染顶部
      const { props = {}, on } = this.headerConfig || {}
      const h = this.$createElement
      return h('top-header', {
        attrs: { ...props },
        on
      })
    },
    renderContainer () {
      // 渲染内容
      const h = this.$createElement
      return h('el-container', {
        class: 'main-container'
      }, [
        this.renderSideMenu(),
        this.renderMain()
      ])
    },
    renderSideMenu () {
      // 渲染侧边菜单栏
      const h = this.$createElement
      return h('el-aside', {
        props: {
          width: 'auto'
        }
      }, [
        h('el-scrollbar', {
          props: {
            native: false
          },
          style: {
            height: 'calc(100% - 40px)'
          }
        }, [
          this.renderMenu()
        ]),
        this.renderCollapse()
      ])
    },
    renderCollapse () {
      // 渲染收缩节点
      const h = this.$createElement
      return h('div', {
        class: 'collapse',
        on: {
          click: () => { this.isCollapse = !this.isCollapse }
        }
      }, [
        h('i', {
          class: this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        })
      ])
    },
    renderMenu () {
      // 渲染菜单栏
      const { props = {}, on } = this.sideMenuConfig || {}
      const h = this.$createElement
      return h('side-menu', {
        class: 'el-menu-vertical',
        attrs: {
          collapse: this.isCollapse,
          backgroundColor: '#212529',
          textColor: '#ADB5BD',
          activeTextColor: '#fff',
          ...props
        },
        on: {
          select: this.handleSelect,
          ...on
        }
      })
    },
    handleSelect (index) {
      // select事件触发回调
      if (this.$route.name === index) return
      this.link(index)
      this.$emit('select', index)
    },
    link (to) { // 跳转
      const route = this.linkType === 'name' ? {
        name: to
      } : {
        path: to
      }
      this.$router.push(route, route => {
        this.$refs.tab.addTab({
          label: route.meta.title,
          name: this.linkType === 'name' ? route.name : route.path,
          meta: route.meta
        })
      })
    },
    renderMain () {
      // 渲染内容区域
      const { props = {}, on } = this.tabConfig || {}
      const h = this.$createElement
      return h('el-main', [
        h('xs-tab', {
          attrs: {
            ...props
          },
          ref: 'tab',
          on
        }),
        h('div', {
          class: 'content'
        }, [
          this.renderRouterView()
        ])
      ])
    },
    renderRouterView () {
      // 是否使用keep-alive
      const h = this.$createElement
      let child = h('router-view')
      if (this.keepAlive) {
        child = h('keep-alive', {
          props: {
            include: this.cachePages
          }
        }, [
          h('router-view')
        ])
      }
      return h('transition', {
        props: {
          name: 'fade',
          mode: 'out-in'
        }
      }, [
        child
      ])
    }
  },
  render (h) {
    return h('el-container', {
      class: 'container',
      props: {
        direction: 'vertical'
      }
    }, [
      this.renderHeader(),
      this.renderContainer()
    ])
  }
}
</script>
<style lang="scss" scoped>
$header-height: 60px; // 顶部导航栏高度，element-ui默认是60px
.container {
  height: 100%;
  box-sizing: border-box;
  /* fade */
  .fade-leave-active,
  .fade-enter-active {
    transition: all 0.5s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.main-container {
  height: calc(100% - #{$header-height});
}
.content {
  height: calc(100% - 40px);
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
  background: #f0f0f0;
}
.el-aside {
  height: 100%;
  background: #212529;
  color: #ADB5BD;
  box-sizing: border-box;
  ::v-deep .el-menu-vertical:not(.el-menu--collapse) {
    width: 210px;
    box-sizing: border-box;
  }
  ::v-deep .el-menu-item.is-active {
    background-color: #155DDF !important;
  }
  .collapse {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    background: #343A40;
    font-size: 20px;
  }
}
.el-main {
  padding: 0;
  overflow: hidden;
}
</style>
