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
  const endIndex = queryString.indexOf('_');
  const extractedValue = queryString.substring(startIndex, endIndex);

  const extractedValue2 = queryString.substring(startIndex);

  useEffect(() => {
    new MetisMenu("#side-menu");

    if (extractedValue) {
      setDropdownOpen({ [`submenu-${extractedValue - 1}`]: true }); // Use square brackets to create a dynamic key
    }

    setActiveMenuItem(location.pathname);
    dispatch(getMenuRuleData());
    dispatch(getRuleData());
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


  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li hidden={firstTimeLogin === "true"}>
              <Link
                to="/AppInstructions"
                className={location.pathname === "/AppInstructions" ? "active" : null}
              >
                <i className="fas fa-list-ul"></i>
                <span>{props.t("Instructions List")}</span>
              </Link>

              <a
                onClick={() => {
                  toggleDropdown("main");
                }}
                className=""
                style={{ overflow: "visible", fontSize: "16px" }}
              >
                <i className="fas fa-folder-open"></i>
                <span style={{ whiteSpace: "nowrap" }}>{props.t("File Management")}</span>
                <i
                  hidden={!dropdownOpen.main}
                  style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                  className="fas fa-chevron-up dropdown-icon"
                ></i>
                <i
                  hidden={dropdownOpen.main}
                  style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                  className="fas fa-chevron-down dropdown-icon"
                ></i>
              </a>
              <Link
                style={{ fontSize: "14px" }}
                to="/EnterMonthlyData"
                hidden={dropdownOpen.main}
                className={location.pathname === "/EnterMonthlyData" ? "active" : null}
              >
                <span style={{ whiteSpace: "nowrap", paddingLeft: "14px" }}>{props.t("Enter Monthly Data")}</span>
              </Link>
              <Link
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
                <i style={{ fontSize: "16px" }} className="fas fa-file-alt"></i>
                <span style={{ fontSize: "16px" }}>{props.t("Group Rule")}</span>
                <i
                  hidden={!dropdownOpen.rule}
                  style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                  className="fas fa-chevron-up dropdown-icon"
                ></i>
                <i
                  hidden={dropdownOpen.rule}
                  style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                  className="fas fa-chevron-down dropdown-icon"
                ></i>
              </a>

              {getMenu?.data?.list.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <a
                      key={index}
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        toggleDropdown(`submenu-${index}`);
                        localStorage.removeItem("selectedYear");
                        localStorage.removeItem("selectedMonth");
                        ReactSession.set("dropdownOpen", dropdownOpen)
                      }}
                      hidden={dropdownOpen.rule}
                    >
                      <span style={{ whiteSpace: "nowrap", paddingLeft: "12px" }}>{item.name}</span>
                      <i
                        hidden={!dropdownOpen[`submenu-${index}`]}
                        style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                        className="fas fa-chevron-up dropdown-icon"
                      ></i>
                      <i
                        hidden={dropdownOpen[`submenu-${index}`]}
                        style={{ fontSize: "14px", position: "absolute", right: "0.5%", top: "25%" }}
                        className="fas fa-chevron-down dropdown-icon"
                      ></i>
                    </a>
                    {dropdownOpen[`submenu-${index}`] &&
                      item?.subList.map((subMenu, i) => {
                        return (
                          <a
                            key={i}
                            to={`/AppRule?v=${index + 1}_${i + 1}`}
                            href={`/AppRule?v=${index + 1}_${i + 1}`}
                            className={extractedValue2 === `${index+1}_${i+1}` ? "active" : null}
                            style={{ fontSize: "14px" }}
                            hidden={dropdownOpen.rule}
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
                style={{ fontSize: "16px" }}
              >
                <i className="fas fa-cog"></i>
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
