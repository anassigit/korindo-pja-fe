import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    Spinner,
    Row,
    Label,
    Input
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import MsgModal from 'components/Common/MsgModal';
import { resetMessage, getMonthlyData } from '../../store/appFileManagement/actions';
import { withTranslation } from "react-i18next"

const FileTables = (props) => {


    const dispatch = useDispatch();
    const [detailSpinner, setDetailSpinner] = useState(false)
    const [detailMsg, setDetailMsg] = useState(false)
    const [detailMsgModal, setDetailMsgModal] = useState(false)
    const [detailContentModal, setDetailContentModal] = useState("")
    const [successClose, setSuccessClose] = useState(false)

    const [numF, setNumF] = useState("")
    const [numP, setNumP] = useState(0)
    const [nem, setNem] = useState("")


    const dashboardData = useSelector(state => {
        return state.fileManagementReducer.respGetMonthlyData;
      })

    const moveRespMsg = useSelector(state => {
        return state.fileManagementReducer.msgMove;
    })

    useEffect(() => {
        dispatch(getMonthlyData({ month: props.currMonth, year: props.currYear }))
      }, [props.currMonth, props.currYear])


    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch])



    const closeButton = () => {

        props.toggle();
        dispatch(getMonthlyData({ month: props.currMonth, year: props.currYear }))
    
    }


    return (

        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" backdrop="static" keyboard={false}>

            {/* <MsgModal
                modal={detailMsgModal}
                toggle={toggleMsgModal}
                message={detailContentModal}
                successClose={successClose}
            /> */}

            <Form onSubmit={(e) => {
                e.preventDefault();
                valid.handleSubmit();
            }}>
                <ModalHeader toggle={props.toggle}>{props.t("List files")}</ModalHeader>
                <ModalBody>
                    <Row><h6><i className="mdi mdi-folder align-middle fs-5" /> {"  "}{props.t("Folders")}</h6></Row>
                    
                    <Row>
                        {dashboardData?.data?.list.map((myfiles, key) => (
                            myfiles.type === "FOLDER" ?

                                    <div >
                                            <ul className="list-group" key={key}>
                                                <li className="list-group-item border-0 py-1 fs-6 align-baseline" onClick={() => { }} style={{ cursor: "pointer" }}>
                                                    <i className="fa fa-solid fa-folder fs-6 align-baseline" style={{ color: "#7bae40" }}></i> {myfiles.name}
                                                </li>
                                            </ul>

                                      

                                    </div>

                                : ''

                        ))}
                    </Row>


                  
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color={detailSpinner ? "primary disabled" : "primary"}>
                        <i className="mdi mdi-check fs-5 align-middle me-2"></i>{" "}
                        {props.t("Move")}
                        <Spinner style={{ display: detailSpinner ? "block" : "none", marginTop: '-27px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" />
                    </Button>
                    <Button color="danger" onClick={()=>{closeButton()}} className='align-middle me-2'>
                        <i className="mdi mdi-window-close fs-5 align-middle me-2"></i>{" "}
                        {props.t("Close")}
                    </Button>
                </ModalFooter>
            </Form>

        </Modal>

    );


}

FileTables.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    idFolderDetail: PropTypes.any,
    currMonth: PropTypes.any,
    currYear: PropTypes.any,
    location: PropTypes.object,
    t: PropTypes.any
};
export default withTranslation()(FileTables)