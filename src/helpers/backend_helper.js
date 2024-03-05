
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf, postWithParam, postDownload, postDownloadXlsx } from "./api_helper"

//combo
export const getCombo = req => post("/app001/get-dtlsetting-combo", req)

//Login
export const getData = req => post("/app001/get-all", req)

export const getDataImage = req => getWithXls("/app001/get-file-image", req)

export const getDataPdf = req => getWithPdf("/app001/get-file-image", req)

export const getLang = req => post("/rest/LanguageRest/SelectLang", req)

export const login = req => postLogin("/MemberRest/login", req)

export const emailForgotPassword = req => postWithParam("/MemberRest/ForgotPassword", req)

export const updateForgotPassword = req => postWithParam("/MemberRest/UpdateForgotPassword", req)

export const getUser = req => post("/app001/get-user", req)

export const getReportJasper = req => post("/app001/generate-report-jasper", req)

//app002
// export const getMenu = () => post("/rest/app002/get-menu")

// export const getMenuAll = req => post("/rest/app002/get-menu-all", req)

export const editMenu = req => post("/rest/app002/edit", req)

export const deleteMenu = req => post("/rest/app002/delete", req)

export const saveMenu = req => post("/rest/app002/save", req)

export const getMenuParent = req => post("/rest/app002/get-menu-parent", req)

//appUserProfile

export const getProfile = req => post("MemberRest/SelectMyInfo", req)

export const editUserProfile = req => postWithParam("MemberRest/UpdateMyInfo", req)

export const updateUserPassword = req => postWithParam("MemberRest/UpdatePassword", req)

export const updateForgetPassword = req => postWithParam("MemberRest/ForgotPassword", req)

export const getMenuBE = req => post("MemberRest/getMenuList", req)


//appInstructions
export const getInstructions = req => post("rest/InstructionRest/SelectInstructionList", req)

export const getGroupListInstructions = req => post("rest/InstructionRest/SelectGroupList", req)

export const getAllStatus = req => post("rest/InstructionRest/SelectStatus", req)

export const getManagerList = req => post("rest/InstructionRest/SelectManagerList", req)

export const getOwnerList = req => post("rest/InstructionRest/SelectOwnerList", req)

export const getSelectedManager = req => post("rest/InstructionRest/SelectedManager", req)

export const getStatusList = req => post("rest/InstructionRest/SelectStatusList", req)

export const getInstructions2 = req => post("rest/InstructionRest/SelectInstructionList2", req)

export const saveInstructions = req => postUpload("rest/InstructionRest/InsertInstruction", req)

export const getDetailInstruction = req => post("rest/InstructionRest/SelectInstruction", req)

export const editInstructions = req => postUpload("rest/InstructionRest/UpdateInstruction", req)

export const saveDescriptions = req => postWithParam("rest/InstructionRest/UpdateDescription", req)

export const deleteInstructions = req => postWithParam("/rest/InstructionRest/DeleteInstruction", req)

export const getReply = req => post("rest/InstructionRest/SelectReplyList", req)

export const getSelectedReply = req => post("rest/InstructionRest/SelectReplyList", req)

export const saveReply = req => postUpload("rest/InstructionRest/InsertReply", req)

export const editReply = req => postUpload("rest/InstructionRest/UpdateReply", req)

export const checkFileDownload = req => postWithParam("rest/InstructionRest/CheckFileDownload", req)

export const downloadFiles = req => getWithXls("rest/InstructionRest/FileDownload", req)

export const deleteReply = req => postWithParam("rest/InstructionRest/DeleteReply", req)


//appSetting

export const getGeneralSetting = req => post("/rest/SettingMasterRest/SelectSetting", req)

export const getMembers = req => post("/rest/MemberMasterRest/SelectMemberList", req)

export const getMembersForMapping = req => post("/rest/OrganizationMasterRest/SelectMemberList", req)

export const getRankList = req => post("/rest/MemberMasterRest/SelectRankList", req)

export const getPermissionList = req => post("/rest/MemberMasterRest/SelectRoleList", req)

export const getGroupList = req => post("/rest/OrganizationMasterRest/SelectGroupList", req)

export const getRelationList = req => post("/rest/OrganizationMasterRest/SelectRelationList", req)

export const updateGeneralSetting = req => postWithParam("/rest/SettingMasterRest/UpdateSetting", req)

export const saveMembers = req => postWithParam("/rest/MemberMasterRest/InsertMember", req)

export const updateMembers = req => postWithParam("/rest/MemberMasterRest/UpdateMember", req)

export const deleteMembers = req => postWithParam("/rest/MemberMasterRest/DeleteMember", req)

export const saveGroupMapping = req => postWithParam("/rest/OrganizationMasterRest/InsertRelation", req)

export const updateGroupMapping = req => postWithParam("/rest/OrganizationMasterRest/UpdateRelation", req)

export const deleteGroupMapping = req => postWithParam("/rest/OrganizationMasterRest/DeleteRelation", req)

export const getGroupListRoleAccessBE = req => postWithParam("/rest/RoleAccessMasterRest/getGroupList", req)

export const getLanguageListBE = req => post("/rest/LanguageMasterRest/getList", req)

// Maintain Menu

export const getMaintainMenuListBE = req => post("/rest/MenuMasterRest/getList", req)

