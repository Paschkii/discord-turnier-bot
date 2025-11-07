const { isValidJobId, normalizeJobId } = require('../utils/jobs');

const MIN_LEVEL = 1;
const MAX_LEVEL = 100;

const jobsByUser = new Map();

function clampLevel(level) {
  if (Number.isNaN(level)) return MIN_LEVEL;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, level));
}

function normalizeLevel(value) {
  const numeric = Number.parseInt(value, 10);
  return clampLevel(Number.isFinite(numeric) ? numeric : MIN_LEVEL);
}

function getUserMap(userId) {
  const key = String(userId);
  if (!jobsByUser.has(key)) {
    jobsByUser.set(key, new Map());
  }
  return jobsByUser.get(key);
}

function setJobLevel(userId, jobId, level) {
  const normalizedJob = normalizeJobId(jobId);
  if (!isValidJobId(normalizedJob)) {
    throw new Error('INVALID_JOB');
  }
  const normalizedLevel = normalizeLevel(level);
  const userJobs = getUserMap(userId);
  userJobs.set(normalizedJob, normalizedLevel);
  return { jobId: normalizedJob, level: normalizedLevel };
}

function getUserJobs(userId) {
  const key = String(userId);
  const userJobs = jobsByUser.get(key);
  if (!userJobs) return [];
  return Array.from(userJobs.entries()).map(([jobId, level]) => ({ jobId, level }));
}

function getUsersForJob(jobId) {
  const normalizedJob = normalizeJobId(jobId);
  if (!isValidJobId(normalizedJob)) {
    throw new Error('INVALID_JOB');
  }
  const result = [];
  for (const [userId, userJobs] of jobsByUser.entries()) {
    if (!userJobs.has(normalizedJob)) continue;
    result.push({ userId, level: userJobs.get(normalizedJob) });
  }
  return result;
}

module.exports = {
  MAX_LEVEL,
  MIN_LEVEL,
  getUserJobs,
  getUsersForJob,
  setJobLevel,
};