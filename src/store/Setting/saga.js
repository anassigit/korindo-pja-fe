import {
    call,
    put,
    takeEvery
} from "redux-saga/effects"

import {
    GET_MEMBERS,
    SAVE_MEMBERS,
    EDIT_MEMBERS,
    DELETE_MEMBERS,
    EDIT_GENERAL_SETTING,
    GET_SETTING,
    GET_RANK_LIST,
    GET_PERMISSION_LIST,
    GET_GROUP_LIST,
    GET_RELATION_LIST,
    SAVE_GROUP_MAPPING,
    EDIT_GROUP_MAPPING,
    DELETE_GROUP_MAPPING,
    GET_MEMBERS_MAPPING,
    GET_MEMBERS2,
    GET_LIST_MENU,
    GET_MENU2,
    SAVE_MENU,
    EDIT_MENU,
    DELETE_MENU,
    GET_ROLE,
    SAVE_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    GET_ROLE_LIST,
    GET_ROLE_ACCESS,
    GET_ROLE_ACCESS_LIST,
    SAVE_ACCESS_ROLE,
    EDIT_ACCESS_ROLE,
    DELETE_ACCESS_ROLE,
    GET_GROUP_LIST_ROLE_ACCESS,
    GET_LANGUAGE_LIST,
    GET_KPI_CATEGORY_LIST,
    GET_KPI_UNIT_LIST,
    GET_KPI_ITEM_LIST,
    SAVE_KPI_CATEGORY,
    EDIT_KPI_CATEGORY,
    DELETE_KPI_CATEGORY,
    SAVE_KPI_UNIT,
    EDIT_KPI_UNIT,
    DELETE_KPI_UNIT,
    SAVE_KPI_ITEM,
    EDIT_KPI_ITEM,
    DELETE_KPI_ITEM,
    GET_KPI_CATEGORY,
    GET_KPI_UNIT,
    GET_KPI_ITEM
} from "./actionTypes"

import {
    msgAdd,
    msgEdit,
    msgDelete,
    respGetSetting,
    respGetMembers,
    respGetRankList,
    respGetPermissionList,
    respGetGroupList,
    respGetRelationList,
    respGetMembersMapping,
    respGetMembers2,
    respGetMenuList,
    respGetMenu2,
    respGetRoleList,
    respGetRole,
    respGetRoleAccess,
    respGetRoleAccessList,
    respGetGroupListRoleAccess,
    respGetLanguageList,
    respGetKPICategoryList,
    respGetKPIUnitList,
    respGetKPIItemList,
    respGetKPICategory,
    respGetKPIUnit,
    respGetKPIItem
} from "./actions"

import {
    deleteRelationBE,
    deleteMemberBE,
    getGroupListBE,
    getMembersListBE,
    getMembersListForMappingBE,
    getPermissionListBE,
    getRankListBE,
    getRelationListBE,
    getGeneralSettingBE,
    saveRelationBE,
    saveMemberBE,
    updateGeneralSettingBE,
    updateRelationBE,
    updateMemberBE,
    getMaintainMenuListBE,
    getMaintainMenuBE,
    saveMenuBE,
    editMenuBE,
    deleteMenuBE,
    getMaintainRoleListBE,
    getMaintainRoleBE,
    saveRoleBE,
    editRoleBE,
    deleteRoleBE,
    getRoleAccessBE,
    getRoleAccessListBE,
    saveRoleAccessBE,
    editRoleAccessBE,
    deleteRoleAccessBE,
    getGroupListRoleAccessBE,
    getLanguageListBE,
    getKPICategoryListBE,
    addKPICategoryBE,
    editKPICategoryBE,
    deleteKPICategoryBE,
    getKPIUnitListBE,
    addKPIUnitBE,
    editKPIUnitBE,
    deleteKPIUnitBE,
    getKPIItemListBE,
    addKPIItemBE,
    editKPIItemBE,
    deleteKPIItemBE,
    getKPICategoryBE,
    getKPIUnitBE,
    getKPIItemBE
} from "helpers/backend_helper"

