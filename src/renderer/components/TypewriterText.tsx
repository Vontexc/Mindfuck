import React, { useEffect, useRef, useState } from 'react';
import styles from './TypewriterText.module.css';
import type { TextSpeed } from '../../story/nodes.types';

interface Props {
  text: string | string[];
  speed?: TextSpeed;
  glitchChars?: boolean;
  canSkip?: boolean;
  onComplete?: () => void;
  className?: string;
}

const SPEED_MS: Record<TextSpeed, number> = {
  slow: 60,
  normal: 30,
  fast: 12,
  glitch: 45,
};

const GLITCH_CHARS = '!@#$%^&*█▒░<>|\\/?~`';

export const TypewriterText: React.FC<Props> = ({
  text,
  speed = 'normal',
  glitchChars = false,
  canSkip = true,
  onComplete,
  className,
}) => {
  const lines = Array.isArray(text) ? text : [text];
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const completeRef = useRef(false);

  // Reset whenever the input text changes.
  useEffect(() => {
    completeRef.current = false;
    setLineIdx(0);
    setCharIdx(0);
    setRenderedLines([]);
  }, [text]);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      if (!completeRef.current) {
        completeRef.current = true;
        onComplete?.();
      }
      return;
    }

    const line = lines[lineIdx];

    if (charIdx >= line.length) {
      setRenderedLines((prev) => [...prev, line]);
      const nextLine = () => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      };
      timeoutRef.current = window.setTimeout(nextLine, 350);
      return () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }

    const baseMs = SPEED_MS[speed];
    let nextMs = baseMs;

    if (glitchChars && charIdx % 8 === 7) {
      nextMs = 200;
    }

    timeoutRef.current = window.setTimeout(() => {
      setCharIdx((c) => c + 1);
    }, nextMs);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [charIdx, lineIdx, lines, speed, glitchChars, onComplete]);

  const handleSkip = () => {
    if (!canSkip || completeRef.current) return;
    completeRef.current = true;
    setRenderedLines(lines);
    setLineIdx(lines.length);
    onComplete?.();
  };

  const currentLine = lines[lineIdx] ?? '';
  const visiblePart = currentLine.slice(0, charIdx);
  const showGlitch =
    glitchChars && charIdx > 0 && charIdx % 8 === 7 && charIdx < currentLine.length;
  const glitchSuffix = showGlitch
    ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
    : '';

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')} onClick={handleSkip}>
      {renderedLines.map((l, i) => (
        <p key={i} className={styles.line}>
          {l}
        </p>
      ))}
      {lineIdx < lines.length && (
        <p className={styles.line}>
          {visiblePart}
          {glitchSuffix && <span className={styles.glitchChar}>{glitchSuffix}</span>}
          <span className={styles.caret}>▌</span>
        </p>
      )}
    </div>
  );
};
