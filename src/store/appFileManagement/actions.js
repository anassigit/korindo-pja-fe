import {

    GET_SELECT,
    RESP_GET_SELECT

} from "./actionTypes"

export const getSelectData = (req) => ({
    type: GET_SELECT,
    payload: req,
  })
  
  export const respGetSelect = resp => ({
    type: RESP_GET_SELECT,
    payload: resp,
  })