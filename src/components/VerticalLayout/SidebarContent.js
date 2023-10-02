import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ReactSession } from "react-client-session";
import { useDispatch, useSelector } from "react-redux";
import { getMenuRuleData, getRuleData } from "store/appRule/actions";
import "../../assets/scss/custom.scss"
import { Spinner } from "reactstrap";

const SidebarContent = (props) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const location = props.location;
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState(""); // Step 1: State for active menu item

  const getDetailProfile = useSelector((state) => state.userProfileReducer.respGetProfile);
  const getMenu = useSelector((state) => state.ruleReducer.respGetMenuRule);

  const queryString = location.search;
  const startIndex = queryString.lastIndexOf('=') + 1;

  const extractedValue2 = queryString.substring(startIndex);

  const submenuLocalStorage = ReactSession.get("submenuKey")

  const [loadingSpinner, setLoadingSpinner] = useState(false)

  useEffect(() => {
    new MetisMenu("#side-menu");
    if (submenuLocalStorage) {
      setDropdownOpen({ [`submenu-${submenuLocalStorage}`]: true }); // Use square brackets to create a dynamic key
    }

    setLoadingSpinner(true)
    setActiveMenuItem(location.pathname);
    if (!submenuLocalStorage) {
      setDropdownOpen({ rule: true })
    }
    dispatch(getMenuRuleData());
  }, [location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }
    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  const firstTimeLogin = ReactSession.get("firstTime_Login");

  const toggleDropdown = (key) => {

    const updatedDropdownOpen = { ...dropdownOpen };

    // Close all other open submenus in ReactSession
    for (const submenuKey in updatedDropdownOpen) {
      if (submenuKey.startsWith("submenu-") && submenuKey !== key && updatedDropdownOpen[submenuKey]) {
        // updatedDropdownOpen[submenuKey] = false;
        // Update ReactSession with the new value
        ReactSession.set(submenuKey, false);
      }
    }

    // Toggle the selected submenu in ReactSession
    updatedDropdownOpen[key] = !updatedDropdownOpen[key];
    // Update ReactSession with the new value
    ReactSession.set(key, updatedDropdownOpen[key]);

    // Update the local state
    setDropdownOpen(updatedDropdownOpen);
  };

  useEffect(() => {
    if (getMenu.status) {
      setLoadingSpinner(false)
    }
  }, [getMenu])

  return (
    <React.Fragment>

      <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
      </div>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li hidden={firstTimeLogin === "true"}>
              <a
                onClick={() => {
                  ReactSession.remove("appInstructionsTabelSearch")
                  ReactSession.remove('selected')
                  ReactSession.remove('dateFrom')
                  ReactSession.remove('dateTo')
                  ReactSession.remove('searchValue')
                  ReactSession.remove("submenuKey")
                  window.location.reload()
                }}
                to="/AppInstructions"
                href="/AppInstructions"
                className={location.pathname === "/AppInstructions" ? "active" : null}
                style={{ fontSize: "14px" }}
              >
                <i style={{ fontSize: "12px", position: "relative", right: "1.5%" }} className="fas fa-list-ul"></i>
                <span>{props.t("Instructions List")}</span>
              </a>

              <a
                onClick={() => {
                  toggleDropdown("main");
                }}
                className=""
                style={{ overflow: "visible", fontSize: "14px" }}
              >
                <i style={{ fontSize: "14px", position: "relative", right: "1.5%" }} className="fas fa-folder-open"></i>
                <span style={{ whiteSpace: "nowrap" }}>{props.t("File Management")}</span>
                <i
                  hidden={dropdownOpen.main}
                  style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                  className="fas fa-chevron-up dropdown-icon"
                ></i>
                <i
                  hidden={!dropdownOpen.main}
                  style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                  className="fas fa-chevron-down dropdown-icon"
                ></i>
              </a>
              <Link
                onClick={() =>
                  ReactSession.remove("submenuKey")
                }
                style={{ fontSize: "14px" }}
                to="/EnterMonthlyData"
                hidden={dropdownOpen.main}
                className={location.pathname === "/EnterMonthlyData" ? "active" : null}
              >
                <span style={{ whiteSpace: "nowrap", paddingLeft: "14px" }}>{props.t("Enter Monthly Data")}</span>
              </Link>
              <Link
                onClick={() =>
                  ReactSession.remove("submenuKey")
                }
                style={{ fontSize: "14px" }}
                to="/AppFileManagement"
                hidden={dropdownOpen.main}
                className={location.pathname === "/AppFileManagement" ? "active" : null}
              >
                <span style={{ whiteSpace: "nowrap", paddingLeft: "14px" }}>{props.t("Data Inquiry")}</span>
              </Link>

              <a
                onClick={() => {
                  toggleDropdown("rule");
                  localStorage.setItem("appFileManagementData", "");
                  ReactSession.remove("appInstructionsTabelSearch");
                  ReactSession.set("dropdownOpen", dropdownOpen)
                }}
              >
                <i style={{ fontSize: "14px" }} className="fas fa-file-alt"></i>
                <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>{props.t("Company Regulations")}</span>
                <i
                  hidden={dropdownOpen.rule}
                  style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                  className="fas fa-chevron-up dropdown-icon"
                ></i>
                <i
                  hidden={!dropdownOpen.rule}
                  style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                  className="fas fa-chevron-down dropdown-icon"
                ></i>
              </a>

              {getMenu?.data?.list.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <a
                      key={index}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        toggleDropdown(`submenu-${index + 1}`);
                        localStorage.removeItem("selectedYear");
                        localStorage.removeItem("selectedMonth");
                      }}
                      hidden={dropdownOpen.rule}
                    >
                      <span style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}>{item.name}</span>
                      <i
                        hidden={!dropdownOpen[`submenu-${index + 1}`]}
                        style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                        className="fas fa-chevron-up dropdown-icon"
                      ></i>
                      <i
                        hidden={dropdownOpen[`submenu-${index + 1}`]}
                        style={{ fontSize: "14px", position: "absolute", right: "5%", top: "25%" }}
                        className="fas fa-chevron-down dropdown-icon"
                      ></i>
                    </a>
                    {dropdownOpen[`submenu-${index + 1}`] &&
                      item?.subList.map((subMenu, i) => {

                        return (
                          <a
                            key={i}
                            to={`/AppRule?v=${subMenu.id}`}
                            href={`/AppRule?v=${subMenu.id}`}
                            className={parseInt(extractedValue2) === subMenu.id ? "active" : null}
                            style={{ fontSize: "12px", marginLeft: "5%" }}
                            hidden={dropdownOpen.rule}
                            onClick={() =>
                              ReactSession.set("submenuKey", subMenu?.parent_id)
                            }
                          >
                            <span style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}>{subMenu.name}</span>
                          </a>
                        );
                      })}
                  </React.Fragment>
                );
              })}

              <Link
                to="/AppSetting"
                hidden={!getDetailProfile?.data?.admin}
                style={{ fontSize: "14px" }}
              >
                <i className="fas fa-cog" style={{ paddingRight: "2%", marginLeft: "-1.5%" }}></i>
                <span>{props.t("Settings")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
