# DailyWrite ✍️

DailyWrite is a modern, full-featured blogging platform built with React 19 and Vite. It offers a seamless experience for readers and writers alike, featuring a clean UI, internationalization support, and integrated AI assistance.

## 🚀 Key Features

- **Authentication System**: Secure login and registration with email/password and Google OAuth via Firebase.
- **Dynamic Blogging**: Create, edit, and manage blog posts with a rich text editor (Quill).
- **Interactive Comments**: Engage with other writers through a dedicated comment section.
- **AI Chatbot Helper**: Integrated AI assistant to help writers brainstorm and refine their content.
- **Multi-language Support**: Full internationalization (i18n) support for English and Khmer.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and Flowbite React.
- **Profile Management**: Personalized user profiles to showcase your work.
- **Draft Workflow**: Save your progress and publish when you're ready.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite 7](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Flowbite React](https://flowbite-react.com/), [MUI](https://mui.com/)
- **Backend/Services**: [Firebase](https://firebase.google.com/) (Auth & Analytics)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Editor**: [Quill](https://quilljs.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [Iconify](https://iconify.design/)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd daily-write
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🔐 Environment Configuration

Create a `.env` file in the root directory and add the following configuration. Replace the placeholder values with your actual API keys where necessary.

```env
# API Base URL
VITE_BASE_URL=https://blog-api.bykh.org/api/v100

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyAZ1OC2pY6arR5KMH__uC79I3OybTHzMnA
VITE_FIREBASE_AUTH_DOMAIN=react-js-ed3c0.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=react-js-ed3c0
VITE_FIREBASE_STORAGE_BUCKET=react-js-ed3c0.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=563623102624
VITE_FIREBASE_APP_ID=1:563623102624:web:a19576c96f608f673ea1c5
VITE_FIREBASE_MEASUREMENT_ID=G-ZZNGHV4QSJ

# AI Service Keys
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## 🏃 Running the Application

### Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
This will generate a `dist` folder ready for deployment.

### Preview Build
```bash
npm run preview
```



## 🚀 Deployment

The application is deployed and live at: **[https://daily-write.vercel.app/](https://daily-write.vercel.app/)**

## 📁 Project Structure

```text
src/
├── app/             # Redux store, base API, and Firebase config
├── assets/          # Images, icons, and static assets
├── components/      # Reusable UI components (Buttons, Cards, etc.)
├── i18n/            # Internationalization (English/Khmer)
├── pages/           # Page-level components and routes
├── utils/           # Helper functions and utilities
└── main.jsx         # Application entry point
```


