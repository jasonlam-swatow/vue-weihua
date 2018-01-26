import mapValues from 'lodash/mapValues'
import intersection from 'lodash/intersection'
import values from 'lodash/values'
import flattenDeep from 'lodash/flattenDeep'
// intersection 返回交集
export default {
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
    }
  }
}
