'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [hasMoved]);

  if (!isClient || !hasMoved) return null; // Visa inte innan musen rört sig

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden lg:block"
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
