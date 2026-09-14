"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type EdgeOrigin = "left" | "right" | "top" | "bottom";
type Origin = "center" | EdgeOrigin;

const COLORS = ["#7c3aed", "#f59e0b", "#22c55e", "#ec4899", "#3b82f6"];

// One continuous stream of bursts for the full minute — each pick is random
// (center included), so there's no phase break or lull, just steady variety.
const TOTAL_MS = 60000;
const BURST_INTERVAL_MS = 1500;
const ORIGINS: Origin[] = ["center", "left", "right", "top", "bottom"];
const PIECE_LIFETIME_MS = 2700;

interface Piece {
  id: string;
  color: string;
  width: number;
  height: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  rotate: number;
  duration: number;
  delay: number;
}

interface Batch {
  id: string;
  pieces: Piece[];
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildPiece(id: string, left: number, top: number, dx: number, dy: number): Piece {
  return {
    id,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    width: 6 + Math.random() * 5,
    height: 10 + Math.random() * 6,
    left,
    top,
    dx,
    dy,
    rotate: Math.random() * 480 - 240,
    duration: 1.6 + Math.random() * 0.9,
    delay: Math.random() * 0.2,
  };
}

function buildCenterBurst(size: { w: number; h: number }, batchId: string): Piece[] {
  const cx = size.w / 2;
  const cy = size.h / 2;
  return Array.from({ length: 55 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(0.25, 0.55) * Math.min(size.w, size.h);
    return buildPiece(`${batchId}-${i}`, cx, cy, Math.cos(angle) * distance, Math.sin(angle) * distance);
  });
}

function buildEdgeBurst(origin: EdgeOrigin, size: { w: number; h: number }, batchId: string): Piece[] {
  return Array.from({ length: 34 }, (_, i) => {
    const alongEdge = Math.random();
    const drift = randomBetween(-40, 40);
    let left = 0;
    let top = 0;
    let dx = 0;
    let dy = 0;

    if (origin === "left") {
      left = -10;
      top = alongEdge * size.h;
      dx = randomBetween(0.25, 0.55) * size.w;
      dy = drift;
    } else if (origin === "right") {
      left = size.w + 10;
      top = alongEdge * size.h;
      dx = -randomBetween(0.25, 0.55) * size.w;
      dy = drift;
    } else if (origin === "top") {
      left = alongEdge * size.w;
      top = -10;
      dx = drift;
      dy = randomBetween(0.25, 0.55) * size.h;
    } else {
      left = alongEdge * size.w;
      top = size.h + 10;
      dx = drift;
      dy = -randomBetween(0.25, 0.55) * size.h;
    }

    return buildPiece(`${batchId}-${i}`, left, top, dx, dy);
  });
}

export function ConfettiBurst() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let counter = 0;

    const getSize = () => {
      const el = containerRef.current;
      return el && el.clientWidth && el.clientHeight
        ? { w: el.clientWidth, h: el.clientHeight }
        : { w: window.innerWidth, h: window.innerHeight };
    };

    const addBatch = (pieces: Piece[]) => {
      const id = `b${counter++}`;
      setBatches((prev) => [...prev, { id, pieces }]);
      timeouts.push(
        setTimeout(() => {
          setBatches((prev) => prev.filter((b) => b.id !== id));
        }, PIECE_LIFETIME_MS)
      );
    };

    for (let t = 0; t < TOTAL_MS; t += BURST_INTERVAL_MS) {
      // Open with a center burst, then pick a random origin (center included)
      // for every burst after that.
      const origin: Origin = t === 0 ? "center" : ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
      timeouts.push(
        setTimeout(() => {
          const size = getSize();
          const pieces = origin === "center" ? buildCenterBurst(size, `b${t}`) : buildEdgeBurst(origin, size, `b${t}`);
          addBatch(pieces);
        }, t)
      );
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
      {batches.map((batch) =>
        batch.pieces.map((piece) => (
          <motion.span
            key={piece.id}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: piece.dx, y: piece.dy, opacity: 0, rotate: piece.rotate }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
            className="absolute rounded-xs"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.width,
              height: piece.height,
              backgroundColor: piece.color,
            }}
          />
        ))
      )}
    </div>
  );
}
