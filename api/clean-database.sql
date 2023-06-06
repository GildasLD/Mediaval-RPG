SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'W_WEB_330_PAR_4_2_ruby_gildas_le_drogoff'
  AND pid <> pg_backend_pid();
DROP DATABASE if exists "W_WEB_330_PAR_4_2_ruby_gildas_le_drogoff";