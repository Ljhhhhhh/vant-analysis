<template>
  <div id="app">
    <van-button plain hairline type="danger" @click="show" @ljhClick="show">按钮</van-button>
    <Demo @ljhClick="show"/>
    <van-icon name="fail">123</van-icon>
  </div>
</template>

<script>
import Demo from '@/components/Demo'
import Toast from './components/toast'
export default {
  name: 'app',
  components: {
    Demo,
  },
  data() {
    return {
      d: 1
    }
  },
  methods: {
    show() {
      Toast('提示内容');
      // this.$toast.success('toast');
    },
  }
}
</script>

<style>
</style>
