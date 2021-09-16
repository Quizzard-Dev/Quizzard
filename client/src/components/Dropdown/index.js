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
      <div className="relative font-title inline-flex align-middle w-full">
            <button
              className={dropdownPopoverShow ?
                "text-theme-aliceblue text-sm px-4 py-2 rounded-t shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 dropdownbtn bg-theme-darker" :
                "text-theme-aliceblue text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 dropdownbtn bg-theme-darker"
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {Auth.getProfile().data.username} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-theme-darker text-base z-50 py-1 list-none text-center rounded-br rounded-bl rounded-tl shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
            <Link to="/home">
              <p
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                }
              >
                Home
              </p>
            </Link>
            <Link to="/creator">
              <p
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                }
              >
                Creator
              </p>
            </Link>
              <a
                href="/home"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                }
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
                href="/home"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                }
              >
                <button className='px-4 py-3 bg-red-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform' onClick={Auth.logout}>Logout</button>
              </a>
            </div>
          </div>
      </div>
    </>
  );
};