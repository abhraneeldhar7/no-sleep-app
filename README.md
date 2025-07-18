# Lazy Ping
![thumbnail](./public/assets/landingPage-d9ac)
## 🗂️ Description

Lazy Ping is a web application designed to monitor and ping API endpoints at regular intervals. The project aims to provide a simple and efficient way to check the status of multiple endpoints, helping developers and teams ensure their APIs are functioning correctly. This project is ideal for developers, DevOps teams, and anyone responsible for maintaining API endpoints.

## ✨ Key Features

### **Core Features**
- **Endpoint Management**: Add, edit, and delete API endpoints to monitor.
- **Automated Pinging**: Endpoints are pinged at regular intervals to check their status.
- **Status Monitoring**: View the status of each endpoint, including successful pings and failures.
- **Alerts and Notifications**: Receive notifications for endpoint failures or changes in status.

### **User Interface**
- **Dashboard**: A user-friendly dashboard to view and manage all endpoints.
- **Project Management**: Organize endpoints by projects for better management.

## 🗂️ Folder Structure

```mermaid
graph TD;
  src-->app;
  src-->components;
  src-->lib;
  src-->utils;
  app-->api;
  app-->pages;
  components-->endpointDisplay;
  components-->landingpage;
  components-->sessionWrapper;
  lib-->store.ts;
  lib-->types.ts;
  lib-->utils.ts;
```

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3EC7F7?logo=supabase&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white&style=for-the-badge)
![NextAuth](https://img.shields.io/badge/NextAuth-3ECD59?logo=next-auth&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

To run Lazy Ping locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abhraneeldhar7/lazy-ping.git
   ```
2. **Install Dependencies**:
   ```bash
   cd lazy-ping
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Supabase and NextAuth credentials.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## 🤖 GitHub Actions

The project uses a GitHub Actions workflow to ping an endpoint every 10 minutes. This is defined in `.github/workflows/ping.yml`.

```yml
name: Ping Endpoint
on:
  schedule:
    - cron:  */10 * * * *
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Endpoint
        run: curl https://example.com/ping
```

## 📝 Additional Information

- **Supabase Functions**: Server-side functions interacting with the Supabase database are located in `app/actions/supabaseFunctions.ts`.
- **Endpoint Display**: The component for displaying and managing endpoints is in `components/endpointDisplay/endpointDisplay.tsx`.



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/89008279?v=4" width="120" />
<h3>Abhra the Neel</h3>
<p>Full-stack developer with expertise in web, Android, and server-side development. Most projects are private due to being production code.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    