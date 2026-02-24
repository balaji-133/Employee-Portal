import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AppShell from './components/AppShell';
import Login from './pages/Login';
import List from './pages/List';
import Details from './pages/Details';
import PhotoResult from './pages/PhotoResult';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <AppShell>
                <List />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <AppShell>
                <Details />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/photo-result"
          element={
            <ProtectedRoute>
              <AppShell>
                <PhotoResult />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AppShell>
                <Analytics />
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}