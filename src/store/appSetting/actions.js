import {
    GET_SETTING,
    RESP_GET_SETTING,
    SAVE_MEMBERS,
    EDIT_MEMBERS,
    DELETE_MEMBERS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE,
    EDIT_GENERAL_SETTING,
    GET_MEMBERS,
    RESP_GET_MEMBERS,
    GET_RANK_LIST,
    RESP_GET_RANK_LIST,
    GET_PERMISSION_LIST,
    RESP_GET_PERMISSION_LIST,
    GET_GROUP_LIST,
    RESP_GET_GROUP_LIST,
    GET_RELATION_LIST,
    RESP_GET_RELATION_LIST,
    SAVE_GROUP_MAPPING,
    EDIT_GROUP_MAPPING,
    DELETE_GROUP_MAPPING,
    RESP_GET_MEMBERS_MAPPING,
    GET_MEMBERS_MAPPING,
    GET_MEMBERS2,
    RESP_GET_MEMBERS2,
    DELETE_MENU,
    EDIT_MENU,
    GET_LIST_MENU,
    GET_MENU2,
    RESP_GET_MENU2,
    RESP_GET_MENU_LIST,
    SAVE_MENU,
    RESP_GET_ROLE,
    SAVE_ROLE,
    EDIT_ROLE,
    RESP_GET_ROLE_LIST,
    GET_ROLE_LIST,
    GET_ROLE,
    DELETE_ROLE,
    GET_ROLE_ACCESS,
    GET_ROLE_ACCESS_LIST,
    RESP_GET_ROLE_ACCESS_LIST,
    RESP_GET_ROLE_ACCESS,
    SAVE_ACCESS_ROLE,
    EDIT_ACCESS_ROLE,
    DELETE_ACCESS_ROLE,
    GET_GROUP_LIST_ROLE_ACCESS,
    RESP_GET_GROUP_LIST_ROLE_ACCESS,
    GET_LANGUAGE_LIST,
    RESP_GET_LANGUAGE_LIST,
    GET_KPI_CATEGORY_LIST,
    RESP_GET_KPI_CATEGORY_LIST,
    SAVE_KPI_CATEGORY,
    EDIT_KPI_CATEGORY,
    DELETE_KPI_CATEGORY,
    GET_KPI_UNIT_LIST,
    RESP_GET_KPI_UNIT_LIST,
    SAVE_KPI_UNIT,
    EDIT_KPI_UNIT,
    DELETE_KPI_UNIT,
    GET_KPI_ITEM_LIST,
    RESP_GET_KPI_ITEM_LIST,
    SAVE_KPI_ITEM,
    EDIT_KPI_ITEM,
    DELETE_KPI_ITEM,
    GET_KPI_CATEGORY,
    RESP_GET_KPI_CATEGORY,
    GET_KPI_UNIT,
    RESP_GET_KPI_UNIT,
    GET_KPI_ITEM,
    RESP_GET_KPI_ITEM
} from "./actionTypes"

/* GET ALL SETTING */

export const getSettingData = (req) => ({
    type: GET_SETTING,
    payload: req,
})

export const respGetSetting = resp => ({
    type: RESP_GET_SETTING,
    payload: resp,
})


export const msgAdd = resp => ({
    type: MSGADD,
    payload: resp,
})

export const msgEdit = resp => ({
    type: MSGEDIT,
    payload: resp,
})

export const msgDelete = resp => ({
    type: MSGDELETE,
    payload: resp,
})

export const resetMessage = (resp) => ({
    type: RESET_MESSAGE,
    payload: resp,
})

export const saveMembers = (req) => ({
    type: SAVE_MEMBERS,
    payload: req,
})

export const editMembers = (req) => ({
    type: EDIT_MEMBERS,
    payload: req,
})

export const deleteMembers = (req) => ({
    type: DELETE_MEMBERS,
    payload: req,
})


/* GENERAL SETTINGS */

export const editGeneralSetting = (req) => ({
    type: EDIT_GENERAL_SETTING,
    payload: req,
})

/* GET ALL MEMBERS */

export const getMembersData = (req) => ({
    type: GET_MEMBERS,
    payload: req,
})

export const respGetMembers = resp => ({
    type: RESP_GET_MEMBERS,
    payload: resp,
})

export const getMembersData2 = (req) => ({
    type: GET_MEMBERS2,
    payload: req,
})

export const respGetMembers2 = resp => ({
    type: RESP_GET_MEMBERS2,
    payload: resp,
})

/* GET ALL RANK LIST */

export const getRankListData = (req) => ({
    type: GET_RANK_LIST,
    payload: req,
})

export const respGetRankList = resp => ({
    type: RESP_GET_RANK_LIST,
    payload: resp,
})

/* GET ALL RANK LIST */

export const getPermissionListData = (req) => ({
    type: GET_PERMISSION_LIST,
    payload: req,
})

export const respGetPermissionList = resp => ({
    type: RESP_GET_PERMISSION_LIST,
    payload: resp,
})

/* GET ALL RANK LIST */

export const getGroupListData = (req) => ({
    type: GET_GROUP_LIST,
    payload: req,
})

export const respGetGroupList = resp => ({
    type: RESP_GET_GROUP_LIST,
    payload: resp,
})

/* GET ALL RANK LIST */

export const getRelationListData = (req) => ({
    type: GET_RELATION_LIST,
    payload: req,
})

export const respGetRelationList = resp => ({
    type: RESP_GET_RELATION_LIST,
    payload: resp,
})

/* GROUP MAPPING */

export const saveGroupMapping = (req) => ({
    type: SAVE_GROUP_MAPPING,
    payload: req,
})

export const editGroupMapping = (req) => ({
    type: EDIT_GROUP_MAPPING,
    payload: req,
})

