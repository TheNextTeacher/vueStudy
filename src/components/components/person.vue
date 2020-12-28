<template>
  <el-dropdown
    @visible-change="dropdownVivibleHandle"
    @command="handleDropdownCommand"
  >
    <div
      class="icon-item"
      :class="{
              opened: dropdownVivible
            }"
    >
      <a-avatar icon="user" />
      <span>{{ userName }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in dropdownList"
        :key="item.name"
        :divided="item.divided"
        :command="item"
      >
        <cc-svg-icon :icon-class="item.icon"></cc-svg-icon>
        {{ item.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown></template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'person',
  data () {
    return {
      collapsed: false,
      dropdownVivible: false,
      noticeVisible: false,
      activeName: 'notice',
      dropdownList: [
        {
          name: '个人中心',
          icon: 'person'
        },
        {
          name: '个人设置',
          icon: 'setting'
        },
        {
          name: '退出登录',
          divided: true,
          icon: 'login-out'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userName']),
    ...mapGetters(['getMenuCollapse', 'getBreadcrumbItems'])
  },
  methods: {
    ...mapActions(['MENU_COLLAPSE']),
    handleMenuFold () {
      this.MENU_COLLAPSE(!this.getMenuCollapse)
    },
    dropdownVivibleHandle (visible) {
      this.dropdownVivible = visible
    },
    handleDropdownCommand (dropdownItem) {
      switch (dropdownItem.name) {
        case '退出登录':
          this.$router.replace('/login')
          break
        default:
          this.$message.info(`click on item ${dropdownItem.name}`)
          break
      }
    }
  }
}

</script>
