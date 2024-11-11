import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the import path if necessary

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Redirect to the login page after registration
    } catch (error) {
      setError('Failed to register. Please check your email and password.');
    }
  };

  return (
    <RegisterWrapper>
      <Form onSubmit={handleRegister}>
        <Title>Register Page</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <InputWrapper>
          <Label>First Name</Label>
          <Input 
            type="text" 
            placeholder="Enter your First Name"
            value={fname} 
            onChange={(e) => setFname(e.target.value)} 
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Last Name</Label>
          <Input 
            type="text" 
            placeholder="Enter your Last Name"
            value={lname} 
            onChange={(e) => setLname(e.target.value)} 
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Email</Label>
          <Input 
            type="email" 
            placeholder="Enter your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Password</Label>
          <Input 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <RegisterButton type="submit">Register</RegisterButton>
        <p style={{ color: "white", marginTop: "8px" }}>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </Form>
    </RegisterWrapper>
  );
};

// Styled components for styling
const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://www.marketing91.com/wp-content/uploads/2015/06/What-is-product-management.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
`;

const Form = styled.form`
  background: #1c1c1c; 
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  color: #ffffff; 
  margin-bottom: 24px;
  font-family: 'Poppins', sans-serif;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #ffffff; 
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #333333; 
  font-size: 16px;
  background-color: #2b2b2b; 
  color: #ffffff; 
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const RegisterButton = styled.button`
  background: #007bff; 
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #0056b3; 
  }
`;

export default Register;

// email mariasabu0206@gmail.com  pass: maria@123