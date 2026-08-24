@echo off
setlocal

cd /d "%~dp0"

echo.
echo ========================================
echo       Calories Calculator
echo ========================================
echo.

echo Stopping application...
docker compose -f docker/docker-compose.yml down

if %errorlevel% neq 0 (
    echo.
    echo Failed to stop Calories Calculator.
    echo Docker Desktop will remain running.
    echo.
    pause
    exit /b 1
)

echo.
echo Application stopped.
echo Database volume preserved.
echo.

echo Closing Docker Desktop...

taskkill /IM "Docker Desktop.exe" /F >nul 2>&1

echo.
echo Docker Desktop closed.
echo.
echo Calories Calculator is completely stopped.
echo.

timeout /t 3 /nobreak >nul

exit /b 0
