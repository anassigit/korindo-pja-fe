import React, { useState, useEffect, useCallback } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import { useFormik, } from "formik";
import * as Yup from "yup";
import '../../config';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Spinner,
  FormGroup,
  CardHeader,
  UncontrolledAlert,
} from "reactstrap"

import { editUserProfile, resetMessage, msgEdit, getProfile } from "../../store/appUserProfile/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';


const FileManagement = () => {

  let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [userProfilePage, setUserProfilePage] = useState(true)
  const [appUserProfileMsg, setAppUserProfileMsg] = useState("")
  const [userProfilePassword, setUserProfilePassword] = useState(false)
  const [userProfilePageData, setUserProfilePageData] = useState()

  const [changePasswordMsg, setChangePasswordMsg] = useState("")

  useEffect(() => {
    dispatch(resetMessage());
  }, [])

  const getDetailProfile = useSelector(state => {
    return state.userProfileReducer.respGetProfile;
  })

  const appUserProfileCloseAllert = () => {
    setAppUserProfileMsg("")
  }

  const appChangePassCloseAllert = () => {
    setChangePasswordMsg("")
  }

  const [appUserProfileSpinner, setAppUserProfileSpinner] = useState(false);

  useEffect(() => {
    if (userId == getDetailProfile?.data?.member?.id || getDetailProfile !== null) {
      appUserProfilepValidInput.setFieldValue("name", getDetailProfile?.data?.member?.name)
      appUserProfilepValidInput.setFieldValue("pname", getDetailProfile?.data?.member?.pname)
      appUserProfilepValidInput.setFieldValue("gname", getDetailProfile?.data?.member?.gname)
      appUserProfilepValidInput.setFieldValue("hp", getDetailProfile?.data?.member?.hp)
      appUserProfilepValidInput.setFieldValue("id", getDetailProfile?.data?.member?.id)
    }
  }, [getDetailProfile])

  useEffect(() => {
    dispatch(getProfile({
      "search": {
        "langType": "eng"
      }
    }))
  }, [])


  //const u = JSON.parse(ReactSession.get("user") || null)

  const appUserProfilepValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {

      name: '',
      pname: '',
      gname: '',
      hp: '',
      id: '',

    },

    validationSchema: Yup.object().shape({

      hp: Yup.string().required("Please enter mobile phone number.")

    }),

  });


  const updateHp = async () => {
    try {
      debugger
      var map = {
        "hp": appUserProfilepValidInput.values.hp
      };
      await dispatch(editUserProfile(map));
      setAppUserProfileMsg("")
    } catch (message) {
      console.log(message)
    }
  };

  const respMsg = useSelector(state => {
    return state.userProfileReducer.msgEdit;
  });


  useEffect(() => {
    if (respMsg.status == "1") {
      setUserProfilePage(true);
    }
    setAppUserProfileMsg(respMsg)
    setAppUserProfileSpinner(false);
    setAppUserProfileMsg
  }, [respMsg])

  useEffect(() => {
    if (appUserProfileMsg == "1") {
      console.log(appUserProfileMsg)
    }
  }, [appUserProfileMsg])

  const ChangePassPage = () => {
    setAppUserProfileMsg("")
    setUserProfilePageData(userProfilePageData)
    setUserProfilePage(false)
    setUserProfilePassword(true)
  }

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }
  
  return (
    <RootPageCustom
      componentJsx={
        <>

          {appUserProfileMsg !== "" ? <UncontrolledAlert toggle={appUserProfileCloseAllert} color={appUserProfileMsg.status == "1" ? "success" : "danger"}>
            {typeof appUserProfileMsg == 'string' ? null : appUserProfileMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: userProfilePage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader><i className="bx bxs-edit-alt font-size-18 align-middle me-2"></i>File Management</CardHeader>
                  <CardBody>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

        </>
      }
    />

  );
};
export default FileManagement
