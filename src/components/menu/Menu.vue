<script>
/**
 * 菜单组件
 * props:
 *  menu-list: Array 菜单列表数据
 *    {
        code: 'qa',
        title: '订单',
        icon: 'el-icon-menu',
        children: [] // 孩子节点
      }
 *  其他props见element-ui NavMenu组件props
 * on: 事件
 *  element-ui NavMenu组件的事件
 */
export default {
  name: 'Menu',
  inheritAttrs: false,
  inject: ['linkType'],
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    renderMenu (menuList) { // 渲染菜单
      // 有子菜单，渲染子菜单，没有直接渲染对应菜单项
      return menuList.map(item => {
        if (item?.children?.length) {
          return this.subMenu(item)
        }
        return this.menuItem(item)
      })
    },
    renderTilte (data) {
      // 渲染title，传入参数有图标则渲染图标
      const h = this.$createElement
      const { icon, title } = data
      const arr = [
        h('span', { slot: 'title' }, title)
      ]
      if (icon) {
        arr.unshift(h('i', { class: icon }))
      }
      return arr
    },
    menuItem (data) {
      // 渲染菜单项
      const h = this.$createElement
      return h('el-menu-item', {
        props: {
          index: data.code
        }
      }, [this.renderTilte(data)])
    },
    subMenu (data) {
      // 渲染子菜单
      const h = this.$createElement
      return h('el-submenu', {
        props: {
          index: data.code
        }
      }, [
        h('template', {
          slot: 'title'
        }, [this.renderTilte(data)]),
        this.renderMenu(data.children)
      ])
    }
  },
  render (h) {
    if (!this.menuList.length) return
    const { $attrs, $listeners } = this
    return h('el-menu', {
      props: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    }, this.renderMenu(this.menuList))
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  border-right: 0
}
</style>
