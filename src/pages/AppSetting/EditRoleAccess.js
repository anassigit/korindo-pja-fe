import { useFormik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap"
import {
  addMaintainRole,
  getRoleParentListLov,
  resetMessage,
} from "store/actions"
import * as Yup from "yup"
import "../../assets/scss/custom.scss"
import "../../config"
import Lovv2 from "common/Lovv2"
import { withTranslation } from "react-i18next"

const EditRoleAccess = (props) => {
    return (
        <Container sty>

        </Container>
    )
}

EditRoleAccess.PropTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appEditDetailAccessRole: PropTypes.any,
  appMaintainRoleData: PropTypes.any,
  setAppEditDetailAccessRole: PropTypes.any,
}

export default withTranslation()(EditRoleAccess)