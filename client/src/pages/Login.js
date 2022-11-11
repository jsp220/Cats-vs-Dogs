import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Test3 = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <Card sx={{ minWidth: 275 }} className="card-body">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="span">
                    Log In
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </Typography>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="formCard">
              <Typography variant="h5" component="span">
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  component="span"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <TextField
                  fullWidth
                  id="password"
                  component="span"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Typography>
              <Typography variant="body2">
                <Button
                  variant="contained"
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Log In
                </Button>
              </Typography>
            </form>
          )}
          <a href="/signup" rel="signup">
            Sign Up Instead?
          </a>
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Test3;
