
<script>
/**
 * tab页签组件
 * props:
 *  list: Array tab页签列表
 *  active: String 激活项
 * on:
 *  tab-change: tab列表数据变化，参数：tab页签列表
 */
export default {
  name: 'Tab',
  inheritAttrs: false,
  inject: ['linkType', 'parent'],
  props: {
    list: {
      type: Array,
      default: () => []
    },
    active: String,
    immediately: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeTab: '', // 激活项
      tabList: [] // tab页签列表
    }
  },
  created () {
    if (!this.immediately) return
    this.activeTab = this.active
    this.tabList = [...this.list]
    this.addTab({
      label: this.$route.meta.title,
      name: this.linkType === 'name' ? this.$route.name : this.$route.path,
      meta: this.$route.meta
    })
  },
  watch: {
    active (newValue) {
      this.activeTab = newValue
    },
    list (newValue) {
      this.tabList = newValue
    }
  },
  methods: {
    clickTab () { // 激活tab项
      this.link(this.activeTab)
    },
    link (to) { // 跳转
      const route = this.linkType === 'name' ? {
        name: to
      } : {
        path: to
      }
      this.$router.push(route, () => {})
    },
    removeCachePage (name) {
      this.parent.removeCachePage(name)
    },
    addTab (data) {
      // 添加页签
      this.activeTab = data.name
      // 查找tab页签中是否已经包含
      const tabIndex = this.tabList.findIndex(item => item.name === data.name)
      // 未查找到，新开页面
      if (tabIndex === -1) {
        this.tabList.push(data)
        this.tabListChange()
      }
    },
    removeTab (targetName) { // 删除tab
      const tabs = this.tabList
      let activeName = this.activeTab
      // 删除激活页签，判断下一个激活页签是什么
      const tabData = tabs.find((tab, index) => {
        if (tab.name === targetName) {
          if (activeName === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
          return true
        }
      })

      this.activeTab = activeName
      this.tabList = tabs.filter(tab => tab.name !== targetName)
      this.removeCachePage(tabData.meta.componentName)
      this.clickTab()
      this.tabListChange()
    },
    onCommand (command) { // 快捷关闭页签
      const [tabList, fixedList] = [[], []]
      this.tabList.forEach(item => {
        if (item.fixed === true) {
          fixedList.push(item)
        } else {
          tabList.push(item)
        }
      })
      const currentIndex = tabList.findIndex(tab => tab.name === this.activeTab)

      switch (command) {
        case 'other': // 关闭其他
          this.tabList = tabList.filter(tab => tab.name === this.activeTab)
          break
        case 'left': // 关闭左侧
          this.tabList = tabList.slice(currentIndex)
          break
        case 'right': // 关闭右侧
          this.tabList = tabList.slice(0, currentIndex + 1)
          break
        case 'all': // 全部关闭
          this.handleAll(fixedList[0])
          break
      }
      // 将固定页签与处理后的页签拼接
      this.tabList = [].concat(fixedList, this.tabList)
      const cacheList = this.tabList.filter(item => item.meta && item.meta.componentName).map(item => item.meta.componentName)
      this.parent.cachePages = cacheList
      this.tabListChange()
    },
    handleAll (data) {
      if (data && data.name) {
        this.activeTab = data.name
        this.link(this.activeTab)
      } else {
        this.activeTab = '/'
        this.$router.push('/', () => {})
      }
      this.tabList = []
    },
    tabListChange () { // tab变更
      this.$emit('tab-change', this.tabList)
    },
    renderTabs () {
      const { $attrs, $listeners } = this
      const h = this.$createElement
      return h('el-tabs', {
        props: {
          value: this.activeTab,
          type: 'card',
          ...$attrs
        },
        class: 'tab-nav',
        on: {
          'tab-click': this.clickTab,
          'tab-remove': this.removeTab,
          input: value => { this.activeTab = value },
          ...$listeners
        }
      }, [
        this.renderTabPane()
      ])
    },
    renderTabPane () {
      const h = this.$createElement
      return this.tabList.map(tab => {
        return h('el-tab-pane', {
          props: {
            label: tab.label,
            name: tab.name,
            closable: tab.fixed !== true
          }
        })
      })
    },
    renderDropDown () {
      const { $listeners } = this
      const h = this.$createElement
      return h('el-dropdown', {
        class: 'drop-content',
        on: {
          command: this.onCommand,
          ...$listeners
        }
      }, [
        h('i', { class: 'el-icon-menu' }),
        this.renderDropDownMenu()
      ])
    },
    renderDropDownMenu () {
      const h = this.$createElement
      return h('el-dropdown-menu', {
        slot: 'dropdown'
      }, [
        this.renderDropDownItem()
      ])
    },
    renderDropDownItem () {
      const h = this.$createElement
      const itemList = [{
        icon: 'el-icon-close',
        command: 'other',
        text: '关闭其他'
      }, {
        icon: 'el-icon-back',
        command: 'left',
        text: '关闭左侧'
      }, {
        icon: 'el-icon-right',
        command: 'right',
        text: '关闭右侧'
      }, {
        icon: 'el-icon-close',
        command: 'all',
        text: '全部关闭'
      }]
      return itemList.map(item => {
        return h('el-dropdown-item', {
          props: {
            icon: item.icon,
            command: item.command
          }
        }, item.text)
      })
    }
  },
  render (h) {
    if (this.tabList.length) {
      return h('div', {
        class: 'tab-container'
      }, [
        this.renderTabs(),
        this.renderDropDown()
      ])
    } else {
      return h()
    }
  }
}
</script>
<style lang="scss" scoped>
$icon-width: 30px;
.tab-container {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  .tab-nav {
    width: calc(100% - #{$icon-width});
    ::v-deep .el-tabs__header {
      border-bottom: 0;
      margin: 0;
    }
    ::v-deep .el-tabs__header .el-tabs__item {
      border: 0;
      color: #495057;
      outline: none;
      &:focus.is-active.is-focus:not(:active) {
        box-shadow: none !important;
      }
      &:hover {
        background: #F8F9FA;
      }
      &.is-active {
        color: #212529;
        border-bottom: 2px solid #155DDF;
      }
    }
    ::v-deep .el-tabs__header .el-tabs__nav {
      border: 0;
    }
  }
  .drop-content {
    width: $icon-width;
    text-align: right;
  }
}
</style>
