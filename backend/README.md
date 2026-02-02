# 🚀 Role-Based Dashboard - Laravel + React

A modern, full-stack web application featuring role-based authentication and CRUD operations built with Laravel 12 and React.

![Laravel](https://img.shields.io/badge/Laravel-12.49-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with Laravel Sanctum
- **Role-based access control** (Admin & Manager)
- Secure login/logout functionality
- Protected routes and API endpoints

### 👨‍💼 Admin Features
- **Dashboard** - Real-time statistics and analytics
- **Task Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Manager Management** - Add, edit, and remove managers
- **Branch Management** - Manage company branches
- **Dynamic filtering** - Search and filter by status, priority, branch
- **Data visualization** - Charts and progress bars

### 👨‍💻 Manager Features
- **Personal Dashboard** - View assigned tasks and performance
- **Task Status Updates** - Update task progress in real-time
- **Task Filtering** - Search and filter personal tasks
- **Performance Tracking** - View completion rates and statistics

### 🎨 UI/UX
- **Modern responsive design** - Works on desktop, tablet, and mobile
- **Smooth animations** - Polished user experience
- **Real-time updates** - Instant feedback on all actions
- **Clean interface** - Intuitive navigation

## 🛠️ Tech Stack

### Backend
- **Laravel 12.49** - PHP framework
- **MySQL** - Database
- **Laravel Sanctum** - API authentication
- **PHP 8.2+** - Server-side scripting

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Tailwind CSS** - Styling (via custom CSS)
- **Lucide React** - Icon library

## 📁 Project Structure

```
laravel_react_project/
│
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── TaskController.php
│   │   │   │   ├── ManagerController.php
│   │   │   │   ├── BranchController.php
│   │   │   │   └── DashboardController.php
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Task.php
│   │   │   ├── Branch.php
│   │   │   └── Manager.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── config/
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Tasks.jsx
│   │   │   │   ├── Managers.jsx
│   │   │   │   └── Branches.jsx
│   │   │   ├── manager/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Tasks.jsx
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│
├── .gitignore
└── README.md
```

## 🚀 Installation

### Prerequisites
- **PHP** >= 8.2
- **Composer**
- **Node.js** >= 18
- **npm** or **yarn**
- **MySQL** >= 8.0

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mIrfan02/laravel_react_project.git
   cd laravel_react_project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   composer install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Update `.env` file**
   ```env
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password

   SANCTUM_STATEFUL_DOMAINS=localhost:5173
   SESSION_DOMAIN=localhost
   ```

5. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Start backend server**
   ```bash
   php artisan serve
   ```
   Backend runs at: `http://localhost:8000`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Update API endpoint**

   Edit `src/services/api.js`:
   ```javascript
   baseURL: 'http://localhost:8000/api',
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

## ⚙️ Configuration

### Database Schema

The application uses the following tables:

- **users** - Stores admin and manager accounts
- **branches** - Company branch locations
- **tasks** - Task management with status tracking

### Default Credentials

After seeding the database:

**Admin Account:**
```
Email: admin@company.com
Password: password
```

**Manager Accounts:**
```
Email: manager@company.com
Password: password
```

## 💻 Usage

### Running Locally

1. Start backend: `php artisan serve` (Terminal 1)
2. Start frontend: `npm run dev` (Terminal 2)
3. Access: `http://localhost:5173`
4. Login with default credentials

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/login` | User login | No |
| POST | `/api/register` | User registration | No |
| POST | `/api/logout` | User logout | Yes |
| GET | `/api/user` | Get authenticated user | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks/{id}` | Get single task | Yes |
| POST | `/api/tasks` | Create task | Yes (Admin) |
| PUT | `/api/tasks/{id}` | Update task | Yes (Admin) |
| DELETE | `/api/tasks/{id}` | Delete task | Yes (Admin) |
| PATCH | `/api/tasks/{id}/status` | Update status | Yes |
| GET | `/api/my-tasks` | Get user's tasks | Yes (Manager) |

### Manager Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/managers` | Get all managers | Yes (Admin) |
| POST | `/api/managers` | Create manager | Yes (Admin) |
| PUT | `/api/managers/{id}` | Update manager | Yes (Admin) |
| DELETE | `/api/managers/{id}` | Delete manager | Yes (Admin) |

### Branch Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/branches` | Get all branches | Yes (Admin) |
| POST | `/api/branches` | Create branch | Yes (Admin) |
| PUT | `/api/branches/{id}` | Update branch | Yes (Admin) |
| DELETE | `/api/branches/{id}` | Delete branch | Yes (Admin) |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics | Yes |

## 🌐 Deployment

### cPanel Deployment

1. **Upload files:**
   - Frontend `dist/*` → `public_html/`
   - Backend files → `public_html/api/`

2. **Create database** via cPanel MySQL

3. **Update `.env`** with production credentials

4. **Run migrations:**
   ```bash
   php artisan migrate --seed
   ```

5. **Set permissions:**
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

Detailed deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Task Management
![Task Management](screenshots/tasks.png)

### Manager View
![Manager Dashboard](screenshots/manager-dashboard.png)

## 🏗️ Architecture

### API Communication Flow

```
┌─────────────┐          ┌─────────────┐          ┌──────────┐
│   Browser   │          │   Laravel   │          │  MySQL   │
│   (React)   │ ────────▶│     API     │ ────────▶│ Database │
│             │   HTTP   │             │   SQL    │          │
└─────────────┘          └─────────────┘          └──────────┘
      │                         │
      │  1. User Action         │  2. Process Request
      │  (Click button)         │  (Validate, Query DB)
      │                         │
      │  4. Update UI           │  3. Return JSON
      │◀────────────────────────│  (Send response)
```

### Authentication Flow

```
1. User enters credentials
2. React sends POST /api/login
3. Laravel validates credentials
4. Laravel generates Sanctum token
5. React stores token in localStorage
6. React adds token to all future requests
7. Laravel validates token on protected routes
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Irfan**
- GitHub: [@mIrfan02](https://github.com/mIrfan02)

## 🙏 Acknowledgments

- Laravel Team for the amazing framework
- React Team for the powerful UI library
- All contributors and supporters

---

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using Laravel & React
