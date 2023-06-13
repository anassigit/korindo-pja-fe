
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf } from "./api_helper"

//combo
export const getCombo = req => post("/app001/get-dtlsetting-combo", req)

//app001
export const getData = req => post("/app001/get-all", req)

export const getDataImage = req => getWithXls("/app001/get-file-image", req)

export const getDataPdf = req => getWithPdf("/app001/get-file-image", req)

export const login = req => postLogin("/app001/login", req)

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

//app005
export const getCompany = req => post("/rest/app005/get-company", req)

export const editCompany = req => post("/rest/app005/edit", req)

export const saveCompany = req => post("/rest/app005/save", req)

export const deleteCompany = req => post("/rest/app005/delete", req)


//app006
export const getMasterPlant = req => post("/rest/app006/get-plant", req)

export const editPlant = req => post("/rest/app006/edit", req)

export const savePlant = req => post("/rest/app006/save", req)

export const deletePlant = req => post("/rest/app006/delete", req)

export const getLovCompany = req => post("/rest/app006/get-lov-company", req)

//app007
export const editUser = req => post("/rest/app007/edit", req)

export const getLovPosition = req => post("/rest/app007/get-lov-position", req)

//app008
export const getMuser = req => post("/rest/app008/get-all", req)

export const editMuser = req => post("/rest/app008/edit", req)

export const saveMuser = req => post("/rest/app008/save", req)

export const deleteMuser = req => post("/rest/app008/delete", req)

export const getLovPlant = req => post("/rest/app008/get-lov-plant", req)

export const getLovWilayah = req => post("/rest/app008/get-lov-wilayah", req)

export const getRoleCombo = req => post("/rest/app008//get-role-combo", req)


//app009
export const getMasterPosition = req => post("/rest/app009/get-position", req)

export const editPosition = req => post("/rest/app009/edit", req)

export const savePosition = req => post("/rest/app009/save", req)

export const deletePosition = req => post("/rest/app009/delete", req)

//app010
export const getSetting = req => post("/rest/app010/get-settings", req)

export const editSetting = req => post("/rest/app010/edit", req)

export const saveSetting = req => post("/rest/app010/save", req)

//app011
export const getDivisi = req => post("/rest/app011/get-divisi", req)

export const editDivisi = req => post("/rest/app011/edit", req)

export const saveDivisi = req => post("/rest/app011/save", req)

export const deleteDivisi = req => post("/rest/app011/delete", req)


//app013
export const getTeam = req => post("/rest/app013/get-all", req)

export const getTeamChild = req => post("/rest/app013/get-all-child", req)

//app015
export const getVendor = req => post("/rest/app015/get-all", req)

export const editVendor = req => post("/rest/app015/edit", req)

export const saveVendor = req => post("/rest/app015/save", req)

export const deleteVendor = req => post("/rest/app015/delete", req)

//app016
export const getWilayah = req => post("/rest/app016/get-all", req)

export const saveWilayah = req => post("/rest/app016/save", req)

export const editWilayah = req => post("/rest/app016/edit", req)

export const deleteWilayah = req => post("/rest/app016/delete", req)

//app017
export const getUnitcamp = req => post("/rest/app017/get-all", req)

export const saveUnitcamp = req => post("/rest/app017/save", req)

export const editUnitcamp = req => post("/rest/app017/edit", req)

export const deleteUnitcamp = req => post("/rest/app017/delete", req)

//app018
export const getKabupaten = req => post("/rest/app018/get-all", req)

export const saveKabupaten = req => post("/rest/app018/save", req)

export const editKabupaten = req => post("/rest/app018/edit", req)

export const deleteKabupaten = req => post("/rest/app018/delete", req)

//app019
export const getSilviculture = req => post("/rest/app019/get-all", req)

export const editSilviculture = req => post("/rest/app019/edit", req)

export const saveSilviculture = req => post("/rest/app019/save", req)

export const deleteSilviculture = req => post("/rest/app019/delete", req)

//app020
export const getJenisPohon = req => post("/rest/app020/get-all", req)

export const saveJenisPohon = req => post("/rest/app020/save", req)

export const editJenisPohon = req => post("/rest/app020/edit", req)

export const deleteJenisPohon = req => post("/rest/app020/delete", req)

//app021
export const getPekerjaan = req => post("/rest/app021/get-all", req)

//app022
export const getHarga = req => post("/rest/app022/get-all", req)

export const saveHarga = req => post("/rest/app022/save", req)

export const editHarga = req => post("/rest/app022/edit", req)

export const deleteHarga = req => post("/rest/app022/delete", req)

export const getLovPekerjaan = req => post("/rest/app021/get-lov-kegiatan", req)

//app023
export const getAspekPekerjaan = req => post("/rest/app023/get-all", req)

//app024
export const getRumusMaterial = req => post("/rest/app024/get-all", req)

export const saveRumusMaterial = req => post("/rest/app024/save", req)

export const editRumusMaterial = req => post("/rest/app024/edit", req)

export const deleteRumusMaterial = req => post("/rest/app024/delete", req)

