import React, { useRef, useContext, useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Camera, Video, CircleUserRound, Upload, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const cityCoords = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  'San Francisco': [37.7749, -122.4194],
  'New York': [40.7128, -74.006],
  London: [51.5074, -0.1278]
};

export default function Details() {
  const { id } = useParams();
  const { apiData, setCapturedImage, setCapturedEmployeeId, profilePhotos, setProfilePhotos } = useContext(AppContext);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  const [streamActive, setStreamActive] = useState(false);
  const employee = apiData[id];

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    setStreamActive(true);
  };

  const capture = () => {
    if (!videoRef.current?.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const captured = canvas.toDataURL('image/png');
    setCapturedImage(captured);
    setCapturedEmployeeId(Number(id));
    setProfilePhotos((previous) => ({ ...previous, [id]: captured }));

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStreamActive(false);
  };

  const uploadPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const uploaded = loadEvent.target?.result;
      if (typeof uploaded === 'string') {
        setCapturedImage(uploaded);
        setCapturedEmployeeId(Number(id));
        setProfilePhotos((previous) => ({ ...previous, [id]: uploaded }));
      }
    };
    reader.readAsDataURL(file);
  };

  const salaryValue = employee ? parseInt(employee[5].replace(/[$,]/g, '')) : 0;
  const salaryScale = Math.min(100, Math.round((salaryValue / 450000) * 100));
  const roleScale = Math.min(100, 42 + (employee?.[1]?.length || 0) * 2);
  const locationScale = Math.min(100, 55 + (employee?.[2]?.length || 0));
  const profileScale = profilePhotos[id] ? 100 : 25;

  const positionGraphData = useMemo(
    () => [
      { step: 'Onboard', progress: Math.round(roleScale * 0.55), quality: Math.round(locationScale * 0.5) },
      { step: 'Screen', progress: Math.round(roleScale * 0.78), quality: Math.round(locationScale * 0.64) },
      { step: 'Assess', progress: Math.round(salaryScale * 0.72), quality: Math.round(profileScale * 0.54) },
      { step: 'Verify', progress: Math.round(profileScale * 0.9), quality: Math.round(roleScale * 0.66) },
      { step: 'Close', progress: Math.round((salaryScale + profileScale) / 2), quality: Math.round((locationScale + profileScale) / 2) }
    ],
    [locationScale, profileScale, roleScale, salaryScale]
  );

  const locationCoords = cityCoords[employee?.[2]] || [20, 0];

  if (!employee) return <div>No data found.</div>;

  return (
    <div className="h-full w-full overflow-y-auto pr-1 fade-in">
      <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="page-title">Candidate 360° Profile</h2>
        <p className="page-subtitle">Unique four-part workspace: info, position graph, camera upload, and live location map.</p>
      </motion.header>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">1) Candidate Info</h3>
            <span className="soft-badge">ID #{Number(id) + 1}</span>
          </div>
          <h4 className="aurora-text text-2xl font-extrabold">{employee[0]}</h4>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-3">
              <p className="text-xs uppercase tracking-wide text-blue-700">Profile</p>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-800">
                <CircleUserRound size={16} />
                {profilePhotos[id] ? 'Photo saved' : 'Photo pending'}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{employee[1]}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{employee[2]}</p>
            </div>
            <div className="rounded-xl bg-cyan-50 p-3">
              <p className="text-xs uppercase tracking-wide text-cyan-700">Salary</p>
              <p className="mt-1 text-sm font-semibold text-cyan-800">{employee[5]}</p>
            </div>
          </div>
          {profilePhotos[id] && (
            <div className="mt-4 flex justify-start">
              <img src={profilePhotos[id]} alt={employee[0]} className="h-36 w-36 rounded-xl border border-slate-200 object-cover" />
            </div>
          )}
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="card rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">2) Position Graph</h3>
            <span className="soft-badge">Visual Fit Score</span>
          </div>
          <div className="h-[320px] rounded-xl border border-slate-200 bg-white p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={positionGraphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="step" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="quality" stroke="#22c55e" fill="#bbf7d0" fillOpacity={0.28} />
                <Line type="monotone" dataKey="progress" stroke="#0a4abf" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="card rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">3) Camera & Upload</h3>
            <span className="soft-badge">Save as profile pic</span>
          </div>

          <div
            className={`relative overflow-hidden rounded-xl border border-amber-300 bg-black ${streamActive ? 'cursor-pointer' : ''}`}
            onClick={streamActive ? capture : undefined}
            role={streamActive ? 'button' : undefined}
            tabIndex={streamActive ? 0 : -1}
            onKeyDown={(event) => {
              if (streamActive && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                capture();
              }
            }}
          >
            <video ref={videoRef} autoPlay className="w-full aspect-video object-cover" />
            {streamActive && (
              <div className="absolute right-3 top-3 rounded-full bg-amber-700/90 px-3 py-1 text-xs font-semibold text-white">
                Click video to capture
              </div>
            )}
            {!streamActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70">
                <button type="button" onClick={startCamera} className="primary-btn px-6">
                  Start Camera
                </button>
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" onClick={capture} className="primary-btn gap-2 py-3" disabled={!streamActive}>
              <Camera size={18} />
              Capture Now
            </button>

            <label className="ghost-btn cursor-pointer gap-2 py-3">
              <Upload size={17} />
              Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
            </label>
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="card rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">4) Map & Location</h3>
            <span className="soft-badge flex items-center gap-1"><MapPin size={12} /> {employee[2]}</span>
          </div>

          <div className="h-[320px] overflow-hidden rounded-xl border border-teal-200">
            <MapContainer center={locationCoords} zoom={4} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={locationCoords}>
                <Popup>
                  <b>{employee[0]}</b>
                  <br />
                  {employee[1]} - {employee[2]}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.article>
      </section>

      <button type="button" onClick={() => navigate('/list')} className="ghost-btn mt-4">
        Back to Dashboard
      </button>
    </div>
  );
}