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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"
import { Link } from "react-router-dom"

import { getSelectFile, deleteFileFolder, resetMessage } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import FolderDetail from "./FolderDetail";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from 'axios';


const FileManagement = () => {

  //let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [fileManagementPage, setFileManagementPage] = useState(true)
  const [insideFilePage, setInsideFilePage] = useState(false)
  const [fileManagementMsg, setFileManagementMsg] = useState("")
  const [fileManagementData, setFileManagementData] = useState()
  const [idFile, setIdFile] = useState("")
  const [myFiles, setMyFiles] = useState([]);

  useEffect(() => {
    dispatch(resetMessage());
    dispatch(getSelectFile())
  }, [])

  const [fileManagementSearch, setFileManagementSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "num", order: "asc", search: { any: "" } });

  const getFileSelect = useSelector(state => {

    return state.fileManagementReducer.respGetSelect;
  })


  useEffect (() => {
    debugger
  }, [getFileSelect])

  const fileManagementCloseAlert = () => {
    setFileManagementMsg("")
  }

  useEffect(() => {

    if (getFileSelect.status == "1") {



      setFileManagementMsg("")
    }
  }, [getFileSelect])


  // const myFiles = [
  //   // {
  //   //   id: 6,
  //   //   name: "Applications",
  //   //   file: "20",
  //   //   Gb: 8,
  //   // },
  // ];

  //   const insideFolder = (getFileSelect) => {
  //     setApp042setMsg("")
  //     setApp042p01Data(app042p01HasilTanamData)
  //     setApp042p01Page(false)
  //     setApp042p02Page(true)

  // }


  const getInsideFolder = (e) => {

    setIdFile(e)
    setFileManagementMsg("")
    setFileManagementData(fileManagementData)
    setFileManagementPage(false)
    setInsideFilePage(true)

  }


  const removeFolderFile = (e) => {
    debugger
    let num = e
    num.toString();
    dispatch(deleteFileFolder(
      {
        'file_num': num
      }
    ))
  }




  return (
    <RootPageCustom
      componentJsx={
        <>

          {fileManagementMsg !== "" ? <UncontrolledAlert toggle={fileManagementCloseAlert} color={fileManagementMsg.status == "1" ? "success" : "danger"}>
            {typeof fileManagementMsg == 'string' ? null : fileManagementMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: fileManagementPage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col lg={12}>
                <Col md="4">
                  <Row className="mb-1 col-sm-10">
                    <label className="col-sm-3" style={{ marginTop: "8px" }}>Search : </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                      // value={appInstructionsTabelSearch.search.search}
                      // onChange={e => {
                      //   setAppInstructionsTabelSearch({
                      //     page: appInstructionsTabelSearch.page, limit: appInstructionsTabelSearch.limit, offset: appInstructionsTabelSearch.offset,
                      //     sort: appInstructionsTabelSearch.sort, order: appInstructionsTabelSearch.order, search: { search: e.target.value, langType: appInstructionsTabelSearch.search.langType, status: appInstructionsTabelSearch.search.status }
                      //   })
                      // }}
                      />
                    </div>
                  </Row>
                </Col>
                <p />
                <Row className="mb-2">
                  <Col sm="12">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <Col md="4">
                          <Row className="mb-1 col-sm-10">
                            {getFileSelect?.data?.childList.map((myfiles, key) => (

                              <Card className="shadow-none border" style={{ verticalAlign: "middle" }} key={key}>
                                <CardBody>

                                  <div className="float-end ms-1">
                                    <UncontrolledDropdown className="mb-2">
                                      <DropdownToggle
                                        className="font-size-16 text-muted"
                                        tag="a"
                                      >
                                        <i className="mdi mdi-dots-horizontal" ></i>
                                      </DropdownToggle>

                                      <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem onClick={() => getInsideFolder(myfiles.num)}>
                                          Open
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Rename
                                        </DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem onClick={() => removeFolderFile(myfiles.num)}>
                                          Remove
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                  <h5 className="font-size-14 text-truncate mb-1">
                                    <Link to="#" className="text-body">
                                      {myfiles.type == "0" ?
                                        <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                        :
                                        <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                      }&nbsp;{myfiles.name}
                                    </Link>
                                  </h5>




                                </CardBody>
                              </Card>

                            ))}
                          </Row>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Breadcrumbs title="Forms" breadcrumbItem="Maintain Menu" style={{ marginTop: "20px"}}/> */}


              </Col>
            </Row>
          </Container>

          <FolderDetail
            insideFilePage={insideFilePage}
            setInsideFilePage={setInsideFilePage}
            setFileManagementPage={setFileManagementPage}
            setFileManagementMsg={setFileManagementMsg}
            idFile={idFile}
          />

        </>
      }
    />

  );
};
export default FileManagement
