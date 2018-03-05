import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import uniqBy from 'lodash/uniqBy'
import omitBy from 'lodash/omitBy'
import flattenDeep from 'lodash/flattenDeep'

export default {
  methods: {
    getCertificationMaps(certifications, certMap) {
      const uniqCertifications = uniqBy(certifications, 'title')
      return mapValues(certMap, collection =>
        this.$_.map(collection, item => ({
          title: item,
          code: this.$_.find(uniqCertifications, ['title', item]) && this.$_.find(uniqCertifications, ['title', item]).code,
          status: this.$_.find(uniqCertifications, ['title', item]) && this.$_.find(uniqCertifications, ['title', item]).status
        }))
      )
    },
    shortenCertifications(certificationMaps) {
      return omitBy(certificationMaps, certMap =>
        this.$_.find(certMap, cert => !cert.path))
    },
    // 枚举属性的一维数组
    flattenCertifications(certificationMaps) {
      // console.log(certificationMaps)
      return flattenDeep(values(certificationMaps))
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
