import React, { useState, useEffect, useCallback } from "react"
import RootPageCustom from '../../common/RootPageCustom';
import { useFormik, } from "formik";
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
} from "reactstrap"
import { Link } from "react-router-dom"

import { getSelectFile, resetMessage } from "../../store/appFileManagement/actions"
import { useSelector, useDispatch } from "react-redux"
import { ReactSession } from 'react-client-session';
import FolderDetail from "./FolderDetail";


const FileManagement = () => {

  //let userId = ReactSession.get("user") ? JSON.parse(ReactSession.get("user")).id : "";
  const dispatch = useDispatch();
  const [fileManagementPage, setFileManagementPage] = useState(true)
  const [insideFilePage, setInsideFilePage] = useState(false)
  const [fileManagementMsg, setFileManagementMsg] = useState("")
  const [fileManagementData, setFileManagementData] = useState()
  const [idFile, setIdFile] = useState("")
  const [myFiles, setMyFiles] = useState ([]);

  useEffect(() => {
    dispatch(resetMessage());
    dispatch(getSelectFile())
  }, [])

  const [fileManagementSearch, setFileManagementSearch] = useState({ page: 1, limit: 10, offset: 0, sort: "num", order: "asc", search: { any: "" } });

  const getFileSelect = useSelector(state => {
   
    return state.fileManagementReducer.respGetSelect;
  })



  const fileManagementCloseAlert = () => {
    setFileManagementMsg("")
  }

  useEffect(() => {

    if (getFileSelect.status == "1") {

        

        setFileManagementMsg("")
    }
}, [getFileSelect])


  // const myFiles = [
  //   // {
  //   //   id: 6,
  //   //   name: "Applications",
  //   //   file: "20",
  //   //   Gb: 8,
  //   // },
  // ];

//   const insideFolder = (getFileSelect) => {
//     setApp042setMsg("")
//     setApp042p01Data(app042p01HasilTanamData)
//     setApp042p01Page(false)
//     setApp042p02Page(true)

// }


const getInsideFolder = (e) => {
  debugger
  setIdFile(e)
 //const bodyForm = new FormData();    
    // try {
    //   var map = {
    //   map.append('folder_num', e)
    //   }
    //   const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //             }
    //                   }
  
    //     dispatch(getSelectFile(config, map))
  
        setFileManagementMsg("")
        setFileManagementData(fileManagementData)
        setFileManagementPage(false)
        setInsideFilePage(true)
  
}


  
  return (
    <RootPageCustom
      componentJsx={
        <>

          {fileManagementMsg !== "" ? <UncontrolledAlert toggle={fileManagementCloseAlert} color={fileManagementMsg.status == "1" ? "success" : "danger"}>
            {typeof fileManagementMsg == 'string' ? null : fileManagementMsg.message}</UncontrolledAlert> : null}

          <Container style={{ display: fileManagementPage ? 'block' : 'none' }} fluid={true}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader><i className="mdi mdi-folder-multiple-outline font-size-18 align-middle me-2"></i>File Management</CardHeader>
                  <CardBody>

                  <div>
                    <Row className="mb-3">
                      <Col xl={3} sm={6}>
                        <div className="mt-2">
                          <h5>My Files</h5>
                        </div>
                      </Col>
                      <Col xl={9} sm={6}>
                        <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                          <div className="search-box mb-2 me-2">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control bg-light border-light rounded"
                                placeholder="Search..."
                              />
                              <i className="bx bx-search-alt search-icon"></i>
                            </div>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                  <div>
                  {getFileSelect?.data?.childList.map((myfiles, key) => (
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
                                      <i className="mdi mdi-dots-horizontal"></i>
                                    </DropdownToggle>

                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem onClick={() => getInsideFolder(myfiles.num)}>
                                        Open
                                      </DropdownItem>
                                      {/* <DropdownItem href="#">
                                        Edit
                                      </DropdownItem> */}
                                      <DropdownItem href="#">
                                        Rename
                                      </DropdownItem>
                                      <div className="dropdown-divider"></div>
                                      <DropdownItem href="#">
                                        Remove
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                                <div className="avatar-xs me-3 mb-3">
                                  <div className="avatar-title bg-transparent rounded">
                                     { myfiles.type == 0 ?
                                        <i className="bx bxs-folder font-size-24 text-warning"></i> :
                                        <i className="bx bxs-file font-size-24 text-warning"></i>
                                     }
                                    
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="overflow-hidden me-auto">
                                    <h5 className="font-size-14 text-truncate mb-1">
                                      <Link to="#" className="text-body">
                                        {myfiles.name}
                                      </Link>
                                    </h5>
                                    {/* <p className="text-muted text-truncate mb-0">
                                      {myfiles.file} Files
                                    </p> */}
                                  </div>
                                  <div className="align-self-end ms-2">
                                    <p className="text-muted mb-0">{myfiles.file_size} MB</p>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                  
                  </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          <FolderDetail
          insideFilePage={insideFilePage}
          setInsideFilePage={setInsideFilePage}
          setFileManagementPage={setFileManagementPage}
          setFileManagementMsg={setFileManagementMsg}
          idFile={idFile}
          />

        </>
      }
    />

  );
};
export default FileManagement
