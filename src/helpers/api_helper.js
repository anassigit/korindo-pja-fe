import axios from "axios";
import { saveAs } from 'file-saver';
import { ReactSession } from 'react-client-session';

//apply base url for axios
var API_URL = "http://localhost:9010/pja";
if(process.env.REACT_APP_APIKEY === "development"){
  API_URL = "http://192.168.0.29:9010/pja";
}else if(process.env.REACT_APP_APIKEY === "production"){
  API_URL = "http://10.10.20.94:9003/pja";
}

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function postLogin(url, data, config = {}) {

  axiosApi.defaults.headers.common["Authorization"] = 'Basic ' + btoa(data.nik + ':' + data.password);
  return axiosApi
    .post(url+"?"+$.param(data), { ...config })
    .then(response => response.data);
}

export async function get(url, data, config ={}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  return await axiosApi.get(url, data, { ...config })
  .then(function (response) {
    return responseError(response);
  })
}

export async function getWithParam(url, data, config ={responseType: 'blob'}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  return await axiosApi.get(url+"?"+$.param(data), { ...config })
  .then(function (response) {
    return responseError(response);
  })
}

export async function postWithParam(url, data ,config ={}
) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  return await axiosApi.post(url+"?"+$.param(data), { ...config })
  .then(function (response) {
    return responseError(response);
  })
}

export async function post(url, data, config = {}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  return axiosApi
    .post(url, { ...data }, { ...config },)
    .then(function (response) {
      return responseError(response);
    })
}

function responseError(response){
  if(response.data.status != "1"){
    if (response.data.data != null) {
      return response.data;
    } else {
        if (response.data.message != null) {
          // debugger
          if(response.data.message == "Invalid Token"){
            localStorage.removeItem("authUser")
            localStorage.removeItem("user")
            //localStorage.removeItem("menu")
            document.getElementById("reloginForm").style.display = "block";
            //response.data.listmessage = []
            response.data.status = "1"
            //console.log(response.data)
            return response.data;
          }else{
            return response.data;
          }
        }
    }
  }else{
    return response.data;
  }
}

export async function getWithXls(url, data, config ={responseType: 'blob'}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  let token = ReactSession.get("authUser"); 
  return await axiosApi.get(url+"?KOR_TOKEN="+encodeURIComponent(token)+"&"+$.param(data), { ...config })
  .then(
    response => {
      if (response.status == 200) {
        
        let filename = response.headers['content-disposition']
        .split(';')
        .find(n => n.includes('filename='))
        .replace('filename=', '')
        .trim();
        console.log(filename)
        let url = window.URL.createObjectURL(new Blob([response.data]));   
        saveAs(url, filename);
      } else {
         return responseError(response);
      }
      
  })
}

export async function getWithPdf(url, data, config ={responseType: 'blob'}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  let token = ReactSession.get("authUser"); 
  return await axiosApi.get(url+"?KOR_TOKEN="+encodeURIComponent(token)+"&"+$.param(data), { ...config })
  .then(
    response => {
      if (response.status == 200) {
        console.log(response.headers)
        // let filename = response.headers['content-disposition']
        // console.log(filename)
        let url = window.URL.createObjectURL(new Blob([response.data]));   
        saveAs(url, data.file_name);
      } else {
         return responseError(response);
      }
      
  })
}

export async function postUpload(url, data, config ={}) {
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  
  return axiosApi
    .post(url, data, { ...config },)
    .then(function (response) {
      return responseError(response);
    })
}


export async function postDownload(url, data, config ={responseType: 'blob'}) {
  debugger
  console.log(data)
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
  let token = ReactSession.get("authUser"); 
  return await axiosApi.post(url+"?KOR_TOKEN="+encodeURIComponent(token)+"&"+$.param(data), { ...config })
  //return await axiosApi.post(url, { ...data }, { ...config },)
  .then(
    response => {
      debugger
      if (response.status == 200) {
        debugger
        console.log(response.headers)
        let filename = response.headers['content-disposition'].split("filename=")[1];
        // let abcd = filename.
        console.log(filename)
        let url = window.URL.createObjectURL(new Blob([response.data]));   
        console.log(url)
        saveAs(url, filename);
      } else {
         return responseError(response);
      }
      
  })
}

// export async function postDownload(url, getFiles, config ={responseType: 'blob'}) {
//   debugger
//   console.log(getFiles)
//   axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get('authUser');
//   let token = ReactSession.get("authUser"); 
//   return await axiosApi.post(url+"?KOR_TOKEN="+encodeURIComponent(token)+"&"+$.param(getFiles), { ...config })
//   // return await axiosApi.post(url, { ...data }, { ...config },)
//   .then(
//     response => {
//       debugger
//       if (response.status == 200) {
//         debugger
//         console.log(response.headers)
//         let url = window.URL.createObjectURL(new Blob([response.getFiles]));   
//         console.log(url)
//         saveAs(url, getFiles.filename);
//       } else {
//          return responseError(response);
//       }
      
//   })
// }


export async function postDownloadXlsx(
  url,
  data,
  config = {
    responseType: "blob",
  }
) {
  debugger
  console.log(data)
  axiosApi.defaults.headers.common["KOR_TOKEN"] = ReactSession.get("authUser")
  let token = ReactSession.get("authUser")

  return await axiosApi
    .post(
      url + "?KOR_TOKEN=" + encodeURIComponent(token) + "&" + $.param(data),
      { ...config }
    )
    .then(response => {
      debugger
      if (response.status == 200) {
        debugger
        let res = response.data.data.download
        console.log(res)
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
        const blob = String64toBlob(res, contentType)
        const url = URL.createObjectURL(blob)

        saveAs(url, data.filename)
      } else {
        return responseError(response)
      }
    })
}



const String64toBlob = (data, contentType = "", sliceSize = 512) => {
  debugger
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

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
