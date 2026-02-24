import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { TrendingUp, Coins, Users } from 'lucide-react';

export default function Analytics() {
  const { apiData } = useContext(AppContext);

  const salaryValues = apiData.map((employee) => parseInt(employee[5].replace(/[$,]/g, ''))).filter((value) => !Number.isNaN(value));
  const topSalaries = [...apiData]
    .slice(0, 10)
    .map((employee, index) => {
      const salary = parseInt(employee[5].replace(/[$,]/g, ''));
      return {
        label: employee[0].split(' ')[0],
        value: Number.isNaN(salary) ? 0 : salary,
        valueLabel: employee[5],
        color: index % 2 === 0 ? '#b45309' : '#0f766e'
      };
    });

  const trendData = topSalaries.map((entry, index) => ({
    step: index + 1,
    salary: entry.value,
    baseline: Math.round(entry.value * 0.84)
  }));

  const averageSalary = salaryValues.length
    ? Math.round(salaryValues.reduce((sum, value) => sum + value, 0) / salaryValues.length)
    : 0;
  const highestSalary = salaryValues.length ? Math.max(...salaryValues) : 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto fade-in">
      <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="page-title">Talent Intelligence</h2>
        <p className="page-subtitle">Optimized salary analytics with clean interactive charts.</p>
      </motion.header>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="card flex items-center gap-3 rounded-xl p-4">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-700"><Coins size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Average Salary</p>
            <p className="text-base font-bold text-slate-900">${averageSalary.toLocaleString()}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 rounded-xl p-4">
          <div className="rounded-lg bg-teal-100 p-2 text-teal-700"><TrendingUp size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Highest Salary</p>
            <p className="text-base font-bold text-slate-900">${highestSalary.toLocaleString()}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 rounded-xl p-4">
          <div className="rounded-lg bg-cyan-100 p-2 text-cyan-700"><Users size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Profiles Compared</p>
            <p className="text-base font-bold text-slate-900">{topSalaries.length}</p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="card min-h-[420px] rounded-2xl p-4 sm:p-5 lg:col-span-2">
          <p className="mb-2 text-sm font-semibold text-slate-800">Top Salary Distribution</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSalaries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Bar dataKey="value" fill="#0a4abf" radius={[7, 7, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }} className="card min-h-[420px] rounded-2xl p-4 sm:p-5">
          <p className="mb-2 text-sm font-semibold text-slate-800">Salary Trend Flow</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="trendSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a4abf" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0a4abf" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="step" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Area type="monotone" dataKey="baseline" stroke="#06b6d4" fillOpacity={0} />
              <Area type="monotone" dataKey="salary" stroke="#0a4abf" fill="url(#trendSalary)" strokeWidth={2.6} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {topSalaries.slice(0, 5).map((entry) => (
          <div key={entry.label} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center">
            <p className="truncate text-xs font-semibold text-slate-800">{entry.label}</p>
            <p className="text-[11px] text-slate-500">{entry.valueLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}