<script>
/**
 * portal页组件
 * 由三部分组成顶部，侧边菜单栏，内容区域
 * props:
 *  headerConfig: 顶部配置，见src/components/header/Header.vue组件
 *  sideMenuConfig: 侧边菜单栏配置，见src/components/menu/Menu.vue组件
 *  tabConfig:
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
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    SideMenu,
    TopHeader,
    XsTab
  },
  methods: {
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
          ...props,
          collapse: this.isCollapse
        },
        on
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
          on
        }),
        h('div', {
          class: 'content'
        }, [
          h('router-view')
        ])
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
}
.main-container {
  height: calc(100% - #{$header-height});
}
.content {
  height: calc(100% - 40px);
  overflow: auto;
  box-sizing: border-box;
  padding: 12px 0;
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
  padding: 0 20px;
  overflow: hidden;
  background: #fff;
}
</style>
