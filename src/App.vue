<template>
  <div id="app">
    <van-button plain hairline type="danger" @click="show">按钮</van-button>
    <Demo @ljhClick="show"/>
  </div>
</template>

<script>
import Demo from '@/components/Demo'
export default {
  name: 'app',
  created () {
    console.log(this.$listeners, 'listeners')
  },
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
      console.log('hello world')
    },
  }
}
</script>

<style>
</style>
