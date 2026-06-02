"use strict";

const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/audit", async (req, res, next) => {
  try {
    const { actor, action, limit = 50, offset = 0 } = req.query;
    const where = [];
    const values = [];

    if (actor) {
      values.push(actor);
      where.push(`actor = $${values.length}`);
    }
    if (action) {
      values.push(action);
      where.push(`action = $${values.length}`);
    }

    values.push(Math.min(Number.parseInt(limit, 10) || 50, 200));
    values.push(Math.max(Number.parseInt(offset, 10) || 0, 0));

    let query = `
      SELECT id, actor, action, target_type, target_id, metadata, ip_address, created_at
      FROM admin_audit_log
    `;
    if (where.length) {
      query += " WHERE " + where.join(" AND ");
    }
    query += " ORDER BY created_at DESC LIMIT $" + (values.length - 1) + " OFFSET $" + values.length;

    const result = await pool.query(query, values);

    let countQuery = "SELECT COUNT(*) AS total FROM admin_audit_log";
    if (where.length) {
      countQuery += " WHERE " + where.join(" AND ");
    }
    const countResult = await pool.query(countQuery, values.slice(0, -2));

    const rows = result.rows.map(row => ({
      id: row.id,
      actor: row.actor,
      action: row.action,
      targetType: row.target_type,
      targetId: row.target_id,
      metadata: row.metadata,
      ipAddress: row.ip_address,
      createdAt: new Date(row.created_at).toISOString(),
    }));

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: parseInt(countResult.rows[0].total, 10),
        limit: Number.parseInt(limit, 10) || 50,
        offset: Number.parseInt(offset, 10) || 0,
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
