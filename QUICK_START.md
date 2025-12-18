# ⚡ Démarrage Rapide - EduGo

## 🚀 Méthode la Plus Simple

### Option 1 : Script Automatique (Recommandé)
```bash
# Double-cliquez sur start-app.bat
# OU depuis le terminal :
start-app.bat
```

Ce script va :
1. ✅ Installer les dépendances backend
2. ✅ Installer les dépendances Flutter
3. ✅ Démarrer les Firebase Functions

Ensuite, dans un **nouveau terminal** :
```bash
flutter run
```

---

## 📝 Méthode Manuelle (2 Terminaux)

### Terminal 1 : Backend (Firebase Functions)
```bash
# Depuis la racine du projet
firebase emulators:start --only functions
```

**Attendez** de voir :
```
✔  All emulators ready!
```

### Terminal 2 : Frontend (Flutter)
```bash
# Depuis la racine du projet
flutter run
```

---

## ✅ Vérification Rapide

### Backend fonctionne ?
Ouvrez : http://127.0.0.1:5001/edugo-a78a0/us-central1/generateSummary

Si vous voyez une erreur (normal pour GET), c'est que le serveur fonctionne ! ✅

### Frontend fonctionne ?
L'application Flutter devrait s'ouvrir automatiquement. ✅

---

## 🎯 URLs Importantes

- **Backend Local**: `http://127.0.0.1:5001/edugo-a78a0/us-central1`
- **Frontend**: Application Flutter (port variable)

---

## 🐛 Problèmes Courants

### "Connection refused"
→ Vérifiez que les Firebase Functions sont lancées

### "Module not found"
→ Exécutez : `cd functions && npm install`

### "Package not found" (Flutter)
→ Exécutez : `flutter pub get`

---

## 📚 Guide Complet

Pour plus de détails, consultez `GUIDE_LANCEMENT.md`

