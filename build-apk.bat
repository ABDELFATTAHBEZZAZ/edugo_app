@echo off
echo ========================================
echo   EduGo - APK Builder
echo ========================================
echo.

REM Vérifier que nous sommes dans le bon répertoire
if not exist "pubspec.yaml" (
    echo Error: pubspec.yaml not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [1/3] Cleaning previous build...
call flutter clean

echo.
echo [2/3] Getting dependencies...
call flutter pub get

echo.
echo [3/3] Building APK (Release)...
echo.
echo This may take several minutes...
echo.

call flutter build apk --release

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo APK Location:
echo   build\app\outputs\flutter-apk\app-release.apk
echo.
echo To build split APKs (smaller size):
echo   flutter build apk --split-per-abi --release
echo.
pause

