<template>
  <footer class="footer-bar">
    <p>Copyright &copy; 2016-2017</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
.footer-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footerHeight;
  background-color: #282828;
  z-index: map-get($zIndex, drone);

  p {
    margin: 0;
    color: #666;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>