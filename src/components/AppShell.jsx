import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LayoutGrid, BarChart3, Camera, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/list', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/photo-result', icon: Camera, label: 'Photo' }
];

export default function AppShell({ children }) {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="app-wrap">
      <div className="shell">
        <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center bg-[#0b3a75] px-3 sm:hidden">
          <nav className="flex w-full items-center gap-2 overflow-x-auto">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={`mobile-${to}`}
                to={to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive ? 'bg-white text-[#0b3a75]' : 'text-blue-100 hover:bg-white/15'
                  }`
                }
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
            <button type="button" className="ml-auto shrink-0 rounded-lg px-2 py-1.5 text-xs font-semibold text-blue-100 hover:bg-white/15" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </header>

        <motion.aside
          initial={{ x: -18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="hidden w-64 flex-col bg-[#0b3a75] p-4 text-blue-100 sm:flex"
        >
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="pulse-glow flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#0b3a75]">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-blue-100/70">Logged in as</p>
              <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
              <p className="text-[11px] capitalize text-blue-100/80">{user?.role || 'employee'}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-white text-[#0b3a75] shadow-lg shadow-black/20' : 'text-blue-100 hover:bg-white/10'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-5 rounded-xl border border-white/20 bg-white/10 p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-blue-100/80">Daily Flow</p>
            <div className="flex items-end gap-1.5">
              {[34, 58, 44, 72, 52, 66, 48].map((height, index) => (
                <div
                  key={index}
                  className="w-3 rounded-sm bg-cyan-300/85"
                  style={{ height: `${height * 0.55}px` }}
                />
              ))}
            </div>
          </div>

          <button type="button" className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-blue-50 transition hover:bg-white/20" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="min-w-0 flex-1 overflow-hidden bg-[#f4f8fd] p-3 pt-16 sm:p-6 sm:pt-6"
        >
          {children}
        </motion.section>
      </div>
    </div>
  );
}