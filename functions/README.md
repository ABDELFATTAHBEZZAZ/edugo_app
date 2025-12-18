# Firebase Cloud Functions - Structure Modulaire

## 📁 Architecture

```
functions/
├── index.js                    # Point d'entrée - Exports uniquement
├── controllers/                # Gestion des requêtes HTTP
│   ├── summary.controller.js
│   ├── quiz.controller.js
│   ├── keywords.controller.js
│   ├── pdf.controller.js
│   ├── mindmap.controller.js
│   ├── exam.controller.js
│   └── tts.controller.js
├── services/                   # Logique métier
│   ├── summary.service.js
│   ├── quiz.service.js
│   ├── keywords.service.js
│   ├── pdf.service.js
│   ├── mindmap.service.js
│   ├── exam.service.js
│   └── tts.service.js
└── utils/                      # Fonctions utilitaires
    ├── ai.util.js
    ├── language.util.js
    └── mindmap.util.js
```

## 🎯 Principe de Séparation

### **index.js**
- **Rôle**: Point d'entrée unique
- **Contenu**: Initialisation Firebase + Exports des fonctions
- **Interdit**: Logique métier, traitement de données

### **controllers/**
- **Rôle**: Gestion des requêtes HTTP
- **Responsabilités**:
  - Validation des requêtes (method, body)
  - Gestion CORS
  - Gestion des erreurs HTTP
  - Appel aux services
  - Formatage des réponses

### **services/**
- **Rôle**: Logique métier pure
- **Responsabilités**:
  - Traitement des données
  - Appels aux APIs externes
  - Transformation des données
  - **Pas de gestion HTTP**

### **utils/**
- **Rôle**: Fonctions utilitaires réutilisables
- **Exemples**:
  - Détection de langue
  - Appels API AI
  - Nettoyage de données
  - Assignation de couleurs

## 📋 Fonctions Disponibles

### Summary
- **Endpoint**: `/generateSummary`
- **Controller**: `summary.controller.js`
- **Service**: `summary.service.js`

### Quiz
- **Endpoint**: `/generateQuiz`
- **Controller**: `quiz.controller.js`
- **Service**: `quiz.service.js`

### Keywords
- **Endpoint**: `/extractKeywords`
- **Controller**: `keywords.controller.js`
- **Service**: `keywords.service.js`

### PDF
- **Endpoint**: `/extractPdfText`
- **Controller**: `pdf.controller.js`
- **Service**: `pdf.service.js`

### MindMap
- **Endpoint**: `/generateMindMap`
- **Controller**: `mindmap.controller.js`
- **Service**: `mindmap.service.js`

### Exam
- **Endpoint**: `/generateExam`
- **Controller**: `exam.controller.js`
- **Service**: `exam.service.js`

### Text-to-Speech
- **Endpoint**: `/textToSpeech`
- **Controller**: `tts.controller.js`
- **Service**: `tts.service.js`

## 🔄 Flux de Données

```
HTTP Request
    ↓
Controller (Validation, CORS)
    ↓
Service (Logique métier)
    ↓
Utils (Fonctions utilitaires)
    ↓
External API / Processing
    ↓
Service (Transformation)
    ↓
Controller (Formatage réponse)
    ↓
HTTP Response
```

## ✅ Bonnes Pratiques

1. **Séparation des responsabilités**
   - Controllers = HTTP
   - Services = Business Logic
   - Utils = Helpers

2. **Réutilisabilité**
   - Utils partagés entre services
   - Services indépendants

3. **Maintenabilité**
   - Un fichier = Une responsabilité
   - Code modulaire et testable

4. **Évolutivité**
   - Facile d'ajouter de nouvelles fonctions
   - Structure claire et organisée

## 🚀 Ajout d'une Nouvelle Fonction

1. Créer le service dans `services/`
2. Créer le controller dans `controllers/`
3. Exporter dans `index.js`

Exemple:
```javascript
// services/newFeature.service.js
async function processNewFeature(data) {
  // Logique métier
}

// controllers/newFeature.controller.js
async function handleNewFeature(req, res) {
  // Gestion HTTP
}

// index.js
const newFeatureController = require("./controllers/newFeature.controller");
exports.newFeature = functions.https.onRequest(newFeatureController.handleNewFeature);
```

