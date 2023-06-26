
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf } from "./api_helper"

//combo
export const getCombo = req => post("/app001/get-dtlsetting-combo", req)

//app001
export const getData = req => post("/app001/get-all", req)

export const getDataImage = req => getWithXls("/app001/get-file-image", req)

export const getDataPdf = req => getWithPdf("/app001/get-file-image", req)

export const login = req => postLogin("/Member/login", req)

export const getUser = req => post("/app001/get-user", req)

export const getReportJasper = req => post("/app001/generate-report-jasper", req)

//app002
export const getMenu = () => post("/rest/app002/get-menu")

export const getMenuAll = req => post("/rest/app002/get-menu-all", req)

export const editMenu = req => post("/rest/app002/edit", req)

export const deleteMenu = req => post("/rest/app002/delete", req)

export const saveMenu = req => post("/rest/app002/save", req)

export const getMenuParent = req => post("/rest/app002/get-menu-parent", req)

//app003
export const getRole = req => post("/rest/app003/get-all", req)

export const editRole = req => post("/rest/app003/edit", req)

export const saveRole = req => post("/rest/app003/save", req)

export const deleteRole = req => post("/rest/app003/delete", req)

export const getRoleMenu = req => post("/rest/app003/get-all-role-menu", req)

export const saveRoleMenu = req => post("/rest/app003/saveRoleMenu", req)

export const deleteRoleMenu = req => post("/rest/app003/deleteRoleMenu", req)

export const getLovMenu = req => post("/rest/app003/get-lov-menu", req)

export const getRoleUser = req => post("/rest/app003/get-all-role-user", req)

export const saveRoleUser = req => post("/rest/app003/saveRoleUser", req)

export const deleteRoleUser = req => post("/rest/app003/deleteRoleUser", req)

//app004
export const getRoAkses = req => post("/rest/app004/get-all", req)

export const editRoAkses = req => post("/rest/app004/edit", req)

export const deleteRoAkses = req => post("/rest/app004/delete", req)

export const saveRoAkses = req => post("/rest/app004/save", req)

export const getRoAksesUser = req => post("/rest/app004/get-all-user-akses", req)

export const saveRoAksesUser = req => post("/rest/app004/saveAksesUsr", req)

export const deleteRoAksesUser = req => post("/rest/app004/deleteAksesUsr", req)

export const getRoAksesPlant = req => post("/rest/app004/get-all-plant-akses", req)

export const saveRoAksesPlant = req => post("/rest/app004/saveAksesPlant", req)

export const deleteRoAksesPlant = req => post("/rest/app004/deleteAksesPlant", req)

export const getDiv = req => post("/rest/app004/get-div", req)

//app008
export const getMuser = req => post("/rest/app008/get-all", req)

export const editMuser = req => post("/rest/app008/edit", req)

export const saveMuser = req => post("/rest/app008/save", req)

export const deleteMuser = req => post("/rest/app008/delete", req)


//appInstructions
export const getInstructions = req => post("instructionRest/get-list", req)

export const saveInstructions = req => post("/rest/app008/save", req)

export const editInstructions = req => post("/rest/app008/edit", req)

export const deleteInstructions = req => post("/rest/app008/delete", req)
