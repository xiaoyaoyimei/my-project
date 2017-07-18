<style lang="less" scoped>
</style>
<template>
  <router-view></router-view>
</template>
<script>
<<<<<<< HEAD
// import router from "@/router/index.js"
export default {
  name: 'app',
  // router:router
}
</script>
=======
  export default {
    data () {
      return {}
    },
    mounted () {
      this.appShow()
    },
    methods: {
      appShow () {
        const { PAGE_START_TIME } = window
        const END_TIME = new Date().getTime() // 结束时间
        const diffTime = END_TIME - PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('.app-loading').className += ' app-loading-hide'
        }, diffTime > 2000 ? 0 : 2000 - diffTime)
      }
    }
  }
>>>>>>> 8637f76d5e2df444590460b0877e65fecf5b9d1a

</script>
