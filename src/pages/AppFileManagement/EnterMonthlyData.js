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
  CardGroup,
  Input,
  CardDeck,
  Button,
  Spinner,
  InputGroup
} from "reactstrap"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { getSelectFile, deleteFileFolder, resetMessage, getSearch, respGetDownloadCheckFile, downloadCheckFile, getYear, getMonth, getMonthlyData } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import ConfirmModal from "components/Common/ConfirmModal";
import { downloadFileFolder } from "helpers/backend_helper";
import { withTranslation } from "react-i18next"
import MsgModal from 'components/Common/MsgModal';

//css//
import "../../assets/scss/contextmenu.scss"
import "../../assets/scss/custom.scss"

//images//

import doc from '../../assets/images/file_management/doc.png'
import xls from '../../assets/images/file_management/xls.png'
import ppt from '../../assets/images/file_management/ppt.png'
import pdf from '../../assets/images/file_management/pdf.png'
import txt from '../../assets/images/file_management/txt.png'
import media from '../../assets/images/file_management/media.png'

//js file//
import UploadMonthly from "./UploadMonthly";
import FileTables from "./FileTables";

import DatePicker from "react-datepicker";
import moment from "moment";
// import '../../assets/scss/custom/components/custom-datepicker.scss'

const EnterMonthlyData = (props) => {

  const dispatch = useDispatch();

  let langType = localStorage.getItem("I18N_LANGUAGE")
  const storedMonth = localStorage.getItem("selectedMonth");

  const [enterMonthlyDataSpinner, setEnterMonthlyDataSpinner] = useState(false);
  const [monthlyDataPage, setMonthlyDataPage] = useState(true)
  const [monthlyDataMsg, setMonthlyDataMsg] = useState("")

  const [uploadModalMonthly, setUploadModalMonthly] = useState(false)
  const [idFolderUpload, setIdFolderUpload] = useState("")

  const [detailModalMonthly, setDetailModalMonthly] = useState(false)
  const [idFolderDetail, setIdFolderDetail] = useState("")

  const [dateState, setDateState] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const [confirmModalDelete, setConfirmModalDelete] = useState(false)
  const [tempIdDel, setTempIdDel] = useState()
  const [isYes, setIsYes] = useState(false)

  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
  ]

  const yearData = useSelector(state => {
    return state.fileManagementReducer.respGetYear;
  })

  const monthData = useSelector(state => {
    return state.fileManagementReducer.respGetMonth;
  })

  const dashboardData = useSelector(state => {
    return state.fileManagementReducer.respGetMonthlyData;
  })

  const msgDeleteFile = useSelector(state => {
    return state.fileManagementReducer.msgDelete;
  })


  const handleSearchChange = (e) => {
    dispatch(getSearch({ "search": e.target.value }))
  }

  useEffect(() => {
    dispatch(getMonthlyData({}))
    setEnterMonthlyDataSpinner(true)
  }, [])

  useEffect(() => {
    if (dashboardData.status === '1') {
      setEnterMonthlyDataSpinner(false)
    }
  }, [dashboardData])

  useEffect(() => {
    let tempDate = new Date(dateState ? dateState : '')
    let year = tempDate ? tempDate.getFullYear() : ''
    let month = tempDate ? tempDate.getMonth() + 1 : ''
    let monthDateString = ""

    if (year && month) {
      monthDateString = year + "-" + (month < 10 ? "0" : "") + month
    }

    const dateObj = new Date(storedMonth)
    const yearStored = dateObj.getFullYear()
    const monthStored = (dateObj.getMonth() + 1).toString().padStart(2, '0')

    const formattedStoredMonth = `${yearStored}-${monthStored}`

    const dateFormatRegex = /^\d{4}-\d{2}$/;

    if (formattedStoredMonth && monthDateString && monthDateString !== formattedStoredMonth) {

      const formattedDate = monthDateString.replace(/-/g, '')
      dispatch(getMonthlyData({ date: formattedDate }))
      setDateState(new Date(monthDateString))

    } else if (dateState) {
      if (dateState instanceof Date) {
        const tempDate = `${dateState.getFullYear()}-${(dateState.getMonth() + 1).toString().padStart(2, '0')}`
        const formattedDate = tempDate.replace(/-/g, '')
        dispatch(getMonthlyData({ date: formattedDate }))
      } else {
        debugger
        const formattedDate = dateState.replace(/-/g, '')
        dispatch(getMonthlyData({ date: formattedDate }))
      }
      setEnterMonthlyDataSpinner(true);

    } else if (formattedStoredMonth && formattedStoredMonth !== 'null' && dateFormatRegex.test(formattedStoredMonth)) {
      setDateState(new Date(formattedStoredMonth))
      if (typeof formattedStoredMonth === 'string') {
        const formattedDate = formattedStoredMonth.replace(/-/g, '')
        dispatch(getMonthlyData({ date: formattedDate }))
      }
    }
  }, [dateState, langType]);

  const toggleUploadModalMonthly = (folder_id) => {
    setUploadModalMonthly(!uploadModalMonthly)
    setIdFolderUpload(folder_id)

  }

  const toggleDetailModalMonthly = (folder_id) => {
    setDetailModalMonthly(!detailModalMonthly)
    setIdFolderDetail(folder_id)

  }

  const confirmToggleDelete = (e) => {

    if (e) {
      setTempIdDel(e)
    }
    setConfirmModalDelete(!confirmModalDelete)
  }

  useEffect(() => {
    if (isYes && tempIdDel) {
      let num = null
      num = tempIdDel
      num.toString()
      setEnterMonthlyDataSpinner(true);
      dispatch(deleteFileFolder(
        {
          'file_num': num
        }
      ))
      setMonthlyDataMsg('')
      setIsYes(false)
    }
  }, [isYes])

  useEffect(() => {
    if (msgDeleteFile?.status == "1") {
      setMonthlyDataMsg(msgDeleteFile)

      if (dateState instanceof Date) {
        const tempDate = `${dateState.getFullYear()}-${(dateState.getMonth() + 1).toString().padStart(2, '0')}`
        const formattedDate = tempDate.replace(/-/g, '')
        dispatch(getMonthlyData({ date: formattedDate }))
    } else {
        const formattedDate = dateState.replace(/-/g, '')
        dispatch(getMonthlyData({ date: formattedDate }))
    }
      setIsYes(!isYes)
      setEnterMonthlyDataSpinner(false);
    }
  }, [msgDeleteFile])

  const getFileIconClass = (fileName) => {
    const fileExtensions = {
      media: [".jpg", ".png", ".img", ".gif", ".mp4", ".3gp", ".mov", ".mkv", ".webm", ".avi", ".MOV", ".ogg", ".wmv"],
      pdf: [".pdf"],
      documents: [".doc", ".docx", ".txt", ".rtf", ".odt", ".html", ".xml", ".csv", ".xls", ".xlsx", ".odp"],
      excel: [".xls", ".xlsx"],
      powerpoint: [".ppt", ".pptx"],
      txt: [".txt"],
    };

    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))

    if (fileExtensions.pdf.includes(extension)) {
      return pdf
    } else if (fileExtensions.excel.includes(extension)) {
      return xls
    } else if (fileExtensions.powerpoint.includes(extension)) {
      return ppt
    } else if (fileExtensions.txt.includes(extension)) {
      return txt
    } else if (fileExtensions.media.includes(extension)) {
      return media
    } else if (fileExtensions.documents.some(ext => extension === ext)) {
      return doc
    } else {
      return doc
    }
  };
  return (
    <RootPageCustom
      componentJsx={
        <>

          <ConfirmModal
            modal={confirmModalDelete}
            toggle={confirmToggleDelete}
            message={props.t("Are you sure to delete this?")}
            setIsYes={setIsYes}
          />

          <UploadMonthly
            modal={uploadModalMonthly}
            toggle={toggleUploadModalMonthly}
            idFolderUpload={idFolderUpload}
            setEnterMonthlyDataSpinner={setEnterMonthlyDataSpinner}
            dateState={dateState}
          />

          <FileTables
            modal={detailModalMonthly}
            toggle={toggleDetailModalMonthly}
            idFolderDetail={idFolderDetail}
            dateState={dateState}
            setEnterMonthlyDataSpinner={setEnterMonthlyDataSpinner}
            setMonthlyDataMsg={setMonthlyDataMsg}
          />

          {monthlyDataMsg !== "" ? <UncontrolledAlert toggle={() => setMonthlyDataMsg('')} color={monthlyDataMsg.status == "1" ? "success" : "danger"}>
            {typeof monthlyDataMsg == 'string' ? null : monthlyDataMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: monthlyDataPage ? 'block' : 'none' }} fluid="true">
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col sm="12">
                    <Row className="mb-1">
                      <InputGroup style={{ display: 'flex', justifyContent: 'right' }} className="d-flex">
                        <div style={{ width: '150px' }}>
                          <DatePicker
                            onClickOutside={() => {
                              setShowDatePicker(false)
                              setIsButtonClicked(false)
                            }}
                            onInputClick={() => {
                              setShowDatePicker(!showDatePicker)
                              setIsButtonClicked(false)
                            }}
                            open={showDatePicker}
                            className="form-control custom-reset-date"
                            showMonthYearPicker
                            dateFormat="yyyy-MM"
                            selected={dateState ? moment(dateState, 'yyyy-MM').toDate() : new Date()}
                            onChange={(date) => {
                              localStorage.setItem("selectedMonth", date ? moment(date).format('yyyy-MM') : new Date())
                              setDateState(date ? moment(date).format('yyyy-MM') : new Date())
                            }}
                            onKeyDown={(e) => {
                              e.preventDefault()
                            }}
                            isClearable
                            customInput={
                              <>
                                <div className="react-datepicker__input-container">
                                  <input
                                    type="text"
                                    className="form-control custom-reset-date"
                                    value={dateState ? moment(dateState).format('YYYY-MM') : moment().format('YYYY-MM')}
                                  />
                                  {/* <button type="button" className="react-datepicker__close-icon" aria-label="Close" tabIndex="-1">
                                    Clear
                                  </button> */}
                                </div>
                              </>
                            }
                          />
                        </div>
                        <Button onClick={(e) => {
                          if (!isButtonClicked) {
                            setShowDatePicker(!showDatePicker);
                            setIsButtonClicked(true)
                          }
                        }}>
                          <span className="mdi mdi-calendar" />
                        </Button>
                      </InputGroup>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-1 col-sm-10"><h6>{props.t("Monthly Data")}</h6></Row>
                <p />
                <p /><Row className="mb-2">
                  {dashboardData?.data?.list.map((items, index) => {
                    return (
                      <Col sm={12} md={6} lg={3} key={index}>
                        <Card className="mb-2" style={{ backgroundColor: items.open ? null : "#E8E8E8", borderRadius: "0.5em" }}>
                          <CardBody>
                            <Row className="text-center justify-content-center" style={{ marginTop: "-5%" }}>
                              {items.count > 0 ? (
                                <>
                                  {items.fileList?.map((file, i) => {

                                    return (
                                      i < 3 ? (
                                        items.count > 1 ? (
                                          <Col
                                            md={items.count > 3 ? '3' : (items.count === 2 ? '5' : '3')}
                                            style={{ height: "12vh" }}
                                            className="files"
                                            key={i}
                                          >
                                            <div style={{ position: "relative", textAlign: "center" }}>
                                              {/* <span
                                                style={{
                                                  fontSize: "50px",
                                                  color: items.open ? "#7BAE40" : "#BBBCBE",
                                                  opacity: "0.75",
                                                  cursor: "pointer"
                                                }}
                                                className={`mdi ${getFileIconClass(file.name)}`}
                                                onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                              ></span> */}
                                              <img style={{
                                                height: '50px',
                                                marginTop: '12px',
                                                cursor: "pointer"
                                              }}
                                                src={getFileIconClass(file.name)}
                                                onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                              />
                                              {items.edit ?
                                                <span
                                                  style={{
                                                    fontSize: "18px",
                                                    position: "absolute",
                                                    top: "0",
                                                    left: "2.5em",
                                                    right: "0",
                                                    textAlign: "center",
                                                    color: "#B4B4B8",
                                                    cursor: "pointer"
                                                  }}
                                                  className="mdi mdi-delete"
                                                  onClick={() => confirmToggleDelete(file.num)}
                                                ></span> : null}
                                            </div>
                                            <div
                                              id={`fileName_${index}_${i}`}
                                              style={{
                                                maxWidth: '100%',
                                                maxHeight: '3em',
                                                fontSize: '11px',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                whiteSpace: 'normal',
                                                textOverflow: 'ellipsis',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                margin: '0 auto',
                                              }}
                                              onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                            >
                                              {file.name}
                                            </div>
                                            <UncontrolledTooltip placement="top" target={`fileName_${index}_${i}`}>
                                              {file.name}
                                            </UncontrolledTooltip>
                                          </Col>
                                        ) : (
                                          <Col className="files" style={{ height: "12vh" }} key={i}>
                                            <div style={{ position: "relative", textAlign: "center" }}>
                                              {/* <span
                                                style={{
                                                  fontSize: "50px",
                                                  color: items.open ? "#7BAE40" : "#BBBCBE",
                                                  opacity: "0.75",
                                                  cursor: "pointer"
                                                }}
                                                className={`mdi ${getFileIconClass(file.name)}`}
                                                onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                              ></span> */}
                                              <img style={{
                                                // position: 'absolute',
                                                // top: '27%',
                                                // left: '37%',
                                                // width: '50px',
                                                height: '50px',
                                                marginTop: '12px',
                                                cursor: "pointer"
                                              }}
                                                src={getFileIconClass(file.name)}
                                                onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                              />
                                              {items.edit ? <span
                                                style={{
                                                  fontSize: "18px",
                                                  position: "absolute",
                                                  top: "0",
                                                  left: "2.5em",
                                                  right: "0",
                                                  textAlign: "center",
                                                  color: "#B4B4B8",
                                                  cursor: "pointer"
                                                }}
                                                className="mdi mdi-delete"
                                                onClick={() => confirmToggleDelete(file.num)}
                                              ></span> : null}
                                            </div>
                                            <div
                                              id={`fileName_${index}_${i}`}
                                              style={{
                                                width: '100%',
                                                fontSize: "12px",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                textAlign: "center",
                                                marginLeft: "50%",
                                                transform: "translateX(-50%)",
                                                cursor: "pointer"
                                              }}
                                              onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                            >
                                              {file.name}
                                            </div>

                                            <UncontrolledTooltip placement="top" target={`fileName_${index}_${i}`}>
                                              {file.name}
                                            </UncontrolledTooltip>
                                          </Col>
                                        )
                                      ) : (
                                        i === 3 ? (
                                          <Col md='3' style={{ marginTop: "2%" }} className="files" key={i}>
                                            <a
                                              style={{
                                                fontSize: "50px",
                                                color: items.open ? "#7BAE40" : "#BBBCBE",
                                                opacity: "0.75",
                                                cursor: items.open ? "pointer" : "default"
                                              }}
                                              className="mdi mdi-dots-horizontal"
                                              onClick={items.open ? () => toggleDetailModalMonthly(items.num) : null}
                                            ></a>
                                          </Col>
                                        ) : null
                                      )
                                    )
                                  }
                                  )}

                                </>
                              ) : (
                                <Col className="nofile" style={{ height: "12vh" }}>
                                  <span
                                    style={{
                                      fontSize: "50px",
                                      color: items.open ? "#f46a6a" : "#BBBCBE",
                                      opacity: "0.75",
                                    }}
                                    className="mdi mdi-file-cancel-outline"
                                  ></span>
                                  <span
                                    hidden
                                    style={{
                                      fontSize: "18px",
                                      position: "absolute",
                                      top: "12%",
                                      left: "55%",
                                      color: "#B4B4B8",
                                      cursor: "pointer"
                                    }}
                                    className="mdi mdi-delete"
                                  ></span>
                                  <div
                                    style={{
                                      fontSize: "16px",
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      textAlign: "center",
                                      marginLeft: "50%",
                                      transform: "translateX(-50%)"
                                    }}
                                  >
                                    {props.t('No File')}
                                  </div>
                                </Col>
                              )}
                            </Row>
                            <Row className="align-items-center mt-3">
                              <Col className="col-8" style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                fontSize: "16px",
                                fontWeight: "bold",
                                marginLeft: "-2%",
                                marginBottom: "-5%"
                              }}>
                                {items.name}
                              </Col>
                              <Col className="col-4 d-flex justify-content-end">
                                {items.edit ?
                                  <Button
                                    className=""
                                    style={{
                                      marginRight: "-18%",
                                      marginBottom: "-15%",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                      outline: "none",
                                      backgroundColor: '#7BAE40',
                                      borderColor: "#7BAE40",
                                    }}
                                    onClick={() => toggleUploadModalMonthly(items.num)}
                                  >
                                    {props.t('Add')}
                                  </Button>
                                  :
                                  <button
                                    className="btn btn-dark opacity-25"
                                    disabled
                                    style={{
                                      marginRight: "-18%",
                                      marginBottom: "-15%",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}
                                    onClick={() => toggleUploadModalMonthly(items.num)}
                                  >
                                    {props.t('Add')}
                                  </button>
                                }
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  }
                  )}

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
