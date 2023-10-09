
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf,postWithParam, postDownload, postDownloadXlsx } from "./api_helper"


//getDept


export const getDeptBE = req => post("/SSORest/getDept", req)