export const deleteGroupMapping = (req) => ({
    type: DELETE_GROUP_MAPPING,
    payload: req,
})

export const getMembersMapping = (req) => ({
    type: GET_MEMBERS_MAPPING,
    payload: req,
})

export const respGetMembersMapping = resp => ({
    type: RESP_GET_MEMBERS_MAPPING,
    payload: resp,
})

//MENU

export const getMenuListDataAction = (req) => ({
    type: GET_LIST_MENU,
    payload: req,
})

export const respGetMenuList = resp => ({
    type: RESP_GET_MENU_LIST,
    payload: resp,
})

export const getMenuDataAction = (req) => ({
    type: GET_MENU2,
    payload: req,
})

export const respGetMenu2 = resp => ({
    type: RESP_GET_MENU2,
    payload: resp,
})

export const addMaintainMenu = (req) => ({
    type: SAVE_MENU,
    payload: req,
})

export const editMaintainMenu = (req) => ({
    type: EDIT_MENU,
    payload: req,
})

export const deleteMaintainMenu = (req) => ({
    type: DELETE_MENU,
    payload: req,
})

//Role
export const getRoleListDataAction = (req) => ({
    type: GET_ROLE_LIST,
    payload: req,
})

export const respGetRoleList = resp => ({
    type: RESP_GET_ROLE_LIST,
    payload: resp,
})

export const getRoleDataAction = (req) => ({
    type: GET_ROLE,
    payload: req,
})

export const respGetRole = resp => ({
    type: RESP_GET_ROLE,
    payload: resp,
})

export const addMaintainRole = (req) => ({
    type: SAVE_ROLE,
    payload: req,
})

export const editMaintainRole = (req) => ({
    type: EDIT_ROLE,
    payload: req,
})

export const deleteMaintainRole = (req) => ({
    type: DELETE_ROLE,
    payload: req,
})

export const getRoleAccessList = (req) => ({
    type: GET_ROLE_ACCESS_LIST,
    payload: req,
})

export const respGetRoleAccessList = resp => ({
    type: RESP_GET_ROLE_ACCESS_LIST,
    payload: resp,
})

export const getRoleAccess = (req) => ({
    type: GET_ROLE_ACCESS,
    payload: req,
})

export const respGetRoleAccess = resp => ({
    type: RESP_GET_ROLE_ACCESS,
    payload: resp,
})

export const addRoleAccess = (req) => ({
    type: SAVE_ACCESS_ROLE,
    payload: req,
})

export const editRoleAccess = (req) => ({
    type: EDIT_ACCESS_ROLE,
    payload: req,
})

export const deleteRoleAccess = (req) => ({
    type: DELETE_ACCESS_ROLE,
    payload: req,
})

export const getGroupListRoleAccess = (req) => ({
    type: GET_GROUP_LIST_ROLE_ACCESS,
    payload: req,
})

export const respGetGroupListRoleAccess = resp => ({
    type: RESP_GET_GROUP_LIST_ROLE_ACCESS,
    payload: resp,
})

//LANGUAGE

export const getLanguageList = (req) => ({
    type: GET_LANGUAGE_LIST,
    payload: req,
})

export const respGetLanguageList = resp => ({
    type: RESP_GET_LANGUAGE_LIST,
    payload: resp,
})

//KPI CATEGORY

export const getKPICategoryList = (req) => ({
    type: GET_KPI_CATEGORY_LIST,
    payload: req,
})

export const respGetKPICategoryList = resp => ({
    type: RESP_GET_KPI_CATEGORY_LIST,
    payload: resp,
})

export const getKPICategory = (req) => ({
    type: GET_KPI_CATEGORY,
    payload: req,
})

export const respGetKPICategory = resp => ({
    type: RESP_GET_KPI_CATEGORY,
    payload: resp,
})

export const addKPICategory = (req) => ({
    type: SAVE_KPI_CATEGORY,
    payload: req,
})

export const editKPICategory = (req) => ({
    type: EDIT_KPI_CATEGORY,
    payload: req,
})

export const deleteKPICategory = (req) => ({
    type: DELETE_KPI_CATEGORY,
    payload: req,
})

//KPI UNIT

export const getKPIUnitList = (req) => ({
    type: GET_KPI_UNIT_LIST,
    payload: req,
})

export const respGetKPIUnitList = resp => ({
    type: RESP_GET_KPI_UNIT_LIST,
    payload: resp,
})

export const getKPIUnit = (req) => ({
    type: GET_KPI_UNIT,
    payload: req,
})

export const respGetKPIUnit = resp => ({
    type: RESP_GET_KPI_UNIT,
    payload: resp,
})

export const addKPIUnit = (req) => ({
    type: SAVE_KPI_UNIT,
    payload: req,
})

export const editKPIUnit = (req) => ({
    type: EDIT_KPI_UNIT,
    payload: req,
})

export const deleteKPIUnit = (req) => ({
    type: DELETE_KPI_UNIT,
    payload: req,
})

//KPI ITEM

export const getKPIItemList = (req) => ({
    type: GET_KPI_ITEM_LIST,
    payload: req,
})

export const respGetKPIItemList = resp => ({
    type: RESP_GET_KPI_ITEM_LIST,
    payload: resp,
})

export const getKPIItem = (req) => ({
    type: GET_KPI_ITEM,
    payload: req,
})

export const respGetKPIItem = resp => ({
    type: RESP_GET_KPI_ITEM,
    payload: resp,
})

export const addKPIItem = (req) => ({
    type: SAVE_KPI_ITEM,
    payload: req,
})

export const editKPIItem = (req) => ({
    type: EDIT_KPI_ITEM,
    payload: req,
})

export const deleteKPIItem = (req) => ({
    type: DELETE_KPI_ITEM,
    payload: req,
})