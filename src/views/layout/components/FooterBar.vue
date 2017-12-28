<template>
  <footer class="footer">
    <p>Copyright &copy; 2016-2017</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
}
</script>

<style rel="stylesheet/scss" scoped>
@import '../../../styles/variables.scss';
  .footer {
    /* position: fixed; */
    height: $footerHeight;
    background-color: #282828;
    display: flex;
    justify-content: center;

    p {
      margin: 0;
      color: #666;
      text-align: center;
    }
  }
</style>