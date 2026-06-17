const ADMIN_USERNAME =
  "admin";

const ADMIN_PASSWORD =
  "notify123";

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

  if (

    username ===
      ADMIN_USERNAME &&

    password ===
      ADMIN_PASSWORD

  ) {

    req.session.isAdmin =
      true;

    return res.redirect(
      "/admin/dashboard"
    );

  }

  res.send(
    "Invalid credentials"
  );

};

export const adminLogout =(req,res) => {

  req.session.destroy(
    () => {

      res.redirect(
        "/admin/login"
      );

    }
  );

};