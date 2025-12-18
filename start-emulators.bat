@echo off
echo Starting Firebase Emulators...
echo.
echo Make sure you are in the project root directory!
echo.
cd /d "%~dp0"
firebase emulators:start --only functions
pause

