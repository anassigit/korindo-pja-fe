import React, { useState, useEffect, useRef } from "react"
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
  UncontrolledDropdown,
  CardTitle,
  CardGroup
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

//css//
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
import DatePicker from "react-datepicker";
import CustomDatePicker from "common/CustomDatePicker";


const EnterMonthlyData = (props) => {

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

  // folder left-right click
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  // file left-right click
  const [isContextMenuOpen2, setContextMenuOpen2] = useState(false);
  const [isDropdownMenuOpen2, setDropdownMenuOpen2] = useState(false);

  const contextMenuRef = useRef(null);

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


  // folder left-right click

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });


  const handleContextMenuOpen = (e) => {
    debugger
    e.preventDefault();

    const xPos = e.clientX;
    const yPos = e.clientY;

    setContextMenuOpen(true);
    setDropdownMenuOpen(false);
    setContextMenuPosition({ x: xPos, y: yPos });
  };

  const handleDropdownMenuToggle = () => {
    debugger
    setDropdownMenuOpen(true);
    setContextMenuOpen(false);
    setContextMenuOpen2(false);
  };

  // file left-right click

  const [contextMenuPosition2, setContextMenuPosition2] = useState({ x: 0, y: 0 });


  const handleContextMenuOpen2 = (e) => {
    debugger
    e.preventDefault();

    const xPos2 = e.clientX;
    const yPos2 = e.clientY;

    setContextMenuOpen2(true);
    setDropdownMenuOpen2(false);
    setContextMenuPosition2({ x: xPos2, y: yPos2 });
  };

  const handleDropdownMenuToggle2 = () => {
    debugger
    setDropdownMenuOpen2(true);
    setContextMenuOpen2(false);
    setContextMenuOpen(false);
  };


  useEffect(() => {
    debugger
    if (!isDropdownMenuOpen2) {
      setContextMenuOpen2(true);
    }
  }, [isContextMenuOpen2])

  const dateChanger = (name, selectedDate) => {
    // let convertedDate = selectedDate.toISOString().substr(0, 7);
    // if (name === 'from') {
    //     setDateFrom(convertedDate);
    //     setAppInstructionsTabelSearch((prevSearch) => ({
    //         ...prevSearch,
    //         search: {
    //             ...prevSearch.search,
    //             from: convertedDate,
    //             to: dateTo,
    //         },
    //     }));
    // } else if (name === 'to') {
    //     setDateTo(convertedDate);
    //     setAppInstructionsTabelSearch((prevSearch) => ({
    //         ...prevSearch,
    //         search: {
    //             ...prevSearch.search,
    //             from: dateFrom,
    //             to: convertedDate,
    //         },
    //     }));
    // }
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
                      <div className="d-flex justify-content-end">
                        <Col md='1' className="d-flex justify-content-end">
                          <Row className="mb-1" style={{width:"80%", marginRight:"-24%"}} >
                            <DatePicker
                              className="form-control text-center"
                              dateFormat="yyyy-MM-dd"
                              showYearPicker
                              placeholderText="YYYY"
                              // onChange={date => {
                              //   handleChangeDate(date);
                              //   editInstructionsValidInput.handleChange('insDate', date);
                              // }}
                              // selected={editInstructionsValidInput.values.insDate ? new Date(editInstructionsValidInput.values.insDate) : null}
                            />
                          </Row>
                        </Col>
                        &nbsp;
                        <Col md='1' className="d-flex justify-content-end ">
                          <Row className="mb-1" style={{width:"80%"}}>
                            <DatePicker
                              className="form-control text-center"
                              dateFormat="yyyy-MM-dd"
                              // onChange={}
                              // selected={editInstructionsValidInput.values.insDate ? new Date(editInstructionsValidInput.values.insDate) : null}
                            />
                          </Row>
                        </Col>
                      </div>
                    </Col>
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
                                  <a onClick={() => getInsideFolder(breadcrumb.num, breadcrumb.parent_num, breadcrumb.name)} style={{ cursor: "pointer" }}><u>{breadcrumb.name}</u></a>
                                </span>
                              )
                            })}
                          </strong>
                        </div>
                      </Row>
                    </Col>
                  </Col>
                </Row>
                <p />
                <p />
                <Row className="mb-1 col-sm-10"><h6>{props.t("Monthly Data")}</h6></Row>
                <p />
                <p />
                <Row className="mb-2">
                  <Col sm='12'>
                    <CardGroup>
                      <Card className="col-lg-3 col-md-6" style={{ flex: "1", marginRight: "2%" }}>
                        <CardBody>
                          Short Card
                        </CardBody>
                      </Card>
                      <Card className="col-lg-3 col-md-6" style={{ flex: "1", marginRight: "2%" }}>
                        <CardBody>
                          Short Card
                        </CardBody>
                      </Card>
                      <Card className="col-lg-3 col-md-6" style={{ flex: "1", marginRight: "2%" }}>
                        <CardBody>
                          Long Card
                        </CardBody>
                      </Card>
                      <Card className="col-lg-3 col-md-6" style={{ flex: "1" }}>
                        <CardBody>
                          Long Card
                        </CardBody>
                      </Card>
                    </CardGroup>
                  </Col>
                </Row>

                <p />
                <p />
                <Row className="mb-1 col-sm-10"><h6>{"   "}{props.t("Folders")}</h6></Row>
                <p />
                <Row className="mb-2">
                  <Col sm="12">
                    <Row>


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
EnterMonthlyData.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}
export default withTranslation()(EnterMonthlyData)
