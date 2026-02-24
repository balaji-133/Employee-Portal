import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, MapPin, BriefcaseBusiness, UserRound, Search, SlidersHorizontal } from 'lucide-react';
import gsap from 'gsap';

export default function List() {
  const { apiData, setApiData, profilePhotos } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [photoFilter, setPhotoFilter] = useState('all');

  useEffect(() => {
    axios.post('https://backend.jotish.in/backend_dev/gettabledata.php', { username: "test", password: "123456" })
      .then(res => setApiData(res.data.TABLE_DATA.data))
      .finally(() => setIsLoading(false));
  }, [setApiData]);

  const chartData = apiData.slice(0, 8).map((entry, index) => ({
    name: `#${index + 1}`,
    val: parseInt(entry[5].replace(/[$,]/g, ''))
  }));

  const roleChartData = [...new Set(apiData.map((employee) => employee[1]))]
    .slice(0, 5)
    .map((role) => ({
      role,
      count: apiData.filter((employee) => employee[1] === role).length
    }));

  const miniSalaryData = apiData.slice(0, 6).map((employee) => ({
    name: employee[0].split(' ')[0],
    salary: parseInt(employee[5].replace(/[$,]/g, ''))
  }));

  const uniqueCities = new Set(apiData.map((employee) => employee[2])).size;
  const allLocations = [...new Set(apiData.map((employee) => employee[2]))];
  const allRoles = [...new Set(apiData.map((employee) => employee[1]))];

  const filteredCandidates = apiData
    .map((employee, index) => ({ employee, index }))
    .filter(({ employee, index }) => {
      const name = employee[0].toLowerCase();
      const role = employee[1];
      const location = employee[2];
      const hasPhoto = Boolean(profilePhotos[index]);

      const queryMatch =
        query.trim().length === 0 ||
        name.includes(query.toLowerCase()) ||
        role.toLowerCase().includes(query.toLowerCase()) ||
        location.toLowerCase().includes(query.toLowerCase());

      const locationMatch = selectedLocation === 'all' || location === selectedLocation;
      const roleMatch = selectedRole === 'all' || role === selectedRole;
      const photoMatch = photoFilter === 'all' || (photoFilter === 'with-photo' ? hasPhoto : !hasPhoto);

      return queryMatch && locationMatch && roleMatch && photoMatch;
    });

  const handleCardClick = (event, index) => {
    const card = event.currentTarget;
    gsap.timeline({ defaults: { ease: 'power2.out' } })
      .to(card, { scale: 0.97, duration: 0.12 })
      .to(card, { scale: 1.04, y: -8, duration: 0.18 })
      .to(card, {
        scale: 1,
        y: 0,
        duration: 0.16,
        onComplete: () => navigate(`/details/${index}`)
      });
  };

  return (
    <div className="h-full overflow-y-auto fade-in">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-5"
      >
        <div>
          <h1 className="page-title">Employee Portal</h1>
          <p className="page-subtitle">Modern workforce workspace with search, filtering and verification flows.</p>
        </div>
      </motion.header>

      <section className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="card relative overflow-hidden p-0 lg:col-span-2">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
            alt="Modern office"
            className="h-40 w-full object-cover sm:h-52"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3a75]/85 via-[#0b3a75]/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5 text-white sm:p-6">
            <p className="text-xs uppercase tracking-wider text-blue-100/80">Enterprise Workspace</p>
            <h3 className="mt-1 text-xl font-semibold sm:text-2xl">Employee Portal experience</h3>
            <p className="mt-1 max-w-xl text-sm text-blue-100/90">Full-screen adaptive layout, focused navigation, and candidate management in one place.</p>
          </div>
        </article>

        <article className="card flex flex-col justify-between bg-gradient-to-br from-white to-blue-50 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Professional</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">Hiring pipeline status</h3>
            <p className="mt-1 text-sm text-slate-600">Candidate data and profile verification from one dashboard.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
            alt="Team discussion"
            className="mt-3 h-24 w-full rounded-xl object-cover"
          />
        </article>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card mb-5 rounded-2xl p-4"
      >
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <SlidersHorizontal size={16} /> Candidate Search & Filters
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="relative xl:col-span-2">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="field pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, role, or location"
            />
          </label>

          <select className="field" value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
            <option value="all">All Locations</option>
            {allLocations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select className="field" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
            <option value="all">All Roles</option>
            {allRoles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select className="field" value={photoFilter} onChange={(event) => setPhotoFilter(event.target.value)}>
            <option value="all">All Profiles</option>
            <option value="with-photo">With Photo</option>
            <option value="without-photo">Without Photo</option>
          </select>
        </div>

        <p className="mt-3 text-xs text-slate-600">Showing <span className="font-semibold text-slate-800">{filteredCandidates.length}</span> candidates</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="top-stat flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-700"><Users size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Employees</p>
            <p className="text-xl font-bold text-slate-900">{apiData.length}</p>
          </div>
        </div>
        <div className="top-stat flex items-center gap-3">
          <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700"><MapPin size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Locations</p>
            <p className="text-xl font-bold text-slate-900">{uniqueCities}</p>
          </div>
        </div>
        <div className="top-stat flex items-center gap-3">
          <div className="rounded-xl bg-teal-100 p-2 text-teal-700"><BriefcaseBusiness size={18} /></div>
          <div>
            <p className="text-xs text-slate-500">Active Roles</p>
            <p className="text-xl font-bold text-slate-900">{new Set(apiData.map((employee) => employee[1])).size}</p>
          </div>
        </div>
      </motion.section>

      <section className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="card h-[280px] p-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Salary Flow</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={miniSalaryData}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Bar dataKey="salary" fill="#0a4abf" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="card h-[280px] p-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">Role Distribution</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={roleChartData} dataKey="count" nameKey="role" innerRadius={45} outerRadius={90} paddingAngle={4}>
                {roleChartData.map((entry, index) => (
                  <Cell key={entry.role} fill={["#0a4abf", "#0284c7", "#14b8a6", "#4f46e5", "#0f766e"][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </article>
      </section>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card h-44 animate-pulse bg-slate-100/70" />
          ))}
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCandidates.map(({ employee, index }) => {
            return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={(event) => handleCardClick(event, index)}
              className="card group cursor-pointer rounded-2xl p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                {profilePhotos[index] ? (
                  <img
                    src={profilePhotos[index]}
                    alt={employee[0]}
                    className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <UserRound size={18} />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900">{employee[0]}</h3>
                  <p className="truncate text-xs text-slate-500">{employee[1]}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-slate-500">Location <span className="font-medium text-slate-800">{employee[2]}</span></p>
                <p className="text-slate-500">Salary <span className="font-semibold text-blue-700">{employee[5]}</span></p>
              </div>
              <p className="mt-3 text-xs font-semibold text-teal-700 opacity-0 transition group-hover:opacity-100">Open 4-part profile →</p>
            </motion.article>
          );})}
        </section>
      )}
    </div>
  );
}