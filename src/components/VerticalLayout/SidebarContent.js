import MetisMenu from "metismenujs"
import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"
import { ReactSession } from 'react-client-session'
import { withTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleBar from "simplebar-react"
import { getMenuList } from "store/actions"

const SidebarContent = props => {

    const dispatch = useDispatch()

    let menuData = localStorage.getItem("menu")
    let menu = null

    if (menuData) {
        try {
            menu = JSON.parse(menuData)
        } catch (error) {
            localStorage.removeItem("menu")
        }
    } else {
        dispatch(getMenuList())
    }

    let menuRule = localStorage.getItem('menuRule') ? JSON.parse(localStorage.getItem('menuRule')) : []
    const firstTimeLogin = localStorage.getItem("firstTime_Login")

    const ref = useRef()

    useEffect(() => {
        const pathName = props.location.pathname
        new MetisMenu("#side-menu", {
            toggle: false
        })
        let matchingMenuItem = null
        const ul = document.getElementById("side-menu")
        const items = ul.getElementsByTagName("a")
        let activateFileManagementUrl = null

        for (let i = 0; i < items.length; ++i) {
            if (pathName === items[i].pathname) {
                matchingMenuItem = items[i]
                break
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem)
        }
        // activateFileManagementUrl = items[1]
        if (activateFileManagementUrl) {
            activateParentDropdown(activateFileManagementUrl)
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
        const parent = item.parentElement
        const parent2El = parent.childNodes[1]

        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show")
        }
        if (parent) {
            parent.classList.add("mm-active")
            const parent2 = parent.parentElement

            if (parent2) {
                parent2.classList.add("mm-show")
                const parent3 = parent2.parentElement

                if (parent3) {
                    parent3.classList.add("mm-active")
                    parent3.childNodes[0].classList.add("mm-active")

                    const parent4 = parent3.parentElement

                    if (parent4) {
                        parent4.classList.add("mm-show")
                        const parent5 = parent4.parentElement
                        if (parent5) {
                            parent5.classList.add("mm-show")
                            parent5.childNodes[0].classList.add("mm-active")
                        }
                    }
                }
            }
            scrollElement(item)
            return false
        }
        scrollElement(item)
        return false
    }

    function renderMenuItem(item) {
        return (
            <li key={item.menuId}>
                <a
                    onClick={() => {
                        ReactSession.remove("currentPage")
                        ReactSession.remove('selectedMemberData')
                        ReactSession.remove('selectedDeptData')
                        ReactSession.remove('selectedDeptName')
                        ReactSession.remove('collapser')
                        ReactSession.remove('offset')
                        ReactSession.remove('limit')
                    }}
                    href={item.menuPath ? `/${item.menuPath}` : null}
                    className={item.childList || item.menuId === 5 ? "has-arrow" : null}
                >
                    {item.menuIcon && <i className={props.t("fas " + item.menuIcon)}></i>}
                    <span>{props.t(item.menuName)}</span>
                </a>
                {item.childList && item.childList.length > 0 && item.menuId !== 5 ? (
                    <ul className="sub-menu">
                        {item.childList.map((childItem) => renderMenuItem(childItem))}
                    </ul>
                ) : null}

                {item.menuId === 5 && menuRule?.data?.list.length > 0 ? (
                    <ul className="sub-menu">
                        {menuRule.data.list.map((childItem) => renderMenuRuleItem(childItem))}
                    </ul>
                ) : null}
            </li>
        )
    }

    function renderMenuRuleItem(item) {

        const searchString = props.location.search
        const underscoreIndexLast = searchString.lastIndexOf('_')
        const beforeUnderscore = searchString.substring(searchString.indexOf('=') + 1, underscoreIndexLast)
        const parentId = searchString.substring(underscoreIndexLast + 1)

        return (
            <li key={item.id} className={parseInt(parentId) === item.id || parseInt(beforeUnderscore) === item.id ? 'mm-active' : null}>
                <a
                    onClick={() => {
                        ReactSession.remove("currentPage")
                        ReactSession.remove('selectedMemberData')
                        ReactSession.remove('selectedDeptData')
                        ReactSession.remove('selectedDeptName')
                        ReactSession.remove('collapser')
                        ReactSession.remove('offset')
                        ReactSession.remove('limit')
                    }}
                    href={item.parent_id === null ? `/AppRule?v=${item.id}` : `/AppRule?v=${item.id}_${item.parent_id}`}
                    className={item.subList.length > 0 ? "has-arrow" : null}
                >
                    {item.menuIcon && <i className={props.t("fas " + item.menuIcon)}></i>}
                    <span>{props.t(item.name)}</span>
                </a>
                {item.subList.length > 0 ? (
                    <ul className={parseInt(parentId) === item.id ? 'sub-menu mm-active mm-show' : null}>
                        {item.subList.map((childItem) => renderMenuRuleItem(childItem))}
                    </ul>
                ) : null}
            </li>
        )
    }

    return (
        <React.Fragment>
            <SimpleBar className="h-100" ref={ref}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        {Array.isArray(menu?.menu) && firstTimeLogin === 'false' ?
                            menu?.menu.map(item => {
                                if (menu.menuType === 'pja') {
                                    return renderMenuItem(item)
                                } else {
                                    dispatch(getMenuList())
                                    return null
                                }
                            })
                            :
                            null
                        }
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    )
}

SidebarContent.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
