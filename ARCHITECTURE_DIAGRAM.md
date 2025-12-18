# Diagramme d'Architecture - EduGo

## 📊 Structure Hiérarchique

```
EduGo Application
│
├── 🎯 Entry Point
│   └── main.dart
│       ├── Firebase Initialization
│       ├── ProviderScope (Riverpod)
│       └── EduGoApp (MaterialApp.router)
│
├── 🏛️ CORE (Infrastructure Partagée)
│   │
│   ├── 📦 Models
│   │   ├── summary.dart
│   │   ├── quiz.dart
│   │   ├── exam.dart
│   │   ├── mindmap.dart
│   │   └── quiz_score.dart
│   │
│   ├── 🧭 Router
│   │   └── app_router.dart (GoRouter + Auth Guards)
│   │
│   ├── 🎨 Theme
│   │   └── app_theme.dart (Light/Dark)
│   │
│   ├── 🌐 Localization
│   │   └── app_localizations.dart (FR/EN)
│   │
│   └── 🧩 Widgets
│       ├── adaptive_layout.dart
│       ├── custom_text_field.dart
│       └── loading_overlay.dart
│
├── 🎯 FEATURES (Modules Fonctionnels)
│   │
│   ├── 🔐 Auth
│   │   ├── presentation/
│   │   │   ├── screens/ (Login, Register)
│   │   │   └── providers/
│   │   └── providers/ (auth_providers.dart)
│   │
│   ├── 📊 Dashboard
│   │   └── presentation/
│   │       ├── screens/ (dashboard_screen.dart)
│   │       └── widgets/ (stats, recent summaries/quizzes)
│   │
│   ├── 📝 Summary
│   │   └── presentation/
│   │       ├── providers/ (summary_providers.dart)
│   │       ├── screens/ (summary_screen.dart)
│   │       └── widgets/ (actions, content)
│   │
│   ├── ❓ Quiz
│   │   └── presentation/
│   │       ├── providers/ (quiz_providers.dart)
│   │       └── screens/ (quiz_screen, result_screen)
│   │
│   ├── 📄 Exam Generator
│   │   └── presentation/
│   │       ├── providers/ (exam_providers.dart)
│   │       ├── screens/ (generator, details)
│   │       └── widgets/ (exam_preview.dart)
│   │
│   ├── 🗺️ MindMap
│   │   └── presentation/
│   │       ├── providers/ (mindmap_providers.dart)
│   │       ├── screens/ (mindmap_screen.dart)
│   │       └── widgets/ (mindmap_view.dart)
│   │
│   ├── 📤 PDF Upload
│   │   └── presentation/
│   │       ├── providers/ (pdf_upload_providers.dart)
│   │       └── screens/ (pdf_upload_screen.dart)
│   │
│   ├── ✍️ Course Input
│   │   └── presentation/
│   │       ├── providers/ (course_input_providers.dart)
│   │       └── screens/ (course_input_screen.dart)
│   │
│   ├── 📜 History
│   │   └── presentation/
│   │       └── screens/ (history_screen.dart)
│   │
│   ├── 👤 Profile
│   │   └── presentation/
│   │       └── screens/ (profile_screen.dart)
│   │
│   └── 💾 Saved
│       └── presentation/
│           └── screens/ (saved_summaries_screen.dart)
│
└── 🔧 SERVICES (Couche Métier)
    │
    ├── 🤖 AiService
    │   ├── generateSummary()
    │   ├── generateQuiz()
    │   ├── generateExam()
    │   ├── generateMindMap()
    │   ├── extractKeywords()
    │   └── extractTextFromPdf()
    │
    ├── 🔥 FirebaseService
    │   ├── Auth (signIn, signUp, signOut)
    │   ├── Firestore (CRUD operations)
    │   └── Storage (upload images)
    │
    ├── 💾 LocalDatabaseService
    │   ├── SQLite Database
    │   ├── saveSummary()
    │   └── saveQuiz()
    │
    └── 🔊 TTSService
        ├── speak()
        ├── stop()
        └── downloadAudio()
```

---

## 🔄 Flux de Données

```
┌─────────────┐
│   USER      │
│  (Action)   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   SCREEN        │ ◄─── Riverpod Provider
│  (UI Widget)    │      (State Management)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   CONTROLLER    │ ◄─── Business Logic
│  (Provider)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│    SERVICE      │ ◄─── API Calls / Database
│  (Ai/Firebase)  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   BACKEND       │
│  (Firebase/API) │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│   RESPONSE      │
│  (Data/Error)   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  STATE UPDATE   │
│  (Riverpod)     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   UI REBUILD    │
│  (Reactive)     │
└─────────────────┘
```

---

## 🗺️ Navigation Flow

```
                    ┌─────────────┐
                    │   /login    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  /register  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  /dashboard │ ◄─── Hub Principal
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│/course-input │   │ /pdf-upload  │   │/exam-generator│
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └──────────┬───────┴──────────────────┘
                  │
        ┌─────────▼─────────┐
        │   /summary/:id    │
        └─────────┬─────────┘
                  │
        ┌─────────▼─────────┐
        │    /quiz/:id      │
        └─────────┬─────────┘
                  │
        ┌─────────▼─────────┐
        │/quiz-result/:id   │
        └───────────────────┘
```

---

## 🔐 Authentification Flow

```
┌──────────────┐
│ Login Screen │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Firebase Auth    │
│ (Email/Password) │
└──────┬───────────┘
       │
   ┌───┴───┐
   │       │
   ▼       ▼
Success  Error
   │       │
   ▼       ▼
┌──────────────┐
│ Create User  │
│ Profile in   │
│ Firestore    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Update Auth  │
│ State (Riverpod)│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ GoRouter     │
│ Redirect to  │
│ /dashboard   │
└──────────────┘
```

---

## 💾 Data Flow (Summary Example)

```
User Input (Text/PDF)
        │
        ▼
┌───────────────┐
│ PDF Upload    │
│ Screen        │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ PdfUpload     │
│ Controller    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ AiService     │
│ extractText() │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Firebase      │
│ Cloud Function│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ AiService     │
│ generateSummary()│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Firebase      │
│ Firestore     │
│ (Save Summary)│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ LocalDatabase │
│ (Offline Save)│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ State Update  │
│ (Riverpod)    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Summary Screen│
│ (Display)     │
└───────────────┘
```

---

## 🎯 Couches d'Architecture

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  (Screens, Widgets, UI Components)     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         STATE MANAGEMENT                │
│  (Riverpod Providers, Controllers)     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         BUSINESS LOGIC                 │
│  (Services: AI, Firebase, Local DB)    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         DATA LAYER                      │
│  (Firestore, SQLite, APIs)             │
└─────────────────────────────────────────┘
```

---

## 📦 Dépendances Externes

```
EduGo App
    │
    ├── Firebase
    │   ├── Auth
    │   ├── Firestore
    │   ├── Storage
    │   └── Cloud Functions
    │
    ├── Groq AI API
    │   └── (via Cloud Functions)
    │
    ├── Web Speech API
    │   └── (Text-to-Speech)
    │
    └── SQLite
        └── (Local Storage)
```

---

*Diagrammes créés pour visualiser l'architecture EduGo*

