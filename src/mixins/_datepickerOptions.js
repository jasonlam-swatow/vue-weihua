export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          var today = new Date()
          var yesterday = today.setDate(today.getDate() - 1)
          return time.getTime() < yesterday
        }
      }
    }
  }
}
