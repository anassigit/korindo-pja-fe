import RootPageCustom from "common/RootPageCustom"
import { Button, Container, UncontrolledTooltip } from "reactstrap"
import { React, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import TableCustom from "common/TableCustom"
import TableCustom3 from "common/TableCustom3"
import { deleteRoleAccess, getRoleAccessList, resetMessage } from "store/actions"
import { useDispatch, useSelector } from "react-redux"
import AddRoleAccess from "./AddRoleAccess"
import EditRoleAccess from "./EditRoleAccess"
import ConfirmModal from "components/Common/ConfirmModal"

const RoleAccessSetting = props => {

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [isYes, setIsYes] = useState(false)

  const [roleAccessId, setRoleAccessId] = useState(false)

  const appRoleAccessListData = useSelector(state => {
    return state.settingReducer.respGetRoleAccessList
  })

  useEffect(() => {
    props.setAppRoleAccessTabelSearch(prevState => ({
      ...prevState,
      page: 1,
      offset: 0,
      search: {
        ...prevState.search,
        roleId: props.appMaintainRoleData?.roleId,
      },
    }))
  }, [props.appMaintainRoleData])

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const preAddApp = () => {
    props.setAppAddDetailRole(true)
    props.setAppDetailRole(false)
  }

  const preEditApp = data => {
    props.setAppEditDetailAccessRole(true)
    props.setAppDetailRole(false)
    setRoleAccessId(data.roleAccessId)
  }

  const handleClick = () => {
    props.setAppRoleAccessTabelSearch(prevState => ({
      ...prevState,
      page: 1,
      offset: 0,
      search: {
        ...prevState.search,
        search: props.searchVal2,
      },
    }))
  }


  const handleEnterKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleClick()
    }
  }

  const appRoleAccessColumn = [
    {
      dataField: "roleAccessId",
      text: "Role Access ID",
      hidden: true,
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "roleId",
      text: "Role ID",
      hidden: true,
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "roleName",
      text: "Role Name",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "menuId",
      text: "Menu ID",
      hidden: true,
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "menuName",
      text: "Menu Name",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "groupName",
      text: "Group Name",
      sort: true,
      style: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '20vw' },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, cellData, index) => {
        const tooltipId = `tooltip-${index}`
        return (
          <>
            <span id={tooltipId}>
              {cellContent}
            </span>
            <UncontrolledTooltip target={tooltipId}>{cellContent}</UncontrolledTooltip>
          </>
        )
      }
    },
    {
      dataField: "bcreate",
      text: "Create",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, _cellData) => {
        return cellContent === 0 ? false : true
      },
    },
    {
      dataField: "bread",
      text: "Read",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, _cellData) => {
        return cellContent === 0 ? false : true
      },
    },
    {
      dataField: "bupdate",
      text: "Update",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, _cellData) => {
        return cellContent === 0 ? false : true
      },
    },
    {
      dataField: "bprint",
      text: "Print",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, _cellData) => {
        return cellContent === 0 ? false : true
      },
    },
    {
      dataField: "bdelete",
      text: "Delete",
      sort: true,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, _cellData) => {
        return cellContent === 0 ? false : true
      },
    },
    {
      text: "Actions",
      headerStyle: { textAlign: "center" },
      style: { textAlign: "center", fontSize: "16px" },
      formatter: (_cellContent, cellData, index) => {
        return (
          <div
            style={{ display: "flex", gap: "1vw", justifyContent: "center" }}
          >
            <a
              id={`edit-${index}`}
              className="mdi mdi-pencil text-primary"
              onClick={() => preEditApp(cellData)}
            />
            <a
              id={`delete-${index}`}
              className="mdi mdi-delete text-danger"
              onClick={() => toggleDeleteModal(cellData)}
            />
            <UncontrolledTooltip target={`edit-${index}`}>
              {"Edit"}
            </UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${index}`}>
              {"Delete"}
            </UncontrolledTooltip>
          </div>
        )
      },
    },
  ]
  const toggleDeleteModal = (data) => {
    setModal(!modal)
    if (data?.roleAccessId) {
      setRoleAccessId(data.roleAccessId)
    }
  }

  useEffect(() => {
    if (isYes) {
      dispatch(deleteRoleAccess({ roleAccessId: roleAccessId }))
      props.setLoadingSpinner(true)
      setIsYes(false)
    }
  }, [isYes])

  useEffect(() => {

    if (!props.appDetailRole) {
      props.setAppRoleAccessTabelSearch({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search: {
          search: "",
          roleId: "",
        },
      })
    }
    
  }, [props.appDetailRole])

  return (
    <>
      {
        props.appDetailRole && (
          <Container
            fluid="true"
            style={{ display: props.appDetailRole ? "block" : "none" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30%",
                  gap: ".75vw",
                }}
              >
                <label className="col-sm-3" style={{ marginTop: "8px" }}>
                  {"Search"}
                </label>
                <div className="col-sm-5">
                  <input
                    type="search"
                    className="form-control"
                    onChange={e => props.setSearchVal2(e.target.value)}
                    onKeyDown={e =>
                      e.key === "Enter" ? handleEnterKeyPress(e) : null
                    }
                  />
                </div>
                <div className="col-sm-3">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleClick()}
                  >
                    {"Search"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-12 pb-2"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Button onClick={() => preAddApp()}>
                <span className="mdi mdi-plus" /> {"Add New Role Access"}
              </Button>
            </div>

            {props.appDetailRole ? (
              <TableCustom3
                keyField={row => `${row.roleId}_${row.roleAccessId}`}
                columns={appRoleAccessColumn}
                redukResponse={appRoleAccessListData}
                appdata={
                  appRoleAccessListData?.data?.list != null &&
                  appRoleAccessListData?.data?.list
                    ? appRoleAccessListData?.data?.list
                    : []
                }
                appdataTotal={
                  appRoleAccessListData?.data != null
                    ? appRoleAccessListData?.data.count
                    : 0
                }
                searchSet={props.setAppRoleAccessTabelSearch}
                searchGet={props.appRoleAccessTabelSearch}
                redukCall={getRoleAccessList}
              />
            ) : null}
            <Button
              className="btn btn-danger my-2"
              onClick={() => {
                props.setAppMaintainRole(true)
                props.setAppDetailRole(false)
              }}
            >
              <span className="mdi mdi-arrow-left" />
              &nbsp;{"Back"}
            </Button>
          </Container>
        )
      }

      {
        props.appAddDetailRole && (
          <AddRoleAccess
            appMaintainRoleData={props.appMaintainRoleData}
            appAddDetailRole={props.appAddDetailRole}
            setAppAddDetailRole={props.setAppAddDetailRole}
            setAppDetailRole={props.setAppDetailRole}
          />
        )
      }

      {
        props.appEditDetailAccessRole && (
          <EditRoleAccess
            appMaintainRoleData={props.appMaintainRoleData}
            appEditDetailAccessRole={props.appEditDetailAccessRole}
            setAppEditDetailAccessRole={props.setAppEditDetailAccessRole}
            setAppDetailRole={props.setAppDetailRole}
            roleAccessId={roleAccessId}
          />
        )
      }

      <ConfirmModal
        modal={modal}
        toggle={toggleDeleteModal}
        message={"Are you sure to delete this?"}
        setIsYes={setIsYes}
      />
    </>
  )
}

RoleAccessSetting.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appMaintainRoleData: PropTypes.any,
  appDetailRole: PropTypes.any,
  setAppMaintainRole: PropTypes.any,
  setAppDetailRole: PropTypes.any,
  setLoadingSpinner: PropTypes.any,
  appAddDetailRole: PropTypes.any,
  appEditDetailRole: PropTypes.any,
  setAppEditDetailRole: PropTypes.any,
  setAppAddDetailRole: PropTypes.any,
  appRoleAccessTabelSearch: PropTypes.any,
  setAppRoleAccessTabelSearch: PropTypes.any,
  searchVal2: PropTypes.any,
  appEditDetailAccessRole: PropTypes.any,
  setAppEditDetailAccessRole: PropTypes.any,
  setSearchVal2: PropTypes.any,
}

export default withTranslation()(RoleAccessSetting)
