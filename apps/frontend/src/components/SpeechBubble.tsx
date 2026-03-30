'use client';

import { useEffect, useState } from 'react';

interface SpeechBubbleProps {
  text: string;
  visible: boolean;
  variant?: 'light' | 'dark';
}

export default function SpeechBubble({ text, visible, variant = 'light' }: SpeechBubbleProps) {
  const [rendered, setRendered] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (visible && text) {
      setRendered(true);
      // Typewriter effect
      setDisplayText('');
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 18);
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, text]);

  if (!rendered && !visible) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        position: 'relative',
        maxWidth: '380px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Bubble body */}
      <div
        style={{
          background: variant === 'light'
            ? 'rgba(255, 255, 255, 0.97)'
            : 'rgba(30, 10, 60, 0.95)',
          color: variant === 'light' ? '#1a2e1e' : '#f7a5cd',
          borderRadius: '20px',
          padding: '14px 20px',
          fontSize: '0.9rem',
          fontWeight: 500,
          lineHeight: 1.6,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(241,123,171,0.25)',
          minHeight: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          letterSpacing: '0.01em',
        }}
        className="animate-bubble-in"
      >
        {/* Decorative stars */}
        <span style={{ marginRight: '8px', opacity: 0.6 }}>✦</span>
        {displayText}
        {displayText.length < text.length && (
          <span style={{ animation: 'blink 0.8s step-end infinite', marginLeft: '2px' }}>|</span>
        )}
        <span style={{ marginLeft: '8px', opacity: 0.6 }}>✦</span>
      </div>

      {/* Triangle pointer */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: `12px solid ${variant === 'light' ? 'rgba(255,255,255,0.97)' : 'rgba(30,10,60,0.95)'}`,
          filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.15))',
        }}
      />

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
