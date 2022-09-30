import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { BiHotel } from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs"

import DashboardLogo from "../../../assets/images/dashboard-logo.png";
import { useNavigate } from "react-router-dom";
import "./SideBar.css"


const SideBar = (props) => {
	const navigation = useNavigate();
	const location = useLocation();
	const [sideBar, setSideBar] = useState(false)
	const showSideBar = () => setSideBar(!sideBar);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigation("/admin/auth")
		}
	})
	const onLogOutHandler = () => {
		localStorage.clear();
		window.location.reload();
	}

	const classes = (path) => {
		if (path === location.pathname) {
			return 'nav_active'
		}
		return ''
	}

	return (
		<div className={sideBar ? 'sidebar active' : 'sidebar'}>
			<div className={'logo_content'}>
				<div className={'profile'}>
					<img alt={'profile'} src={DashboardLogo} />
					<p className={'mb-0'}>Trip Advisor</p>
				</div>
				<FaIcons.FaBars className={'fa-bars'} onClick={showSideBar} />
			</div>
			<ul className="nav_list p-0">
				<li className={`${classes("/admin/hotel")}`}>
					<div>
						<Link to={"/admin/hotel"}>
							<BiHotel />
							<span>Hotel</span>
						</Link>
					</div>
				</li>

				<li className={`${classes("/admin/booking")}`}>
					<div>
						<Link to={"/admin/booking"}>
							<BsFillPencilFill />
							<span>Booking</span>
						</Link>
					</div>
				</li>

				<li className="logout_btn" onClick={onLogOutHandler}>
					<Link to={'#'}>
						<FiIcons.FiLogOut />
						<span>Logout</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default SideBar;
