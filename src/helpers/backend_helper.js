
import { post, postLogin, getWithXls, postUpload, getWithPdf, postWithParam } from "./api_helper"

/* COMMON AND AUTHENTICATION */

export const getComboBE = req => post("/app001/get-dtlsetting-combo", req)

export const getDataBE = req => post("/app001/get-all", req)

export const getDataImageBE = req => getWithXls("/app001/get-file-image", req)

export const getDataPdfBE = req => getWithPdf("/app001/get-file-image", req)

export const getLangBE = req => post("/rest/LanguageRest/SelectLang", req)

export const loginBE = req => postLogin("/MemberRest/login", req)

export const emailForgotPasswordBE = req => postWithParam("/MemberRest/ForgotPassword", req)

export const updateForgotPasswordBE = req => postWithParam("/MemberRest/UpdateForgotPassword", req)

export const getUserBE = req => post("/app001/get-user", req)

export const getReportJasperBE = req => post("/app001/generate-report-jasper", req)

export const editMenu = req => post("/rest/app002/edit", req)

export const deleteMenu = req => post("/rest/app002/delete", req)

export const saveMenu = req => post("/rest/app002/save", req)

export const getMenuParent = req => post("/rest/app002/get-menu-parent", req)

/* INSTRUCTIONS */

export const getInstructionsListBE = req => post("rest/InstructionRest/SelectInstructionList", req)

export const getGroupListInstructionsBE = req => post("rest/InstructionRest/SelectGroupList", req)

export const getAllStatusBE = req => post("rest/InstructionRest/SelectStatus", req)

export const getManagerListBE = req => post("rest/InstructionRest/SelectManagerList", req)

export const getOwnerListBE = req => post("rest/InstructionRest/SelectOwnerList", req)

export const getSelectedManagerBE = req => post("rest/InstructionRest/SelectedManager", req)

export const getStatusListBE = req => post("rest/InstructionRest/SelectStatusList", req)

export const getInstructionsList2BE = req => post("rest/InstructionRest/SelectInstructionList2", req)

export const saveInstructionBE = req => postUpload("rest/InstructionRest/InsertInstruction", req)

export const getDetailInstructionBE = req => post("rest/InstructionRest/SelectInstruction", req)

export const editInstructionBE = req => postUpload("rest/InstructionRest/UpdateInstruction", req)

export const saveDescriptionBE = req => postWithParam("rest/InstructionRest/UpdateDescription", req)

export const deleteInstructionBE = req => postWithParam("/rest/InstructionRest/DeleteInstruction", req)

export const getReplyBE = req => post("rest/InstructionRest/SelectReplyList", req)

export const getSelectedReplyBE = req => post("rest/InstructionRest/SelectReplyList", req)

export const saveReplyBE = req => postUpload("rest/InstructionRest/InsertReply", req)

export const editReplyBE = req => postUpload("rest/InstructionRest/UpdateReply", req)

export const checkFileDownloadBE = req => postWithParam("rest/InstructionRest/CheckFileDownload", req)

export const downloadFileBE = req => getWithXls("rest/InstructionRest/FileDownload", req)

export const deleteReplyBE = req => postWithParam("rest/InstructionRest/DeleteReply", req)

export const getAttachmentBE = req => post("rest/InstructionRest/SelectAttachFileList", req)

export const getLogsListBE = req => post("rest/InstructionRest/SelectLogList", req)

/* PROFILE */

export const getProfileBE = req => post("MemberRest/SelectMyInfo", req)

export const editUserProfileBE = req => postWithParam("MemberRest/UpdateMyInfo", req)

export const updateUserPasswordBE = req => postWithParam("MemberRest/UpdatePassword", req)

export const updateForgetPasswordBE = req => postWithParam("MemberRest/ForgotPassword", req)

export const getMenuListBE = req => post("MemberRest/getMenuList", req)

/* FILE MANAGEMENT */

export const selectFolderBE = req => postWithParam("/rest/FileManagementRest/SelectFolder", req)

export const deleteFileFolderBE = req => postWithParam("/rest/FileManagementRest/Delete", req)

export const renameFileFolderBE = req => postWithParam("/rest/FileManagementRest/Rename", req)

export const downloadFileFolderBE = req => getWithXls("/rest/FileManagementRest/FileDownload", req)

export const downloadCheckBE = req => postWithParam("/rest/FileManagementRest/CheckFileDownload", req)

export const uploadFileFolderBE = req => postUpload("/rest/FileManagementRest/FileUpload", req)

export const moveFileFolderBE = req => postWithParam("/rest/FileManagementRest/Move", req)

export const createFolderBE = req => postWithParam("/rest/FileManagementRest/CreateNewFolder", req)

export const searchFileBE = req => postWithParam("/rest/FileManagementRest/Search", req)

export const getYearBE = req => postWithParam("/rest/FileManagementRest/SelectYear", req)

export const getMonthBE = req => postWithParam("/rest/FileManagementRest/SelectMonth", req)

export const getMonthlyDataBE = req => postWithParam("/rest/FileManagementRest/SelectDashboard", req)

/* KPI TREND */

export const getGroupListKPIBE = req => postWithParam("rest/KpiManagementRest/getGroupList", req)

export const getCorporationListKPIBE = req => postWithParam("rest/KpiManagementRest/getCorporationList", req)

export const getItemListBE = req => postUpload("rest/KpiManagementRest/getItemList", req)

export const getKPIMasterBE = req => postWithParam("rest/KpiManagementRest/getMaster", req)

export const getUnitBE = req => postWithParam("rest/KpiManagementRest/getUnitList", req)

export const getDashboardKPIBE = req => postUpload("rest/KpiManagementRest/getDashboard", req)

