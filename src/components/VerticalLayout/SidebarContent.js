import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { ReactSession } from 'react-client-session';
import { useSelector } from "react-redux"


const SidebarContent = props => {

  // const menu = JSON.parse(ReactSession.get("menu"))

  const ref = useRef();

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
  }, [props.location.pathname])


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

  const getDetailProfile = useSelector(state => {
    return state.userProfileReducer.respGetProfile;
  })

  const firstTimeLogin = ReactSession.get("firstTime_Login");

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu" style={{ marginTop: "40px" }}>

          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li hidden={firstTimeLogin === "true"}>
              <a href="/AppInstructions" to="/AppInstructions" className="">
                <i className="fas fa-list-ul"></i>
                <span>{props.t("Instructions List")}</span>
              </a>
              <a href="/AppFileManagement" to="/AppFileManagement" className="">
                <i className="fas fa-folder-open"></i>
                <span>{props.t("File Management")}</span>
              </a>
              <a
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
