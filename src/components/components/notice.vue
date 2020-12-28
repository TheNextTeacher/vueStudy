<template>
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
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      noticeVisible: false,
      activeName: 'notice'
    }
  }
}

</script>
