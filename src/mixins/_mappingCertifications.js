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
      const certNames = this.$_.map(certifications, 'title')
      return mapValues(certMap, (cert) => {
        return intersection(cert, certNames)
      })
    },
    // 枚举属性的一维数组
    flattenCertifications(shortenedCertifications) {
      return flattenDeep(values(shortenedCertifications))
    },
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