export const getDashboardDetailKPIBE = req => postUpload("rest/KpiManagementRest/getDashboard", req)

export const getKPIInputDataBE = req => postWithParam("rest/KpiManagementRest/getData", req)

export const getDownloadKPITemplateBE = req => getWithXls("rest/KpiManagementRest/downloadTemplate", req)

export const getDownloadDashboardDetailBE = req => getWithXls("rest/KpiManagementRest/downloadDashboard", req)

export const getDownloadKPIExcelBE = req => getWithXls("rest/KpiManagementRest/downloadExcel", req)

export const getKPIFileBE = req => postWithParam("rest/KpiManagementRest/searchFile", req)

export const uploadKPIResultBE = req => postUpload("rest/KpiManagementRest/setResult", req)

export const uploadKPIBE = req => postUpload("rest/KpiManagementRest/setMaster", req)

export const setKPINoteBE = req => postWithParam("rest/KpiManagementRest/setNote", req)

//MOVING PLAN

export const getGroupListMovingPlanBE = req => post("rest/MovingPlanRest/getGroupList", req)

export const getCompanyListBE = req => postWithParam("rest/MovingPlanRest/getCompanyList", req)

export const getMovingPlanDashboardListBE = req => postWithParam("rest/MovingPlanRest/getList", req)

export const getMovingPlanInputResultListBE = req => postWithParam("rest/MovingPlanRest/getList2", req)

export const downloadExcelMovingPlanBE = req => getWithXls("rest/MovingPlanRest/downloadExcel", req)

/* GROUP RULE */

export const getGroupRuleMenuListBE = req => post("/rest/RuleRest/SelectMenu", req)

export const getGroupRuleBE = req => postWithParam("/rest/RuleRest/SelectRule", req)

/* SETTING */

export const getGeneralSettingBE = req => post("/rest/SettingMasterRest/SelectSetting", req)

export const getMembersListBE = req => post("/rest/MemberMasterRest/SelectMemberList", req)

export const getMembersListForMappingBE = req => post("/rest/OrganizationMasterRest/SelectMemberList", req)

export const getRankListBE = req => post("/rest/MemberMasterRest/SelectRankList", req)

export const getPermissionListBE = req => post("/rest/MemberMasterRest/SelectRoleList", req)

export const getGroupListBE = req => post("/rest/OrganizationMasterRest/SelectGroupList", req)

export const getRelationListBE = req => post("/rest/OrganizationMasterRest/SelectRelationList", req)

export const updateGeneralSettingBE = req => postWithParam("/rest/SettingMasterRest/UpdateSetting", req)

export const saveMemberBE = req => postWithParam("/rest/MemberMasterRest/InsertMember", req)

export const updateMemberBE = req => postWithParam("/rest/MemberMasterRest/UpdateMember", req)

export const deleteMemberBE = req => postWithParam("/rest/MemberMasterRest/deleteAccount", req)

export const saveRelationBE = req => postWithParam("/rest/OrganizationMasterRest/InsertRelation", req)

export const updateRelationBE = req => postWithParam("/rest/OrganizationMasterRest/UpdateRelation", req)

export const deleteRelationBE = req => postWithParam("/rest/OrganizationMasterRest/DeleteRelation", req)

export const getGroupListRoleAccessBE = req => postWithParam("/rest/RoleAccessMasterRest/getGroupList", req)

export const getLanguageListBE = req => post("/rest/LanguageMasterRest/getList", req)

export const getKPICategoryListBE = req => post("/rest/KpiCategoryMasterRest/getList", req)

export const getKPICategoryBE = req => postWithParam("/rest/KpiCategoryMasterRest/select", req)

export const addKPICategoryBE = req => postWithParam("/rest/KpiCategoryMasterRest/insert", req)

export const editKPICategoryBE = req => postWithParam("/rest/KpiCategoryMasterRest/update", req)

export const deleteKPICategoryBE = req => postWithParam("/rest/KpiCategoryMasterRest/delete", req)

export const getKPIUnitListBE = req => post("/rest/KpiUnitMasterRest/getList", req)

export const getKPIUnitBE = req => postWithParam("/rest/KpiUnitMasterRest/select", req)

export const addKPIUnitBE = req => postWithParam("/rest/KpiUnitMasterRest/insert", req)

export const editKPIUnitBE = req => postWithParam("/rest/KpiUnitMasterRest/update", req)

export const deleteKPIUnitBE = req => postWithParam("/rest/KpiUnitMasterRest/delete", req)

export const getKPIItemListBE = req => post("/rest/KpiItemMasterRest/getList", req)

export const getKPICategoryListForKPIItemBE = req => post("/rest/KpiItemMasterRest/getCategoryList", req)

export const getKPIUnitListForKPIItemBE = req => post("/rest/KpiItemMasterRest/getUnitList", req)

export const getKPIItemBE = req => postWithParam("/rest/KpiItemMasterRest/select", req)

export const addKPIItemBE = req => postWithParam("/rest/KpiItemMasterRest/insert", req)

export const editKPIItemBE = req => postWithParam("/rest/KpiItemMasterRest/update", req)

export const deleteKPIItemBE = req => postWithParam("/rest/KpiItemMasterRest/delete", req)

export const getMaintainMenuListBE = req => post("/rest/MenuMasterRest/getList", req)

export const getLovParentMenuListBE = req => post("/rest/MenuMasterRest/getParentList", req)

export const getMaintainMenuBE = req => postWithParam("/rest/MenuMasterRest/select", req)

export const saveMenuBE = req => postWithParam("/rest/MenuMasterRest/insert", req)

export const editMenuBE = req => postWithParam("/rest/MenuMasterRest/update", req)

export const deleteMenuBE = req => postWithParam("/rest/MenuMasterRest/delete", req)

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