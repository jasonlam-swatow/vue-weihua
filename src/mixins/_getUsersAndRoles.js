import { getRoleList } from '@/api/settings/roles'
import { getUserList } from '@/api/settings/users'

export default {
  methods: {
    fetchUsersOrRoles(usersOrRoles) {
      const queries = {
        pageNum: 1,
        pageSize: 100
      }
      switch (usersOrRoles) {
        case 'roles':
          return new Promise(resolve => {
            getRoleList(queries).then(res => {
              resolve(res)
            })
          })
        case 'users':
          return new Promise(resolve => {
            getUserList(queries).then(res => {
              resolve(res)
            })
          })
        default:
          break
      }
    }
  }
}
