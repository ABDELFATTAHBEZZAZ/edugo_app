# 🚀 Guide pour pousser le code sur GitHub

Votre dépôt local contient **14 105 fichiers** et **4 commits**, mais le dépôt GitHub apparaît vide. Cela indique un problème d'authentification.

## 🔐 Solution 1 : Utiliser un Personal Access Token (Recommandé)

### Étape 1 : Créer un Personal Access Token

1. Allez sur GitHub : https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez un nom au token (ex: "EduGo App")
4. Sélectionnez les permissions :
   - ✅ `repo` (accès complet aux dépôts)
5. Cliquez sur **"Generate token"**
6. **⚠️ IMPORTANT** : Copiez le token immédiatement (vous ne pourrez plus le voir après)

### Étape 2 : Configurer Git avec le token

**Option A : Utiliser le token dans l'URL (temporaire)**
```bash
git remote set-url origin https://VOTRE_TOKEN@github.com/ABDELFATTAHBEZZAZ/edugo_app.git
git push -u origin main
```

**Option B : Utiliser Git Credential Manager (recommandé)**

Sur Windows, Git Credential Manager devrait être installé avec Git. Quand vous ferez `git push`, une fenêtre s'ouvrira pour vous demander :
- **Username** : Votre nom d'utilisateur GitHub
- **Password** : Collez votre **Personal Access Token** (pas votre mot de passe GitHub)

### Étape 3 : Pousser le code

```bash
git push -u origin main
```

---

## 🔐 Solution 2 : Utiliser GitHub CLI (gh)

### Étape 1 : Installer GitHub CLI

Téléchargez depuis : https://cli.github.com/

### Étape 2 : S'authentifier

```bash
gh auth login
```

Suivez les instructions pour vous connecter.

### Étape 3 : Pousser le code

```bash
gh repo sync
# OU
git push -u origin main
```

---

## 🔐 Solution 3 : Utiliser SSH (Alternative)

### Étape 1 : Générer une clé SSH

```bash
ssh-keygen -t ed25519 -C "votre_email@example.com"
```

### Étape 2 : Ajouter la clé à GitHub

1. Copiez le contenu de `~/.ssh/id_ed25519.pub`
2. Allez sur : https://github.com/settings/keys
3. Cliquez sur **"New SSH key"**
4. Collez votre clé publique

### Étape 3 : Changer l'URL du remote

```bash
git remote set-url origin git@github.com:ABDELFATTAHBEZZAZ/edugo_app.git
git push -u origin main
```

---

## ✅ Vérification

Après le push, vérifiez que tout est bien sur GitHub :

```bash
git ls-remote origin
```

Vous devriez voir les branches et commits.

---

## 🐛 Si le push échoue toujours

### Vérifier l'état actuel

```bash
git status
git log --oneline -5
git remote -v
```

### Vérifier que tous les fichiers sont commités

```bash
git add -A
git status
```

Si des fichiers apparaissent, faites :
```bash
git commit -m "Add all project files"
git push -u origin main
```

---

## 📝 Notes importantes

- ⚠️ **Ne commitez JAMAIS** `api_keys.dart` ou `google-services.json`
- ✅ Le fichier `api_keys.dart.example` est déjà dans le dépôt
- ✅ Le `.gitignore` est configuré pour exclure les fichiers sensibles

---

**Besoin d'aide ?** Consultez la [documentation GitHub](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories) ou ouvrez une issue.

