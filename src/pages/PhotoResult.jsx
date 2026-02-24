import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PhotoResult() {
  const { capturedImage, capturedEmployeeId, apiData } = useContext(AppContext);
  const navigate = useNavigate();
  const employeeName = typeof capturedEmployeeId === 'number' ? apiData[capturedEmployeeId]?.[0] : null;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto fade-in">
      <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="page-title">Verification Result</h2>
        <p className="page-subtitle">
          {employeeName ? `${employeeName}'s profile photo has been updated.` : 'Review the latest captured photo.'}
        </p>
      </motion.header>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} className="card rounded-2xl p-4 sm:p-6">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="max-h-[60vh] w-full rounded-xl object-cover shadow-sm" />
        ) : (
          <div className="relative h-72 overflow-hidden rounded-xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Professional team"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[#0b3a75]/55 text-white">No image captured yet.</div>
          </div>
        )}
      </motion.div>

      <button type="button" onClick={() => navigate('/list')} className="primary-btn mt-6 self-start px-8">
        Back to Dashboard
      </button>
    </div>
  );
}