'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // bara kör på client-side

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  if (!isClient) return null; // rendera inget på servern (fixar hydration error)

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)`,
      }}
    >
      <div className="spin-forever">
        <img src="/cursor.svg" alt="cursor" className="w-8 h-8" />
      </div>
    </div>
  );
}