//app025
export const getKriteria = req => post("/rest/app025/get-all", req)

export const saveKriteria = req => post("/rest/app025/save", req)

export const editKriteria = req => post("/rest/app025/edit", req)

export const deleteKriteria = req => post("/rest/app025/delete", req)

export const getLovKriteria = req => post("/rest/app025/get-lov-kriteria", req)

//app026
export const getPetak = req => post("/rest/app026/get-all", req)

export const uploadFilePetak = req => postUpload("/rest/app026/upload", req)

//app027
export const getSpk = req => post("/rest/app027/get-all", req)

export const saveSpk = req => post("/rest/app027/save", req)

export const editSpk = req => post("/rest/app027/edit", req)

export const deleteSpk = req => post("/rest/app027/delete", req)

export const getLovVendor = req => post("/rest/app015/get-all-lov-vendor", req)

export const getLovPetak = req => post("/rest/app026/get-all-lov-petak", req)

export const getLovKegiatanHeader = req => post("/rest/app027/get-all-lov-kegiatan-header", req)

export const getSpkDetailPekerjaan = req => post("/rest/app027/get-all-spkdtl", req)

export const getMicro = req => post("/rest/app027/get-microplan", req)

//app028
export const getKonfirmSpk = req => post("/rest/app028/get-all", req)
export const getKonfirmasi = req => post("/rest/app028/konfirmasi", req)
export const getActionSpk = req => post("/rest/app028/get-all-action", req)
export const saveKonfirmasiRequest = req => post("/rest/app028/konfirmasi-request", req)
export const saveKonfirmasiReject = req => post("/rest/app028/konfirmasi-reject", req)
export const getPersetujuanSpk = req => post("/rest/app028/get-all-persetujuan", req)


//app031
export const downloadFile = req => getWithXls("/rest/app031/donwload-template", req)
export const uploadFile = req => postUpload("/rest/app031/upload", req)
export const getUploadT = req => post("/rest/app031/get-upload-all", req)
// export const saveUploadT = req => post("/rest/app031/save", req)
// export const editUploadT = req => post("/rest/app031/edit", req)
// export const deleteUploadT = req => post("/rest/app031/delete", req)

export const downloadExcel = req => getWithXls("/rest/app031/downloadexcel", req)

//dashboard
export const getDashboard = req => post("/rest/app031//get-all-data-target-panen", req)


//app032
export const getRumusTegakan = req => post("/rest/app032/get-all", req)

export const getLovPohon = req => post("/rest/app020/get-all-lov-pohon", req)

export const saveRumusTegakan = req => post("/rest/app032/save", req)

export const editRumusTegakan = req => post("/rest/app032/edit", req)

export const deleteRumusTegakan = req => post("/rest/app032/delete", req)

//app033
export const getTrcKegiatanPanen = req => post("/rest/app033/get-all", req)

export const getTrcKegiatanPanenDetail = req => post("/rest/app033/get-all-detail", req)

export const getTrcKegiatanPanenHistory = req => post("/rest/app033/get-all-history", req)

export const getTrcKegiatanPanenDetailHistory = req => post("/rest/app033/get-all-detail-history", req)


//app034
export const getSpkQc = req => post("/rest/app034/get-all", req)

export const getLovQc = req => post("/rest/app034/get-lov-QC", req)

export const saveAssign=  req => post("/rest/app034/save-assign", req)

//app035
export const getWorkingOrder = req => post("/rest/app035/get-all", req)

export const getDetail = req => post("/rest/app035//get-all-Detail", req)

export const getSapWo = req => post("/rest/app035/get-wo", req)

//app036
export const getLovQc2 = req => post("/rest/app031/get-lov-QC-login", req)

export const saveAssign2=  req => post("/rest/app031/save-assign-qc", req)

//export const donExcelApp036 = req => getWithXls("/rest/app031/downloadexcelApp036", req)

export const downloadExcel2 = req => getWithXls("/rest/app031/downloadexcel2", req)

//app038
export const getMPersetujuan = req => post("/rest/app038/get-all", req)

export const getMDtlPersetujuan = req => post("/rest/app038/get-all-detail", req)

export const getMUser = req => post("/rest/app038/get-user-approval", req)

export const saveMPersetujuan = req => post("/rest/app038/save", req)

export const editMPersetujuan = req => post("/rest/app038/save", req)

export const deleteMPersetujuan = req => post("/rest/app038/delete", req)

export const deleteMDtlPersetujuan = req => post("/rest/app038/delete-dtl", req)

//export const getLovPekerjaan = req => post("/rest/app021/get-lov-kegiatan", req)

//app039
export const getLaporanMonitoring = req => post("/rest/app027/get-microplanHistory", req)


//app040

export const getMasterKriteria = req => post("/rest/app040/get-all", req)

export const saveMasterKriteria = req => post("/rest/app040/save", req)

export const editMasterKriteria = req => post("/rest/app040/edit", req)

export const deleteMasterKriteria = req => post("/rest/app040/delete", req)
