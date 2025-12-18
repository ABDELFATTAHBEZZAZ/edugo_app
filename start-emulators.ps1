# Script PowerShell pour démarrer les émulateurs Firebase
Write-Host "Starting Firebase Emulators..." -ForegroundColor Green
Write-Host ""

# Vérifier qu'on est dans le bon répertoire
if (-not (Test-Path "firebase.json")) {
    Write-Host "Error: firebase.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Démarrer les émulateurs
Write-Host "Starting functions emulator..." -ForegroundColor Yellow
firebase emulators:start --only functions

