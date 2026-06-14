import { pool } from "../config/db.js";

export const createEventDb = async (
  event
) => {

  const query = `
    INSERT INTO events (
      request_id,
      tenant_id,
      event_type,
      project,
      severity,
      status,
      retry_count,
      failure_reason,
      payload
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9
    )
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [
        event.requestId,
        event.tenantId,
        event.type,
        event.project,
        event.severity,
        event.status,
        event.retryCount,
        event.failureReason,
        JSON.stringify(event.payload)
      ]
    );

  return result.rows[0];
};

export const updateEventStatusDb = async (
  requestId,
  status,
  failureReason = null
) => {

  const query = `
    UPDATE events
    SET
      status = $1,
      failure_reason = $2,
      updated_at = NOW()
    WHERE request_id = $3
    RETURNING *
  `;

  const result = await pool.query(
    query,
    [
      status,
      failureReason,
      requestId
    ]
  );

  return result.rows[0];
};

export const getEventsDb = async () => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM events
      ORDER BY created_at DESC
      `
    );

  return result.rows;
};

export const getEventByRequestIdDb = async (requestId) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM events
      WHERE request_id = $1
      `,
      [requestId]
    );

  return result.rows[0];
};

export const getEventsByTenantDb = async (tenantId) => {

  console.log("TENANT RECEIVED IN REPO:", tenantId);

  const result = await pool.query(
    `
    SELECT *
    FROM events
    WHERE tenant_id = $1
    ORDER BY created_at DESC
    `,
    [tenantId]
  );

  console.log("DB ROWS:", result.rows);

  return result.rows;
};

export const getMetricsDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      SELECT

      COUNT(*) as total_events,

      COUNT(
        CASE
          WHEN status='SUCCESS'
          THEN 1
        END
      ) as success_events,

      COUNT(
        CASE
          WHEN status='FAILED'
          THEN 1
        END
      ) as failed_events,

      COUNT(
        CASE
          WHEN status='PENDING'
          THEN 1
        END
      ) as pending_events,

      COUNT(
        CASE
          WHEN status='PROCESSING'
          THEN 1
        END
      ) as processing_events

      FROM events

      WHERE tenant_id = $1
      `,
      [tenantId]
    );

  return result.rows[0];
};

export const getDashboardDb = async () => {

 const result =
  await pool.query(`
   SELECT

   COUNT(*) as total_events,

   COUNT(
    CASE
     WHEN status='SUCCESS'
     THEN 1
    END
   ) as success_events,

   COUNT(
    CASE
     WHEN status='FAILED'
     THEN 1
    END
   ) as failed_events,

   COUNT(
    DISTINCT tenant_id
   ) as active_tenants

   FROM events
  `);

 return result.rows[0];
};

export const incrementRetryCountDb = async (requestId) => {

  const query = `
    UPDATE events
    SET
      retry_count = retry_count + 1,
      updated_at = NOW()
    WHERE request_id = $1
    RETURNING retry_count
  `;

  const result =
    await pool.query(
      query,
      [requestId]
    );

  return result.rows[0];
};

export const getPendingEventsDb = async () => {

   const query = 
   ` SELECT * FROM events 
   WHERE status = 'PENDING' 
   ORDER BY created_at 
   ASC LIMIT 10 `;

   const result = await pool.query(query);

   return result.rows;
  
};

export const getEventPayloadDb = async (requestId) => {

    const query = `
      SELECT payload
      FROM events
      WHERE request_id = $1
    `;

    const result =
      await pool.query(
        query,
        [requestId]
      );

    return result.rows[0];
  };

export const claimPendingEventsDb = async (
    limit = 10
  ) => {

    const query = `
      UPDATE events
      SET
        status = 'PROCESSING',
         processing_attempts = processing_attempts + 1,
        updated_at = NOW()
      WHERE id IN (

        SELECT id
        FROM events
        WHERE status = 'PENDING'
        ORDER BY created_at ASC
        LIMIT $1

      )
      RETURNING *
    `;

    const result =
      await pool.query(
        query,
        [limit]
      );

    return result.rows;
  };

export const recoverStaleProcessingEventsDb = async ( timeoutMinutes = 5 ) => {

    const query = `
      UPDATE events
      SET
        status = 'PENDING',
        updated_at = NOW(),
        failure_reason =
          'Recovered from stale PROCESSING state'
      WHERE
        status = 'PROCESSING'
        AND updated_at <
          NOW() - ($1 * INTERVAL '1 minute')
      RETURNING *
    `;

    const result =
      await pool.query(
        query,
        [timeoutMinutes]
      );

    return result.rows;
  };