import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center;
    align-items: center;
    margin: 0 30%;
`;

const StyledInput = styled.input`
    margin: 0 0 10px 0;
`;

const StyledDiv = styled.div`
    color: red;
`;

const StyledButton = styled.button`
    margin: 0 0 10px 0;
`;

export default function Form(props) {
    const {values, onInputChange, onSubmit, onCheckboxChange, disabled, errors} = props;
    return(
        <StyledForm className="registration" onSubmit={onSubmit}>
            <label>Name:<br></br>
                <StyledInput type="text" value={values.userName} name="userName" onChange={onInputChange}></StyledInput>
            </label>
            <label>Password:<br></br>
                <StyledInput type="password" value={values.userPassword} name="userPassword" onChange={onInputChange}></StyledInput>
            </label>
            <label>Email:<br></br>
                <StyledInput type="text" value={values.userEmail} name="userEmail" onChange={onInputChange}></StyledInput>
            </label>
            <label>I agree to the Terms of Service&nbsp;
                <StyledInput type="checkbox" name="tos" checked={values.tos} onChange={onCheckboxChange}></StyledInput>
            </label>
            <StyledButton disabled={disabled}>Sign Up</StyledButton>
            <div className="errors">
                <StyledDiv>{errors.userName}</StyledDiv>
                <StyledDiv>{errors.userPassword}</StyledDiv>
                <StyledDiv>{errors.userEmail}</StyledDiv>
                <StyledDiv>{errors.tos}</StyledDiv>
            </div>
        </StyledForm>
    )
}