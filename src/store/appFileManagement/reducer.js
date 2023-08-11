import {

    GET_SELECT,
    RESP_GET_SELECT,
    GET_SELECT_FILE,
    RESP_GET_SELECT_FILE,
    DELETE_FILE_FOLDER,
    RENAME_FILE_FOLDER,
    MOVE_FILES,
    CREATE_FOLDER,
    MSGCREATE,
    DOWNLOAD_FILES,
    UPLOAD_FILES,
    MSGMOVE,
    MSGDOWNLOAD,
    MSGUPLOAD,
    RESET_MESSAGE,
    MSGADD,
    MSGEDIT,
    MSGDELETE,
    MSGRENAME

} from "./actionTypes"

const INIT_STATE = {

    respGetSelect: {},
    respGetSelectFile: {},
    msgAdd: "",
    msgEdit: "",
    msgDelete: "",
    msgDownload: "",
    msgUpload: "",
    msgMove: "",
    msgCreate: "",
    msgRename: "",

}

const fileManagementReducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case GET_SELECT:
            return {
                ...state,
            }
        case RESP_GET_SELECT:
            return {
                ...state,
                respGetSelect: action.payload,
            }
        case GET_SELECT_FILE:
            return {
                ...state,
            }
        case RESP_GET_SELECT_FILE:
            return {
                ...state,
                respGetSelectFile: action.payload,
            }

        case DELETE_FILE_FOLDER:
            return {
                ...state,
            }
        case RENAME_FILE_FOLDER:
            return {
                ...state,
            }
        case MSGDOWNLOAD:
            return {
                ...state,
                msgDownload: action.payload,
            }
        case DOWNLOAD_FILES:
            return {
                ...state,
            }
        case UPLOAD_FILES:
            return {
                ...state,
            }
        case MSGUPLOAD:
            return {
                ...state,
                msgUpload: action.payload,
            }
        case MOVE_FILES:
            return {
                ...state,
            }
        case MSGMOVE:
            return {
                ...state,
                msgMove: action.payload,
            }
        case CREATE_FOLDER:
            return {
                ...state,
            }
        case MSGCREATE:
            return {
                ...state,
                msgCreate: action.payload,
            }
        case RESET_MESSAGE:
            return {
                ...state,
                msgEdit: "",
                msgAdd: "",
                msgDelete: "",
                msgDownload: "",
                msgUpload: "",
                msgMove: "",
                msgRename: "",
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

            case MSGRENAME:
                return {
                    ...state,
                    msgRename: action.payload,
                }

        default:
            return state
    }

}

export default fileManagementReducer