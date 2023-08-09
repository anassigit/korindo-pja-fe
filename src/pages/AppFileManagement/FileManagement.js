import React, { useState, useEffect, useCallback } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import { useFormik, } from "formik";
import PropTypes from 'prop-types';
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

import { getSelectFile, deleteFileFolder, downloadFile, resetMessage } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import FolderDetail from "./FolderDetail";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from 'axios';
import Rename from "./Rename";
import Upload from "./Upload";
import { useHistory } from "react-router-dom/cjs/react-router-dom";



const FileManagement = () => {

  //let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [fileManagementPage, setFileManagementPage] = useState(true)
  const [insideFilePage, setInsideFilePage] = useState(false)
  const [fileManagementMsg, setFileManagementMsg] = useState("")
  const [fileManagementData, setFileManagementData] = useState()
  const [idFile, setIdFile] = useState("")
  const [idToggle, setIdToggle] = useState("")
  const [idToggleUpload, setIdToggleUpload] = useState("")
  const [myFiles, setMyFiles] = useState([]);
  const [renameModal, setRenameModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)


  const toggleRenameModal = (idT) => {
    debugger
    setRenameModal(!renameModal)
    setIdToggle(idT)
  }

  const toggleUploadModal = (idTU) => {
    debugger
    setUploadModal(!uploadModal)
    setIdToggleUpload(idTU)
  }

  useEffect(() => {
    dispatch(resetMessage());
    dispatch(getSelectFile())
  }, [])

  const [fileManagementSearch, setFileManagementSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "num", order: "asc", search: { any: "" } });

  const getFileSelect = useSelector(state => {

    return state.fileManagementReducer.respGetSelect;
  })

  const fileManagementCloseAlert = () => {
    setFileManagementMsg("")
  }

  useEffect(() => {

    if (getFileSelect.status == "1") {

      setFileManagementMsg("")
    }
  }, [getFileSelect])


  const getInsideFolder = (e) => {
    dispatch(getSelectFile({ 'folder_num': e }))
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

  const getIdPath = (idPath) => {
    debugger
    dispatch(getSelectFile({
      'folder_num': idPath
    }))
  };

  const downloadFolderFile = async (num, fileNm) => {
    debugger
    try {

        var indexed_array = {
            "file_num": num,
            "file_nm": fileNm
        };
        await dispatch(downloadFile(indexed_array));
    } catch (error) {
        console.log(error)
    }
};


  return (
    <RootPageCustom
      componentJsx={
        <>

          {fileManagementMsg !== "" ? <UncontrolledAlert toggle={fileManagementCloseAlert} color={fileManagementMsg.status == "1" ? "success" : "danger"}>
            {typeof fileManagementMsg == 'string' ? null : fileManagementMsg.message}</UncontrolledAlert> : null}

          <Rename
            modal={renameModal}
            toggle={toggleRenameModal}
            idToggle={idToggle}
          />

          <Upload
            modal={uploadModal}
            toggle={toggleUploadModal}
            idToggleUpload={idToggleUpload}
          />

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
                <p />

                <Row>
                  <div>
                    {getFileSelect?.data?.parentList.map((breadcrumb, index) => (
                      <span key={index}>
                        {index > 0 && ' > '}
                        <a onClick={() => { getIdPath(breadcrumb.num) }}>{breadcrumb.name}</a>
                      </span>
                    ))}
                  </div>
                  <p />
                  <p />

                  <h6>FOLDERS</h6>
                  <p />

                </Row>

                <Row className="mb-2">
                  <Col sm="12">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <Col md="4">
                          <Row className="mb-1 col-sm-10">

                            {getFileSelect?.data?.childList.map((myfiles, key) => (

                              myfiles.type === "FOLDER" ?

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
                                          <DropdownItem onClick={() => toggleRenameModal(myfiles.num)}>
                                            Rename
                                          </DropdownItem>
                                          <DropdownItem onClick={() => moveFolderFile(myfiles.num)}>
                                            Move
                                          </DropdownItem>
                                          <DropdownItem onClick={() => toggleUploadModal(myfiles.parent_num)}>
                                            Upload
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
                                        {myfiles.type === "FOLDER" ?
                                          <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                          :
                                          <i className="bx bxs-file font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                        }&nbsp;{myfiles.name}&nbsp;{myfiles.type}
                                      </Link>
                                    </h5>
                                  </CardBody>
                                </Card>
                                : ''
                            ))}

                          </Row>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
                <p />
                <h6>FILES</h6>
                <p />
                <Row className="mb-2">
                  <Col sm="12">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <Col md="4">
                          <Row className="mb-1 col-sm-10">

                            {getFileSelect?.data?.childList.map((myfiles, key) => (

                              myfiles.type === "FILE" ?

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
                                          <DropdownItem onClick={() => toggleRenameModal(myfiles.num)}>
                                            Rename
                                          </DropdownItem>
                                          <DropdownItem onClick={() => moveFolderFile(myfiles.num)}>
                                            Move
                                          </DropdownItem>
                                          <DropdownItem onClick={() => downloadFolderFile(myfiles.num, myfiles.name)}>
                                            Download
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
                                        {myfiles.type === "FILE" ?
                                          <i className="bx bxs-file font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                          :
                                          <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                        }&nbsp;{myfiles.name}&nbsp;{myfiles.type}
                                      </Link>
                                    </h5>
                                  </CardBody>
                                </Card>

                                
                                : ''
                            ))}

                          </Row>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row className="my-3 mt-5">
                  <Col className="d-flex justify-content-end">
                    <div className="col-12 col-lg-2">
                      <button className="btn btn-primary w-100" onClick={() => toggleUploadModal(getFileSelect?.data?.childList?.parent_num)}>
                        <i className="fas fa-plus font-size-14  me-2"></i> Upload File
                      </button>
                    </div>
                  </Col>
                </Row> */}
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
