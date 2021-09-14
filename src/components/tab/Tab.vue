<template>
  <div class="tab-container" v-show="tabList.length">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="tab-nav"
      closable
      @tab-click="clickTab()"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown class="drop-content" @command="onCommand">
      <i class="el-icon-menu"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-close" command="other">关闭其他</el-dropdown-item>
        <el-dropdown-item icon="el-icon-back" command="left">关闭左侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-right" command="right">关闭右侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-close" command="all">全部关闭</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
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
  props: {
    list: {
      type: Array,
      default: () => []
    },
    active: String
  },
  data () {
    return {
      activeTab: this.$route.name,
      tabList: []
    }
  },
  created () {
    this.activeTab = this.active
    this.tabList = [...this.list]
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
      this.$router.push({ name: this.activeTab })
    },
    removeTab (targetName) { // 删除tab
      const tabs = this.tabList
      let activeName = this.activeTab
      // 删除激活页签，判断下一个激活页签是什么
      if (activeName === targetName) {
        tabs.find((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
            return true
          }
        })
      }

      this.activeTab = activeName
      this.tabList = tabs.filter(tab => tab.name !== targetName)
      this.$router.push({ name: activeName }, () => {})
      this.tabListChange()
    },
    onCommand (command) { // 快捷关闭页签
      const currentIndex = this.tabList.findIndex(tab => tab.name === this.activeTab)
      const tabList = this.tabList.slice(0)
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
          this.tabList = []
          this.activeTab = null
          break
      }
      this.tabListChange()
    },
    tabListChange () { // tab变更
      this.$emit('tab-change', this.tabList)
    }
  }
}
</script>
<style lang="scss" scoped>
$icon-width: 30px;
.tab-container {
  display: flex;
  align-items: center;
  .tab-nav {
    width: calc(100% - #{$icon-width});
    ::v-deep .el-tabs__header {
      border-bottom: 0;
      margin: 0;
    }
    ::v-deep .el-tabs__header .el-tabs__item {
      border: 0;
      color: #495057;
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
