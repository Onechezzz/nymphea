'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface AvatarProps {
  gender: 'male' | 'female';
  visible: boolean;
  talking: boolean;
  side: 'left' | 'right';
}

const VIDEOS: Record<'male' | 'female', { idle: string; action: string }> = {
  female: {
    idle: '/videos/avatars/female/girl_idle_1.mov',
    action: '/videos/avatars/female/girl_action_2.mov',
  },
  male: {
    idle: '/videos/avatars/male/man_Idle_1.mov',
    action: '/videos/avatars/male/man_action_2.mov',
  },
};

export default function Avatar({ gender, visible, talking, side }: AvatarProps) {
  const [phase, setPhase] = useState<'idle' | 'action'>('idle');
  const [hasError, setHasError] = useState(false);
  const idleRef = useRef<HTMLVideoElement>(null);
  const actionRef = useRef<HTMLVideoElement>(null);

  const srcs = VIDEOS[gender];
  const isAction = phase === 'action';

  // Trigger action video each time `talking` becomes true
  useEffect(() => {
    if (!talking || hasError) return;
    const av = actionRef.current;
    if (!av) return;
    setPhase('action');
    av.currentTime = 0;
    av.play().catch(() => setHasError(true));
  }, [talking, hasError]);

  // When action video ends → back to idle seamlessly
  const handleActionEnded = () => {
    setPhase('idle');
    // Idle video is always playing in the background — no restart needed
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'scale(1) translateX(0)'
          : side === 'left'
          ? 'scale(0.75) translateX(-40px)'
          : 'scale(0.75) translateX(40px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Ambient botanical glow */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '70%', height: '40%',
          background: isAction
            ? 'radial-gradient(ellipse, rgba(241,123,171,0.55) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(241,123,171,0.2) 0%, transparent 70%)',
          transition: 'background 0.5s ease',
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      {!hasError ? (
        /* ── VIDEO SYSTEM ── */
        <div
          style={{
            position: 'relative', zIndex: 1,
            width: 'clamp(240px, 28vw, 360px)',
            height: 'clamp(480px, 56vw, 720px)',
            maskImage: 'radial-gradient(ellipse 100% 88% at 50% 8%, black 55%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 88% at 50% 8%, black 55%, transparent 100%)',
          }}
        >
          {/* IDLE — always buffered, loops infinitely */}
          <video
            ref={idleRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src={srcs.idle}
            onError={() => setHasError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              opacity: isAction ? 0 : 1,
              transition: 'opacity 0.12s ease',
            }}
          />
          {/* ACTION — always buffered, plays once on demand */}
          <video
            ref={actionRef}
            muted
            playsInline
            preload="auto"
            src={srcs.action}
            onEnded={handleActionEnded}
            onError={() => setHasError(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              opacity: isAction ? 1 : 0,
              transition: 'opacity 0.12s ease',
            }}
          />
        </div>
      ) : (
        /* ── FALLBACK: static image + CSS animation ── */
        <div
          className={isAction ? 'animate-talking avatar-glow-talking' : 'animate-breathe avatar-glow-idle'}
          style={{
            position: 'relative', zIndex: 1,
            transformOrigin: 'bottom center',
            maskImage: 'radial-gradient(ellipse 100% 88% at 50% 8%, black 55%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 88% at 50% 8%, black 55%, transparent 100%)',
          }}
        >
          <Image
            src={`/${gender}-avatar.png`}
            alt={`${gender} avatar`}
            width={300} height={600}
            className="object-contain object-bottom select-none"
            priority draggable={false}
          />
        </div>
      )}

      {/* Talking indicator dots */}
      {isAction && (
        <div
          style={{
            position: 'absolute', top: '36%',
            left: side === 'left' ? 'auto' : '8px',
            right: side === 'left' ? '8px' : 'auto',
            display: 'flex', gap: '4px', alignItems: 'center',
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '12px', padding: '6px 10px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#f17bab',
                animation: 'bounce 0.6s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
