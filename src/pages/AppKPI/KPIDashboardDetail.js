import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  Label,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap"
import "../../assets/scss/custom/components/custom-datepicker.scss"
import "../../assets/scss/custom/table/TableCustom.css"
import RootPageCustom from "../../common/RootPageCustom"
import "../../config"
import {
  getCorporationList,
  getDashboardDetailKPI,
  getDownloadDashboardDetail,
  getGroupListKPI,
  getKPIItemList,
  resetMessage,
} from "store/actions"
import e from "cors"
import DatePicker from "react-datepicker"
import moment from "moment"

const KPIDashboardDetail = props => {
  let langType = localStorage.getItem("I18N_LANGUAGE")

  const dispatch = useDispatch()

  const appGroupListData = useSelector(state => {
    return state.kpiReducer.respGetGroupListKpi
  })

  const appCorporationListData = useSelector(state => {
    return state.kpiReducer.respGetCorporationList
  })

  const appKPIItemListData = useSelector(state => {
    return state.kpiReducer.respGetKPIItemList
  })

  const appDashboardDetailListData = useSelector(state => {
    return state.kpiReducer.respGetDashboardDetailKPI
  })

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [appKPIMsg, setAppKPIMsg] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedGroupList, setSelectedGroupList] = useState("")
  const [selectedCorporationList, setSelectedCorporationList] = useState([])
  const [selectedKPIItemList, setSelectedKPIItemList] = useState([])
  const [showFromDatePicker, setShowFromDatePicker] = useState(false)
  const [selectedFromDate, setSelectedFromDate] = useState(
    moment().format("yyyy-MM")
  )
  const [isFromDateButtonClicked, setIsFromDateButtonClicked] = useState(false)
  const [selectedToDate, setSelectedToDate] = useState(
    moment().format("yyyy-MM")
  )
  const [isToDateButtonClicked, setIsToDateButtonClicked] = useState(false)
  const [showToDatePicker, setShowToDatePicker] = useState(false)
  const [filterCorporations, setFilterCorporations] = useState(false)
  const [filterKPIItems, setFilterKPIItems] = useState(false)

  const tempArray = []

  const startDate = new Date("2022-03")
  const endDate = new Date("2023-05")

  useEffect(() => {
    setLoadingSpinner(true)
    dispatch(getCorporationList({}))
  }, [])

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    setLoadingSpinner(false)
  }, [
    appGroupListData,
    appCorporationListData,
    appDashboardDetailListData,
    appKPIItemListData,
  ])

  //   useEffect(() => {
  //     if (selectedGroupList) {
  //       dispatch(
  //         getCorporationList({
  //           groupNum: selectedGroupList,
  //         })
  //       )
  //     } else {
  //       dispatch(
  //         getCorporationList({
  //           groupNum: "",
  //         })
  //       )
  //     }
  //   }, [selectedGroupList, selectedYear])

  useEffect(() => {
    if (startDate && endDate) {
      let tempCoorporationId = [1, 2]
      dispatch(
        getDashboardDetailKPI({
          to: `${startDate.getFullYear()}${startDate.getMonth() + 1}`,
          from: `${endDate.getFullYear()}${endDate.getMonth() + 1}`,
          groupNum: selectedGroupList,
          corporationId: tempCoorporationId.map(e => e),
          // selectedCorporationList
        })
      )
    } else {
      dispatch(
        getDashboardDetailKPI({
          // groupNum: '',
          // corporationId: '',
          // year: '',
          // from: endDate,
          to: `${startDate.getFullYear()}${startDate.getMonth() + 1}`,
          from: `${endDate.getFullYear()}${endDate.getMonth() + 1}`,
          groupNum: selectedGroupList,
          corporationId: [1, 2],
        })
      )
    }
    setLoadingSpinner(true)
    // }, [selectedCorporationList, selectedGroupList, startDate, endDate])
  }, [])

  //   for (
  //     let currentDate = new Date(startDate);
  //     currentDate <= endDate;
  //     currentDate.setMonth(currentDate.getMonth() + 1)
  //   ) {
  //     const data = {
  //       date: new Date(currentDate),
  //       plan: getRandomNumber(1, 20),
  //       result: getRandomNumber(0, 10),
  //     }

  //     tempArray.push(data)
  //   }

  //   function getRandomNumber(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min
  //   }

  useEffect(() => {
    if (appCorporationListData.status === "1") {
      setSelectedCorporationList(
        appCorporationListData?.data?.list.reduce((accumulator, group) => {
          return accumulator.concat(
            group.coporationList.map(corporation => ({
              isChecked: false,
              ...corporation,
            }))
          )
        }, [])
      )
      setAppKPIMsg(null)
    } else if (appCorporationListData.status === "0") {
      setSelectedCorporationList([])
      setAppKPIMsg(appCorporationListData)
    } else {
      setAppKPIMsg(null)
    }
  }, [appCorporationListData])

  useEffect(() => {
    if (appKPIItemListData.status === "1") {
      setSelectedKPIItemList(
        appKPIItemListData?.data?.list.map(item => ({
          ...item,
          isChecked: false,
        }))
      )
      setAppKPIMsg(null)
    } else if (appKPIItemListData.status === "0") {
      setSelectedKPIItemList([])
      setAppKPIMsg(appKPIItemListData)
    } else {
      setAppKPIMsg(null)
    }
  }, [appKPIItemListData])

  useEffect(() => {
    if (selectedCorporationList.some(corporation => corporation.isChecked)) {
      var bodyForm = new FormData()
      bodyForm.append("from", selectedFromDate.replace(/-/g, ""))
      bodyForm.append("to", selectedToDate.replace(/-/g, ""))
      selectedCorporationList
        .filter(corporation => corporation.isChecked)
        .forEach(corporation => {
          bodyForm.append("corporationId", corporation.corporationId)
        })
      setAppKPIMsg(null)
      dispatch(
        getKPIItemList(bodyForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
      )
    } else {
      setSelectedKPIItemList(null)
    }
  }, [selectedCorporationList])

  useEffect(() => {
    if (appDashboardDetailListData.status === "1") {
      setAppKPIMsg(null)
    } else if (appDashboardDetailListData.status === "0") {
      setAppKPIMsg(appDashboardDetailListData)
    } else {
      setAppKPIMsg(null)
    }
  }, [appDashboardDetailListData])

  const getMonthAbbreviation = monthIndex => {
    const months = tempArray.map(data => {
      return `${data.date.getFullYear()}-${data.date.getMonth() + 1}`
    })
    return months[monthIndex - 1]
  }

  const getColumnHeader = index => {
    const baseHeaders = ["Plan", "Result"]
    return `${baseHeaders[index % baseHeaders.length]}`
  }

  const downloadDashboardDetail = async () => {
    try {
      dispatch(
        getDownloadDashboardDetail({
          file_nm: "KPI Dashboard Detail.xlsx",
          groupNum: selectedGroupList,
          corporationId: selectedCorporationList,
          year: selectedYear,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  function parseDateString(dateString) {
    if (!/^\d{4}-\d{2}$/.test(dateString)) return null
    const [year, month] = dateString.split("-").map(Number)
    return new Date(year, month - 1)
  }

  const getKPIDashboardDetail = () => {
    if (!selectedCorporationList.some(corporation => corporation.isChecked)) {
      setAppKPIMsg({
        message: "At least one corporation must be checked.",
      })
      return
    }

    if (parseDateString(selectedFromDate) > parseDateString(selectedToDate)) {
      setAppKPIMsg({
        message: "From date cannot be after to date.",
      })
      return
    }

    var bodyForm = new FormData()
    bodyForm.append("from", selectedFromDate.replace(/-/g, ""))
    bodyForm.append("to", selectedToDate.replace(/-/g, ""))
    selectedCorporationList
      .filter(corporation => corporation.isChecked)
      .forEach(corporation => {
        bodyForm.append("corporationId", corporation.corporationId)
      })
    selectedKPIItemList
      .filter(kpiItem => kpiItem.isChecked)
      .forEach(kpiItem => {
        bodyForm.append("kpiItemId", kpiItem.kpiItemId)
      })
    setAppKPIMsg(null)
    dispatch(
      getDashboardDetailKPI(bodyForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
    )
  }

  const handleCorporationCheckboxChange = (corporationId, toogleCheck) => {
    const newCheckboxes = [...selectedCorporationList]
    const foundIndex = newCheckboxes.findIndex(
      corporation => corporation.corporationId === corporationId
    )
    if (foundIndex !== -1) {
      newCheckboxes[foundIndex].isChecked = toogleCheck
    }
    setSelectedCorporationList(newCheckboxes)
  }

  const handleKPIItemCheckboxChange = (kpiId, toogleCheck) => {
    const newCheckboxes = [...selectedKPIItemList]
    const foundIndex = newCheckboxes.findIndex(
      kpiItem => kpiItem.kpiItemId === kpiId
    )
    if (foundIndex !== -1) {
      newCheckboxes[foundIndex].isChecked = toogleCheck
    }
    setSelectedKPIItemList(newCheckboxes)
  }

  return (
    <RootPageCustom
      msgStateGet={appKPIMsg}
      msgStateSet={setAppKPIMsg}
      componentJsx={
        <>
          <Card fluid="true">
            <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
              KPI {"Dashboard Detail"}
            </CardHeader>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "40%",
                    gap: ".75vw",
                  }}
                >
                  <InputGroup style={{ flexWrap: "unset", width: "300px" }}>
                    <div style={{ width: "150px" }}>
                      <DatePicker
                        onClickOutside={() => {
                          setShowFromDatePicker(false)
                          setIsFromDateButtonClicked(false)
                        }}
                        onInputClick={() => {
                          setShowFromDatePicker(!showFromDatePicker)
                          setIsFromDateButtonClicked(false)
                        }}
                        open={showFromDatePicker}
                        className="form-control custom-reset-date"
                        showMonthYearPicker
                        dateFormat="yyyy-MM"
                        selected={
                          selectedFromDate
                            ? moment(selectedFromDate, "yyyy-MM").toDate()
                            : new Date()
                        }
                        onChange={date => {
                          setShowFromDatePicker(false)
                          setIsFromDateButtonClicked(false)
                          setSelectedFromDate(
                            date ? moment(date).format("yyyy-MM") : new Date()
                          )
                        }}
                        onKeyDown={e => {
                          e.preventDefault()
                        }}
                        customInput={
                          <>
                            <div className="react-datepicker__input-container">
                              <input
                                type="text"
                                className="form-control custom-reset-date"
                                value={
                                  selectedFromDate
                                    ? moment(selectedFromDate).format("yyyy-MM")
                                    : moment().format("yyyy-MM")
                                }
                              />
                            </div>
                          </>
                        }
                      />
                    </div>
                    <Button
                      onClick={e => {
                        if (!isFromDateButtonClicked) {
                          setShowFromDatePicker(!showFromDatePicker)
                          setIsFromDateButtonClicked(true)
                        }
                      }}
                    >
                      <span className="mdi mdi-calendar" />
                    </Button>
                  </InputGroup>
                  <InputGroup style={{ flexWrap: "unset", width: "300px" }}>
                    <div style={{ width: "150px" }}>
                      <DatePicker
                        onClickOutside={() => {
                          setShowToDatePicker(false)
                          setIsToDateButtonClicked(false)
                        }}
                        onInputClick={() => {
                          setShowToDatePicker(!showToDatePicker)
                          setIsToDateButtonClicked(false)
                        }}
                        open={showToDatePicker}
                        className="form-control custom-reset-date"
                        showMonthYearPicker
                        dateFormat="yyyy-MM"
                        selected={
                          selectedToDate
                            ? moment(selectedToDate, "yyyy-MM").toDate()
                            : new Date()
                        }
                        onChange={date => {
                          setShowToDatePicker(false)
                          setIsToDateButtonClicked(false)
                          setSelectedToDate(
                            date ? moment(date).format("yyyy-MM") : new Date()
                          )
                        }}
                        onKeyDown={e => {
                          e.preventDefault()
                        }}
                        customInput={
                          <>
                            <div className="react-datepicker__input-container">
                              <input
                                type="text"
                                className="form-control custom-reset-date"
                                value={
                                  selectedToDate
                                    ? moment(selectedToDate).format("yyyy-MM")
                                    : moment().format("yyyy-MM")
                                }
                              />
                            </div>
                          </>
                        }
                      />
                    </div>
                    <Button
                      onClick={e => {
                        if (!isToDateButtonClicked) {
                          setShowToDatePicker(!showToDatePicker)
                          setIsToDateButtonClicked(true)
                        }
                      }}
                    >
                      <span className="mdi mdi-calendar" />
                    </Button>
                  </InputGroup>
                  <Dropdown
                    style={{ height: "30px" }}
                    isOpen={filterCorporations}
                    toggle={() => setFilterCorporations(!filterCorporations)}
                    className="d-inline-block"
                  >
                    <DropdownToggle
                      style={{ paddingTop: "0" }}
                      className="btn header-item"
                      id="page-header-user-dropdown"
                      tag="button"
                    >
                      <Button
                        style={{
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          whiteSpace: "nowrap",
                          display: "flex",
                        }}
                      >
                        {" "}
                        Filter Corporation &nbsp;
                        <span className="mdi mdi-filter" />
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu
                      className="dropdown-menu-end"
                      style={{ maxHeight: "500px", overflowY: "auto" }}
                    >
                      {Array.isArray(appCorporationListData?.data?.list) &&
                      appCorporationListData?.data?.list.length > 0 ? (
                        <React.Fragment>
                          {appCorporationListData?.data?.list.map(
                            (group, groupIndex) => (
                              <div
                                key={groupIndex}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  className="dropdown-item"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                  }}
                                >
                                  <a style={{ marginBottom: "0" }}>
                                    {group.name}
                                  </a>
                                </span>
                                {group.coporationList?.map(
                                  (corp, corpIndex) => {
                                    return (
                                      <div
                                        key={corpIndex}
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          flexDirection: "column",
                                        }}
                                        onClick={e =>
                                          handleCorporationCheckboxChange(
                                            corp.corporationId,
                                            !selectedCorporationList.find(
                                              corporation =>
                                                corporation.corporationId ===
                                                corp.corporationId
                                            )?.isChecked
                                          )
                                        }
                                      >
                                        <a
                                          className="dropdown-item"
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "left",
                                          }}
                                        >
                                          <Input
                                            type="checkbox"
                                            id={`checkbox${
                                              corp.corporationId + 1
                                            }`}
                                            checked={
                                              selectedCorporationList.find(
                                                corporation =>
                                                  corporation.corporationId ===
                                                  corp.corporationId
                                              )?.isChecked || false
                                            }
                                            onClick={e =>
                                              handleCorporationCheckboxChange(
                                                corp.corporationId,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <Label
                                            htmlFor={`checkbox${
                                              corp.corporationId + 1
                                            }`}
                                            style={{ marginBottom: "0" }}
                                          >
                                            &nbsp;{corp.corporationName}
                                          </Label>
                                        </a>
                                      </div>
                                    )
                                  }
                                )}
                                {groupIndex <
                                  (appCorporationListData?.data?.list?.length ||
                                    0) -
                                    1 && <div className="dropdown-divider" />}
                              </div>
                            )
                          )}
                        </React.Fragment>
                      ) : (
                        <DropdownItem>{"No Data"}</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    style={{ height: "30px" }}
                    isOpen={filterKPIItems}
                    toggle={() => setFilterKPIItems(!filterKPIItems)}
                    className="d-inline-block"
                  >
                    <DropdownToggle
                      style={{ paddingTop: "0" }}
                      className="btn header-item"
                      id="page-header-user-dropdown"
                      tag="button"
                    >
                      <Button
                        style={{
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          whiteSpace: "nowrap",
                          display: "flex",
                        }}
                      >
                        {" "}
                        Filter Category &nbsp;{" "}
                        <span className="mdi mdi-filter" />
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu
                      className="dropdown-menu-end"
                      style={{ maxHeight: "500px", overflowY: "auto" }}
                    >
                      {Array.isArray(appKPIItemListData?.data?.list) &&
                      appKPIItemListData?.data?.list.length > 0 ? (
                        <React.Fragment>
                          {appKPIItemListData?.data?.list.map((item, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                              onClick={e =>
                                handleKPIItemCheckboxChange(
                                    item.kpiItemId,
                                    selectedKPIItemList?.find(
                                        kpiItem =>
                                          kpiItem.kpiItemId === item.kpiItemId
                                      )?.isChecked
                                )}
                            >
                              <a
                                className="dropdown-item"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "left",
                                }}
                              >
                                <Input
                                  type="checkbox"
                                  id={`checkbox${item.kpiItemId + 1}`}
                                  checked={
                                    selectedKPIItemList?.find(
                                      kpiItem =>
                                        kpiItem.kpiItemId === item.kpiItemId
                                    )?.isChecked || false
                                  }
                                  onClick={e =>
                                    handleKPIItemCheckboxChange(
                                      item.kpiItemId,
                                      e.target.checked
                                    )
                                  }
                                />
                                <Label htmlFor={`checkbox${item.kpiItemId + 1}`} style={{ marginBottom: "0" }}>
                                  &nbsp;{item.itemName}
                                </Label>
                              </a>
                            </div>
                          ))}
                        </React.Fragment>
                      ) : (
                        <DropdownItem>{"No Data"}</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    onClick={() => getKPIDashboardDetail()}
                    className="btn btn-primary"
                  >
                    Search
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: ".75vw",
                  }}
                >
                  <Button
                    disabled={
                      appDashboardDetailListData?.data?.resultList.length > 0
                        ? false
                        : true
                    }
                    className={
                      appDashboardDetailListData?.data?.resultList.length > 0
                        ? ""
                        : "btn btn-dark opacity-25"
                    }
                    onClick={() => {
                      downloadDashboardDetail()
                    }}
                  >
                    <i className="mdi mdi-download" /> {"Download Excel"}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  overflow: "auto",
                  maxHeight: "80vh",
                  marginTop: "10px",
                }}
              >
                <table className="table table-bordered my-3">
                  <thead
                    style={{
                      color: "white",
                      backgroundColor: "#81B642",
                      zIndex: 3,
                    }}
                  >
                    <tr>
                      <th
                        rowSpan={2}
                        style={{
                          zIndex: 3,
                          textAlign: "center",
                          verticalAlign: "center",
                          position: "sticky",
                          left: "0",
                          backgroundColor: "#81B642",
                          zIndex: "2",
                          minWidth: "225px",
                        }}
                      >
                        <div>{"Corporation Name"}</div>
                      </th>
                      <th
                        rowSpan={2}
                        style={{
                          zIndex: 3,
                          textAlign: "center",
                          verticalAlign: "center",
                          position: "sticky",
                          left: "225px",
                          backgroundColor: "#81B642",
                          zIndex: "2",
                          minWidth: "225px",
                        }}
                      >
                        <div>{"ITEMS"}</div>
                      </th>
                      {Array.from({ length: 12 }, (_, monthIndex) => (
                        <React.Fragment key={monthIndex}>
                          <th
                            colSpan={2}
                            style={{
                              textAlign: "center",
                              verticalAlign: "center",
                            }}
                          >
                            {getMonthAbbreviation(monthIndex + 1)}
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                    <tr>
                      {Array.from({ length: 24 }, (_, index) => (
                        <th
                          key={index}
                          style={{ textAlign: "center", minWidth: "auto" }}
                        >
                          {getColumnHeader(index)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ position: "relative" }}>
                    {appDashboardDetailListData?.data?.resultList.map(
                      (data, index) => {
                        return (
                          <tr key={index}>
                            <td
                              align="center"
                              valign="middle"
                              style={{
                                position: "sticky",
                                backgroundColor: "white",
                                left: "0",
                                zIndex: "2",
                              }}
                            >
                              <div>{data.corporationName}</div>
                            </td>
                            <td
                              align="center"
                              valign="middle"
                              style={{
                                position: "sticky",
                                backgroundColor: "white",
                                left: "225px",
                                zIndex: "2",
                              }}
                            >
                              <div style={{ width: "175px" }}>{data.item}</div>
                            </td>
                            {Array.from(data.details, (detail, index) => (
                              <React.Fragment key={index}>
                                <td style={{ textAlign: "right" }}>
                                  {detail.plan.toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                  })}
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    color:
                                      detail.plan > detail.result
                                        ? "red"
                                        : "black",
                                    width: "100%",
                                    position: "relative",
                                  }}
                                  id={"detailTooltip" + data.item + index}
                                >
                                  {detail.note.trim() !== "" ? (
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                      }}
                                    >
                                      <i className="mdi mdi-comment-alert" />
                                    </div>
                                  ) : null}
                                  {detail.result.toLocaleString(undefined, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                  })}
                                </td>
                                {detail.note.trim() !== "" ? (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={"detailTooltip" + data.item + index}
                                  >
                                    {detail.note}
                                  </UncontrolledTooltip>
                                ) : null}
                              </React.Fragment>
                            ))}
                          </tr>
                        )
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <div
            className="spinner-wrapper"
            style={{
              display: loadingSpinner ? "block" : "none",
              zIndex: "9999",
              position: "fixed",
              top: "0",
              right: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              opacity: "1",
            }}
          >
            <Spinner
              style={{
                padding: "24px",
                display: "block",
                position: "fixed",
                top: "42.5%",
                right: "50%",
              }}
              color="danger"
            />
          </div>
        </>
      }
    />
  )
}

KPIDashboardDetail.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withTranslation()(KPIDashboardDetail)
