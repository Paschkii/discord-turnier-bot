const { pool } = require('../../datenbank');
const { isValidJobId, normalizeJobId } = require('../utils/jobs');

const MIN_LEVEL = 1;
const MAX_LEVEL = 100;

function clampLevel(level) {
  if (Number.isNaN(level)) return MIN_LEVEL;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, level));
}

function normalizeLevel(value) {
  const numeric = Number.parseInt(value, 10);
  return clampLevel(Number.isFinite(numeric) ? numeric : MIN_LEVEL);
}

async function setJobLevel(guildId, userId, jobId, level) {
  const normalizedJob = normalizeJobId(jobId);
  if (!isValidJobId(normalizedJob)) {
    throw new Error('INVALID_JOB');
  }
  if (!guildId) {
    throw new Error('GUILD_ID_REQUIRED');
  }
  if (!userId) {
    throw new Error('USER_ID_REQUIRED');
  }

  const normalizedLevel = normalizeLevel(level);
  const params = [String(guildId), String(userId), normalizedJob, normalizedLevel];

  const query = `
    INSERT INTO user_jobs (guild_id, user_id, job_id, level, updated_at)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (guild_id, user_id, job_id)
    DO UPDATE SET level = EXCLUDED.level, updated_at = NOW()
    RETURNING job_id, level
  `;

  const res = await pool.query(query, params);
  const row = res.rows?.[0] ?? {};

  return {
    jobId: normalizeJobId(row.job_id ?? normalizedJob),
    level: normalizeLevel(row.level ?? normalizedLevel),
  };
}

async function getUserJobs(guildId, userId) {
  if (!guildId || !userId) return [];

  const res = await pool.query(
    `SELECT job_id, level FROM user_jobs WHERE guild_id = $1 AND user_id = $2`,
    [String(guildId), String(userId)]
  );

  return res.rows
    .map((row) => {
      const jobId = normalizeJobId(row.job_id);
      if (!isValidJobId(jobId)) return null;
      return { jobId, level: normalizeLevel(row.level) };
    })
    .filter(Boolean);
}

async function getUsersForJob(guildId, jobId) {
  const normalizedJob = normalizeJobId(jobId);
  if (!isValidJobId(normalizedJob)) {
    throw new Error('INVALID_JOB');
  }
  if (!guildId) {
    throw new Error('GUILD_ID_REQUIRED');
  }
  
  const res = await pool.query(
    `SELECT user_id, level FROM user_jobs WHERE guild_id = $1 AND job_id = $2`,
    [String(guildId), normalizedJob]
  );

  return res.rows.map((row) => ({
    userId: String(row.user_id),
    level: normalizeLevel(row.level),
  }));
}

module.exports = {
  MAX_LEVEL,
  MIN_LEVEL,
  getUserJobs,
  getUsersForJob,
  setJobLevel,
};