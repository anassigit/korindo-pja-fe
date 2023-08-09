import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
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
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import { getSelectFile, getSelectFile2, resetMessage } from "../../store/appFileManagement/actions"
import { useHistory } from "react-router-dom";
import RootPageCustom from '../../common/RootPageCustom';

const FolderDetail = (props) => {


    const dispatch = useDispatch();
    const [folderDetailSpinner, setFolderDetailSpinner] = useState(false);
    const [folderDetailMsg, setFolderDetailMsg] = useState("");

    useEffect(() => {
        dispatch(resetMessage());
      }, [])

    const getFileSelectFile = useSelector(state => {  
        return state.fileManagementReducer.respGetSelectFile;
      })

      
      useEffect(() => {
        
    //      const bodyForm = new FormData();    
    // // try {
    // //   var map = {
    //     bodyForm.append('folder_num', props.idFile)
    // //   }
    //   const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //             }
    //                   }
  
    
        dispatch(getSelectFile2({
            'folder_num': props.idFile
        }))
      }, [props.idFile])
    
    const folderDetailCloseAlert = () => {
        setFolderDetailMsg("")
    }

  
    return (
        <>
            <Container style={{ display: props.insideFilePage ? 'block' : 'none' }} fluid={true}>
            

                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader><i className="bx bx-list-check font-size-18 align-middle me-2"></i> </CardHeader>

                            <CardBody>
                                <React.Fragment>
                                    <FormGroup className="mb-0">

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
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem onClick={() => removeFolderFile(myfiles.num)}>
                                          Remove
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>

                                        <Row style={{ marginTop: "30px" }}>
                                            <Col md="12">
                                <Row>
                                <table style={{ marginTop: "10px", marginRight: "18px", marginLeft: "18px" }}>
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody id="insideFolderList">
                                    {
                                        getFileSelectFile?.data?.childList.length > 0 &&
                                        getFileSelectFile?.data?.childList.map((list, key) => (
                                <>
                                <tr key={key}>
                                    <td>{list.num}</td>
                                    <td>{list.type == 0 ?
                                        <i className="bx bxs-folder font-size-24 text-warning"></i> :
                                        <i className="bx bxs-file font-size-24 text-warning"></i>}&nbsp;{list.name}</td>
                                    <td>{list.file_size}</td>
                                    <td><i className="mdi mdi-dots-vertical" /></td>
                                </tr>
                                </>
                                        ))
                                    }
                                </tbody>
                                </table>
                                </Row>
                                            </Col>
                                        </Row>

                                        <Row className="mb-2">
                                            <Col md="12">
                                                <div className="text-sm-end" >

                                                    <Button
                                                        type="button"
                                                        className="btn btn-danger justify-right"
                                                        onClick={() => { props.setFileManagementPage(true); props.setInsideFilePage(false); props.setFileManagementMsg("") }}
                                                    >
                                                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                                        Kembali
                                                    </Button>

                                                </div>
                                            </Col>
                                        </Row>

                                    </FormGroup>
                                </React.Fragment>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>



            </Container>

        </>

    );
    

}
FolderDetail.propTypes = {
    insideFilePage: PropTypes.any,
    setInsideFilePage: PropTypes.any,
    setFileManagementPage: PropTypes.any,
    setFileManagementMsg: PropTypes.any,
    idFile: PropTypes.any,
}



export default FolderDetail