import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Platform = {
  label: string;
  os: 'linux' | 'macos' | 'windows';
  href: string;
  available: boolean;
};

const PLATFORMS: Platform[] = [
  {
    label: 'Linux',
    os: 'linux',
    href: '/docs/install',
    available: true,
  },
  {
    label: 'macOS',
    os: 'macos',
    href: '/docs/install',
    available: false,
  },
  {
    label: 'Windows',
    os: 'windows',
    href: '/docs/install',
    available: false,
  },
];

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return PLATFORMS[2];
  if (ua.includes('mac')) return PLATFORMS[1];
  return PLATFORMS[0]; // default linux
}

export default function DownloadButton() {
  const [platform, setPlatform] = useState<Platform>(PLATFORMS[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.group}>
        <Link
          className={`button button--primary ${styles.main}`}
          to={platform.available ? platform.href : '/docs/install'}
        >
          Download for {platform.label}
        </Link>
        <button
          className={`button button--primary ${styles.arrow}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Choose platform"
        >
          <svg
            className={styles.caret}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {PLATFORMS.map((p) => (
            <button
              key={p.label}
              className={`${styles.option} ${p.label === platform.label ? styles.active : ''}`}
              onClick={() => {
                setPlatform(p);
                setOpen(false);
              }}
            >
              {p.label}
              {!p.available && <span className={styles.tag}>soon</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
