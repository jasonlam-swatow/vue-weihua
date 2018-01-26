const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  permittedRouters: state => state.permission.routers,
  basicInfo: state => state.business.basicInfo,
  certInfo: state => state.business.certInfo,
  vehicleTypes: state => state.dict.vehicleTypes,
  vehicleBusinessTypes: state => state.dict.vehicleBusinessTypes,
  licensePlateTypes: state => state.dict.licensePlateTypes,
  statusTypes: state => state.dict.statusTypes,
  positionTypes: state => state.dict.positionTypes,
  tankerTypes: state => state.dict.tankerTypes,
  genderTypes: state => state.dict.genderTypes,
  enterpriseStatusTypes: state => state.dict.enterpriseStatusTypes,
  enterpriseTypes: state => state.dict.enterpriseTypes,
  businessTypes: state => state.dict.businessTypes
}
export default getters
