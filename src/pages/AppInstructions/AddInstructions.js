import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Lovv2 from "../../common/Lovv2";
import * as Yup from "yup";
import '../../config';
import PropTypes from "prop-types";
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

} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getInstructionsData, saveInstructions, getUserList } from "../../store/appInstructions/actions";
import { useSelector, useDispatch } from "react-redux"
import { formatRpAfterInput, replaceAll } from '../../common/Regex'
import { getCombo } from "../../store/combo/actions"
// import { ReactSession } from 'react-client-session';
import { format } from 'date-fns';
import  Select, {components}   from "react-select";
import shortid from "shortid";
import { size } from "lodash";



const AddInstructions = (props) => {

    const dispatch = useDispatch();

    const currentDate = new Date()
    const [addInstructionsStartDate, setAddInstructionsStartDate] = useState(format(currentDate, 'yyyy-MM-dd'), (""))
    let status = 1;
    const [addInstructionsFirstRenderDone, setAddInstructionsFirstRenderDone] = useState(false);
    const [addInstructionsSpinner, setAddInstructionsSpinner] = useState(false);
    const [selectedMulti, setselectedMulti] = useState([]);
    const [selectedMulti2, setselectedMulti2] = useState([]);

    const [optionOwner, setOptionOwner] = useState([]);
    const [optionManager, setOptionManager] = useState([]);


    useEffect(() => {
        setAddInstructionsFirstRenderDone(true);
        dispatch(getUserList({}))
    }, [])

    useEffect(() => {
        if (props.appAddInstructions) {
            addInstructionsValidInput.resetForm()
            addInstructionsValidInput.setFieldValue("status", status)
            addInstructionsValidInput.setFieldValue("insDate", addInstructionsStartDate)
            //setAddInstructionsStartDate(format(currentDate, 'yyyy-MM-dd'))

            if(addInstructionsUserList.data !== undefined){

                addInstructionsUserList.data.ownerList.map((data) => {
                    const newOwner = {
                        value: data.id,
                        label: data.name,
                        bgColor: data.bgColor,
    
                    };
                    setOptionOwner((option) => [...option, newOwner]);
                });
    
                addInstructionsUserList.data.managerList.map((data) => {
                    const newManager = {
                        value: data.id,
                        label: data.name,
                        bgColor: data.bgColor,
                    };
                    setOptionManager((option) => [...option, newManager]);
                });
                
            }

        }
    }, [props.appAddInstructions])

    const addInstructionsUserList = useSelector(state => {

        return state.instructionsReducer.respGetUserList;
    });

    const insert = async (val) => {
        await dispatch(saveInstructions(val));
    };

    const addInstructionsValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: '',
            insDate: '',
            status: '',
            description: '',
        },

        validationSchema: Yup.object().shape({
            title: Yup.string().required("Wajib diisi"),
            insDate: Yup.string().required("Wajib diisi"),
            status: Yup.string().required("Wajib diisi"),

        }),

        onSubmit: (val) => {

            var bodyForm = new FormData();

            bodyForm.append('title', val.title);
            bodyForm.append('insDate', val.insDate);
            bodyForm.append('status', val.status);
            bodyForm.append('description', val.description);

            
            selectedMulti.map((data, index) => {

                bodyForm.append('user', data.value);

            })
            selectedMulti2.map((data, index) => {

                bodyForm.append('user', data.value);

            })
       
            if (selectedfile.length > 0) {

                for (let index = 0; index < selectedfile.length; index++) {

                    let a = selectedfile[index];

                    bodyForm.append('file' + index, selectedfile[index].fileori);

                }
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            setAddInstructionsSpinner(true);
            props.setAppInstructionsPage(true);
            props.setAppAddInstructions(false);
            insert(bodyForm, config);
            props.setAppInstructionsMsg(appAddInstructionsMessage);

        }
    });

    const appAddInstructionsMessage = useSelector(state => {
        return state.instructionsReducer.msgAdd;
    });

    useEffect(() => {
        if (appAddInstructionsMessage.status == "1") {
            props.setAppInstructionsPage(true);
            props.setAppAddInstructions(false);
            dispatch(getInstructionsData(props.appInstructionsTabelSearch))
        }
        props.setAppInstructionsMsg(appAddInstructionsMessage)
        setAddInstructionsSpinner(false);
    }, [appAddInstructionsMessage])

    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);

    const InputChange = (e) => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            fileori: file
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }


    const DeleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }
    }

    const FileUploadSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]
                })
            }
            SetSelectedFile([]);
        } else {
            alert('Please select file')
        }
    }


    const DeleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            const result = Files.filter((data) => data.id !== id);
            SetFiles(result);
        } else {
            // alert('No');
        }
    }

    function handleMulti(s) {

        setselectedMulti(s);
          
    }
    function handleMulti2(s) {

        setselectedMulti2(s);
    } 

    const DropdownIndicator = (props) => {
        return (
          <components.DropdownIndicator {...props}>
            <i className="mdi mdi-plus-thick" />
          </components.DropdownIndicator>
        );
      };
          

    const colourStyles  = {
        control:  (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isSelected ? 'white' : 'white',
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isDisabled ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',
          }),
        //   placeholder: (baseStyles, state) => ({
            
        //         ...defaultStyles,
        //         color: '#ffffff',
        //     }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = data.bgColor;
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? data.color
              : isFocused
              ? '#e6e6e6'
              : undefined,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? 'white'
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? data.color
                  : color
                : undefined,
            },
          };
        },

        multiValue: (styles, { data }) => {
        const color = data.bgColor;
          return {
            ...styles,
            backgroundColor: color,
            
          };
        },

        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: 'white',
          fontSize: '13px',
          paddingLeft:'12px',
          paddingRight:'12px',
          paddingTop:'7.5px',
          paddingBottom:'7.5px',
          borderRadius: '0.25rem',
        }),

        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: 'white',
          ':hover': {
            backgroundColor: data.bgColor,
            color: 'white',
          },
        }),
      };

      const colourStyles2  = {
        control:  (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isSelected ? 'white' : 'white',
            borderColor: state.isFocused ? 'white' : 'white',
            borderColor: state.isDisabled ? 'white' : 'white',
            border: 0,
            boxShadow: 'none',
           
          }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = data.bgColor;
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? data.color
              : isFocused
              ? '#e6e6e6'
              : undefined,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? 'white'
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? data.color
                  : color
                : undefined,
            },
          };
        },

        multiValue: (styles, { data }) => {
        const color = data.bgColor;
          return {
            ...styles,
            backgroundColor: '#579DFF',
           
          };
        },

        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: 'white',
          fontSize: '13px',
          paddingLeft:'12px',
          paddingRight:'12px',
          paddingTop:'7.5px',
          paddingBottom:'7.5px',
          borderRadius: '4px',
        }),

        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: 'white',
          ':hover': {
            backgroundColor: data.bgColor,
            color: 'white',
          },
        }),
      };


    return (
        <Container style={{ display: props.appAddInstructions ? 'block' : 'none' }} fluid={true}>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader style={{ borderRadius: "15px 15px 0 0" }}><i className="bx bx-add-to-queue font-size-18 align-middle me-2"></i>Add Instructions</CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addInstructionsValidInput.handleSubmit();
                                    return false;
                                }}
                            >

                                <FormGroup className="mb-0">

                                    <Row>
                                        <Col md="6">

                                            <div className="mb-3 col-sm-8">
                                                <Label>Title <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    name="title"
                                                    type="text"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.title || ""}
                                                    invalid={
                                                        addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.title && addInstructionsValidInput.errors.title ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.title}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <Label>
                                                    Instruction Date{" "}
                                                    <span style={{ color: "red" }}>* </span>
                                                </Label>

                                                <Input
                                                    name="insDate"
                                                    type="date"
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={addInstructionsValidInput.values.insDate || addInstructionsStartDate}
                                                    invalid={
                                                        addInstructionsValidInput.touched.insDate && addInstructionsValidInput.errors.insDate ? true : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.insDate && addInstructionsValidInput.errors.insDate ? (
                                                    <FormFeedback type="invalid"> {addInstructionsValidInput.errors.insDate} </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <Label> Status <span style={{ color: "red" }}>* </span></Label>
                                                <Input
                                                    type="select"
                                                    name="status"
                                                    disabled
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    onBlur={addInstructionsValidInput.handleBlur}
                                                    // fieldValue={1}
                                                    value={"Not Started"}
                                                    invalid={
                                                        addInstructionsValidInput.touched.status && addInstructionsValidInput.errors.status ? true : false
                                                    }
                                                >
                                                    <option></option>

                                                    <option id="1">Not Started</option>


                                                </Input>
                                                {addInstructionsValidInput.touched.status && addInstructionsValidInput.errors.status ? (
                                                    <FormFeedback type="invalid">{addInstructionsValidInput.errors.status}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <Label className="col-sm-5" style={{ marginTop: "15px" }}>Descriptions </Label>
                                                <Input
                                                    name="description"
                                                    type="textarea"
                                                    rows="5"
                                                    maxLength={50}
                                                    onChange={addInstructionsValidInput.handleChange}
                                                    value={
                                                        addInstructionsValidInput.values.description ||
                                                        ""
                                                    }
                                                    invalid={
                                                        addInstructionsValidInput.touched.description &&
                                                            addInstructionsValidInput.errors.description
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {addInstructionsValidInput.touched.description &&
                                                    addInstructionsValidInput.errors.description ? (
                                                    <FormFeedback type="invalid">
                                                        {addInstructionsValidInput.errors.description}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3 col-sm-8">
                                                <Label> Choose Owners </Label>
                                                <Select
                                                //id="user"
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti(e);
                                                    }}
                                                    options={optionOwner}
                                                    className="select2-selection"
                                                    styles={colourStyles}
                                                    components={{ DropdownIndicator }}
                                                    placeholder={'Select or type...'}
                                                    
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <label>Choose Managers </label>
                                                <Select
                                                //id="user"
                                                    value={selectedMulti2}
                                                    isMulti={true}
                                                    onChange={(e) => {
                                                        handleMulti2(e);
                                                    }}
                                                    options={optionManager}
                                                    className="select2-selection"
                                                    styles={colourStyles2}
                                                    components={{ DropdownIndicator }}
                                                    placeholder={'Select or type...'}
                                                    
                                                />
                                            </div>

                                            <div className="mb-3 col-sm-8">
                                                <label>Upload Attach Files </label>

                                                <Form onSubmit={FileUploadSubmit}>
                                                <div className="kb-file-upload">
                                                    <div className="file-upload-box">
                                                            
                                                            <label
                                                                htmlFor="idFileUpload"
                                                                className="btn btn-primary"
                                                            >
                                                             <i className="mdi mdi-paperclip" /> Upload files
                                                            </label>
                                                                                    
                                                            <input 
                                                            type="file" 
                                                            onChange={InputChange} 
                                                            multiple
                                                            id="idFileUpload" 
                                                            className="file-upload-input"
                                                            style={{ display: 'none' }}
                                                            />
                                                   
                                                        </div>
                                                        </div>
                                                        &nbsp;
                                                    <div className="kb-attach-box mb-3">
                                                        {
                                                            selectedfile.map((data, index) => {
                                                                const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                                return (
                                                                    <div className="file-atc-box" key={id}>
                                                                        {
                                                                            filename.match(/.(jpg|jpeg|png|gif|svg|doc|docx|xls|xlsx|ppt|pptx|pdf)$/i) ?
                                                                                <div className="file-image"></div> :
                                                                                <div className="file-image"></div>
                                                                        }
                                                                        <div className="file-detail">
                                                                        <span><i className="fas fa-paperclip" />&nbsp;{filename}</span>&nbsp;&nbsp;
                                                                        <i onClick={() => DeleteSelectFile(id)}><i className="far fa-trash-alt" /></i>
                                                                            {/* <div className="file-actions">
                                                                                <button className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                                                            </div> */}
                                                                            
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Form>
                                            </div>



                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Button color="primary" className="ms-1" type="submit">
                                        <i className="bx bxs-save align-middle me-2"></i>{" "}
                                        Simpan
                                        {/* <Spinner style={{ display: addInstructionsSpinner ? "block" : "none", marginTop: '-30px', zIndex: 2, position: "absolute" }} className="ms-4" color="danger" /> */}
                                    </Button>&nbsp;

                                    <Button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => { props.setAppInstructionsPage(true); props.setAppAddInstructions(false); props.setAppInstructionsMsg("") 
                                            window.location.reload();
                                          }}
                                    >
                                        <i className="bx bx-arrow-back align-middle me-2"></i>{" "}
                                        Kembali
                                    </Button>
                                </FormGroup>

                            </Form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

AddInstructions.propTypes = {

    appAddInstructions: PropTypes.any,
    setAppAddInstructions: PropTypes.any,
    setAppInstructionsMsg: PropTypes.any,
    setAppInstructionsPage: PropTypes.any,
    appInstructionsTabelSearch: PropTypes.any,

}
export default AddInstructions