// import {
//   GET_COMBO,
//   MSG_COMBO_GYS_AREA_TYPE,
//   MSG_COMBO_ROLE_AKSES_TYPE,
//   MSG_COMBO_SATUAN,
//   MSG_COMBO_SATUAN_MATERIAL,
//   MSG_COMBO_TYPE,
//   MSG_COMBO_JENIS_APPROVAL,
//   MSG_COMBO_USER_LIST
// } from "./actionTypes"

// const INIT_STATE = {
//   respGysAreaType: {},
//   respRoleAksesType: {},
//   respSatuan: {},
//   respSatuanMaterial: {},
//   respType: {},
//   respJenisApproval: {},
//   respUserList: {}
// }

// const getComboData = (state = INIT_STATE, action) => {

//   switch (action.type) {
//     case GET_COMBO:
//       return {
//         ...state,
//       }
//     case MSG_COMBO_GYS_AREA_TYPE:
//       return {
//         ...state,
//         respGysAreaType: action.payload,
//       }
//     case MSG_COMBO_ROLE_AKSES_TYPE:
//       return {
//         ...state,
//         respRoleAksesType: action.payload,
//       }
//     case MSG_COMBO_SATUAN:
//       return {
//         ...state,
//         respSatuan: action.payload,
//       }
//     case MSG_COMBO_SATUAN_MATERIAL:
//       return {
//         ...state,
//         respSatuanMaterial: action.payload,
//       }
//     case MSG_COMBO_TYPE:
//       return {
//         ...state,
//         respType: action.payload,
//       }
//     case MSG_COMBO_JENIS_APPROVAL:
//       return {
//         ...state,
//         respJenisApproval: action.payload,
//       }
//       case MSG_COMBO_USER_LIST:
//       return {
//         ...state,
//         respUserList: action.payload,
//       }
//     default:
//       return state
//   }
// }

// export default getComboData