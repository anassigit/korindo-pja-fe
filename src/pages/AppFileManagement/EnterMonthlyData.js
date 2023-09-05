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
  const [monthlyDataPage, setMonthlyDataPage] = useState(true)
  const [monthlyDataMsg, setMonthlyDataMsg] = useState("")


  const handleSearchChange = (e) => {
    dispatch(getSearch({ "search": e.target.value }))
  }


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


  const cardsData = [
    { id: 1, content: 'Short Card 1' },
    { id: 2, content: 'Short Card 2' },
    { id: 3, content: 'Long Card 1' },
    { id: 4, content: 'Short Card 3' },
    { id: 5, content: 'Long Card 2' },
    { id: 6, content: 'Short Card 4' },
    { id: 7, content: 'Long Card 3' },
    { id: 8, content: 'Short Card 5' },
    { id: 9, content: 'Long Card 4' },
  ];


  return (
    <RootPageCustom
      componentJsx={
        <>

          {monthlyDataMsg !== "" ? <UncontrolledAlert toggle={fileManagementCloseAlert} color={monthlyDataMsg.status == "1" ? "success" : "danger"}>
            {typeof monthlyDataMsg == 'string' ? null : monthlyDataMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: monthlyDataPage ? 'block' : 'none' }} fluid={true}>
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
                      <div className="d-flex justify-content-end" style={{ marginRight: "12px" }}>
                        <Col md='1' className="d-flex justify-content-end">
                          <Row className="mb-1">
                            <Input
                              name="year"
                              type="select"
                              placeholder="YYYY"
                            //   onChange={(e) => {
                            //     editInstructionsValidInput.handleChange(e)
                            //   }}

                            //   value={editInstructionsValidInput.values.status}
                            //   invalid={editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status}
                            >

                            </Input>
                          </Row>
                        </Col>
                        &nbsp;
                        <Col md='1' className="d-flex justify-content-end ">
                          <Row className="mb-1">
                            <Input
                              name="year"
                              type="select"
                              placeholder="YYYY"
                            //   onChange={(e) => {
                            //     editInstructionsValidInput.handleChange(e)
                            //   }}

                            //   value={editInstructionsValidInput.values.status}
                            //   invalid={editInstructionsValidInput.touched.status && editInstructionsValidInput.errors.status}
                            >

                            </Input>
                          </Row>
                        </Col>
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row className="mb-1 col-sm-10"><h6>{props.t("Monthly Data")}</h6></Row>
                <p />
                <p />
                <Row className="mb-2">
                  {cardsData.map((card, index) => (
                    <Col sm={12} md={6} lg={3} key={index}>
                      <Card className="mb-2">
                        <CardBody>
                          <Row className="text-center justify-content-center">
                            <span style={{fontSize: "62px", color: "#7BAE40", opacity:"0.75"}} className="mdi mdi-file-check-outline"></span>
                            <span style={{fontSize: "24px", marginTop: "-2%"}}>test</span>
                          </Row>
                          <Row>
                            <Col>
                              <span style={{fontSize: "16px", fontWeight: "bold", whiteSpace: "nowrap" }}>Company Name</span>
                            </Col>
                            <Col className="text-end">
                              <Button
                                style={{ paddingTop: "2px", paddingBottom: "2px" }}
                              >
                                Upload
                              </Button>
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
