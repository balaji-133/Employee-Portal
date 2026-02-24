import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { UserRound, ShieldCheck, Crown, KeyRound } from 'lucide-react';

const roleOptions = [
  { key: 'employee', label: 'Employee', icon: UserRound },
  { key: 'hr', label: 'HR', icon: ShieldCheck },
  { key: 'director', label: 'Director', icon: Crown }
];

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('employee');
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.login-card',
        { y: 36, opacity: 0, rotateX: -8 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out' }
      );
      gsap.fromTo('.login-role-switch', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' });
      gsap.fromTo('.login-badge', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.27, ease: 'back.out(1.8)' });
      gsap.fromTo('.login-field', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, delay: 0.35, ease: 'power2.out' });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "test" && form.password === "123456") {
      setUser({ name: 'test', role: selectedRole });
      navigate('/list');
    } else { alert("Try test / 123456"); }
  };

  const handleGoogleLogin = () => {
    const roleName = roleOptions.find((role) => role.key === selectedRole)?.label || 'Employee';
    setUser({ name: `${roleName} User`, role: selectedRole, provider: 'google' });
    navigate('/list');
  };

  const roleLabel = roleOptions.find((role) => role.key === selectedRole)?.label || 'Employee';
  const RoleIcon = roleOptions.find((role) => role.key === selectedRole)?.icon || UserRound;

  return (
    <div className="app-wrap flex items-center justify-center">
      <motion.div 
        ref={cardRef}
        initial={{ y: 30, opacity: 0, scale: 0.98 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="login-card card w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <div className="login-role-switch mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <div className="grid grid-cols-3 gap-1">
            {roleOptions.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedRole(key)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition ${
                  selectedRole === key ? 'bg-[#0b3a75] text-white' : 'text-slate-600 hover:bg-white'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ rotate: -8, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="login-badge mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0b3a75] text-white shadow-lg shadow-blue-200"
        >
          <RoleIcon size={26} />
        </motion.div>
        <h2 className="aurora-text text-center text-3xl font-extrabold">{roleLabel} Sign In</h2>
        <p className="mb-7 mt-2 text-center text-slate-500">Access your secure Employee Portal workspace</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input 
            type="text" placeholder="Username" required
            className="login-field field"
            onChange={e => setForm({...form, username: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="login-field field"
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
            className="login-field primary-btn mt-3 w-full py-3.5"
          >
            Login
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="login-field ghost-btn w-full gap-2 py-3.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.5 3.6-5.5 3.6-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.6l2.7-2.7C16.8 2.5 14.6 1.6 12 1.6 6.9 1.6 2.8 5.9 2.8 11.2S6.9 20.8 12 20.8c6.9 0 9.1-4.8 9.1-7.3 0-.5 0-.8-.1-1.2H12z"/>
            </svg>
            Continue with Google
          </motion.button>
        </form>

        <button
          type="button"
          onClick={() => alert('Please contact system administrator to reset password.')}
          className="mt-4 inline-flex w-full items-center justify-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-600"
        >
          <KeyRound size={14} /> Forgot password?
        </button>

        <p className="mt-5 text-center text-xs text-slate-500">Demo credentials: test / 123456</p>
      </motion.div>
    </div>
  );
}