import {
  securityConfig
}
from "../config/index.js";

import { saveLog } from "../platform/sqlite/logRepository.js";

export const adminLoginPage =(req,res) => {

  res.send(`

<html>

<head>

<title>
Admin Login
</title>

<style>

body{

  font-family:Arial;
  margin:50px;
  background:#eef2f7;

}

.card{

  background:white;
  max-width:400px;
  margin:auto;
  padding:30px;
  border-radius:10px;

}

input{

  width:100%;
  padding:10px;
  margin-bottom:10px;

}

button{

  padding:10px 20px;

}

</style>

</head>

<body>

<div class="card">

<h1>
Admin Login
</h1>

<form
method="POST"
action="/admin/login"
>

<input
name="username"
placeholder="Username"
/>

<input
type="password"
name="password"
placeholder="Password"
/>

<button>
Login
</button>

</form>

</div>

</body>

</html>

`);

};

export const adminLogin =(req,res) => {

  const {
    username,
    password
  } = req.body;

  console.log({

  username,

  password,

  expectedUsername:
    securityConfig.adminUsername,

  expectedPassword:
    securityConfig.adminPassword

});

  if (

    username ===
      securityConfig.adminUsername &&

    password ===
      securityConfig.adminPassword

  ) {

    req.session.isAdmin =
      true;

    saveLog(
  "INFO",
  "ADMIN_LOGIN_SUCCESS",
  {
    username
  }
);

    return res.redirect(
      "/admin/dashboard"
    );

  }

  saveLog(
  "WARN",
  "ADMIN_LOGIN_FAILED",
  {
    username
  }
);

  res.send(
    "Invalid credentials"
  );

};

export const adminLogout =(req,res) => {

  saveLog(
  "INFO",
  "ADMIN_LOGOUT",
  {}
);

  req.session.destroy(
    () => {

      res.redirect(
        "/admin/login"
      );

    }
  );

};