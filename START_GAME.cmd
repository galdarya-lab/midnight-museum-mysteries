@echo off
cd /d "%~dp0"
call npm run build
if errorlevel 1 (
  pause
  exit /b 1
)
start "" "http://127.0.0.1:8080/?art=20261112-4"
node server.cjs
