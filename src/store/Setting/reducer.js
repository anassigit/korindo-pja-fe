import {
    SAVE_MEMBERS,
    EDIT_MEMBERS,
    DELETE_MEMBERS,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    RESET_MESSAGE,
    EDIT_GENERAL_SETTING,
    GET_SETTING,
    RESP_GET_SETTING,
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
    GET_MEMBERS_MAPPING,
    RESP_GET_MEMBERS_MAPPING,
    GET_MEMBERS2,
    RESP_GET_MEMBERS2,
    DELETE_MENU,
    EDIT_MENU,
    GET_LIST_MENU,
    GET_MENU2,
    RESP_GET_MENU2,
    RESP_GET_MENU_LIST,
    SAVE_MENU,
    GET_ROLE_LIST,
    RESP_GET_ROLE_LIST,
    GET_ROLE,
    RESP_GET_ROLE,
    SAVE_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    GET_ROLE_ACCESS,
    RESP_GET_ROLE_ACCESS,
    GET_ROLE_ACCESS_LIST,
    RESP_GET_ROLE_ACCESS_LIST,
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
    RESP_GET_KPI_ITEM,
} from "./actionTypes"

const INIT_STATE = {
    respGetSetting: {},
    respGetMembers: {},
    respGetMembers2: {},
    respGetRankList: {},
    respGetPermissionList: {},
    respGetGroupList: {},
    respGetRelationList: {},
    respGetMembersMapping: {},
    respGetMenuList: {},
    respGetMenu2: {},
    respGetRoleList: {},
    respGetRole: {},
    respGetRoleAccessList: {},
    respGetRoleAccess: {},
    respGetGroupListRoleAccess: {},
    respGetLanguageList: {},
    respGetKPICategoryList: {},
    respGetKPICategory: {},
    respGetKPIUnitList: {},
    respGetKPIUnit: {},
    respGetKPIItemList: {},
    respGetKPIItem: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",
    msgDownload: ""
}

const settingReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SETTING:
            return {
                ...state,
            }
        case RESP_GET_SETTING:
            return {
                ...state,
                respGetSetting: action.payload,
            }

        case MSGADD:
            return {
                ...state,
                msgAdd: action.payload,
            }
        case MSGEDIT:
            return {
                ...state,
                msgEdit: action.payload,
            }
        case MSGDELETE:
            return {
                ...state,
                msgDelete: action.payload,
            }
        case SAVE_MEMBERS:
            return {
                ...state,
            }
        case EDIT_MEMBERS:
            return {
                ...state,
            }
        case DELETE_MEMBERS:
            return {
                ...state,
            }
        case EDIT_GENERAL_SETTING:
            return {
                ...state,
            }
        case GET_MEMBERS:
            return {
                ...state,
            }
        case RESP_GET_MEMBERS:
            return {
                ...state,
                respGetMembers: action.payload,
            }

        case GET_MEMBERS2:
            return {
                ...state,
            }
        case RESP_GET_MEMBERS2:
            return {
                ...state,
                respGetMembers2: action.payload,
            }
        case GET_RANK_LIST:
            return {
                ...state,
            }
        case RESP_GET_RANK_LIST:
            return {
                ...state,
                respGetRankList: action.payload,
            }
        case GET_PERMISSION_LIST:
            return {
                ...state,
            }
        case RESP_GET_PERMISSION_LIST:
            return {
                ...state,
                respGetPermissionList: action.payload,
            }
        case GET_GROUP_LIST:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST:
            return {
                ...state,
                respGetGroupList: action.payload,
            }
        case GET_RELATION_LIST:
            return {
                ...state,
            }
        case RESP_GET_RELATION_LIST:
            return {
                ...state,
                respGetRelationList: action.payload,
            }
        case SAVE_GROUP_MAPPING:
            return {
                ...state,
            }
        case EDIT_GROUP_MAPPING:
            return {
                ...state,
            }
        case DELETE_GROUP_MAPPING:
            return {
                ...state,
            }
        case GET_MEMBERS_MAPPING:
            return {
                ...state,
            }
        case RESP_GET_MEMBERS_MAPPING:
            return {
                ...state,
                respGetMembersMapping: action.payload,
            }
        case GET_LIST_MENU:
            return {
                ...state,
            }
        case RESP_GET_MENU_LIST:
            return {
                ...state,
                respGetMenuList: action.payload,
            }
        case GET_MENU2:
            return {
                ...state,
            }
        case RESP_GET_MENU2:
            return {
                ...state,
                respGetMenu2: action.payload,
            }
        case SAVE_MENU:
            return {
                ...state,
            }
        case EDIT_MENU:
            return {
                ...state,
            }
        case DELETE_MENU:
            return {
                ...state,
            }
        case GET_ROLE_LIST:
            return {
                ...state,
            }
        case RESP_GET_ROLE_LIST:
            return {
                ...state,
                respGetRoleList: action.payload,
            }
        case GET_ROLE:
            return {
                ...state,
            }
        case RESP_GET_ROLE:
            return {
                ...state,
                respGetRole: action.payload,
            }
        case SAVE_ROLE:
            return {
                ...state,
            }
        case EDIT_ROLE:
            return {
                ...state,
            }
        case DELETE_ROLE:
            return {
                ...state,
            }
        case GET_ROLE_ACCESS:
            return {
                ...state,
            }
        case RESP_GET_ROLE_ACCESS:
            return {
                ...state,
                respGetRoleAccess: action.payload,
            }
        case GET_ROLE_ACCESS_LIST:
            return {
                ...state,
            }
        case RESP_GET_ROLE_ACCESS_LIST:
            return {
                ...state,
                respGetRoleAccessList: action.payload,
            }
        case SAVE_ACCESS_ROLE:
            return {
                ...state,
            }
        case EDIT_ACCESS_ROLE:
            return {
                ...state,
            }
        case DELETE_ACCESS_ROLE:
            return {
                ...state,
            }
        case GET_GROUP_LIST_ROLE_ACCESS:
            return {
                ...state,
            }
        case RESP_GET_GROUP_LIST_ROLE_ACCESS:
            return {
                ...state,
                respGetGroupListRoleAccess: action.payload,
            }
        case GET_LANGUAGE_LIST:
            return {
                ...state,
            }
        case RESP_GET_LANGUAGE_LIST:
            return {
                ...state,
                respGetLanguageList: action.payload,
            }
        case GET_KPI_CATEGORY_LIST:
            return {
                ...state
            }
        case RESP_GET_KPI_CATEGORY_LIST:
            return {
                ...state,
                respGetKPICategoryList: action.payload
            }
        case GET_KPI_CATEGORY:
            return {
                ...state
            }
        case RESP_GET_KPI_CATEGORY:
            return {
                ...state,
                respGetKPICategory: action.payload
            }
        case SAVE_KPI_CATEGORY:
            return {
                ...state
            }
        case EDIT_KPI_CATEGORY:
            return {
                ...state
            }
        case DELETE_KPI_CATEGORY:
            return {
                ...state
            }
        case GET_KPI_UNIT_LIST:
            return {
                ...state
            }
        case RESP_GET_KPI_UNIT_LIST:
            return {
                ...state,
                respGetKPIUnitList: action.payload
            }
        case GET_KPI_UNIT:
            return {
                ...state
            }
        case RESP_GET_KPI_UNIT:
            return {
                ...state,
                respGetKPIUnit: action.payload
            }
        case SAVE_KPI_UNIT:
            return {
                ...state
            }
        case EDIT_KPI_UNIT:
            return {
                ...state
            }
        case DELETE_KPI_UNIT:
            return {
                ...state
            }
        case GET_KPI_ITEM_LIST:
            return {
                ...state
            }
        case RESP_GET_KPI_ITEM_LIST:
            return {
                ...state,
                respGetKPIItemList: action.payload
            }
        case GET_KPI_ITEM:
            return {
                ...state
            }
        case RESP_GET_KPI_ITEM:
            return {
                ...state,
                respGetKPIItem: action.payload
            }
        case SAVE_KPI_ITEM:
            return {
                ...state
            }
        case EDIT_KPI_ITEM:
            return {
                ...state
            }
        case DELETE_KPI_ITEM:
            return {
                ...state
            }
        case RESET_MESSAGE:
            return {
                ...state,
                msgAdd: "",
                msgEdit: "",
                msgDelete: "",
            }
        default:
            return state
    }
}
export default settingReducer
