import React, {useState, useEffect} from 'react';
import Form from "./Form";
import axios from "axios";
import * as yup from "yup";
import formSchema from "./validation/formSchema";
import './App.css';

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
      <header><h1>User App</h1></header>
      <Form values={userValues} onInputChange={onInputChange} onSubmit={onSubmit} disabled={disabled} errors={formErrors} onCheckboxChange={onCheckboxChange}/>

    {
      users.map(user => (
        <div>
          <h1>{user.username}</h1>
          <p>{user.userPassword}</p>
          <p>{user.email}</p>
        </div>
      ))
    }

    </div>
  );
}

export default App;
