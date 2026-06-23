import { pool }
from "../config/db.js";

export const createTenantUserDb = async (
  tenantId,
  email,
  role
) => {

  const result =
    await pool.query(
      `
      INSERT INTO tenant_users (

        tenant_id,
        email,
        role

      )

      VALUES (

        $1,
        $2,
        $3

      )

      RETURNING *
      `,
      [
        tenantId,
        email,
        role
      ]
    );

  return result.rows[0];

};

export const getTenantUserByEmailDb = async (
  tenantId,
  email
) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM tenant_users
      WHERE tenant_id = $1
      AND email = $2
      `,
      [
        tenantId,
        email
      ]
    );

  return result.rows[0];

};

export const getTenantUsersDb = async (
  tenantId
) => {

  const result =
    await pool.query(
      `
      SELECT
        tenant_id,
        email,
        role,
        status,
        created_at
      FROM tenant_users
      WHERE tenant_id = $1
      ORDER BY created_at DESC
      `,
      [tenantId]
    );

  return result.rows;

};

export const updateTenantUserRoleDb = async (
  tenantId,
  email,
  role
) => {

  const result =
    await pool.query(
      `
      UPDATE tenant_users

      SET
        role = $3

      WHERE
        tenant_id = $1
        AND email = $2

      RETURNING *
      `,
      [
        tenantId,
        email,
        role
      ]
    );

  return result.rows[0];

};

export const updateTenantUserPasswordDb = async (
  tenantId,
  email,
  passwordHash
) => {

  const result =
    await pool.query(
      `
      UPDATE tenant_users

      SET
        password_hash = $3,
        updated_at = CURRENT_TIMESTAMP

      WHERE
        tenant_id = $1
        AND email = $2

      RETURNING *
      `,
      [
        tenantId,
        email,
        passwordHash
      ]
    );

  return result.rows[0];

};

export const updateLastLoginDb = async (
  tenantId,
  email
) => {

  const result =
    await pool.query(
      `
      UPDATE tenant_users

      SET
        last_login_at = CURRENT_TIMESTAMP

      WHERE
        tenant_id = $1
        AND email = $2

      RETURNING *
      `,
      [
        tenantId,
        email
      ]
    );

  return result.rows[0];

};

export const updateTenantUserStatusDb = async (
  tenantId,
  email,
  status
) => {

  const result =
    await pool.query(
      `
      UPDATE tenant_users

      SET
        status = $3,
        updated_at = CURRENT_TIMESTAMP

      WHERE
        tenant_id = $1
        AND email = $2

      RETURNING *
      `,
      [
        tenantId,
        email,
        status
      ]
    );

  return result.rows[0];

};