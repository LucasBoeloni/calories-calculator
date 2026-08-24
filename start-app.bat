@echo off
setlocal

cd /d "%~dp0"

echo.
echo ========================================
echo       Calories Calculator
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1

if %errorlevel% neq 0 (
    echo Docker Desktop is not running.
    echo Starting Docker Desktop...

    start "" "C:\Users\lucas\AppData\Local\Programs\DockerDesktop\Docker Desktop.exe"

    echo Waiting for Docker Desktop...

    :waitDocker
    timeout /t 2 /nobreak >nul

    docker info >nul 2>&1

    if %errorlevel% neq 0 (
        goto waitDocker
    )

    echo Docker Desktop is ready.
)

echo.
echo Starting Calories Calculator...

docker compose -f docker/docker-compose.yml up -d

if %errorlevel% neq 0 (
    echo.
    echo Failed to start Calories Calculator.
    echo.
    pause
    exit /b 1
)

echo.
echo Waiting for application...

:waitApp
curl -s http://localhost:8080 >nul 2>&1

if %errorlevel% neq 0 (
    timeout /t 2 /nobreak >nul
    goto waitApp
)

echo.
echo ========================================
echo   Calories Calculator is ready!
echo ========================================
echo.

start "" "http://localhost:8080"

exit /b 0
