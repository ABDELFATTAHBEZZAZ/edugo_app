# 📱 Guide de Génération d'APK - EduGo

## 🎯 Générer un APK Android

### Étape 1 : Créer la configuration Android

Si le dossier `android/` n'existe pas, Flutter va le créer automatiquement :

```bash
flutter create --platforms=android .
```

### Étape 2 : Configurer l'application

#### 2.1 Vérifier/Créer le fichier `android/app/build.gradle`

Assurez-vous que le fichier contient :

```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.edugo.app"  // Changez selon vos besoins
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

#### 2.2 Configurer le nom de l'application

Éditez `android/app/src/main/AndroidManifest.xml` :

```xml
<application
    android:label="EduGo"
    android:name="${applicationName}"
    android:icon="@mipmap/ic_launcher">
    ...
</application>
```

### Étape 3 : Générer l'APK

#### Option A : APK Debug (pour tester)

```bash
flutter build apk --debug
```

**Emplacement** : `build/app/outputs/flutter-apk/app-debug.apk`

#### Option B : APK Release (pour distribution)

```bash
flutter build apk --release
```

**Emplacement** : `build/app/outputs/flutter-apk/app-release.apk`

#### Option C : APK Split par ABI (plus petit)

```bash
flutter build apk --split-per-abi
```

Cela crée 3 APKs séparés :
- `app-armeabi-v7a-release.apk` (32-bit)
- `app-arm64-v8a-release.apk` (64-bit)
- `app-x86_64-release.apk` (x86)

### Étape 4 : Signer l'APK (pour production)

#### 4.1 Créer une clé de signature

```bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

#### 4.2 Configurer la signature

Créez `android/key.properties` :

```properties
storePassword=<votre-mot-de-passe>
keyPassword=<votre-mot-de-passe>
keyAlias=upload
storeFile=<chemin-vers-keystore.jks>
```

#### 4.3 Modifier `android/app/build.gradle`

Ajoutez en haut du fichier :

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Étape 5 : Installer l'APK

#### Sur un appareil Android :

```bash
# Connecter l'appareil via USB
# Activer le débogage USB dans les paramètres développeur

# Installer l'APK
flutter install
# OU
adb install build/app/outputs/flutter-apk/app-release.apk
```

### 📋 Checklist avant de générer l'APK

- [ ] Flutter SDK installé
- [ ] Android SDK installé (via Android Studio)
- [ ] Variables d'environnement configurées (`ANDROID_HOME`)
- [ ] Licence Android acceptée : `flutter doctor --android-licenses`
- [ ] Configuration Firebase pour Android (si nécessaire)
- [ ] URL backend configurée (production ou émulateur)

### ⚠️ Points Importants

1. **URL Backend** : Pour l'APK, changez l'URL dans `lib/services/ai_service.dart` :
   ```dart
   // Pour production
   static const String _baseUrl = 'https://us-central1-edugo-a78a0.cloudfunctions.net';
   ```

2. **Permissions** : Vérifiez `android/app/src/main/AndroidManifest.xml` pour les permissions nécessaires (internet, stockage, etc.)

3. **Taille de l'APK** : 
   - APK complet : ~30-50 MB
   - APK split : ~15-25 MB chacun

4. **Firebase** : Assurez-vous d'avoir `google-services.json` dans `android/app/`

### 🚀 Commandes Rapides

```bash
# Nettoyer le build précédent
flutter clean

# Obtenir les dépendances
flutter pub get

# Vérifier la configuration
flutter doctor

# Générer l'APK release
flutter build apk --release

# Générer l'APK split (plus petit)
flutter build apk --split-per-abi --release
```

### 📍 Emplacement des APKs

- **Debug** : `build/app/outputs/flutter-apk/app-debug.apk`
- **Release** : `build/app/outputs/flutter-apk/app-release.apk`
- **Split** : `build/app/outputs/flutter-apk/`

### 🔍 Vérification

Pour vérifier que tout est prêt :

```bash
flutter doctor -v
```

Tous les éléments Android doivent être marqués ✓

