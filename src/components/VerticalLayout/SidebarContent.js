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


const SidebarContent = props => {

  const menu = JSON.parse(localStorage.getItem("menu"))

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

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu" style={{ marginTop: "40px" }}>

          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/AppInstructions" className="">
                <i className="fas fa-list-ul"></i>
                <span>{props.t("Instructions List")}</span>
              </Link>
              <Link to="/" className="">
                <i className="fas fa-folder-open"></i>
                <span>{props.t("File Management")}</span>
              </Link>
              <Link to="/" className="">
                <i className="fas fa-cog"></i>
                <span>{props.t("Setting")}</span>
              </Link>
            </li>

            {/* <li className="menu-title">{props.t("Modul")} </li>

            {menu.map((item, key) =>
              item.sub.length == 0 ?
                <li key={item.menuid}>
                  <Link to={item.path} className="">
                    <i className={props.t(item.icon)}></i>
                    <span>{props.t(item.title)}</span>
                  </Link>
                </li>
                :
                <li key={item.menuid}>
                  <Link to={item.path} className="has-arrow">
                    <i className={props.t(item.icon)}></i>
                    <span>{props.t(item.title)}</span>
                  </Link>

                  <ul key={item.menuid} className="sub-menu">
                    {item.sub.map((item2) =>
                      item2.sub.length == 0 ?

                        <li key={item2.menuid}>
                          <Link to={item2.path}>{props.t(item2.title)}</Link>
                        </li>
                        :

                        <li key={item2.menuid}>
                          <Link to={item2.path} className="has-arrow">
                            <span>{props.t(item2.title)}</span>
                          </Link>
                          <ul key={item.menuid} className="sub-menu">
                            {item2.sub.map((item3) =>
                              <li key={item3.menuid}>
                                <Link to={item3.path}>{props.t(item3.title)}</Link>
                              </li>
                            )}
                          </ul>
                        </li>
                    )}
                  </ul>
                </li>

            )} */}

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
