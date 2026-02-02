# Role-Based Dashboard - React + Vite + Tailwind CSS

A modern, beautiful role-based dashboard application with Admin and Manager views.

## Features

### Admin Dashboard
- **Overview Cards**: Total managers, tasks, pending tasks, and overdue tasks with trend indicators
- **Task Management**: Create, view, filter tasks by status, manager, and branch
- **Manager Management**: Add, view, and manage managers
- **Branch Management**: View all company branches with stats
- **Task Status Distribution**: Visual representation of task statuses
- **Top Performers**: Leaderboard of top-performing managers

### Manager Dashboard
- **Performance Cards**: Completed tasks this week, pending, overdue, and total tasks
- **My Tasks**: View and manage assigned tasks
- **Task Details Drawer**: Detailed view of each task with ability to update status
- **Progress Tracking**: Visual progress bars showing task completion

### Design Features
- Clean, modern UI with soft shadows and rounded corners
- Gradient backgrounds and hover effects
- Responsive layout (mobile, tablet, desktop)
- Consistent color scheme and typography
- Smooth transitions and animations
- Premium look and feel

## Tech Stack

- **React 18**: UI library
- **Vite**: Build tool
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## Installation

1. **Extract the project**
   ```bash
   unzip role-dashboard.zip
   cd role-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## Usage

### Login
- Enter any email and password to login (authentication is simulated)
- You'll be redirected to the Admin Dashboard

### Role Switching
- Use the **"Switch to Manager"** button in the sidebar to toggle between Admin and Manager views
- The button changes based on your current role

### Admin Functions
1. **Dashboard**: View overview statistics and recent tasks
2. **Tasks**: Create new tasks, filter by status/manager/branch, view all tasks
3. **Managers**: Add new managers, view manager list with stats
4. **Branches**: View all company branches with manager and task counts

### Manager Functions
1. **Dashboard**: View personal performance metrics and recent assigned tasks
2. **My Tasks**: View all assigned tasks, filter by status, click to view details
3. **Task Details**: Click any task to open the detail drawer and update status

## Project Structure

```
role-dashboard/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with sidebar and navbar
│   ├── data/
│   │   └── dummyData.js        # Dummy JSON data for demo
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx   # Admin dashboard
│   │   │   ├── Tasks.jsx       # Admin tasks page
│   │   │   ├── Managers.jsx    # Managers management
│   │   │   └── Branches.jsx    # Branches page
│   │   └── manager/
│   │       ├── Dashboard.jsx   # Manager dashboard
│   │       └── Tasks.jsx       # Manager tasks page
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # App entry point
│   └── index.css               # Tailwind CSS and custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Features Detail

### Dummy Data
The application uses static JSON data located in `src/data/dummyData.js`:
- 5 Managers
- 12 Tasks
- 4 Branches
- No backend required

### Responsive Design
- Mobile-first approach
- Sidebar collapses on mobile
- Tables scroll horizontally on small screens
- Cards stack vertically on mobile

### Color Scheme
- Primary: Blue gradient (#0ea5e9 to #0369a1)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Background: Light gray (#f9fafb)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Customization

### Change Colors
Edit `tailwind.config.js` to customize the primary color scheme.

### Add More Data
Edit `src/data/dummyData.js` to add more managers, tasks, or branches.

### Modify Layouts
Component files are well-structured and commented for easy modifications.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use for personal or commercial projects.