function* fetchGetGeneralSetting({ payload: req }) {
    try {
        const response = yield call(getGeneralSettingBE, req)
        if (response.status == 1) {
            yield put(respGetSetting(response))
        } else {
            yield put(respGetSetting(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetSetting({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchSaveMembers({ payload: req }) {
    try {
        const response = yield call(saveMemberBE, req)
        yield put(msgAdd(response))
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchEditMembers({ payload: req }) {
    try {
        const response = yield call(updateMemberBE, req)
        yield put(msgEdit(response))
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchDeleteMembers({ payload: req }) {
    try {
        const response = yield call(deleteMemberBE, req)
        yield put(msgDelete(response))
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
    }
}

/* GENERAL SETTING */

function* fetchEditGeneralSetting({ payload: req }) {
    try {
        const response = yield call(updateGeneralSettingBE, req)
        yield put(msgEdit(response))
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
    }
}

/* MEMBERS */

function* fetchGetAllMembers({ payload: req }) {
    try {
        const response = yield call(getMembersListBE, req)
        if (response.status == 1) {
            yield put(respGetMembers(response))
        } else {
            yield put(respGetMembers(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMembers({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetAllMembers2({ payload: req }) {
    try {
        const response = yield call(getMembersListBE, req)
        if (response.status == 1) {
            yield put(respGetMembers2(response))
        } else {
            yield put(respGetMembers2(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMembers2({ "status": 0, "message": "Error Get Data" }))
    }
}

/* RANK LIST */

function* fetchGetAllRankList({ payload: req }) {
    try {
        const response = yield call(getRankListBE, req)
        if (response.status == 1) {
            yield put(respGetRankList(response))
        } else {
            yield put(respGetRankList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRankList({ "status": 0, "message": "Error Get Data" }))
    }
}

/* PERMISSION LIST */

function* fetchGetAllPermissionList({ payload: req }) {
    try {
        const response = yield call(getPermissionListBE, req)
        if (response.status == 1) {
            yield put(respGetPermissionList(response))
        } else {
            yield put(respGetPermissionList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetPermissionList({ "status": 0, "message": "Error Get Data" }))
    }
}

/* PERMISSION LIST */

function* fetchGetAllGroupList({ payload: req }) {
    try {
        const response = yield call(getGroupListBE, req)
        if (response.status == 1) {
            yield put(respGetGroupList(response))
        } else {
            yield put(respGetGroupList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetGroupList({ "status": 0, "message": "Error Get Data" }))
    }
}

/* RELATION LIST */

function* fetchGetAllRelationList({ payload: req }) {
    try {
        const response = yield call(getRelationListBE, req)
        if (response.status == 1) {
            yield put(respGetRelationList(response))
        } else {
            yield put(respGetRelationList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRelationList({ "status": 0, "message": "Error Get Data" }))
    }
}

/* GROUP MAPPING */

function* fetchSaveGroupMapping({ payload: req }) {
    try {
        const response = yield call(saveRelationBE, req)
        yield put(msgAdd(response))
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchEditGroupMapping({ payload: req }) {
    try {
        const response = yield call(updateRelationBE, req)
        yield put(msgEdit(response))
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchDeleteGroupMapping({ payload: req }) {
    try {
        const response = yield call(deleteRelationBE, req)
        yield put(msgDelete(response))
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "data": "Error Delete Data" }))
    }
}


function* fetchGetAllMembersMapping({ payload: req }) {
    try {
        const response = yield call(getMembersListForMappingBE, req)
        if (response.status == 1) {
            yield put(respGetMembersMapping(response))
        } else {
            yield put(respGetMembersMapping(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMembersMapping({ "status": 0, "message": "Error Get Data" }))
    }
}

//MENU

function* fetchGetMenuList({ payload: req }) {
    try {
        const response = yield call(getMaintainMenuListBE, req)
        if (response.status == 1) {
            yield put(respGetMenuList(response))
        } else {
            yield put(respGetMenuList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMenuList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetMenu({ payload: req }) {
    try {
        const response = yield call(getMaintainMenuBE, req)
        if (response.status == 1) {
            yield put(respGetMenu2(response))
        } else {
            yield put(respGetMenu2(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetMenu2({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddMenu({ payload: req }) {
    try {
        const response = yield call(saveMenuBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditMenu({ payload: req }) {
    try {
        const response = yield call(editMenuBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteMenu({ payload: req }) {
    try {
        const response = yield call(deleteMenuBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

//ROLE

function* fetchGetRoleList({ payload: req }) {
    try {
        const response = yield call(getMaintainRoleListBE, req)
        if (response.status == 1) {
            yield put(respGetRoleList(response))
        } else {
            yield put(respGetRoleList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRoleList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetRole({ payload: req }) {
    try {
        const response = yield call(getMaintainRoleBE, req)
        if (response.status == 1) {
            yield put(respGetRole(response))
        } else {
            yield put(respGetRole(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRole({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddRole({ payload: req }) {
    try {
        const response = yield call(saveRoleBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditRole({ payload: req }) {
    try {
        const response = yield call(editRoleBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteRole({ payload: req }) {
    try {
        const response = yield call(deleteRoleBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

function* fetchGetRoleAccess({ payload: req }) {
    try {
        const response = yield call(getRoleAccessBE, req)
        if (response.status == 1) {
            yield put(respGetRoleAccess(response))
        } else {
            yield put(respGetRoleAccess(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRoleAccess({ "status": 0, "message": "Error Get Data" }))
    }
}
function* fetchGetRoleAccessList({ payload: req }) {
    try {
        const response = yield call(getRoleAccessListBE, req)
        if (response.status == 1) {
            yield put(respGetRoleAccessList(response))
        } else {
            yield put(respGetRoleAccessList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetRoleAccessList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddAccessRole({ payload: req }) {
    try {
        const response = yield call(saveRoleAccessBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditAccessRole({ payload: req }) {
    try {
        const response = yield call(editRoleAccessBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteRoleAccess({ payload: req }) {
    try {
        const response = yield call(deleteRoleAccessBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

function* fetchgetGroupListRoleAccess({ payload: req }) {
    try {
        const response = yield call(getGroupListRoleAccessBE, req)
        if (response.status == 1) {
            yield put(respGetGroupListRoleAccess(response))
        } else {
            yield put(respGetGroupListRoleAccess(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetGroupListRoleAccess({ "status": 0, "message": "Error Get Data" }))
    }
}

//lang

function* fetchGetLanguageList({ payload: req }) {
    try {
        const response = yield call(getLanguageListBE, req)
        if (response.status == 1) {
            yield put(respGetLanguageList(response))
        } else {
            yield put(respGetLanguageList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetLanguageList({ "status": 0, "message": "Error Get Data" }))
    }
}

//KPI MASTER SETTING

function* fetchGetKPICategoryList({ payload: req }) {
    try {
        const response = yield call(getKPICategoryListBE, req)
        if (response.status == 1) {
            yield put(respGetKPICategoryList(response))
        } else {
            yield put(respGetKPICategoryList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPICategoryList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPICategory({ payload: req }) {
    try {
        const response = yield call(getKPICategoryBE, req)
        if (response.status == 1) {
            yield put(respGetKPICategory(response))
        } else {
            yield put(respGetKPICategory(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPICategory({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddKPICategory({ payload: req }) {
    try {
        const response = yield call(addKPICategoryBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditKPICategory({ payload: req }) {
    try {
        const response = yield call(editKPICategoryBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteKPICategory({ payload: req }) {
    try {
        const response = yield call(deleteKPICategoryBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

function* fetchGetKPIUnitList({ payload: req }) {
    try {
        const response = yield call(getKPIUnitListBE, req)
        if (response.status == 1) {
            yield put(respGetKPIUnitList(response))
        } else {
            yield put(respGetKPIUnitList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIUnitList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPIUnit({ payload: req }) {
    try {
        const response = yield call(getKPIUnitBE, req)
        if (response.status == 1) {
            yield put(respGetKPIUnit(response))
        } else {
            yield put(respGetKPIUnit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIUnit({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddKPIUnit({ payload: req }) {
    try {
        const response = yield call(addKPIUnitBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditKPIUnit({ payload: req }) {
    try {
        const response = yield call(editKPIUnitBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteKPIUnit({ payload: req }) {
    try {
        const response = yield call(deleteKPIUnitBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

function* fetchGetKPIItemList({ payload: req }) {
    try {
        const response = yield call(getKPIItemListBE, req)
        if (response.status == 1) {
            yield put(respGetKPIItemList(response))
        } else {
            yield put(respGetKPIItemList(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIItemList({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchGetKPIItem({ payload: req }) {
    try {
        const response = yield call(getKPIItemBE, req)
        if (response.status == 1) {
            yield put(respGetKPIItem(response))
        } else {
            yield put(respGetKPIItem(response))
        }
    } catch (error) {
        console.log(error);
        yield put(respGetKPIItem({ "status": 0, "message": "Error Get Data" }))
    }
}

function* fetchAddKPIItem({ payload: req }) {
    try {
        const response = yield call(addKPIItemBE, req)
        if (response.status == 1) {
            yield put(msgAdd(response))
        } else {
            yield put(msgAdd(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
    }
}

function* fetchEditKPIItem({ payload: req }) {
    try {
        const response = yield call(editKPIItemBE, req)
        if (response.status == 1) {
            yield put(msgEdit(response))
        } else {
            yield put(msgEdit(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
    }
}

function* fetchDeleteKPIItem({ payload: req }) {
    try {
        const response = yield call(deleteKPIItemBE, req)
        if (response.status == 1) {
            yield put(msgDelete(response))
        } else {
            yield put(msgDelete(response))
        }
    } catch (error) {
        console.log(error);
        yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
    }
}

function* settingSaga() {
    yield takeEvery(GET_SETTING, fetchGetGeneralSetting)
    yield takeEvery(SAVE_MEMBERS, fetchSaveMembers)
    yield takeEvery(EDIT_MEMBERS, fetchEditMembers)
    yield takeEvery(DELETE_MEMBERS, fetchDeleteMembers)
    yield takeEvery(EDIT_GENERAL_SETTING, fetchEditGeneralSetting)
    yield takeEvery(GET_MEMBERS, fetchGetAllMembers)
    yield takeEvery(GET_MEMBERS2, fetchGetAllMembers2)
    yield takeEvery(GET_RANK_LIST, fetchGetAllRankList)
    yield takeEvery(GET_PERMISSION_LIST, fetchGetAllPermissionList)
    yield takeEvery(GET_GROUP_LIST, fetchGetAllGroupList)
    yield takeEvery(GET_RELATION_LIST, fetchGetAllRelationList)
    yield takeEvery(SAVE_GROUP_MAPPING, fetchSaveGroupMapping)
    yield takeEvery(EDIT_GROUP_MAPPING, fetchEditGroupMapping)
    yield takeEvery(DELETE_GROUP_MAPPING, fetchDeleteGroupMapping)
    yield takeEvery(GET_MEMBERS_MAPPING, fetchGetAllMembersMapping)
    yield takeEvery(GET_LIST_MENU, fetchGetMenuList)
    yield takeEvery(GET_MENU2, fetchGetMenu)
    yield takeEvery(SAVE_MENU, fetchAddMenu)
    yield takeEvery(EDIT_MENU, fetchEditMenu)
    yield takeEvery(DELETE_MENU, fetchDeleteMenu)
    yield takeEvery(GET_ROLE_LIST, fetchGetRoleList)
    yield takeEvery(GET_ROLE, fetchGetRole)
    yield takeEvery(SAVE_ROLE, fetchAddRole)
    yield takeEvery(EDIT_ROLE, fetchEditRole)
    yield takeEvery(DELETE_ROLE, fetchDeleteRole)
    yield takeEvery(GET_ROLE_ACCESS, fetchGetRoleAccess)
    yield takeEvery(GET_ROLE_ACCESS_LIST, fetchGetRoleAccessList)
    yield takeEvery(SAVE_ACCESS_ROLE, fetchAddAccessRole)
    yield takeEvery(EDIT_ACCESS_ROLE, fetchEditAccessRole)
    yield takeEvery(DELETE_ACCESS_ROLE, fetchDeleteRoleAccess)
    yield takeEvery(GET_GROUP_LIST_ROLE_ACCESS, fetchgetGroupListRoleAccess)
    yield takeEvery(GET_LANGUAGE_LIST, fetchGetLanguageList)
    yield takeEvery(GET_KPI_CATEGORY_LIST, fetchGetKPICategoryList)
    yield takeEvery(GET_KPI_CATEGORY, fetchGetKPICategory)
    yield takeEvery(SAVE_KPI_CATEGORY, fetchAddKPICategory)
    yield takeEvery(EDIT_KPI_CATEGORY, fetchEditKPICategory)
    yield takeEvery(DELETE_KPI_CATEGORY, fetchDeleteKPICategory)
    yield takeEvery(GET_KPI_UNIT_LIST, fetchGetKPIUnitList)
    yield takeEvery(GET_KPI_UNIT, fetchGetKPIUnit)
    yield takeEvery(SAVE_KPI_UNIT, fetchAddKPIUnit)
    yield takeEvery(EDIT_KPI_UNIT, fetchEditKPIUnit)
    yield takeEvery(DELETE_KPI_UNIT, fetchDeleteKPIUnit)
    yield takeEvery(GET_KPI_ITEM_LIST, fetchGetKPIItemList)
    yield takeEvery(GET_KPI_ITEM, fetchGetKPIItem)
    yield takeEvery(SAVE_KPI_ITEM, fetchAddKPIItem)
    yield takeEvery(EDIT_KPI_ITEM, fetchEditKPIItem)
    yield takeEvery(DELETE_KPI_ITEM, fetchDeleteKPIItem)
}

export default settingSaga