# 🚀 Guide de Lancement - EduGo Application

## 📋 Prérequis

### 1. Vérifier les installations
```bash
# Vérifier Node.js
node --version  # Doit être >= 18

# Vérifier Flutter
flutter --version

# Vérifier Firebase CLI
firebase --version
```

### 2. Installer les dépendances

#### Backend (Firebase Functions)
```bash
cd functions
npm install
cd ..
```

#### Frontend (Flutter)
```bash
flutter pub get
```

---

## 🔥 Étape 1 : Lancer les Firebase Functions (Backend)

### Option A : Utiliser le script (Recommandé)
```bash
# Double-cliquez sur start-emulators.bat
# OU depuis le terminal :
start-emulators.bat
```

### Option B : Commande manuelle
```bash
# Depuis la RACINE du projet (où se trouve firebase.json)
firebase emulators:start --only functions
```

### Option C : Si problème PowerShell
```bash
# Utiliser CMD au lieu de PowerShell
# OU utiliser npx
npx firebase emulators:start --only functions
```

### ✅ Vérification
Une fois lancé, vous devriez voir :
```
✔  functions[us-central1-generateSummary]: http function initialized
✔  functions[us-central1-generateQuiz]: http function initialized
✔  functions[us-central1-extractKeywords]: http function initialized
✔  functions[us-central1-extractPdfText]: http function initialized
✔  functions[us-central1-generateMindMap]: http function initialized
✔  functions[us-central1-generateExam]: http function initialized
✔  functions[us-central1-textToSpeech]: http function initialized

✔  All emulators ready!
```

**URL Base**: `http://127.0.0.1:5001/edugo-a78a0/us-central1`

---

## 📱 Étape 2 : Lancer l'Application Flutter (Frontend)

### Option A : Depuis VS Code / Android Studio
1. Ouvrir le projet dans VS Code ou Android Studio
2. Appuyer sur `F5` ou cliquer sur "Run"

### Option B : Depuis le terminal
```bash
# Depuis la racine du projet
flutter run

# Pour une plateforme spécifique
flutter run -d chrome        # Web
flutter run -d windows       # Windows Desktop
flutter run -d android       # Android
flutter run -d ios           # iOS (Mac uniquement)
```

### Option C : Mode développement avec hot reload
```bash
flutter run --debug
```

---

## ⚙️ Configuration de l'URL Backend

L'application Flutter doit pointer vers l'émulateur local. Vérifiez dans :

**Fichier**: `lib/services/ai_service.dart`

```dart
// Pour développement local (émulateur)
static const String _baseUrl = 'http://127.0.0.1:5001/edugo-a78a0/us-central1';

// Pour production (Cloud Functions déployées)
// static const String _baseUrl = 'https://us-central1-edugo-a78a0.cloudfunctions.net';
```

**Important**: Assurez-vous que la première ligne est décommentée pour le développement local.

---

## 🎯 Ordre de Lancement Recommandé

### 1️⃣ D'abord : Backend (Firebase Functions)
```bash
# Terminal 1
firebase emulators:start --only functions
```

### 2️⃣ Ensuite : Frontend (Flutter)
```bash
# Terminal 2 (nouveau terminal)
flutter run
```

---

## 🔍 Vérification que tout fonctionne

### 1. Vérifier le Backend
Ouvrez dans votre navigateur :
```
http://127.0.0.1:5001/edugo-a78a0/us-central1/generateSummary
```

Vous devriez voir une erreur (normal, c'est une requête GET), mais cela confirme que le serveur fonctionne.

### 2. Vérifier le Frontend
- L'application Flutter devrait s'ouvrir
- Essayez de vous connecter ou créer un compte
- Testez une fonctionnalité (générer un résumé, etc.)

---

## 🐛 Dépannage

### Problème : "Connection refused" ou erreur réseau
**Solution**: Vérifiez que les Firebase Functions sont bien lancées et que l'URL dans `ai_service.dart` est correcte.

### Problème : "Firebase not initialized"
**Solution**: Vérifiez que `firebase_options.dart` existe et est correctement configuré.

### Problème : Erreur "Module not found" dans Functions
**Solution**: 
```bash
cd functions
npm install
```

### Problème : Erreur Flutter "Package not found"
**Solution**:
```bash
flutter clean
flutter pub get
```

### Problème : Port déjà utilisé
**Solution**: Arrêtez les autres processus utilisant les ports 5001 (Functions) ou 8080 (Firestore).

---

## 📝 Commandes Utiles

### Arrêter les émulateurs
```bash
# Dans le terminal où les émulateurs tournent
Ctrl + C
```

### Voir les logs Firebase
```bash
firebase functions:log
```

### Voir les logs Flutter
```bash
flutter logs
```

### Nettoyer et reconstruire
```bash
# Flutter
flutter clean
flutter pub get
flutter run

# Functions
cd functions
rm -rf node_modules
npm install
```

---

## 🌐 Déploiement en Production

### Backend (Firebase Functions)
```bash
# Depuis la racine du projet
firebase deploy --only functions
```

### Frontend (Flutter Web)
```bash
flutter build web
firebase deploy --only hosting
```

**Important**: N'oubliez pas de changer l'URL dans `ai_service.dart` pour pointer vers la production après le déploiement.

---

## ✅ Checklist de Lancement

- [ ] Node.js installé
- [ ] Flutter installé
- [ ] Firebase CLI installé
- [ ] Dépendances backend installées (`npm install` dans `functions/`)
- [ ] Dépendances frontend installées (`flutter pub get`)
- [ ] Firebase Functions lancées (émulateur)
- [ ] URL backend configurée dans `ai_service.dart`
- [ ] Application Flutter lancée

---

## 🎉 C'est parti !

Une fois les deux services lancés, votre application EduGo est prête à être utilisée !

**Backend**: `http://127.0.0.1:5001`  
**Frontend**: Application Flutter en cours d'exécution

