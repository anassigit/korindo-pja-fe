import axios from "axios"
import { saveAs } from 'file-saver'

var API_URL = "http://localhost:9010/pja"
if (process.env.REACT_APP_APIKEY === "development") {
    API_URL = "http://192.168.0.29:9010/pja"
} else if (process.env.REACT_APP_APIKEY === "production") {
    API_URL = "http://10.12.1.10:9010/pja"
}

const axiosApi = axios.create({
    baseURL: API_URL,
})

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

export async function postLogin(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = 'Basic ' + btoa(data.id + ':' + data.pw)
    return axiosApi
        .post(url + "?" + $.param(data), { ...config })
        .then(response => response.data)
}

export async function get(url, data, config = {}) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return await axiosApi.get(url, data, { ...config })
        .then(function (response) {
            return responseError(response)
        })
}

export async function getWithParam(url, data, config = { responseType: 'blob' }) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return await axiosApi.get(url + "?" + $.param(data), { ...config })
        .then(function (response) {
            return responseError(response)
        })
}

export async function postWithParam(url, data, config = {}
) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    const params = new URLSearchParams()
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            data[key].forEach(value => {
                params.append(key, value)
            })
        } else {
            if (key === 'roleAccessId') {
                params.append(key, data[key].replace(/\+/g, ' '))
            } else {
                params.append(key, data[key])
            }
        }
    })
    return await axiosApi.post(url + "?" + params.toString(), { ...config })
        .then(function (response) {
            return responseError(response)
        })
}

export async function post(url, data, config = {}) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return axiosApi
        .post(url, { ...data }, { ...config },)
        .then(function (response) {
            return responseError(response)
        })
}

function responseError(response) {
    if (response.data.status != "1") {
        if (response.data.data != null) {
            return response.data
        } else {
            if (response.data.message != null) {
                if (response.data.message == "Invalid Token") {
                    localStorage.removeItem("authUser")
                    localStorage.removeItem("user")
                    document.getElementById("reloginForm").style.display = "block"
                    response.data.status = "1"
                    return response.data
                } else {
                    return response.data
                }
            }
        }
    } else {
        return response.data
    }
}

export async function getWithXls(url, data, config = { responseType: 'blob' }) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                params.append(`${key}`, item)
            })
        } else {
            params.append(key, value)
        }
    }
    return await axiosApi.get(
        url + "?KOR_TOKEN=" + encodeURIComponent(localStorage.getItem("authUser")) + "&" + params.toString(), { ...config }
    ).then(
        response => {
            if (response.status == 200) {
                saveAs(window.URL.createObjectURL(new Blob([response.data])), data.file_nm)
            } else {
                return responseError(response)
            }
        }
    )
}

export async function getWithPdf(url, data, config = { responseType: 'blob' }) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return await axiosApi.post(
        url + "?KOR_TOKEN=" + encodeURIComponent(localStorage.getItem("authUser")) + "&" + $.param(data), { ...config }
    ).then(
        response => {
            if (response.status == 200) {
                saveAs(window.URL.createObjectURL(new Blob([response.data])), data.file_name)
            } else {
                return responseError(response)
            }
        }
    )
}

export async function postUpload(url, data, config = {}) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return axiosApi
        .post(url, data, { ...config },)
        .then(function (response) {
            return responseError(response)
        }
        )
}


export async function postDownload(url, data, config = { responseType: 'blob' }) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return await axiosApi.post(
        url + "?KOR_TOKEN=" + encodeURIComponent(localStorage.getItem("authUser")) + "&" + $.param(data), { ...config }
    ).then(
        response => {
            if (response.status == 200) {
                saveAs(window.URL.createObjectURL(new Blob([response.data])), response.headers['content-disposition'].split("filename=")[1])
            } else {
                return responseError(response)
            }

        }
    )
}


export async function postDownloadXlsx(
    url,
    data,
    config = {
        responseType: "blob",
    }
) {
    axiosApi.defaults.headers.common["KOR_TOKEN"] = localStorage.getItem("authUser")
    return await axiosApi.post(
        url + "?KOR_TOKEN=" + encodeURIComponent(localStorage.getItem("authUser")) + "&" + $.param(data),
        { ...config }
    ).then(response => {
        if (response.status == 200) {
            saveAs(URL.createObjectURL(String64toBlob(response.data.data.download, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")), data.filename)
        } else {
            return responseError(response)
        }
    })
}

const String64toBlob = (data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(data)
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: contentType })
}