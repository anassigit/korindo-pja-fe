import PropTypes from "prop-types"
import { Modal, InputGroup, Button, FormFeedback, Input } from "reactstrap"
import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { useSelector, useDispatch } from "react-redux"
import { withTranslation } from "react-i18next"

const Lov = props => {

  const dispatch = useDispatch()
  const [lovfirstRenderDone, setLovfirstRenderDone] = useState(false)
  const [modal_standard, setmodal_standard] = useState(false)
  const [searchValModal, setSearchValModal] = useState('')
  const [req, setReq] = useState({ page: 1, limit: props.pageSize, offset: 0, sort: null, order: "asc", search: { any: searchValModal, param: props.pParam } })

  const handleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
    if (type === "sort") {
      setReq({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: { any: searchValModal, param: props.pParam } })
    }
    if (type === "pagination") {
      setReq({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: sortField, order: sortOrder, search: { any: searchValModal, param: props.pParam } })
    }
  }

  const lovData = useSelector(state => {
    return state.LovReducer.resp
  })

  useEffect(() => {
    setLovfirstRenderDone(true)
  }, [])
  useEffect(() => {
    if (lovfirstRenderDone) {
      dispatch(props.getData(req))
    }
  }, [req])

  useEffect(() => {
    if (lovData.data != null && lovData.data.lovtotal == 0) {
      props.stateSearchInputSet("")
    }
    setSearchValModal(props.stateSearchInput)
    if (props.onChangeFunc != null) {
      props.onChangeFunc(props.stateSearchInput)
    }
    if (typeof props.fieldValue !== "undefined") {
      if (typeof props.invalidData !== "undefined") {
        props.invalidData.setFieldValue(props.fieldValue, props.stateSearchInput)
        if (typeof props.setMsgCustom !== "undefined") {
          props.setMsgCustom("")
        }
      }
    }
  }, [props.stateSearchInput])

  useEffect(() => {
    setReq({ page: 1, limit: props.pageSize, offset: 0, sort: props.fieldValue, order: "asc", search: { any: searchValModal, param: props.pParam } })
  }, [searchValModal, props.pParam])

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      for (var [key, val] of iterate_object(row)) {
        if (key == props.defaultSetInput) {
          props.stateSearchInputSet(val)
          if (typeof props.setMsgCustom !== "undefined") {
            props.setMsgCustom("")
          }
          break
        }
      }
      setmodal_standard(false)
      if (props.callbackFunc != null) {
        props.callbackFunc(row)
      }
    }
  }

  function* iterate_object(o) {
    var keys = Object.keys(o)
    for (var i = 0; i < keys.length; i++) {
      yield [keys[i], o[keys[i]]]
    }
  }

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault()
      dispatch(props.getData(req))
      setmodal_standard(!modal_standard)
    }
  }

  return (
    <>
      <InputGroup>
        <Input
          type="search"
          disabled={props.inputDisabled ? true : false}
          className={props.msgCustom ? "form-control is-invalid" : "form-control"}
          value={props.stateSearchInput}
          onChange={(e) => props.stateSearchInputSet(e.target.value)}
          onKeyDown={onKeyDown}
          invalid={props.touchedLovField && props.errorLovField ? true : false}
        />
        <span className="input-group-append">
          <Button
            type="button"
            onClick={() => {
              dispatch(props.getData(req))
              setmodal_standard(!modal_standard)
            }}
            disabled={props.inputDisabled ? true : false}
            color="primary"
            data-toggle="modal"
            data-target="#myModal"
          >
            <i className="fas fa-search" />
          </Button>
        </span>
        {props.touchedLovField && props.errorLovField ? (
          <FormFeedback type="invalid">{props.errorLovField}</FormFeedback>
        ) : null}
        {props.msgCustom ? <div type="invalid" className="invalid-feedback">{props.msgCustom}</div> : null}
      </InputGroup>
      <Modal
        isOpen={modal_standard}
        toggle={() => {
          setmodal_standard(!modal_standard)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {props.title}
          </h5>
          <button
            type="button"
            onClick={() => {
              setmodal_standard(false)
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times</span>
          </button>
        </div>
        <div className="modal-body">
          <InputGroup>
            <input
              type="search"
              className="form-control"
              value={searchValModal}
              onChange={(e) => setSearchValModal(e.target.value)}
            />
            <span className="input-group-append">
              <Button
                type="button"
                onClick={() => dispatch(props.getData(req))}
                color="primary"
              >
                <i className="fas fa-search" />
              </Button>
            </span>
          </InputGroup>
          <br />
          <BootstrapTable
            wrapperClasses="table-responsive"
            rowClasses="text-nowrap"
            keyField={props.keyFieldData}
            remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
            data={lovData.data != null ? lovData.data.lov : []}
            columns={props.columns}
            pagination={paginationFactory({
              page: req.page,
              sizePerPage: req.limit,
              sizePerPageList: [5, 10, 20],
              totalSize: lovData.data != null ? lovData.data.lovtotal : 0,
              showTotal: true,
            })}
            rowEvents={tableRowEvents}
            onTableChange={handleTableChange}
            striped
            hover
            condensed
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              setmodal_standard(false)
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            {props.t("Close")}
          </button>
        </div>
      </Modal>
    </>
  )
}

Lov.propTypes = {
  t: PropTypes.any,
  title: PropTypes.string,
  columns: PropTypes.array,
  getData: PropTypes.func,
  pageSize: PropTypes.number,
  callbackFunc: PropTypes.func,
  onChangeFunc: PropTypes.func,
  defaultSetInput: PropTypes.string,
  invalidData: PropTypes.object,
  fieldValue: PropTypes.string,
  stateSearchInput: PropTypes.any,
  stateSearchInputSet: PropTypes.any,
  touchedLovField: PropTypes.bool,
  errorLovField: PropTypes.string,
  keyFieldData: PropTypes.string,
  inputDisabled: PropTypes.bool,
  msgCustom: PropTypes.any,
  setMsgCustom: PropTypes.any,
  pParam: PropTypes.any,
}

export default withTranslation()(Lov)