export const getLovParentMenuListBE = req => post("/rest/MenuMasterRest/getParentList", req)

export const getMaintainMenuBE = req => postWithParam("/rest/MenuMasterRest/select", req)

export const saveMenuBE = req => postWithParam("/rest/MenuMasterRest/insert", req)

export const editMenuBE = req => postWithParam("/rest/MenuMasterRest/update", req)

export const deleteMenuBE = req => postWithParam("/rest/MenuMasterRest/delete", req)

// Maintain Role

export const getMaintainRoleListBE = req => post("/rest/RoleMasterRest/getList", req)

export const getLovParentRoleListBE = req => post("/rest/RoleMasterRest/getParentList", req)

export const getMaintainRoleBE = req => postWithParam("/rest/RoleMasterRest/select", req)

export const saveRoleBE = req => postWithParam("/rest/RoleMasterRest/insert", req)

export const editRoleBE = req => postWithParam("/rest/RoleMasterRest/update", req)


export const deleteRoleBE = req => postWithParam("/rest/RoleMasterRest/delete", req)

export const getRoleAccessBE = req => postWithParam("rest/RoleAccessMasterRest/select", req)

export const getRoleAccessListBE = req => post("rest/RoleAccessMasterRest/getList", req)

export const saveRoleAccessBE = req => postWithParam("/rest/RoleAccessMasterRest/insert", req)

export const editRoleAccessBE = req => postWithParam("rest/RoleAccessMasterRest/update", req)

export const deleteRoleAccessBE = req => postWithParam("/rest/RoleAccessMasterRest/delete", req)

/* App Rule */

export const getSelectMenu = req => post("/rest/RuleRest/SelectMenu", req)

export const getSelectRule = req => postWithParam("/rest/RuleRest/SelectRule", req)

/* ATTACHMENTS */

export const getAttachment = req => post("rest/InstructionRest/SelectAttachFileList", req)

/* LOGS */

export const getLogsList = req => post("rest/InstructionRest/SelectLogList", req)

/* FILE MANAGEMENT */

export const selectFolder = req => postWithParam("/rest/FileManagementRest/SelectFolder", req)

export const deleteFileFolder = req => postWithParam("/rest/FileManagementRest/Delete", req)

export const renameFileFolder = req => postWithParam("/rest/FileManagementRest/Rename", req)

export const downloadFileFolder = req => getWithXls("/rest/FileManagementRest/FileDownload", req)

export const downloadCheck = req => postWithParam("/rest/FileManagementRest/CheckFileDownload", req)

export const uploadFileFolder = req => postUpload("/rest/FileManagementRest/FileUpload", req)

export const moveFileFolder = req => postWithParam("/rest/FileManagementRest/Move", req)

export const createFolder = req => postWithParam("/rest/FileManagementRest/CreateNewFolder", req)

export const searchFile = req => postWithParam("/rest/FileManagementRest/Search", req)

export const getYear = req => postWithParam("/rest/FileManagementRest/SelectYear", req)

export const getMonth = req => postWithParam("/rest/FileManagementRest/SelectMonth", req)

export const getMonthlyData = req => postWithParam("/rest/FileManagementRest/SelectDashboard", req)

// KPI

export const getYearListKPI = req => post("rest/KpiManagementRest/getYearList", req)

export const getGroupListKPI = req => post("rest/KpiManagementRest/getGroupList", req)

export const getGroupListKPIInputBE = req => post("rest/KpiManagementRest/getGroupListForInpuData", req)

export const getCorporationListKPI = req => postWithParam("rest/KpiManagementRest/getCorporationList", req)

export const getColumnListKPI = req => postWithParam("rest/KpiManagementRest/getColumList", req)

export const getKPIMasterBE = req => postWithParam("rest/KpiManagementRest/getMaster", req)

export const getPlanBE = req => postWithParam("rest/KpiManagementRest/getPlan", req)

export const getItemBE = req => postWithParam("rest/KpiManagementRest/getItemList", req)

export const getUnitBE = req => postWithParam("rest/KpiManagementRest/getUnitList", req)

export const getDashboardKPIBE = req => postWithParam("rest/KpiManagementRest/getDashboard", req)

export const getDashboardDetailKPIBE = req => postWithParam("rest/KpiManagementRest/getDashboardDetail", req)

export const getActualInputDataBE = req => postWithParam("rest/KpiManagementRest/getData", req)

export const getDownloadMasterTemplateBE = req => getWithXls("rest/KpiManagementRest/downloadMasterTemplate", req)

export const getDownloadDashboardDetailBE = req => getWithXls("rest/KpiManagementRest/downloadDashboardDetail", req)

export const uploadMasterKPIBE = req => postUpload("rest/KpiManagementRest/setMaster", req)

export const getDownloadPlanTemplateBE = req => getWithXls("rest/KpiManagementRest/downloadPlanTemplate", req)

export const uploadPlanKPIBE = req => postUpload("rest/KpiManagementRest/setPlan", req)

export const setActualInputDataBE = req => post("rest/KpiManagementRest/setData", req)

export const getDownloadPlanBE = req => getWithXls("rest/KpiManagementRest/downloadPlanSetting", req)

//MOVING PLAN

export const getCompanyCodeList = req => post("rest/MovingPlanRest/getCompanyCodeList", req)

export const getMovingPlanList = req => postWithParam("rest/MovingPlanRest/getList", req)