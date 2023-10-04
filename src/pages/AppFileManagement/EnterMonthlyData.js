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
  Spinner
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

//js file//
import UploadMonthly from "./UploadMonthly";
import FileTables from "./FileTables";
import { min } from "lodash";

const EnterMonthlyData = (props) => {

  let langType = localStorage.getItem("I18N_LANGUAGE")
  const storedMonth = localStorage.getItem("selectedMonth");
  const storedYear = localStorage.getItem("selectedYear");

  const [enterMonthlyDataSpinner, setEnterMonthlyDataSpinner] = useState(false);
  const dispatch = useDispatch();
  const [monthlyDataPage, setMonthlyDataPage] = useState(true)
  const [monthlyDataMsg, setMonthlyDataMsg] = useState("")

  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonth, setSelectedMonth] = useState()

  const [uploadModalMonthly, setUploadModalMonthly] = useState(false)
  const [idFolderUpload, setIdFolderUpload] = useState("")
  const [currYear, setCurrYear] = useState("")
  const [currMonth, setCurrMonth] = useState()

  const [detailModalMonthly, setDetailModalMonthly] = useState(false)
  const [idFolderDetail, setIdFolderDetail] = useState("")
  const [currYearDetail, setCurrYearDetail] = useState("")
  const [currMonthDetail, setCurrMonthDetail] = useState()

  const [confirmModalDelete, setConfirmModalDelete] = useState(false)
  const [tempIdDel, setTempIdDel] = useState()
  const [isYes, setIsYes] = useState(false)

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
    dispatch(getYear())
    dispatch(getMonthlyData({}))
    setEnterMonthlyDataSpinner(true)
  }, [])

  useEffect(() => {
    dispatch(getMonth({ year: selectedYear }))
    setEnterMonthlyDataSpinner(true)
  }, [selectedYear])

  useEffect(() => {
    setSelectedMonth(dashboardData?.data?.month)
    setSelectedYear(dashboardData?.data?.year)
    if (dashboardData.status === '1') {
      setEnterMonthlyDataSpinner(false)
    }
  }, [dashboardData])

  useEffect(() => {
    if (storedMonth && storedYear) {
      dispatch(getMonthlyData({ month: storedMonth, year: storedYear }));
    } else if (selectedMonth && selectedYear) {
      dispatch(getMonthlyData({ month: selectedMonth, year: selectedYear, langType: langType }));
      setEnterMonthlyDataSpinner(true);
    }
  }, [selectedMonth, selectedYear, langType]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    localStorage.setItem("selectedYear", e.target.value);
    localStorage.setItem("selectedMonth", selectedMonth);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    localStorage.setItem("selectedYear", selectedYear);
    localStorage.setItem("selectedMonth", e.target.value);
  }

  const toggleUploadModalMonthly = (folder_id) => {
    setUploadModalMonthly(!uploadModalMonthly)
    setIdFolderUpload(folder_id)
    setCurrMonth(selectedMonth)
    setCurrYear(selectedYear)

  }

  const toggleDetailModalMonthly = (folder_id) => {
    setDetailModalMonthly(!detailModalMonthly)
    setIdFolderDetail(folder_id)
    setCurrMonth(selectedMonth)
    setCurrYear(selectedYear)

  }

  const confirmToggleDelete = (e) => {

    if (e) {
      setTempIdDel(e)
    }
    setConfirmModalDelete(!confirmModalDelete)
  }

  useEffect(() => {
    if (isYes) {
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

    }
  }, [isYes])

  useEffect(() => {
    if (msgDeleteFile?.status == "1") {
      setMonthlyDataMsg(msgDeleteFile)
      dispatch(getMonthlyData({ month: selectedMonth, year: selectedYear }))
      setIsYes(!isYes)
      setEnterMonthlyDataSpinner(false);
    }
  }, [msgDeleteFile])

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
            currMonth={currMonth}
            currYear={currYear}
            setEnterMonthlyDataSpinner={setEnterMonthlyDataSpinner}
          />

          <FileTables
            modal={detailModalMonthly}
            toggle={toggleDetailModalMonthly}
            idFolderDetail={idFolderDetail}
            currMonth={currMonth}
            currYear={currYear}
          />

          {monthlyDataMsg !== "" ? <UncontrolledAlert toggle={() => setMonthlyDataMsg('')} color={monthlyDataMsg.status == "1" ? "success" : "danger"}>
            {typeof monthlyDataMsg == 'string' ? null : monthlyDataMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: monthlyDataPage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col sm="12">
                    <Row className="mb-1">
                      <Col>
                        <input
                          hidden
                          type="text"
                          className="form-control"
                          placeholder={props.t('Search')}
                          onChange={handleSearchChange}
                        />
                      </Col>
                      <Col sm="1" className="d-flex justify-content-end">
                        <Input
                          name="year"
                          className="year"
                          type="select"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          {yearData?.data?.yearList.map((value, key) => (
                            <option key={key} value={value}>
                              {value}
                            </option>
                          ))}
                        </Input>
                      </Col>
                      <Col sm="1" className="d-flex justify-content-end">
                        <Input
                          name="month"
                          className="month"
                          type="select"
                          value={selectedMonth}
                          onChange={handleMonthChange}
                        >
                          {monthData?.data?.monthList.map((value, key) => (
                            <option key={key} value={value}>
                              {value}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-1 col-sm-10"><h6>{props.t("Monthly Data")}</h6></Row>
                <p />
                <p /><Row className="mb-2">
                  {dashboardData?.data?.list.map((items, index) => (
                    <Col sm={12} md={6} lg={3} key={index}>
                      <Card className="mb-2" style={{ backgroundColor: items.open ? null : "#E8E8E8", borderRadius:"0.5em" }}>
                        <CardBody>
                          <Row className="text-center justify-content-center" style={{ marginTop: "-5%" }}>
                            {items.count > 0 ? (
                              <>
                                {items.fileList?.map((file, i) => (
                                  i < 3 ? (
                                    items.count > 1 ? (
                                      <Col
                                        md={items.count > 3 ? '3' : (items.count === 2 ? '5' : '3')}
                                        style={{ height: "12vh" }}
                                        className="files"
                                        key={i}
                                      >
                                        <div style={{ position: "relative", textAlign: "center" }}>
                                          <span
                                            style={{
                                              fontSize: "50px",
                                              color: items.open ? "#7BAE40" : "#BBBCBE",
                                              opacity: "0.75",
                                              cursor: "pointer"
                                            }}
                                            className="mdi mdi-file-check-outline"
                                            onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                          ></span>
                                          {items.edit ?
                                            <span
                                              style={{
                                                fontSize: "18px",
                                                position: "absolute",
                                                top: "0",
                                                left: "2em",
                                                right: "0",
                                                textAlign: "center",
                                                color: "#f46a6a",
                                                cursor: "pointer"
                                              }}
                                              className="mdi mdi-close-circle"
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
                                          <span
                                            style={{
                                              fontSize: "50px",
                                              color: items.open ? "#7BAE40" : "#BBBCBE",
                                              opacity: "0.75",
                                              cursor: "pointer"
                                            }}
                                            className="mdi mdi-file-check-outline"
                                            onClick={items.open ? () => window.open(new URL(file.url)) : null}
                                          ></span>
                                          {items.edit ? <span
                                            style={{
                                              fontSize: "18px",
                                              position: "absolute",
                                              top: "0",
                                              left: "2em",
                                              right: "0",
                                              textAlign: "center",
                                              color: "#f46a6a",
                                              cursor: "pointer"
                                            }}
                                            className="mdi mdi-close-circle"
                                            onClick={() => confirmToggleDelete(file.num)}
                                          ></span> : null}
                                        </div>
                                        <div
                                          id={`fileName_${index}_${i}`} // Unique ID for each tooltip
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
                                ))}

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
                                    color: "#f46a6a",
                                    cursor: "pointer"
                                  }}
                                  className="mdi mdi-close-circle"
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
                                    outline: "none"
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
EnterMonthlyData.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}
export default withTranslation()(EnterMonthlyData)
