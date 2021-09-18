import React, { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { createPopper } from "@popperjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Auth from '../../utils/auth';

export default function Dropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  window.onclick = function(event) {
    event.preventDefault();
    if (event.target !== document.querySelector('.dropdownbtn')) {
      setDropdownPopoverShow(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap px-4">
      <div className="relative font-main inline-flex align-middle gap-x-1 w-full">
            <button
              className={dropdownPopoverShow ?
                "text-theme-aliceblue text-sm px-4 py-2 rounded-t-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-100 dropdownbtn bg-theme-blueblack" :
                "text-theme-aliceblue text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-100 dropdownbtn bg-theme-bluemidgray"
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {Auth.getProfile().data.username} {" "} 
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-theme-blueblack text-base divide-y divide-theme-bluemidgray overflow-y-hidden text-theme-aliceblue z-50 py-1 list-none text-center rounded-br-full rounded-bl-full rounded-tl-full shadow-xl mt-1"
              }
              style={{ minWidth: "12rem"}}
              data-popper-placement='bottom-end'
            >
            <Link to="/home">
              <p className="text-sm p-2 hover:text-gray-400 transition duration-200 font-normal block w-full whitespace-nowrap bg-transparent">
                Home
              </p>
            </Link>
            <Link to="/creator">
              <p className="text-sm p-2 hover:text-gray-400 transition duration-200 font-normal block w-full whitespace-nowrap bg-transparent">
                Creator
              </p>
            </Link>
            <Link to="/search">
              <p className="text-sm hover:text-gray-400 transition duration-200 p-2 font-normal block w-full whitespace-nowrap bg-transparent">
                Advanced Search
              </p>
            </Link>
              <a
                href="/home"
                className="text-sm p-2 font-normal block w-full whitespace-nowrap bg-transparent"
              >
                <button className='p-2 bg-red-500 hover:bg-red-800 transition duration-200 rounded-md text-white outline-none shadow-lg' onClick={Auth.logout}>Logout</button>
              </a>
          </div>
        </div>
      </div>
    </>
  );
};