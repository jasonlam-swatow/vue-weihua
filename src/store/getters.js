const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  basicInfo: state => state.business.basicInfo,
  certInfo: state => state.business.certInfo,
  vehicleTypes: state => state.dict.vehicleTypes
}
export default getters
