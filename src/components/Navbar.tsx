'use client';

import Image from 'next/image';

interface NavbarProps {
  theme: 'light' | 'dark';
  accent: 'pink' | 'lavender' | 'peach';
  onToggleTheme: () => void;
  onChangeAccent: (accent: 'pink' | 'lavender' | 'peach') => void;
}

const accents = [
  { name: 'pink', label: 'Pink', color: '#e85d9e' },
  { name: 'lavender', label: 'Lavender', color: '#9272dc' },
  { name: 'peach', label: 'Peach', color: '#e98269' },
] as const;

export default function Navbar({ theme, accent, onToggleTheme, onChangeAccent }: NavbarProps) {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/memey-icon.svg" alt="" width={40} height={40} className="rounded-xl shadow-sm" />
          <div>
            <h1 className="font-bold text-lg leading-none text-foreground">
              Memey AI Assistant
            </h1>
            <p className="text-xs text-muted">
              Teman ngobrolmu, kapan saja
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1.5 py-1" role="group" aria-label="Pilih warna tema">
            {accents.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => onChangeAccent(option.name)}
                className={`h-5 w-5 rounded-full transition-transform hover:scale-110 ${accent === option.name ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}
                style={{ backgroundColor: option.color }}
                title={`Tema ${option.label}`}
                aria-label={`Pilih tema ${option.label}`}
                aria-pressed={accent === option.name}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-md border border-border hover:bg-accent-soft transition-colors text-foreground flex items-center justify-center"
            title={theme === 'dark' ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
            aria-label={theme === 'dark' ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} sm:mr-1.5`} />
            <span className="hidden sm:inline text-xs font-medium">{theme === 'dark' ? 'Terang' : 'Gelap'}</span>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-border text-foreground flex items-center justify-center"
            title="API Status"
          >
            <i className="fas fa-circle text-green-500 sm:mr-1.5" style={{ fontSize: '0.65rem' }}></i>
            <span className="hidden sm:inline text-xs font-medium">Live</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
