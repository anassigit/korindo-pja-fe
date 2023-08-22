import React, { useState, useEffect, useCallback } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import { useFormik, } from "formik";
import PropTypes, { any } from 'prop-types';
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
  UncontrolledTooltip,
  UncontrolledAlert,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Dropdown
} from "reactstrap"
import { Link } from "react-router-dom"

import { getSelectFile, deleteFileFolder, resetMessage, getSearch } from "../../store/appFileManagement/actions"
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
import { downloadFileFolder } from "helpers/backend_helper";
import { withTranslation } from "react-i18next"


const FileManagement = (props) => {

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
    dispatch(getSearch({
      "search": ""
    }))
  }, [])


  /* KUMPULAN USE SELECTOR */
  //const [fileManagementSearch, setFileManagementSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "name", order: "asc", search: { any: "" } });
  const [realFileList, setRealFileList] = useState()
  const [realFilePath, setRealFilePath] = useState()

  const getFileSelect = useSelector(state => {
    return state.fileManagementReducer.respGetSelect;
  })

  const getSearchFile = useSelector(state => {
    return state.fileManagementReducer.respGetSearchFile;
  })

  useEffect(() => {
    if (getFileSelect) {
      setRealFileList(getFileSelect?.data?.childList)
      setRealFilePath(getFileSelect?.data?.path);
    }
  }, [getFileSelect])

  useEffect(() => {
    if (getSearchFile?.data !== null) {
      setRealFileList(getSearchFile?.data?.searchList)
    } else if (getSearchFile?.data === null) {
      setRealFileList(getFileSelect?.data?.childList)
    }
  }, [getSearchFile])


  const msgDeleteFile = useSelector(state => {
    return state.fileManagementReducer.msgDelete;
  })


  const fileManagementCloseAlert = () => {
    setFileManagementMsg("")
  }

  useEffect(() => {


    // if (getFileSelect.status == "1") {

    //   setFileManagementMsg("")
    // }

  }, [getFileSelect])


  const getInsideFolder = (e, f) => {
    //debugger
    //console.log("curr", currFolder)
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
  //   ser

  //   console.log("nowbread", idPath )

  //   dispatch(getSelectFile({
  //     'folder_num': idPath
  //   }))


  // };

  const downloadFolderFile = async (num, fileNm) => {

    debugger
    try {

      var indexed_array = {
        "file_num": num,
        "file_nm": fileNm
      };
      await dispatch(downloadFileFolder(indexed_array));
    } catch (error) {
      console.log(error)
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState(false);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSearchChange = (e) => {
    dispatch(getSearch({ "search": e.target.value }))
  }

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
            message={props.t("Are you sure to delete this")}
            setIsYes={setIsYes}
          />

          <Container style={{ display: fileManagementPage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col lg={12}>
                <Col md="4">
                  <Row className="mb-1 col-sm-10">
                    <label className="col-sm-3" style={{ marginTop: "8px" }}>{props.t("Search")}</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleSearchChange}
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
                            <i className="mdi mdi-plus fs-4" style={{ verticalAlign: 'middle' }}></i>{' '}
                            {props.t("New")}
                          </button>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem onClick={() => toggleCreateModal()}>
                            <i className="mdi mdi-folder align-middle fs-4 mb-2" /> {"  "}
                            {props.t("Add New Folder")}
                          </DropdownItem>
                          <DropdownItem onClick={() => toggleUploadModal()}>
                            <i className="mdi mdi-file align-middle fs-4 mb-2" /> {"  "}
                            {props.t("Upload New File")}
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
                      {realFilePath?.map((breadcrumb, index) => {
                        tempIndex = index
                        return (
                          <span key={index}>
                            {index > 0 && <i className="mdi mdi-chevron-right" />}
                            < a onClick={() => getInsideFolder(breadcrumb.num, breadcrumb.parent_num)} style={{ cursor: "pointer" }}><u>{breadcrumb.name}</u></a>
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
                <Row><h6><i className="mdi mdi-folder align-middle fs-5" />{"   "}{props.t("Folders")}</h6></Row>
                <p />
                <p />
                <Row>
                  {
                    // kalo search tidak null ? hasil API :
                    realFileList?.map((myfiles, key) => (

                      myfiles.type === "FOLDER" ?

                        <Col xl={2} key={key}>
                          <Card className="shadow-none border">
                            <CardBody className="p-3" style={{ cursor: "pointer" }} onDoubleClick={() => { getInsideFolder(myfiles.num, myfiles.parent_num) }}>
                              {/* onClick={() => getInsideFolder(myfiles.num, myfiles.parent_num)} */}
                              <div >
                                <div className="float-end ms-2">
                                  <UncontrolledDropdown className="mb-2">
                                    <DropdownToggle
                                      className="font-size-16 text-muted"
                                      tag="a"
                                    >
                                      <i className="mdi mdi-dots-vertical fs-4"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                        <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                        {props.t("Rename")}
                                      </DropdownItem>
                                      <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                        <i className="mdi mdi-arrow-all align-middle fs-4 mb-2" /> {"  "}
                                        {props.t("Move")}
                                      </DropdownItem>
                                      <div className="dropdown-divider"></div>
                                      <DropdownItem onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}>
                                        <i className="mdi mdi-folder-remove align-middle fs-4 mb-2" /> {"  "}
                                        {props.t("Remove")}
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                                <div className="avatar-xs me-3 mb-3">
                                  <div className="avatar-title bg-transparent rounded">
                                    {myfiles.type === "FOLDER" ?
                                      <i className="fa fa-solid fa-folder fs-3 align-middle" style={{ color: "#7bae40" }}></i>
                                      :
                                      <i className="fa fa-solid fa-file fs-3 align-middle" style={{ color: "#7bae40" }} ></i>
                                    }
                                  </div>
                                </div>
                                <div className="d-flex flex-row bd-highlight mb-1">
                                  <div className="overflow-hidden me-auto">
                                    <div className="text-truncate mb-1">
                                      <a className="text-body fs-6 align-baseline" id={`folderTooltip_${key}`}>
                                        {myfiles.name}
                                        <UncontrolledTooltip placement="bottom" target={`folderTooltip_${key}`}>
                                          {myfiles.name}
                                        </UncontrolledTooltip>
                                      </a>
                                    </div>
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
                <h6><i className="mdi mdi-file align-middle fs-5" />{"   "}{props.t("Files")}</h6>
                <p />
                <Row>

                  {realFileList?.map((myfiles, key) => (

                    myfiles.type === "FILE" ?

                      <Col xl={2} key={key}>
                        <Card className="shadow-none border">
                          <CardBody className="p-3">
                            <div >
                              <div className="float-end ms-2">
                                <UncontrolledDropdown className="mb-2">
                                  <DropdownToggle
                                    className="font-size-17 text-muted"
                                    tag="a"
                                  >
                                    <i className="mdi mdi-dots-vertical fs-4" style={{ color: "3b7b7b7" }}></i>
                                  </DropdownToggle>

                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                      <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                      {props.t("Rename")}
                                    </DropdownItem>
                                    <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                      <i className="mdi mdi-arrow-all align-middle fs-4 mb-2" /> {"  "}
                                      {props.t("Move")}
                                    </DropdownItem>
                                    <DropdownItem onClick={() => downloadFolderFile(myfiles.num, myfiles.name)}>
                                      <i className="mdi mdi-download align-middle fs-4 mb-2" /> {"  "}
                                      {props.t("Download")}
                                    </DropdownItem>
                                    <div className="dropdown-divider"></div>
                                    <DropdownItem onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}>
                                      <i className="mdi mdi-folder-remove align-middle fs-4 mb-2" /> {"  "}
                                      {props.t("Remove")}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>

                              <div className="avatar-xs me-3 mb-3">
                                <div className="avatar-title bg-transparent rounded">
                                  {myfiles.name.endsWith("docx") || myfiles.name.endsWith("doc") ? (
                                    <i className="fa fa-solid fa-file-word fs-3 " style={{ verticalAlign: "middle", color: "#41a5ee" }}></i>
                                  ) :
                                    myfiles.name.endsWith("jpg") || myfiles.name.endsWith("jpeg") || myfiles.name.endsWith("gif") || myfiles.name.endsWith("png") ? (
                                      // <img src={myfiles} key={key}
                                      //   style={{
                                      //     width: 20,
                                      //     height: 20,
                                      //     resizeMode: 'contain',
                                      //   }} />
                                      <i className="fa fa-solid fa-image fs-3 text-warning" style={{ verticalAlign: "middle" }}></i>
                                    )
                                      : myfiles.name.endsWith("xls") || myfiles.name.endsWith("xlsx") || myfiles.name.endsWith("csv") ? (
                                        <i className="fa fa-solid fa-file-excel fs-3 " style={{ verticalAlign: "middle", color: "#32c37e" }}></i>
                                      )
                                        : myfiles.name.endsWith("ppt") || myfiles.name.endsWith("pptx") ? (
                                          <i className="fa fa-solid fa-file-powerpoint fs-3" style={{ verticalAlign: "middle", color: "#ff8f6b" }}></i>
                                        )
                                          : myfiles.name.endsWith("pdf") ? (
                                            <i className="fa fa-solid fa-file-pdf fs-3" style={{ verticalAlign: "middle", color: "#b40c01" }}></i>
                                          )
                                            :
                                            (
                                              <i className="fa fa-solid fa-file fs-3 align-baseline" style={{ verticalAlign: "middle", color: "#b7b7b7" }}></i>
                                            )}
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="overflow-hidden me-auto">
                                  <div className="fs-6 text-truncate mb-1">
                                    <Link to="#" className="text-body" id={`nameTooltip_${key}`}>
                                      &nbsp;{myfiles.name}&nbsp;

                                      <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                        {myfiles.name}
                                      </UncontrolledTooltip>
                                    </Link>
                                  </div>
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
FileManagement.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}
export default withTranslation()(FileManagement)
