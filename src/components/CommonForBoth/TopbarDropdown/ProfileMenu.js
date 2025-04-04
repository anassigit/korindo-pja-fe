import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap"
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import user1 from "../../../assets/images/users/circle-user.png"
import { getProfile } from "store/actions"

const ProfileMenu = props => {

    const dispatch = useDispatch()

    const [menu, setMenu] = useState(false)
    const [username, setusername] = useState("Admin")

    const getDetailProfile = useSelector(state => {
        return state.userProfileReducer.respGetProfile;
    })

    useEffect(() => {
        dispatch(getProfile({
            search: {
                langType: "eng"
            }
        }))
    }, [])

    useEffect(() => {
        const u = getDetailProfile?.data?.member?.name
        setusername(u)
        if (getDetailProfile.status === '1') {
            localStorage.setItem("user", getDetailProfile?.data?.member?.name)
        } else {
            localStorage.removeItem("user")
        }
    }, [getDetailProfile])

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item "
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        height={25}
                        width={25}
                        src={user1}
                        alt="Header Avatar"
                    />
                    <span className="d-none d-xl-inline-block ms-2 me-1">{username} </span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <Link to="/AppUserProfile" className="dropdown-item">
                        <i className="mdi mdi-account-box fs-4 align-middle me-1" />
                        <span>{props.t("Profile")}</span>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/logout" className="dropdown-item">
                        <i className="mdi mdi-power fs-4 align-middle me-1 text-danger" />
                        <span>{props.t("Log Out")}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

ProfileMenu.propTypes = {
    success: PropTypes.any,
    t: PropTypes.any
}

export default withTranslation()(ProfileMenu)