import { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { FileUp, Clock, Settings, FileText, Sparkles, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import Upload from './pages/Upload';
import History from './pages/History';
import SettingsPage from './pages/Settings';

const navigation = [
  { name: 'Last opp', href: '/upload', icon: FileUp },
  { name: 'Historikk', href: '/history', icon: Clock },
  { name: 'Innstillinger', href: '/settings', icon: Settings },
];

export default function App() {
  const [apiKey] = useState('demo-key-001');
  const location = useLocation();
  const currentTitle = {
    '/upload': 'Last opp dokumenter',
    '/history': 'Behandlingshistorikk',
    '/settings': 'Innstillinger',
  }[location.pathname] || 'DokumentAI';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="flex w-64 flex-shrink-0 flex-col bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">DokumentAI</h1>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">Intelligent dokumentbehandling</p>
          </div>
        </div>
        <div className="mx-4 border-t border-white/10" />
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navigation.map((item) => (
            <NavLink key={item.name} to={item.href} className={({ isActive }) => clsx('nav-item', isActive ? 'nav-item-active' : 'nav-item-inactive')}>
              {({ isActive }) => (
                <>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight className="h-4 w-4 text-primary-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-4">
          <div className="rounded-lg bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Sparkles className="h-4 w-4 text-primary-400" />
              <span>AI-drevet</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">Automatisk klassifisering og datautvinning for regnskapsbransjen.</p>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h2 className="text-lg font-semibold text-gray-900">{currentTitle}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Velkommen til DokumentAI</span>
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-700">JA</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <Routes>
              <Route path="/upload" element={<Upload apiKey={apiKey} />} />
              <Route path="/history" element={<History apiKey={apiKey} />} />
              <Route path="/settings" element={<SettingsPage apiKey={apiKey} />} />
              <Route path="*" element={<Navigate to="/upload" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
