<template>
  <el-header>
    <div class="left">
      <div class="system-info">
        <el-avatar :src="systemIcon"></el-avatar>
        <span class="system-name">{{ systemName }}</span>
      </div>
      <top-menu
        mode="horizontal"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        v-bind="$attrs"
        v-on="$listeners"
      ></top-menu>
    </div>
    <div class="right">
      <span class="user-name" v-if="userName">{{ userName }}</span>
      <el-dropdown v-on="$listeners">
        <div class="el-dropdown-link user-content">
          <el-avatar :src="userIcon"></el-avatar>
          <i class="el-icon-caret-bottom" v-if="dropMenus.length"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in dropMenus"
            :key="item.code"
            :command="item.code">
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
/**
 * 顶部组件
 * 内容：系统信息（系统图标，系统名称），顶部菜单导航，下拉菜单
 * props:
 *  menu-list: Array 菜单列表数据
 *    {
        code: 'qa',
        title: '订单',
        icon: 'el-icon-menu',
        children: [] // 孩子节点
      }
 *  system-icon: String 系统图标url
 *  system-name: String 系统名称
 *  user-icon: String 用户图标url
 *  drop-menus: Array 下拉菜单 { code: xx, title: xx }
 *  其他props见element-ui NavMenu组件pro
 * on: 事件
 *  element-ui NavMenu组件的事件
 *  element-ui Dropdown组件的事件
 */
import TopMenu from '@/components/menu'
export default {
  name: 'XsHeader',
  inheritAttrs: false,
  props: {
    systemIcon: { // 系统图标
      type: String,
      default: 'https://tse1-mm.cn.bing.net/th?id=OIP._SRhcWEOl7fBDC56IUzdrQHaNK&w=62&h=110&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2'
    },
    systemName: String, // 系统名称
    backgroundColor: { // 菜单背景色
      type: String,
      default: '#111518'
    },
    textColor: { // 菜单文字颜色
      type: String,
      default: '#ADB5BD'
    },
    activeTextColor: { // 菜单激活文字颜色
      type: String,
      default: '#fff'
    },
    userName: String, // 用户名称
    userIcon: String, // 用户图标
    dropMenus: { // 下拉菜单
      type: Array,
      default: () => []
    }
  },
  components: {
    TopMenu
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111518;
  color: #E9ECEF;
  padding: 0 10px;
  ::v-deep .el-menu-item.is-active {
    background-color: #343A40 !important;
    border-bottom: 0;
  }
  ::v-deep .el-menu--horizontal>.el-menu-item {
    border-bottom: 0;
  }
  .system-name {
    margin-left: 10px;
  }
  .system-info {
    display: flex;
    align-items: center;
    width: 210px;
  }
  .left, .right, .user-content {
    display: flex;
    align-items: center;
  }
  .user-name {
    margin-right: 10px;
  }
  .user-content {
    color: #fff;
  }
}
</style>
