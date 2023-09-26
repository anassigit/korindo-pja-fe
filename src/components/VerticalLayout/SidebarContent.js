import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { ReactSession } from 'react-client-session';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom/cjs/react-router-dom"
import { getMenuRuleData, getRuleData } from "store/appRule/actions"


const SidebarContent = props => {

  // const menu = JSON.parse(ReactSession.get("menu"))

  const dispatch = useDispatch()
  const ref = useRef();
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(true)
  const [dropdownOpen2, setDropdownOpen2] = useState(true)

  const getDetailProfile = useSelector(state => {
    return state.userProfileReducer.respGetProfile;
  })

  const getMenu = useSelector(state => {
    return state.ruleReducer.respGetMenuRule;
  })

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
    new MetisMenu("#side-menu")
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
    dispatch(getMenuRuleData())
    dispatch(getRuleData())

  }, [props.location.pathname])

  useEffect(() => {
    const pathName = location.pathname
    new MetisMenu("#side-menu")
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }

    // Check if the current path matches one of the desired paths to open the dropdown
    if (pathName === "/EnterMonthlyData" || pathName === "/AppFileManagement") {
      setDropdownOpen(true)
    }
  }, [location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false

  }

  console.log(getMenu)


  const firstTimeLogin = ReactSession.get("firstTime_Login");

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref} >
        <div id="sidebar-menu">

          <ul className="metismenu list-unstyled" id="side-menu">
            <li hidden={firstTimeLogin === "true"}>
              <a
                style={{ fontSize: "16px" }}
                onClick={() => {
                  ReactSession.remove("appInstructionsTabelSearch")
                  ReactSession.remove('selected')
                  ReactSession.remove('dateFrom')
                  ReactSession.remove('dateTo')
                  ReactSession.remove('searchValue')
                }}
                href="/AppInstructions"
                to="/AppInstructions"
                className="">
                <i className="fas fa-list-ul"></i>
                <span>{props.t("Instructions List")}</span>
              </a>

              <a
                onClick={() => {
                  setDropdownOpen(!dropdownOpen)
                }}
                className=""
                style={{ overflow: "visible", fontSize: "16px" }}
              >
                <i className="fas fa-folder-open"></i>
                <span style={{ whiteSpace: "nowrap" }}>{props.t("File Management")}</span>
                <i hidden={dropdownOpen} style={{ fontSize: "14px", position: "absolute", right: "2%", top: "25%" }} className="fas fa-chevron-down dropdown-icon"></i>
                <i hidden={!dropdownOpen} style={{ fontSize: "14px", position: "absolute", right: "2%", top: "25%" }} className="fas fa-chevron-up dropdown-icon"></i>
              </a>
              <a
                style={{ fontSize: "14px" }}
                onClick={() => {

                  localStorage.removeItem("selectedYear");
                  localStorage.removeItem("selectedMonth");
                }}
                className=""
                hidden={!dropdownOpen}
                href="/EnterMonthlyData"
                to="/EnterMonthlyData"
              >
                <span style={{ whiteSpace: "nowrap", paddingLeft: "14px" }}>{props.t("Enter Monthly Data")}</span>
              </a>
              <a
                style={{ fontSize: "14px" }}
                onClick={() => {
                  localStorage.removeItem('appFileManagementData')
                }}
                className=""
                hidden={!dropdownOpen}
                href="/AppFileManagement"
                to="/AppFileManagement"
              >
                <span style={{ whiteSpace: "nowrap", paddingLeft: "14px" }}>{props.t("Data Inquiry")}</span>
              </a>

              <a
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setDropdownOpen2(!dropdownOpen2)
                  localStorage.setItem('appFileManagementData', '');
                  ReactSession.remove("appInstructionsTabelSearch")
                }}
                href="/AppRule"
                to="/AppRule"
                className="">
                <i className="fas fa-file-alt"></i>
                <span>{props.t("Group Rule")}</span>
                <i hidden={dropdownOpen2} style={{ fontSize: "14px", position: "absolute", right: "2%", top: "25%" }} className="fas fa-chevron-down dropdown-icon"></i>
                <i hidden={!dropdownOpen2} style={{ fontSize: "14px", position: "absolute", right: "2%", top: "25%" }} className="fas fa-chevron-up dropdown-icon"></i>
              </a>

              {
                getMenu?.data?.list.map((item, index) => {
                  debugger
                  return (
                    <a
                    key={index}
                    style={{ fontSize: "14px" }}
                      onClick={() => {

                        localStorage.removeItem("selectedYear");
                        localStorage.removeItem("selectedMonth");
                      }}
                      hidden={!dropdownOpen}
                    // href="/EnterMonthlyData"
                    // to="/EnterMonthlyData"
                    >
                      <span style={{ whiteSpace: "nowrap", paddingLeft: "16px" }}>{item.name}</span>
                    </a>
                  )
                })
              }

              <a
                onClick={() => {
                }}
                href="/AppSetting"
                className=""
                hidden={!getDetailProfile?.data?.admin}
              >
                <i className="fas fa-cog"></i>
                <span>{props.t("Settings")}</span>
              </a>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any
}

export default withRouter(withTranslation()(SidebarContent))
