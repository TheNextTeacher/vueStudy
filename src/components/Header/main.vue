<template>
  <a-layout-header class="header">
    <a-menu
      theme="dark"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">
        nav 1
      </a-menu-item>
      <a-menu-item key="2">
        nav 2
      </a-menu-item>
      <a-menu-item key="3">
        nav 3
      </a-menu-item>
    </a-menu>
    <Language></Language>
    <Notice></Notice>
    <el-popover
      placement="bottom-end"
      v-model="noticeVisible"
      popper-class="header-popper"
    >
      <el-tabs :stretch="true" v-model="activeName">
        <el-tab-pane label="通知" name="notice">
          <notice-list></notice-list>
        </el-tab-pane>
        <el-tab-pane label="消息" name="message">
          <notice-list></notice-list>
        </el-tab-pane>
        <el-tab-pane label="待办" name="todos">
          <notice-list></notice-list>
        </el-tab-pane>
      </el-tabs>
      <div
        class="icon-item"
        :class="{
              opened: noticeVisible
            }"
        slot="reference"
      >
        <el-badge :value="12">
          <cc-svg-icon icon-class="notice"></cc-svg-icon>
        </el-badge>
      </div>
    </el-popover>
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
        <cc-svg-icon
          class-name="icon-avatar"
          icon-class="avatar"
        ></cc-svg-icon>
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
    </el-dropdown>
  </a-layout-header>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters, createNamespacedHelpers } from 'vuex'
import { Breadcrumb, BreadcrumbItem, Badge } from 'element-ui'
import NoticeList from '../notice-list'
import Language from '../components/language'
import Notice from '../components/notice'

const { mapState } = createNamespacedHelpers('user')
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Badge.name, Badge)
export default {
  name: 'Header',
  components: {
    NoticeList,
    Language,
    Notice
  },
  data () {
    return {
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
<style lang="scss" scoped>
$headerHeight: 65px;
</style>
