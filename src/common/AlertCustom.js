import React from "react";
import PropTypes from "prop-types";
import {
  UncontrolledAlert
} from "reactstrap";

const AlertCustom = props => {

  const AlertCustomCloseAlert = () => {
    props.stateData("")
  }
  return (
    props.msg ? <UncontrolledAlert toggle={AlertCustomCloseAlert} color={props.msg.status == "1" ? "success" : "danger"}>
    {typeof props.msg?.message == 'string' ? props.msg.message : props.msg.listmessage?.map((msg, key) => (<p key={key}>{"* " + msg}</p>))}</UncontrolledAlert> : null
  )
}

AlertCustom.propTypes = {
  msg: PropTypes.any,
  stateData : PropTypes.func
}
export default AlertCustom;
