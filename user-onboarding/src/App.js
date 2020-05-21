import React, {useState, useEffect} from 'react';
import Form from "./Form";
import axios from "axios";
import * as yup from "yup";
import formSchema from "./validation/formSchema";
import './App.css';
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 10px 0 10px 0;
`;

const StyledH2 = styled.h2`
  font-size: 24px;
`;

function App() {
  const initialUserList = [];
  const initialUserValues = {
    userName: "",
    userPassword: "",
    userEmail: "",
    tos: "",
  }
  const initialFormErrors = {
    userName: "",
    userPassword: "",
    userEmail: "",
    tos: "",
  }
  const initialDisabled = true;

  const [userValues, setUserValues] = useState(initialUserValues);
  const [users, setUsers] = useState(initialUserList);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const onInputChange = evt => {
    const { name, value } = evt.target
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({...formErrors,[name]: ""})
      })
      .catch(err => {
        setFormErrors({...formErrors,[name]: err.errors[0]})
      })
    setUserValues({...userValues, [name]: value})
  }
  
  // post
  const postNewUser = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
        setUsers([...users, res.data])
      })
      .finally(setUserValues(initialUserValues))
  }
  
  // for form onSubmit
  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      username: userValues.userName.trim(),
      email: userValues.userEmail.trim(),
      userPassword: userValues.userPassword,
      tos: userValues.tos,
    }
    postNewUser(newUser)
  }

  const onCheckboxChange = evt => {
    const {name, checked} = evt.target;
    setUserValues({...userValues, [name]: checked});
  }

  useEffect(() => {
    formSchema.isValid(userValues)
      .then(valid => {
        setDisabled(!valid)
      })
    }, [userValues])

  return (
    <div className="App">
      <header><StyledH1>User App</StyledH1></header>
      <Form values={userValues} onInputChange={onInputChange} onSubmit={onSubmit} disabled={disabled} errors={formErrors} onCheckboxChange={onCheckboxChange}/>
      <br></br>
      <StyledH1>Users</StyledH1>
      <br></br>
    {
      users.map(user => (
        <div>
          <StyledH2>{user.username}</StyledH2>
          <p>Password: {user.userPassword}</p>
          <p>Email: {user.email}</p>
        </div>
      ))
    }

    </div>
  );
}

export default App;
