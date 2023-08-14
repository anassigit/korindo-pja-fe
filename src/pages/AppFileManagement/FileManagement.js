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
  Dropdown
} from "reactstrap"
import { Link } from "react-router-dom"

import { getSelectFile, deleteFileFolder, downloadFile, resetMessage } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from 'axios';
import Rename from "./Rename";
import Upload from "./Upload";
import Create from "./Create";
import Move from "./Move";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ConfirmModal from "components/Common/ConfirmModal";



const FileManagement = () => {

  //let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  let tempIndex = null

  const dispatch = useDispatch();
  const [fileManagementPage, setFileManagementPage] = useState(true)
  const [insideFilePage, setInsideFilePage] = useState(false)
  const [fileManagementMsg, setFileManagementMsg] = useState("")
  const [fileManagementData, setFileManagementData] = useState()
  const [idFile, setIdFile] = useState("")
  const [idParent, setIdParent] = useState(0)
  const [idChild, setIdChild] = useState(-1)
  const [idToggle, setIdToggle] = useState("")
  const [idToggleUpload, setIdToggleUpload] = useState("")
  const [idToggleCreate, setIdToggleCreate] = useState("")
  const [nmToggle, setNmToggle] = useState("")
  const [nmToggleExt, setNmToggleExt] = useState("")
  const [myFiles, setMyFiles] = useState([]);
  const [renameModal, setRenameModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [moveModal, setMoveModal] = useState(false)

  const [confirmModalDelete, setConfirmModalDelete] = useState(false)
  const [confirmModalDownload, setConfirmModalDownload] = useState(false)
  const [isYes, setIsYes] = useState(false)

  const [idFolderTemp, setIdFolderTemp] = useState()
  const [idParentTemp, setIdParentTemp] = useState()

  const [fNum, setFnum] = useState(0)
  const [pNum, setPnum] = useState(0)

  const [tempIdDel, setTempIdDel] = useState()

  const [currFolder, setCurrFolder] = useState()
  const [isTypeFolder, setIsTypeFolder] = useState()

  const [idNowLoc, setIdNowLoc] = useState(0)

  const [typeRename, setTypeRename] = useState("")

  const [idPathB, setIdPathB] = useState()

  useEffect(() => {
    //console.log(idChild)
  }, [idChild])

  useEffect(() => {
    //console.log(idParent)
  }, [idParent])

  const toggleRenameModal = (idT, nmT, tpT) => {

    setIdNowLoc(currFolder)
    setIdToggle(idT)
    if (tpT === "FILE") {
      var realNm = nmT.split('.').slice(0, -1).join('.')
      setNmToggle(realNm)
      var extNm = nmT.split('.').pop();
      setNmToggleExt(extNm)
      setTypeRename(tpT)
    } else {
      setNmToggle(nmT)
      setTypeRename(tpT)
    }
    setRenameModal(!renameModal)
  }

  const toggleUploadModal = () => {

    setIdNowLoc(currFolder)
    setUploadModal(!uploadModal)
    setIdToggleUpload(idChild)
  }

  const toggleCreateModal = () => {

    debugger

    setIdNowLoc(currFolder)
    setCreateModal(!createModal)
    setIdToggleCreate(idChild)
  }

  const toggleMoveModal = (Fid, Pid) => {

    setFnum(Fid)
    setPnum(Pid)
    setIdNowLoc(currFolder)
    setMoveModal(!moveModal)

  }

  const confirmToggleDownload = (e, typeFolder) => {

    if (e) {
      setTempIdDel(e)
      setIsTypeFolder(typeFolder)
    }
    setConfirmModalDownload(!confirmModalDownload)
  }

  const confirmToggleDelete = (e, typeFolder) => {

    if (e) {
      setTempIdDel(e)
      setIsTypeFolder(typeFolder)
    }
    setConfirmModalDelete(!confirmModalDelete)
  }

  useEffect(() => {
    dispatch(resetMessage());
    dispatch(getSelectFile())
  }, [])

  const [fileManagementSearch, setFileManagementSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "name", order: "asc", search: { any: "" } });


  /* KUMPULAN USE SELECTOR */

  const getFileSelect = useSelector(state => {
    return state.fileManagementReducer.respGetSelect;
  })

  const msgDeleteFile = useSelector(state => {
    return state.fileManagementReducer.msgDelete;
  })


  const fileManagementCloseAlert = () => {
    setFileManagementMsg("")
  }

  useEffect(() => {


    if (getFileSelect.status == "1") {

      setFileManagementMsg("")
    }

  }, [getFileSelect])


  const getInsideFolder = (e, f) => {
  console.log("curr", currFolder)
    setCurrFolder(e)
    dispatch(getSelectFile({ 'folder_num': e }))
    setIdFolderTemp(e)
    setIdChild(e)
    setIdParentTemp(f)
    setIdParent(f)
  }

  useEffect(() => {

    if (isYes) {
      let num = null
      num = tempIdDel
      num.toString()

      dispatch(deleteFileFolder(
        {
          'file_num': num
        }
      ))

      if (msgDeleteFile?.status == "1") {
        dispatch(getSelectFile({ 'folder_num': currFolder }))
        setIsYes(!isYes)
      }
    }
  }, [isYes, msgDeleteFile])



  // const getIdPath = (idPath) => {
  //   debugger
    
  //   console.log("nowbread", idPath )

  //   dispatch(getSelectFile({
  //     'folder_num': idPath
  //   }))


  // };

  const downloadFolderFile = async (num, fileNm) => {

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

  const [selectedLanguage, setSelectedLanguage] = useState(false);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  //console.log(tempIndex)

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
            nmToggle={nmToggle}
            nmToggleExt={nmToggleExt}
            typeRename={typeRename}
            idNowLoc={idNowLoc}
          />

          <Upload
            modal={uploadModal}
            toggle={toggleUploadModal}
            idToggleUpload={idToggleUpload}
            idNowLoc={idNowLoc}
          />

          <Create
            modal={createModal}
            toggle={toggleCreateModal}
            idToggleCreate={idToggleCreate}
            idNowLoc={idNowLoc}

          />

          <Move
            modal={moveModal}
            toggle={toggleMoveModal}
            idNowLoc={idNowLoc}
            fNum={fNum}
            pNum={pNum}
          />

          <ConfirmModal
            modal={confirmModalDelete}
            toggle={confirmToggleDelete}
            message={"Are you sure to delete this?"}
            setIsYes={setIsYes}
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
                <Col sm="12">
                  <div className="text-sm-end">
                    <div className="float-end ms-1">
                      <UncontrolledDropdown className="mb-2">
                        <DropdownToggle className="font-size-16 text-muted" tag="a">
                          <button
                            type="button"
                            className="btn btn-primary"
                          >
                            <i className="mdi mdi-plus" style={{ verticalAlign: 'middle' }}></i>{' '}
                            New
                          </button>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem onClick={() => toggleCreateModal()}>
                            Add New Folder
                          </DropdownItem>
                          <DropdownItem onClick={() => toggleUploadModal()}>
                            Upload New File
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </Col>
                <p />
                <p />

                <Row>
                  <div className="align-baseline fs-6">
                    <strong>
                      {getFileSelect?.data?.path.map((breadcrumb, index) => {
                        tempIndex = index
                        return (
                          <span key={index}>
                            {index > 0 && <i className="mdi mdi-chevron-right" />}
                            < a onClick={() => getInsideFolder(breadcrumb.num, breadcrumb.parent_num)} style={{ cursor: "pointer" }}>{breadcrumb.name}</a>
                            {/* <a onClick={() => { getIdPath(breadcrumb.num) }}>{breadcrumb.name}</a> */}
                          </span>
                        )
                      }
                      )}
                    </strong>
                  </div>
                </Row>
                <p />
                <p />
                <Row><h6>FOLDERS</h6></Row>
                <p />
                <p />
                <Row>
                  {getFileSelect?.data?.childList.map((myfiles, key) => (
                    myfiles.type === "FOLDER" ?
                      <Col xl={4} sm={6} key={key}>
                        <Card className="shadow-none border">
                          <CardBody className="p-3" style={{ cursor: "pointer" }} onDoubleClick={() => {getInsideFolder(myfiles.num, myfiles.parent_num)}}> 
                          {/* onClick={() => getInsideFolder(myfiles.num, myfiles.parent_num)} */}
                            <div >
                              <div className="float-end ms-2">
                                <UncontrolledDropdown className="mb-2">
                                  <DropdownToggle
                                    className="font-size-16 text-muted"
                                    tag="a"
                                  >
                                    <i className="mdi mdi-dots-horizontal"></i>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                      Rename
                                    </DropdownItem>
                                    <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                      Move
                                    </DropdownItem>
                                    {/* <DropdownItem onClick={() => toggleUploadModal(myfiles.num)}>
                                      Upload
                                    </DropdownItem> */}
                                    <div className="dropdown-divider"></div>
                                    <DropdownItem onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}>
                                      Remove
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                              <div className="avatar-xs me-3 mb-3">
                                <div className="avatar-title bg-transparent rounded">
                                  {myfiles.type === "FOLDER" ?
                                    <i className="fa fa-solid fa-folder fs-3 align-baseline text-warning"></i>
                                    :
                                    <i className="fa fa-solid fa-file fs-3 align-baseline text-warning"></i>
                                  }
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="overflow-hidden me-auto">
                                  <h5 className="font-size-14 text-truncate mb-1">
                                    <a className="text-body fs-6 align-baseline">
                                      {/* {myfiles.type === "FOLDER" ?
                                        <i className="fa fa-solid fa-folder fs-3 align-baseline text-warning"></i>
                                        :
                                        <i className="bx bxs-file font-size-24 text-warning"></i>
                                      }&nbsp; */}
                                      {myfiles.name}&nbsp;
                                    </a>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      : ''
                  ))}
                </Row>


                <p />
                <h6>FILES</h6>
                <p />
                <Row>

                  {getFileSelect?.data?.childList.map((myfiles, key) => (

                    myfiles.type === "FILE" ?

                      <Col xl={4} sm={6} key={key}>
                        <Card className="shadow-none border">
                          <CardBody className="p-3">
                            <div >
                              <div className="float-end ms-2">
                                <UncontrolledDropdown className="mb-2">
                                  <DropdownToggle
                                    className="font-size-16 text-muted"
                                    tag="a"
                                  >
                                    <i className="mdi mdi-dots-horizontal" ></i>
                                  </DropdownToggle>

                                  <DropdownMenu className="dropdown-menu-end">
                                    {/* <DropdownItem onClick={() => getInsideFolder(myfiles.num)}>
                                      Open
                                    </DropdownItem> */}
                                    <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                      Rename
                                    </DropdownItem>
                                    <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                      Move
                                    </DropdownItem>
                                    <DropdownItem onClick={() => downloadFolderFile(myfiles.num, myfiles.name)}>
                                      Download
                                    </DropdownItem>
                                    <div className="dropdown-divider"></div>
                                    <DropdownItem onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}>
                                      Remove
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>

                              <div className="avatar-xs me-3 mb-3">
                                <div className="avatar-title bg-transparent rounded">
                                  {myfiles.name.endsWith("docx") || myfiles.name.endsWith("doc") ? (
                                    <i className="fa fa-solid fa-file-word fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                  ) : myfiles.name.endsWith("jpg") || myfiles.name.endsWith("jpeg") || myfiles.name.endsWith("gif") || myfiles.name.endsWith("png") ? (
                                    <img src={myfiles} key={key}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                      }} />
                                  ) : myfiles.name.endsWith("xls") || myfiles.name.endsWith("xlsx") || myfiles.name.endsWith("csv") ? (
                                    <i className="fa fa-solid fa-file-excel fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                  )
                                    : myfiles.name.endsWith("ppt") || myfiles.name.endsWith("pptx") ? (
                                      <i className="fa fa-solid fa-file-powerpoint fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                    )
                                      : myfiles.name.endsWith("pdf") ? (
                                        <i className="fa fa-solid fa-file-pdf fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                      )
                                        :
                                        (
                                          <i className="fa fa-solid fa-file fs-3 align-baseline text-warning" style={{ verticalAlign: "middle" }}></i>
                                        )}
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="overflow-hidden me-auto">
                                  <h5 className="font-size-14 text-truncate mb-1">
                                    <Link to="#" className="text-body">
                                      {/* {myfiles.type === "FILE" ?
                                        <i className="bx bxs-file font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                        :
                                        <i className="bx bxs-folder font-size-24 text-warning" style={{ verticalAlign: "middle" }}></i>
                                      } */}
                                      &nbsp;{myfiles.name}&nbsp;
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>


                      : ''
                  ))}


                </Row>
              </Col>
            </Row>
          </Container>

        </>
      }
    />

  );
};
export default FileManagement
