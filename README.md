# Lazy Ping: A Simple Pinging Service 🤖
![thumbnail](./public/assets/landingPage-66af095e-8aa5-4819-b260-60cb09f70b79)

## 🗂️ Description

Lazy Ping is a simple web application that provides a pinging service. It allows users to create projects, add endpoints, and ping them to test their availability. The application uses Next.js, Supabase, and NextAuth for authentication and authorization.

The project aims to provide a straightforward and easy-to-use pinging service for developers and system administrators.

## ✨ Key Features

### **Core Features**

* **Project Management**: Create and manage projects with multiple endpoints.
* **Endpoint Management**: Add, edit, and delete endpoints for each project.
* **Pinging Service**: Ping endpoints to test their availability.
* **Authentication and Authorization**: Secure authentication and authorization using NextAuth and Supabase.

### **UI Features**

* **Dashboard**: A user-friendly dashboard to manage projects and endpoints.
* **Tabbed Interface**: A tabbed interface to display projects, create new projects, and view API endpoints.

## 🗂️ Folder Structure

```mermaid
graph TD;
  src-->app;
  src-->components;
  src-->lib;
  app-->api;
  app-->dashboard;
  app-->layout;
  components-->endpointDisplay;
  components-->landingpage;
  components-->sessionWrapper;
  lib-->store;
  lib-->utils;
```

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ec7a2?logo=supabase&logoColor=white&style=for-the-badge)
![NextAuth](https://img.shields.io/badge/NextAuth-000?logo=next-auth&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

To run the project locally, follow these steps:

* Git clone the repository: `https://github.com/abhraneeldhar7/lazy-ping.git`
* Install dependencies: `npm install`
* Start the development server: `npm run dev`
* Open your browser and navigate to `http://localhost:3000`

## 🤖 API Endpoints

The application provides several API endpoints for pinging and managing projects and endpoints.

* **Ping Endpoint**: `/api/ping`
* **Project Endpoints**: `/api/projects`

## 📝 State Management

The application uses Zustand for state management.

* **Store**: `lib/store.ts`

## 🔒 Authentication and Authorization

The application uses NextAuth for authentication and authorization.

* **NextAuth Configuration**: `app/api/auth/[...nextauth]/options.ts`

## 🚀 Deployment

The application is deployed using GitHub Actions.

* **GitHub Actions Workflow**: `.github/workflows/ping.yml`



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/89008279?v=4" width="120" />
<h3>Abhra the Neel</h3>
<p>Full-stack developer with expertise in web, Android, and server-side development. Most projects are private due to their production nature.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    