import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

export default function LogInForm() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  try {
    const { data } = await loginUser({
      variables: {...userFormData}
    });
    if (!data) {
      throw new Error('Something went wrong!');
    }
    Auth.login(data.login.token)
  } catch(err) {
    console.error(err);
  }
  
  return (
    <div>
      
    </div>
  )
};
