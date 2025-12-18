# Guide de Configuration Firebase Functions

## ⚠️ Problèmes Courants

### 1. Erreur "unknown option '--only functions'"

**Cause**: La commande doit être exécutée depuis la **racine du projet**, pas depuis le dossier `functions/`.

**Solution**:
```bash
# Depuis la racine du projet (où se trouve firebase.json)
cd "C:\Users\lenovo\Desktop\Tp Python\export-2025-12-11T23_29_26.687\0SEwbmN0UkFXWUO2yLwn"
firebase emulators:start --only functions
```

### 2. Erreur PowerShell "Execution Policy"

**Cause**: PowerShell bloque l'exécution de scripts par défaut.

**Solutions**:

#### Option A: Exécuter dans CMD au lieu de PowerShell
```cmd
# Ouvrir CMD (pas PowerShell)
cd "C:\Users\lenovo\Desktop\Tp Python\export-2025-12-11T23_29_26.687\0SEwbmN0UkFXWUO2yLwn"
firebase emulators:start --only functions
```

#### Option B: Changer la politique d'exécution PowerShell (temporaire)
```powershell
# Dans PowerShell (en tant qu'administrateur)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Option C: Utiliser npx
```powershell
npx firebase emulators:start --only functions
```

## 🚀 Commandes Utiles

### Démarrer les émulateurs
```bash
# Depuis la racine du projet
firebase emulators:start --only functions
```

### Installer les dépendances
```bash
cd functions
npm install
```

### Linter le code
```bash
cd functions
npm run lint
```

### Déployer les fonctions
```bash
# Depuis la racine du projet
firebase deploy --only functions
```

## 📁 Structure des Commandes

```
Projet Root/
├── firebase.json          ← Commandes Firebase exécutées ici
├── functions/
│   ├── index.js
│   ├── controllers/
│   ├── services/
│   └── utils/
```

**Important**: Toujours exécuter les commandes Firebase depuis la racine où se trouve `firebase.json`.

## 🔧 Vérification

Pour vérifier que tout fonctionne :

1. **Vérifier la structure**:
```bash
# Depuis la racine
ls functions/controllers
ls functions/services
ls functions/utils
```

2. **Vérifier les exports**:
```bash
# Le fichier index.js doit contenir uniquement les exports
cat functions/index.js
```

3. **Tester les émulateurs**:
```bash
firebase emulators:start --only functions
```

Les fonctions devraient être disponibles sur:
- `http://127.0.0.1:5001/edugo-a78a0/us-central1/generateSummary`
- `http://127.0.0.1:5001/edugo-a78a0/us-central1/generateQuiz`
- etc.

