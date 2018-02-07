import mapValues from 'lodash/mapValues'
import intersection from 'lodash/intersection'
import values from 'lodash/values'
import flattenDeep from 'lodash/flattenDeep'
// import { mapGetters } from 'vuex'
// intersection 返回交集
export default {
  // computed: {
  //   ...mapGetters(['certificationStatusTypes'])
  // },
  methods: {
    shortenCertifications(certifications, certMap) {
      const approved = this.$_.filter(certifications, cert => !!cert.code)
      const certNames = this.$_.map(approved, 'title')
      console.log(certNames)
      console.log(certMap)
      return mapValues(certMap, cert => intersection(cert, certNames))
    },
    // 枚举属性的一维数组
    flattenCertifications(shortenedCertifications) {
      console.log(shortenedCertifications)
      return flattenDeep(values(shortenedCertifications))
    },
    // 检查有没有组件已过期
    checkValidity(certifications) {
      if (this.$_.some(certifications, { 'status': 'ABNORMAL' })) {
        return '已过期'
      } else if (this.$_.some(certifications, { 'status': 'ABNORMAL' })) {
        return '将过期'
      } else {
        return '未过期'
      }
    }
  }
}
