import mapValues from 'lodash/mapValues'
import intersection from 'lodash/intersection'
import values from 'lodash/values'
import flattenDeep from 'lodash/flattenDeep'

export default {
  methods: {
    shortenCertifications(certifications, certMap) {
      const certNames = this.$_.map(certifications, 'title')
      return mapValues(certMap, (cert) => {
        return intersection(cert, certNames)
      })
    },
    flattenCertifications(shortenedCertifications) {
      return flattenDeep(values(shortenedCertifications))
    }
  }
}
