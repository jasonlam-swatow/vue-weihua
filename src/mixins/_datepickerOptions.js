export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // 禁选今日以前的日期
          // var today = new Date()
          // var yesterday = today.setDate(today.getDate() - 1)
          // return time.getTime() < yesterday
          return null
        }
      }
    }
  }
}
