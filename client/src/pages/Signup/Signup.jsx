import React, { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import signupPicture from "../../images/Work at home.png"


export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
  });
  const { email, name, lastName, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Errors handling: 
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });

    if (errors[field])
      setErrors({
        ...errors,
        [field]: null
      });
  };

  const checkErrors = () => {
    const checkedErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      checkedErrors.email = "Please introduce a valid e-mail";

    if (form.name.length < 3)
      checkedErrors.name = "Your name must be at least 3 chars long";

    else if (form.name === "")
      checkedErrors.name = "This field can not be empty";

    if (form.lastName === "")
      checkedErrors.surname = "this field can not be empty";

    if (form.password.length < 8)
      checkedErrors.password = "Your password should be at least 8 characters long";

    return checkedErrors;
  };


  function handleFormSubmission(event) {
    const foundErrors = checkErrors();

    if (Object.keys(foundErrors).length > 0) {
      event.preventDefault(); 
      setErrors(foundErrors);
    } else {
    event.preventDefault(); 
    const credentials = {
      email,
      name, 
      lastName,
      password,
    };
      signup(credentials).then((res) => {
      if (!res.status || res.errorMessage === "This email has already an account.") {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "This email has already an account, please provide another email address",
        });
      } else {
        // successful signup
        USER_HELPERS.setUserToken(res.data.accessToken);
        authenticate(res.data.user);
        navigate(PATHS.HOMEPAGE);
      }
    });
    }
  }

  return (
    <div className= "Signup">
            <img src={signupPicture} alt="Coworking" className="image-container" />

      <Box
        sx={{width: 250, height: 300, textAlign: 'center', '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="off" >
      <form className="auth__form">
      <h1>Sign Up</h1>
      <TextField id="input-email" label="Your email" variant="outlined" type="email"
          color="secondary"
          error={errors.email}
          name="email"
          placeholder="Write your email address"
          value={email}
          size= "small"
          onChange={(e) => setField("email", e.target.value)}
          helperText={errors.email}
          required
      />
      <TextField id="input-name" label="Name" variant="outlined" type="text"
          color="secondary"
          error={errors.name}
          name="name"
          placeholder="Your first name"
          value={name}
          size= "small"
          onChange={(e) => setField("name", e.target.value)}
          htmlFor="input-name"
          helperText={errors.name}
          required
      />
      <TextField id="input-lastName" label="Last Name" variant="outlined" type="text"
          color="secondary"
          error={errors.lastName}
          name="lastName"
          placeholder="Your last name"
          value={lastName}
          size= "small"
          onChange={(e) => setField("lastName", e.target.value)}
          htmlFor="input-lastName"
          helperText={errors.lastName}
          required
      />
      <TextField id="input-password"  label="Your Password" variant="outlined" type="password"
          color="secondary"
          error={errors.password}
          name="password"
          placeholder="Create a password"
          value={password}
          size= "small"
          onChange={(e) => setField("password", e.target.value)}
          htmlFor="input-password"
          helperText={errors.password}
          required
      />

        <Button variant="outlined" sx={{ m: 2 }} color="secondary"  onClick={handleFormSubmission} className="button_submit" type="submit">
          Create Account
        </Button>
      </form>
      {error && (
          <div className="error-block">
            <p>{error.message}</p>
          </div>
      )}
      </Box>
   </div>
  );
}
