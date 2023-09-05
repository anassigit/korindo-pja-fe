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
  Button
} from "reactstrap"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { getSelectFile, deleteFileFolder, resetMessage, getSearch, respGetDownloadCheckFile, downloadCheckFile, getYear, getMonth, getMonthlyData } from "../../store/appFileManagement/actions"
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




const EnterMonthlyData = (props) => {


  const dispatch = useDispatch();
  const [monthlyDataPage, setMonthlyDataPage] = useState(true)
  const [monthlyDataMsg, setMonthlyDataMsg] = useState("")

  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonth, setSelectedMonth] = useState()

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
  }, [])

  useEffect(() => {
    dispatch(getMonth({ year: selectedYear }))
  }, [selectedYear])

  useEffect(() => {
    dispatch(getMonthlyData({ month: selectedMonth, year: selectedYear }))
  }, [selectedMonth, selectedYear])

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  }

  const toggleUploadModal = () => {

    setIdNowLoc(currFolder)
    setCreateModal(!createModal)
    setIdToggleCreate(idChild)
  }

  const confirmToggleDelete = (e) => {

    if (e) {
      setTempIdDel(e)
    }
    setConfirmModalDelete(!confirmModalDelete)
  }

  useEffect(() => {
    debugger
    if (isYes) {
      let num = null
      num = tempIdDel
      num.toString()

      dispatch(deleteFileFolder(
        {
          'file_num': num
        }
      ))

    }
  }, [isYes])

  useEffect(() => {
    debugger
    if (msgDeleteFile?.status == "1") {
      dispatch(getMonthlyData({ month: selectedMonth, year: selectedYear }))
      setIsYes(!isYes)
    }
  }, [msgDeleteFile])

  return (
    <RootPageCustom
      componentJsx={
        <>

          <ConfirmModal
            modal={confirmModalDelete}
            toggle={confirmToggleDelete}
            message={props.t("Are you sure to delete this")}
            setIsYes={setIsYes}
          />

          {monthlyDataMsg !== "" ? <UncontrolledAlert toggle={fileManagementCloseAlert} color={monthlyDataMsg.status == "1" ? "success" : "danger"}>
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
                          <option value="YYYY">YYYY</option>
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
                          <option value="MM">MM</option>
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
                      <Card className="mb-2">
                        <CardBody>
                          <Row className="text-center justify-content-center" style={{ marginTop: "-5%" }}>

                            {
                              items.count > 0 ?
                                (
                                  <>
                                    {items.fileList?.map((file, i) => (
                                      i < 3 ? (

                                        <Col md='3' className="files" key={i}>
                                          <span
                                            style={{
                                              fontSize: "50px",
                                              color: "#7BAE40",
                                              opacity: "0.75",
                                              cursor: "pointer"
                                            }}
                                            className="mdi mdi-file-check-outline"
                                            onClick={() => window.open(new URL(file.url), '_blank')}
                                            ></span>
                                          <span
                                            style={{
                                              fontSize: "18px",
                                              position: "absolute",
                                              top: "12%",
                                              left: "55%",
                                              color: "#f46a6a",
                                              cursor: "pointer"
                                            }}
                                            className="mdi mdi-close-circle"
                                            onClick={() => confirmToggleDelete(file.num)}
                                          ></span>
                                          <div style={{
                                            width: "70px",
                                            fontSize: items.count !== 1 ? items.count === 3 ? "16px" : "20px" : "24px",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden"
                                          }}>{file.name}</div>
                                        </Col>
                                      )
                                        :
                                        (
                                          <Col md='3' style={{ marginTop: "2%" }} className="files" key={i}>
                                            <a
                                              style={{
                                                fontSize: "50px",
                                                color: "#7BAE40",
                                                opacity: "0.75",
                                                cursor: "pointer"
                                              }}
                                              className="mdi mdi-dots-horizontal"
                                              onClick={{}}
                                            ></a>
                                          </Col>
                                        )
                                    ))}
                                  </>
                                )
                                :
                                (
                                  <Col className="nofile">
                                    <span style={{ fontSize: "50px", color: "#7BAE40", opacity: "0.75" }} className="mdi mdi-file-cancel-outline text-danger"></span>
                                    <div style={{ fontSize: "24px" }}>{props.t('No File')}</div>
                                  </Col>
                                )
                            }
                          </Row>
                          <Row className="align-items-center mt-3">
                            <Col className="col-8" style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}>
                              {items.name}
                            </Col>
                            <Col className="col-4">
                              <Button style={{ paddingTop: "2px", paddingBottom: "2px" }}>Upload</Button>
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
