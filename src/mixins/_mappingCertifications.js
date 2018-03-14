import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import uniqBy from 'lodash/uniqBy'
import flattenDeep from 'lodash/flattenDeep'
import forOwn from 'lodash/forOwn'

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
      var shortened = []
      forOwn(certificationMaps, (mapArr, key) => {
        if (mapArr.filter(cert => cert.code).length) shortened.push(key)
      })
      return shortened
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
