import React from "react";

export default function Form(props) {
    const {values, onInputChange, onSubmit, onCheckboxChange, disabled, errors} = props;
    return(
        <form className="registration" onSubmit={onSubmit}>
            <label>Name:
                <input type="text" value={values.userName} name="userName" onChange={onInputChange}></input>
            </label>
            <label>Password:
                <input type="text" value={values.userPassword} name="userPassword" onChange={onInputChange}></input>
            </label>
            <label>Email:
                <input type="text" value={values.userEmail} name="userEmail" onChange={onInputChange}></input>
            </label>
            <label>I agree to the Terms of Service 
                <input type="checkbox" name="tos" checked={values.tos} onChange={onCheckboxChange}></input>
            </label>
            <button disabled={disabled}>Sign Up</button>
            <div className="errors">
                <div>{errors.userName}</div>
                <div>{errors.userPassword}</div>
                <div>{errors.userEmail}</div>
                <div>{errors.tos}</div>
            </div>
        </form>
    )
}