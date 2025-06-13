// pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, password */}
    </form>
  );
};
export default Register;
