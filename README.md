# 🚀 Employee Portal

A modern, full-screen employee management portal built with React, featuring multi-role authentication, interactive data visualization, real-time camera capture, and geolocation mapping. Designed with a professional Microsoft-inspired UI and smooth GSAP animations.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.1-38B2AC?logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?logo=greensock)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 Multi-Role Authentication
- **Three Login Roles**: Employee, HR, and Director with unique access levels
- **Google Sign-In Integration**: Mock OAuth flow for modern authentication
- **Forgot Password Flow**: Password recovery action with smooth UX
- **GSAP Animations**: Staggered entrance effects on login page
- **Secure Credentials**: `username: test`, `password: 123456`

### 📊 Dashboard & Analytics
- **Employee Portal Dashboard**: Search, filter by location/role/photo status
- **Interactive Charts**: Salary flow (Bar Chart) and role distribution (Pie Chart)
- **Talent Intelligence**: Top salary analytics with trend visualization using Recharts
- **Real-time Statistics**: Live count of candidates, unique cities, and average salary
- **Professional Imagery**: Curated Unsplash photos for modern aesthetics

### 👤 360° Employee Profiles
- **4-Section Profile View**:
  - **Info Grid**: Name, role, location, salary, and photo verification status
  - **Progress Flowchart**: Dynamic line chart showing recruitment pipeline metrics
  - **Camera Capture**: Live webcam integration with instant photo upload
  - **Interactive Map**: Leaflet map with city markers and geolocation display

### 🎨 Design & UX
- **Full-Screen Layout**: Microsoft portal-inspired responsive shell
- **Corporate Color Palette**: Blue/slate theme (`#0a4abf` brand, `#0b3a75` nav)
- **Mobile-First Responsive**: Adaptive navigation (sidebar on desktop, top nav on mobile)
- **Smooth Animations**: GSAP card interactions + Framer Motion page transitions
- **Custom Tailwind Utilities**: Reusable portal components (card, panel, field, badges)

### 🔧 Technical Highlights
- **React 19.2**: Latest features with hooks (useState, useContext, useEffect, useRef, useMemo)
- **Protected Routes**: Authentication guards with context-based state management
- **Optimized Bundle**: 1.05 MB (332.89 kB gzipped) after Three.js removal
- **API Integration**: Axios-based backend communication with PHP API
- **Context API**: Global state for user, role, photos, and captured images

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - Component-based UI library
- **Vite 7.3.1** - Lightning-fast build tool with HMR
- **React Router DOM 7.13.1** - Client-side routing

### Styling & Animation
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **GSAP 3.14.2** - Professional animation library
- **Framer Motion 12.34.3** - React animation library

### Data Visualization
- **Recharts 3.7.0** - Composable charting library
- **Leaflet 1.9.4** - Interactive map integration
- **React Leaflet 5.0.0** - React components for Leaflet

### Utilities
- **Axios 1.13.5** - HTTP client for API calls
- **Lucide React 0.575.0** - Modern icon library (1000+ icons)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with camera access (for photo capture feature)

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd assignment-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run on `http://localhost:5173`

## 🎯 Usage

### Login
1. Navigate to the login page
2. Select role: **Employee** / **HR** / **Director**
3. Enter credentials: `username: test`, `password: 123456`
4. Or use "Continue with Google" for mock OAuth flow

### Dashboard
- **Search**: Type name, role, or location in the search bar
- **Filter**: Use dropdowns for location, role, and photo verification status
- **View Profile**: Click any employee card to open 360° profile view

### Profile Management
- **Capture Photo**: Click "Start Camera" → "Capture" to take live photo
- **Upload Photo**: Use "Upload Photo" to select image from device
- **View Map**: See employee location on interactive Leaflet map
- **Check Progress**: Review recruitment progress flowchart

### Analytics
- Navigate to "Analytics" to view:
  - Top 10 salary earners (Bar Chart)
  - Salary trend analysis (Area Chart)
  - Statistical insights

## 📂 Project Structure

```
assignment-app/
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── AppShell.jsx     # Main layout shell (sidebar + nav)
│   │   └── ProtectedRoute.jsx # Route authentication guard
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── pages/
│   │   ├── Login.jsx        # Multi-role login with GSAP
│   │   ├── List.jsx         # Employee dashboard with filters
│   │   ├── Details.jsx      # 360° profile with camera/map
│   │   ├── PhotoResult.jsx  # Captured photo verification
│   │   └── Analytics.jsx    # Talent intelligence charts
│   ├── App.jsx              # Route configuration
│   ├── main.jsx             # React entry point
│   └── index.css            # Custom Tailwind theme
├── public/                  # Public assets
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── README.md               # Project documentation
```

## 🔑 Environment Variables

No environment variables required. API endpoint is hardcoded:
```javascript
https://backend.jotish.in/backend_dev/gettabledata.php
```

## 🚧 Roadmap

- [ ] Role-based routing guards (HR/Director-only analytics)
- [ ] TypeScript migration for type safety
- [ ] Dark mode toggle with theme persistence
- [ ] Export employee data to CSV/PDF
- [ ] Advanced search with autocomplete
- [ ] Real OAuth integration (Google/Microsoft)
- [ ] Backend API with authentication tokens
- [ ] Unit tests with Jest + React Testing Library

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Balaji**  
GitHub: [@balaji-133](https://github.com/balaji-133)

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GSAP](https://greensock.com/gsap/) - Animations
- [Recharts](https://recharts.org/) - Data visualization
- [Leaflet](https://leafletjs.com/) - Maps
- [Unsplash](https://unsplash.com/) - Professional imagery

---

⭐ **Star this repo if you found it helpful!**
