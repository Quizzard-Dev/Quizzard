import React, { useState } from 'react';

import Auth from '../../utils/auth';

export default function MainNavbar() {
  let navClasses = 'container bg-theme-main p-5';
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={navClasses}>
      <a href='/'>
        Quizzard
      </a>
    </div>
  )
};
