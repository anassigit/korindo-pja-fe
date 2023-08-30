import React, { useState, useEffect } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import PropTypes, { any } from 'prop-types';
import '../../config';
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  UncontrolledTooltip,
  UncontrolledAlert,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { getSelectFile, deleteFileFolder, resetMessage, getSearch, respGetDownloadCheckFile, downloadCheckFile } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import Rename from "./Rename";
import Upload from "./Upload";
import Create from "./Create";
import Move from "./Move";
import ConfirmModal from "components/Common/ConfirmModal";
import { downloadFileFolder } from "helpers/backend_helper";
import { withTranslation } from "react-i18next"
import MsgModal from 'components/Common/MsgModal';
import "../../assets/scss/contextmenu.scss"
import "../../assets/scss/custom.scss"

//icon images//

import folder2 from '../../assets/images/file_management/folder2.png'
import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import unknown from '../../assets/images/file_management/unknown.png'


const FileManagement = (props) => {

  //let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  let tempIndex = null

  const dispatch = useDispatch();
  const [fileManagementPage, setFileManagementPage] = useState(true)
  const [fileManagementMsg, setFileManagementMsg] = useState("")
  const [idParent, setIdParent] = useState(0)
  const [idChild, setIdChild] = useState(-1)
  const [idToggle, setIdToggle] = useState("")
  const [idToggleUpload, setIdToggleUpload] = useState("")
  const [idToggleCreate, setIdToggleCreate] = useState("")
  const [nmToggle, setNmToggle] = useState("")
  const [nmToggleExt, setNmToggleExt] = useState("")
  const [renameModal, setRenameModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [moveModal, setMoveModal] = useState(false)
  const [confirmModalDelete, setConfirmModalDelete] = useState(false)
  const [confirmModalDownload, setConfirmModalDownload] = useState(false)
  const [isYes, setIsYes] = useState(false)
  const [downloadFlag, setDownloadFlag] = useState(false)
  const [idFolderTemp, setIdFolderTemp] = useState()
  const [idParentTemp, setIdParentTemp] = useState()
  const [fNum, setFnum] = useState(0)
  const [pNum, setPnum] = useState(0)
  const [fNem, setFnem] = useState("")
  const [fName, setFName] = useState("")
  const [tempIdDel, setTempIdDel] = useState()
  const [currFolder, setCurrFolder] = useState()
  const [isTypeFolder, setIsTypeFolder] = useState()
  const [idNowLoc, setIdNowLoc] = useState(0)
  const [typeRename, setTypeRename] = useState("")
  const [downloadMsg, setDownloadMsg] = useState(false)
  const [downloadMsgModal, setDownloadMsgModal] = useState(false)
  const [downloadContentModal, setDownloadContentModal] = useState("")
  const [successClose, setSuccessClose] = useState(false)
  const [appFileManagementData, setAppFileManagementData] = useState(null);


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
    debugger
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
    debugger
    setFnum(Fid)
    setPnum(Pid)
    setFName(fNem)
    setIdNowLoc(currFolder)
    setSuccessClose(false)
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
    debugger
    if (e) {
      setTempIdDel(e)
      setIsTypeFolder(typeFolder)
    }
    setConfirmModalDelete(!confirmModalDelete)
  }

  useEffect(() => {

    const storedData = localStorage.getItem('appFileManagementData');
    let parsedData = null

    if (storedData) {
      parsedData = JSON.parse(storedData);
      setCurrFolder(parsedData);
    }

    dispatch(resetMessage());
    if (storedData !== null) {
      dispatch(getSelectFile({ 'folder_num': storedData }))
    } else {
      dispatch(getSelectFile())
    }
    dispatch(getSearch({
      "search": ""
    }))
  }, [])



  /* KUMPULAN USE SELECTOR */

  const [realFileList, setRealFileList] = useState()
  const [realFilePath, setRealFilePath] = useState()

  const getFileSelect = useSelector(state => {
    return state.fileManagementReducer.respGetSelect;
  })

  const getSearchFile = useSelector(state => {
    return state.fileManagementReducer.respGetSearchFile;
  })

  const downloadRespMsg = useSelector(state => {
    return state.fileManagementReducer.respGetDownloadCheck;
  })

  useEffect(() => {
   
  }, [realFileList])

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

  const getInsideFolder = (e, f, n) => {

    setCurrFolder(e)
    localStorage.setItem('appFileManagementData', JSON.stringify(e));
    dispatch(getSelectFile({ 'folder_num': e }))
    setIdFolderTemp(e)
    setIdChild(e)
    setIdParentTemp(f)
    setIdParent(f)
    setFnem(n)
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


  const [numTemp, setNumTemp] = useState()
  const [fileNmTemp, setFileNmTemp] = useState()

  const downloadCheckFile1 = (num, fileNm) => {
    debugger
    setNumTemp(num)
    setFileNmTemp(fileNm)
    setDownloadFlag(true)
  }

  const downloadCheckFile2 = (num, fileNm) => {
    debugger
    setDownloadFlag(true)

  };

  const toggleMsgModal = () => {
    setDownloadMsgModal(!downloadMsgModal);

    if (downloadMsg.status === "0") {
      downloadCheckFile2
      handleEffect();

    }

  };

  useEffect(() => {
    debugger
    if (downloadFlag) {

      const indexed_array = {
        file_num: numTemp,
        file_nm: fileNmTemp
      };
      dispatch(downloadCheckFile(indexed_array))
      setDownloadFlag(false)

    }
  }, [downloadFlag, fileNmTemp, numTemp])

  const downloadFolderFile = async () => {
    try {

      const indexed_array = {
        file_num: numTemp,
        file_nm: fileNmTemp
      };
      dispatch(downloadFileFolder(indexed_array))
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    debugger
    if (downloadRespMsg.status === "0") {
      setDownloadMsg(downloadRespMsg);
      toggleMsgModal()

    } else if (downloadRespMsg.status === "1") {
      downloadFolderFile()
    }
    setDownloadContentModal(downloadRespMsg.message)
    setDownloadMsg("");

  }, [downloadRespMsg])

  const handleSearchChange = (e) => {
    dispatch(getSearch({ "search": e.target.value }))
  }


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
            fName={fName}
          />

          <ConfirmModal
            modal={confirmModalDelete}
            toggle={confirmToggleDelete}
            message={props.t("Are you sure to delete this")}
            setIsYes={setIsYes}
          />

          <MsgModal
            modal={downloadMsgModal}
            toggle={toggleMsgModal}
            message={downloadContentModal}

          />

          <Container style={{ display: fileManagementPage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col sm="12">
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
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="12">
                    <Col md="6">
                      <Row>
                        <div className="align-baseline fs-6">
                          <strong>
                            {realFilePath?.map((breadcrumb, index) => {
                              tempIndex = index
                              return (
                                <span key={index}>
                                  {index > 0 && <i className="mdi mdi-chevron-right" />}
                                  < a onClick={() => getInsideFolder(breadcrumb.num, breadcrumb.parent_num, breadcrumb.name)} style={{ cursor: "pointer" }}><u>{breadcrumb.name}</u></a>
                                  {/* <a onClick={() => { getIdPath(breadcrumb.num) }}>{breadcrumb.name}</a> */}
                                </span>
                              )
                            }
                            )}
                          </strong>
                        </div>
                      </Row>
                    </Col>
                  </Col>
                </Row>
                <p />
                <p />
                <Row className="mb-1 col-sm-10"><h6><i className="mdi mdi-folder align-baseline fs-5" />{"   "}{props.t("Folders")}</h6></Row>
                <p />
                <p />
                <Row className="mb-2">
                  <Col sm="12">

                    <Row>
                      {
                        realFileList?.map((myfiles, key) => (

                          myfiles.type === "FOLDER" || myfiles > 0 ?

                            <Col md={2} key={key}>
                              <ContextMenuTrigger id={`rightMenu${key}`}>
                                <Card className="shadow-none border">
                                  <CardBody className="p-2" style={{ cursor: "pointer" }} onDoubleClick={() => { getInsideFolder(myfiles.num, myfiles.parent_num, myfiles.name) }}>
                                    {/* Menu Dropdown */}
                                    <div className="float-end">
                                      <UncontrolledDropdown >
                                        <DropdownToggle
                                          className="fs-6 text-muted"
                                          tag="a"
                                        >
                                          <i className="mdi mdi-dots-vertical fs-5 align-middle"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                          <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                            <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                            {props.t("Rename")}
                                          </DropdownItem>
                                          <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                            <i className="mdi mdi-folder-move align-middle fs-4 mb-2" /> {"  "}
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
                                    {/* End Drop Down */}
                                    <div className="text-truncate align-middle">
                                      <a style={{ userSelect: "none" }} className="text-body fs-6" id={`folderTooltip_${key}`}>
                                        {myfiles.type === "FOLDER" ? (
                                          <>
                                            <img src={folder2} style={{ maxWidth: "30px", maxHeight: "30px", verticalAlign: "middle" }} alt="Folder Icon" />
                                            &nbsp;&nbsp;&nbsp;{myfiles.name}
                                          </>
                                        ) : (
                                          <>
                                            <i className="fa fa-solid fa-file fs-1" style={{ color: "#7bae40" }} ></i>
                                            {myfiles.name}
                                          </>
                                        )}
                                        <UncontrolledTooltip placement="bottom" target={`folderTooltip_${key}`}>
                                          {myfiles.name}
                                        </UncontrolledTooltip>
                                      </a>
                                    </div>
                                  </CardBody>
                                </Card>
                              </ContextMenuTrigger>
                              {/* ContextMenu */}
                              <div className="float-end">
                              <ContextMenu id={`rightMenu${key}`} >
                                <MenuItem
                                  onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}
                                  className="contextmenu-item"
                                >
                                  <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                  {props.t("Rename")}
                                </MenuItem>
                                <MenuItem
                                  onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}

                                >
                                  <i className="mdi mdi-folder-move align-middle fs-4 mb-2" /> {"  "}
                                  {props.t("Move")}
                                </MenuItem>
                                <div className="dropdown-divider"></div>
                                <MenuItem
                                  onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}

                                >
                                  <i className="mdi mdi-folder-remove align-middle fs-4 mb-2" /> {"  "}
                                  {props.t("Remove")}
                                </MenuItem>
                              </ContextMenu>
                              </div>
                              {/* End ContextMenu */}
                            </Col>
                            : ''

                        ))}
                    </Row>

                  </Col>
                </Row>
                <p />
                <p />
                <Row className="mb-1 col-sm-10"><h6><i className="mdi mdi-file align-baseline fs-5" />{"   "}{props.t("Files")}</h6></Row>
                <p />
                <Row className="mb-2">
                  <Col sm="12">
                    <Row>

                      {realFileList?.map((myfiles, key) => (
                        myfiles.type === "FILE" || myfiles > 0 ?

                          <Col md={2} key={key}>
                            <ContextMenuTrigger id={`rightMenu${key}`}>
                              <Card className="shadow-none border">
                                <CardBody className="p-2">
                                  <div className="mb-3">

                                    <div className="mb-3">
                                      <div className="avatar-title bg-transparent rounded">

                                        {myfiles.name.endsWith("docx") || myfiles.name.endsWith("doc") ? (
                                          <div className="thumbnail-container">
                                            <img className="thumbnail" src={doc} />

                                          </div>
                                        ) :
                                          myfiles.name.endsWith("jpg") || myfiles.name.endsWith("jpeg") || myfiles.name.endsWith("gif") || myfiles.name.endsWith("png") ? (
                                            // <div className="main">
                                            <div className="thumbnail-container">
                                              <img
                                                src={new URL(myfiles.url)}
                                                className="thumbnail"
                                              />
                                            </div>
                                            // </div>
                                          )
                                            : myfiles.name.endsWith("xls") || myfiles.name.endsWith("xlsx") || myfiles.name.endsWith("csv") ? (
                                              <div className="thumbnail-container">
                                                <img className="thumbnail" src={xls} />

                                              </div>


                                            )
                                              : myfiles.name.endsWith("ppt") || myfiles.name.endsWith("pptx") ? (
                                                <div className="thumbnail-container">
                                                  <img className="thumbnail" src={ppt} />

                                                </div>

                                              )
                                                : myfiles.name.endsWith("pdf") ? (
                                                  <div className="thumbnail-container">
                                                    <img className="thumbnail" src={pdf} />

                                                  </div>
                                                )
                                                  : myfiles.name.endsWith("txt") ? (
                                                    <div className="thumbnail-container">
                                                      <img className="thumbnail" src={txt} />

                                                    </div>
                                                  )
                                                    :
                                                    (
                                                      <div className="thumbnail-container">
                                                        <img className="thumbnail" src={unknown} />

                                                      </div>
                                                    )}

                                      </div>
                                    </div>
                                    {/* DropdownMenu */}
                                    <div className="float-end">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="fs-6 text-muted"
                                          tag="a"
                                        >
                                          <i className="mdi mdi-dots-vertical fs-5 align-middle"></i>
                                        </DropdownToggle>

                                        <DropdownMenu className="dropdown-menu-end">
                                          <DropdownItem onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}>
                                            <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                            {props.t("Rename")}
                                          </DropdownItem>
                                          <DropdownItem onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}>
                                            <i className="mdi mdi-folder-move align-middle fs-4 mb-2" /> {"  "}
                                            {props.t("Move")}
                                          </DropdownItem>
                                          <DropdownItem onClick={() => downloadCheckFile1(myfiles.num, myfiles.name)}>
                                            <i className="mdi mdi-download align-middle fs-4 mb-2" /> {"  "}
                                            {props.t("Download")}
                                          </DropdownItem>
                                          <div className="dropdown-divider"></div>
                                          <DropdownItem onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}>
                                            <i className="mdi mdi-delete-forever align-middle fs-4 mb-2" /> {"  "}
                                            {props.t("Remove")}
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </div>
                                    {/* End DropdownMenu */}
                                    <div className="text-truncate mb-1 text-center">
                                      <a className="text-body fs-6" id={`nameTooltip_${key}`}>
                                        {myfiles.name}

                                        <UncontrolledTooltip placement="bottom" target={`nameTooltip_${key}`}>
                                          {myfiles.name}
                                        </UncontrolledTooltip>
                                      </a>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            </ContextMenuTrigger>
                            <div className="float-end">
                            <ContextMenu id={`rightMenu${key}`}>
                              <MenuItem
                                onClick={() => toggleRenameModal(myfiles.num, myfiles.name, myfiles.type)}

                              >
                                <i className="mdi mdi-pencil align-middle fs-4 mb-2" /> {"  "}
                                {props.t("Rename")}
                              </MenuItem>
                              <MenuItem
                                onClick={() => toggleMoveModal(myfiles.num, myfiles.parent_num)}

                              >
                                <i className="mdi mdi-folder-move align-middle fs-4 mb-2" /> {"  "}
                                {props.t("Move")}
                              </MenuItem>
                              <MenuItem
                                onClick={() => downloadCheckFile1(myfiles.num, myfiles.name)}

                              >
                                <i className="mdi mdi-download align-middle fs-4 mb-2" /> {"  "}
                                {props.t("Download")}
                              </MenuItem>
                              <div className="dropdown-divider"></div>
                              <MenuItem
                                onClick={() => confirmToggleDelete(myfiles.num, myfiles.type)}

                              >
                                <i className="mdi mdi-folder-remove align-middle fs-4 mb-2" /> {"  "}
                                {props.t("Remove")}
                              </MenuItem>
                            </ContextMenu>
                            </div>
                          </Col>


                          : ''
                      ))}


                    </Row>
                  </Col>
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
