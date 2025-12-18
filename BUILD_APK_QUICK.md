# 📱 Génération Rapide d'APK - EduGo

## ⚡ Méthode Rapide

### Option 1 : Script Automatique
```bash
# Double-cliquez sur build-apk.bat
# OU depuis le terminal :
build-apk.bat
```

### Option 2 : Commande Manuelle
```bash
# Depuis la racine du projet
flutter build apk --release
```

## 📍 Emplacement de l'APK

Une fois généré, l'APK se trouve dans :
```
build/app/outputs/flutter-apk/app-release.apk
```

## ⚠️ IMPORTANT : Configuration Backend

**Avant de générer l'APK pour production**, modifiez `lib/services/ai_service.dart` :

```dart
// Pour PRODUCTION (APK)
static const String _baseUrl = 'https://us-central1-edugo-a78a0.cloudfunctions.net';

// Pour DÉVELOPPEMENT (émulateur local)
// static const String _baseUrl = 'http://127.0.0.1:5001/edugo-a78a0/us-central1';
```

**Important** : L'APK ne peut pas accéder à `127.0.0.1` (localhost). Vous devez utiliser l'URL de production ou déployer les Firebase Functions.

## 🚀 Déployer les Firebase Functions (si pas encore fait)

```bash
# Depuis la racine du projet
firebase deploy --only functions
```

## 📦 Types d'APK

### APK Release (complet)
```bash
flutter build apk --release
```
**Taille** : ~30-50 MB  
**Emplacement** : `build/app/outputs/flutter-apk/app-release.apk`

### APK Split (plus petit, par architecture)
```bash
flutter build apk --split-per-abi --release
```
**Taille** : ~15-25 MB chacun  
**Emplacements** :
- `build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk` (32-bit)
- `build/app/outputs/flutter-apk/app-arm64-v8a-release.apk` (64-bit)
- `build/app/outputs/flutter-apk/app-x86_64-release.apk` (x86)

## ✅ Checklist

- [ ] Structure Android créée (`flutter create --platforms=android .`)
- [ ] Permissions ajoutées dans `AndroidManifest.xml`
- [ ] URL backend changée pour production (dans `ai_service.dart`)
- [ ] Firebase Functions déployées (si nécessaire)
- [ ] APK généré avec succès

## 🔍 Vérification

Pour vérifier que tout est prêt :
```bash
flutter doctor
```

## 📱 Installer l'APK

### Sur un appareil Android :
1. Transférez l'APK sur votre téléphone
2. Activez "Sources inconnues" dans les paramètres
3. Ouvrez l'APK et installez

### Via ADB :
```bash
adb install build/app/outputs/flutter-apk/app-release.apk
```

