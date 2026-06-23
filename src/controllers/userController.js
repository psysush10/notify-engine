import {

  getUsers,
  createUser,
  updateUserRole,
  updateUserStatus

}
from "../services/userService.js";

export const getUsersApi =
async (
  req,
  res
) => {

  const users =
    await getUsers(
      req.tenantId
    );

  res.json(
    users
  );

};

export const createUserApi =
async (
  req,
  res
) => {

  const {
    email,
    role
  } = req.body;

  const user =
    await createUser(

      req.tenantId,

      email,

      role

    );

  res.json(
    user
  );

};

export const updateRoleApi =
async (
  req,
  res
) => {

  const {
    role
  } = req.body;

  const user =
    await updateUserRole(

      req.tenantId,

      req.params.email,

      role

    );

  res.json(
    user
  );

};

export const updateStatusApi =
async (
  req,
  res
) => {

  const {
    status
  } = req.body;

  const user =
    await updateUserStatus(

      req.tenantId,

      req.params.email,

      status

    );

  res.json(
    user
  );

};