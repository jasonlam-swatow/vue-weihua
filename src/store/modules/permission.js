import { getMenus } from '@/api/login'
import { asyncRouterMap, constantRouterMap } from '@/router'

function filterAsyncRouter(asyncRouterMap, menusFromApi) {
  const stringifiedMenus = JSON.stringify(menusFromApi)
  asyncRouterMap.forEach(menu => {
    if (menu.hidden || menu.redirect === '/404') return
    menu.hidden = !stringifiedMenus.includes(menu.name)
    if (menu.children) {
      menu.children.forEach(child => {
        if (!child.hidden) {
          child.hidden = !stringifiedMenus.includes(child.name)
        }
      })
    }
  })
  return asyncRouterMap
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      console.log(routers)
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        getMenus().then(response => {
          const { data } = response
          commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, data))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
