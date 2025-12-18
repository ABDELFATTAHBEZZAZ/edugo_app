# 🔧 Résoudre "repository rule violations"

## ❌ Erreur rencontrée

```
! [remote rejected] main -> main (push declined due to repository rule violations)
```

## 🔍 Causes possibles

GitHub bloque le push à cause de règles de dépôt configurées. Cela peut être dû à :

1. **Règles de protection de branche** - La branche `main` est protégée
2. **Validations requises** - Des checks sont requis avant le push
3. **Restrictions de sécurité** - Détection de fichiers sensibles
4. **Règles de taille** - Fichiers trop volumineux (mais ils sont ignorés)

## ✅ Solutions

### Solution 1 : Désactiver les règles de protection (Recommandé pour le premier push)

1. Allez sur : **https://github.com/ABDELFATTAHBEZZAZ/edugo_app/settings/branches**
2. Cherchez les règles de protection pour la branche `main`
3. **Désactivez temporairement** les règles ou ajoutez une exception
4. Réessayez le push

### Solution 2 : Pousser vers une autre branche puis merger

```bash
# Créer une nouvelle branche
git checkout -b initial-push

# Pousser vers cette branche
git push -u origin initial-push

# Puis créer une Pull Request sur GitHub pour merger dans main
```

### Solution 3 : Utiliser GitHub CLI pour contourner

```bash
# Installer GitHub CLI si pas déjà fait
# Puis :
gh auth login
gh repo sync
```

### Solution 4 : Pousser via l'interface web GitHub

1. Allez sur votre dépôt
2. Cliquez sur "uploading an existing file"
3. Glissez-déposez vos fichiers

## 🔍 Vérifier les règles actuelles

Pour voir les règles configurées :
- **Settings** → **Rules** → **Rulesets**
- **Settings** → **Branches** → **Branch protection rules**

## 📝 Note

Les règles de protection sont utiles pour la sécurité, mais peuvent bloquer le premier push. Une fois le code initial poussé, vous pouvez réactiver les règles.

---

**Action immédiate recommandée** : Allez sur les paramètres du dépôt et désactivez temporairement les règles de protection pour permettre le premier push.

