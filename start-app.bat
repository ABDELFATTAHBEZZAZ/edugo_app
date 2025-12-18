@echo off
echo ========================================
echo   EduGo - Application Launch Script
echo ========================================
echo.

REM Vérifier que nous sommes dans le bon répertoire
if not exist "firebase.json" (
    echo Error: firebase.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [1/3] Installing backend dependencies...
cd functions
if not exist "node_modules" (
    call npm install
) else (
    echo Backend dependencies already installed.
)
cd ..

echo.
echo [2/3] Installing Flutter dependencies...
call flutter pub get

echo.
echo [3/3] Starting Firebase Functions emulator...
echo.
echo IMPORTANT: Keep this window open!
echo The emulator will start in a new window.
echo.
echo Next step: Open a NEW terminal and run:
echo   flutter run
echo.
echo ========================================
echo.

REM Démarrer les émulateurs Firebase
start "Firebase Emulators" cmd /k "firebase emulators:start --only functions"

echo Firebase Functions emulator starting...
echo.
echo Waiting 5 seconds for emulator to initialize...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Backend: http://127.0.0.1:5001/edugo-a78a0/us-central1
echo.
echo To start Flutter app, open a NEW terminal and run:
echo   flutter run
echo.
echo ========================================
pause

