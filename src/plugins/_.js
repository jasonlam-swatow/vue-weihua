import find from 'lodash/find'
import some from 'lodash/some'
import map from 'lodash/map'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import get from 'lodash/get'
import includes from 'lodash/includes'

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$_', { value: {
      find,
      some,
      map,
      filter,
      forEach,
      groupBy,
      get,
      includes
    }})
  }
}
