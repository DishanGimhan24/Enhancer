# Enhancer
To create a simple web application that allows users to manage a list of books. Users should be  able to add, view, update, and delete books. The application will use Angular for the frontend  and ASP.NET with C# for the backend.

# 📚 Library Management CRUD App (Angular + ASP.NET Core)

This is a simple full-stack Library Management CRUD application using:

* **Frontend:** Angular 17
* **Backend:** ASP.NET Core Web API (.NET 9)
* **Database:** SQL Server (with Entity Framework Core)

This README is beginner-friendly and explains how to set up everything **step-by-step**.

---

## 📁 Project Structure

```
API/         --> ASP.NET Core Web API backend
FE/     --> Angular frontend app
```

---

## 🛠️ Prerequisites

### Backend:

* [.NET 9 SDK](https://dotnet.microsoft.com/download)
* [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or any SQL Server
* Any IDE (e.g., Visual Studio 2022 or Visual Studio Code)

### Frontend:

* [Node.js (v18+)](https://nodejs.org/)
* Angular CLI: Install via `npm install -g @angular/cli`

---

## 🧰 Installation & Setup

### 📦 Backend Setup (ASP.NET Core)

1. **Create API Project**

   ```bash
   mkdir LibraryManagementApi
   cd LibraryManagementApi
   dotnet new webapi -n LibraryManagementApi
   cd LibraryManagementApi
   ```

2. **Install Required Packages**

   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   ```

3. **Run EF Core Migrations**

   ```bash
   dotnet tool install --global dotnet-ef
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the API**

   ```bash
   dotnet run
   ```

   API runs at `http://localhost:5025`

---

### 🌍 Frontend Setup (Angular)

1. **Create Angular App**

   ```bash
   ng new FE --standalone --routing --style=scss
   cd FE
   ```

2. **Run Angular App**

   ```bash
   ng serve
   ```

   App runs at `http://localhost:4200`

---

Happy coding! 🚀
