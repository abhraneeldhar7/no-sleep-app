# Lazy Ping: Endpoint Monitoring Made Easy 🚀
![thumbnail](./public/assets/landingPage-d9ac)

## 🗂️ Description

Lazy Ping is a web application designed to simplify endpoint monitoring and management. It allows users to create projects, add endpoints, and ping them at regular intervals to ensure they are functioning correctly. The application provides a user-friendly interface for managing projects and endpoints, as well as features like authentication and role-based access control.

## ✨ Key Features

### **Core Features**

* **Project Management**: Create and manage projects with multiple endpoints
* **Endpoint Management**: Add, edit, and delete endpoints for each project
* **Ping Endpoints**: Ping endpoints at regular intervals to ensure they are functioning correctly
* **API Logs**: View logs of API responses for each endpoint

### **Authentication and Authorization**

* **Google Authentication**: Authenticate users with Google
* **Role-Based Access Control**: Control access to projects and endpoints based on user roles

## 🗂️ Folder Structure

```mermaid
graph TD;
src-->app;
src-->components;
src-->lib;
src-->utils;
app-->api;
app-->dashboard;
app-->layout;
components-->endpointDisplay;
components-->landingpage;
components-->sessionWrapper;
lib-->store;
lib-->types;
lib-->utils;
```

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-4ea94b?logo=supabase&logoColor=white&style=for-the-badge)
![NextAuth](https://img.shields.io/badge/NextAuth-000?logo=next-auth&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

To run the project locally, follow these steps:

* Clone the repository: `git clone https://github.com/abhraneeldhar7/lazy-ping.git`
* Install dependencies: `npm install` or `yarn install`
* Start the development server: `npm run dev` or `yarn dev`

## 🤖 GitHub Actions

The project uses a GitHub Actions workflow to ping endpoints every 10 minutes. The workflow is defined in `.github/workflows/ping.yml`.

## 📝 Configuration

The project uses several configuration files, including:

* `next.config.ts`: Configures Next.js
* `postcss.config.mjs`: Configures PostCSS
* `.eslintrc.json`: Configures ESLint
* `tsconfig.json`: Configures TypeScript

## 📊 Supabase

The project uses Supabase as its backend. The Supabase client instance is created in `utils/supabase/client.ts`. The project uses several Supabase functions to interact with the database, including functions for user management, project management, and endpoint management. These functions are defined in `app/actions/supabaseFunctions.ts`.



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/89008279?v=4" width="120" />
<h3>Abhra the Neel</h3>
<p>Full-stack developer with expertise in web, Android, and server-side development, currently working on private projects.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    