import React, { useEffect, useRef } from 'react';

export default function FoxComponent() {
  // References to keep DOM elements isolated and secure
  const wrapRef = useRef(null);
  const foxRef = useRef(null);
  const tailRef = useRef(null);
  const mouthRef = useRef(null);
  const blushLRef = useRef(null);
  const blushRRef = useRef(null);
  const eyeLWRef = useRef(null);
  const eyeRWRef = useRef(null);
  const eyeLIRef = useRef(null);
  const eyeRIRef = useRef(null);
  const eyeLPRef = useRef(null);
  const eyeRPRef = useRef(null);
  const shineLRef = useRef(null);
  const shineRRef = useRef(null);

  // Mutable variables tracking the internal animation state
  const stateRef = useRef({
    tick: 0,
    tailTick: 0,
    hovered: false,
    blinkTimer: null,
  });

  // Helper to dynamically adjust SVG eye nodes
  const movePupils = (dx, dy) => {
    const lx = Math.max(-5, Math.min(5, dx));
    const ly = Math.max(-4, Math.min(4, dy));

    if (eyeLIRef.current) {
      eyeLIRef.current.setAttribute('cx', String(100 + lx * 0.5));
      eyeLIRef.current.setAttribute('cy', String(128 + ly * 0.5));
    }
    if (eyeRIRef.current) {
      eyeRIRef.current.setAttribute('cx', String(160 + lx * 0.5));
      eyeRIRef.current.setAttribute('cy', String(128 + ly * 0.5));
    }
    if (eyeLPRef.current) {
      eyeLPRef.current.setAttribute('cx', String(100 + lx));
      eyeLPRef.current.setAttribute('cy', String(128 + ly));
    }
    if (eyeRPRef.current) {
      eyeRPRef.current.setAttribute('cx', String(160 + lx));
      eyeRPRef.current.setAttribute('cy', String(128 + ly));
    }
    if (shineLRef.current) {
      shineLRef.current.setAttribute('cx', String(103 + lx * 0.3));
      shineLRef.current.setAttribute('cy', String(124 + ly * 0.3));
    }
    if (shineRRef.current) {
      shineRRef.current.setAttribute('cx', String(163 + lx * 0.3));
      shineRRef.current.setAttribute('cy', String(124 + ly * 0.3));
    }
  };

  // Helper to change the face mood dynamically
  const setMood = (mood) => {
    if (!mouthRef.current || !blushLRef.current || !blushRRef.current) return;

    if (mood === 'click') {
      mouthRef.current.setAttribute('d', 'M86,153 Q110,175 134,153');
      blushLRef.current.setAttribute('opacity', '0.45');
      blushRRef.current.setAttribute('opacity', '0.45');
    } else if (mood === 'hover') {
      mouthRef.current.setAttribute('d', 'M90,153 Q110,168 130,153');
      blushLRef.current.setAttribute('opacity', '0.28');
      blushRRef.current.setAttribute('opacity', '0.28');
    } else {
      mouthRef.current.setAttribute('d', 'M92,153 Q110,163 128,153');
      blushLRef.current.setAttribute('opacity', '0.1');
      blushRRef.current.setAttribute('opacity', '0.1');
    }
  };

  useEffect(() => {
    const state = stateRef.current;
    let animationFrameId;

    // Blinking Routine
    const blink = () => {
      const targets = [
        eyeLWRef.current, eyeRWRef.current, eyeLIRef.current,
        eyeRIRef.current, eyeLPRef.current, eyeRPRef.current
      ];
      targets.forEach(el => el && el.setAttribute('ry', '1'));

      setTimeout(() => {
        if (eyeLWRef.current) eyeLWRef.current.setAttribute('ry', '15');
        if (eyeRWRef.current) eyeRWRef.current.setAttribute('ry', '15');
        if (eyeLIRef.current) eyeLIRef.current.setAttribute('ry', '11');
        if (eyeRIRef.current) eyeRIRef.current.setAttribute('ry', '11');
        if (eyeLPRef.current) eyeLPRef.current.setAttribute('ry', '6');
        if (eyeRPRef.current) eyeRPRef.current.setAttribute('ry', '6');
        scheduleBlink();
      }, 120);
    };

    const scheduleBlink = () => {
      state.blinkTimer = setTimeout(blink, 2400 + Math.random() * 3000);
    };

    // Idle Floating and Tail Wag Animation Loop
    const loop = () => {
      state.tick += 0.018;
      state.tailTick += 0.03;

      if (tailRef.current) {
        tailRef.current.style.transform = `rotate(${Math.sin(state.tailTick) * 14}deg)`;
      }
      if (!state.hovered && foxRef.current) {
        foxRef.current.style.transform = `translate(${Math.sin(state.tick * 0.55) * 2}px, ${Math.sin(state.tick) * 5}px)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Start running timers and requestAnimationFrame loop
    loop();
    scheduleBlink();

    // Cleanup timers and tracking listeners if component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(state.blinkTimer);
    };
  }, []);

  // Event Handlers
  const handleMouseMove = (e) => {
    if (!wrapRef.current || !foxRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
    const dy = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 4;

    movePupils(dx, dy);
    foxRef.current.style.transform = `translate(${dx * 0.6}px, ${dy * 0.6}px)`;
  };

  const handleMouseEnter = () => {
    stateRef.current.hovered = true;
    setMood('hover');
  };

  const handleMouseLeave = () => {
    stateRef.current.hovered = false;
    movePupils(0, 0);
    setMood('idle');
  };

  const handleClick = () => {
    if (!foxRef.current) return;
    setMood('click');
    foxRef.current.style.transition = 'transform 0.15s cubic-bezier(.36,.07,.19,.97)';
    foxRef.current.style.transform = 'scale(1.1) rotate(-4deg)';

    setTimeout(() => {
      if (foxRef.current) foxRef.current.style.transform = 'scale(1) rotate(2deg)';
      setTimeout(() => {
        if (foxRef.current) {
          foxRef.current.style.transition = '';
          foxRef.current.style.transform = '';
        }
        setMood(stateRef.current.hovered ? 'hover' : 'idle');
      }, 150);
    }, 150);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem', background: 'transparent' }}>
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: 'pointer', userSelect: 'none', display: 'inline-block' }}
      >
        <svg ref={foxRef} width="260" height="300" viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg">
          <g ref={tailRef} style={{ transformOrigin: '130px 265px' }}>
            <path d="M110,262 Q60,255 48,230 Q36,205 58,190 Q80,176 98,195 Q108,207 115,222 Q122,240 130,250 Q138,240 145,222 Q152,207 162,195 Q180,176 202,190 Q224,205 212,230 Q200,255 150,262 Q140,270 130,272 Q120,270 110,262Z" fill="#e0241c" opacity="0.92" />
            <ellipse cx="130" cy="264" rx="22" ry="11" fill="#fff" opacity="0.9" />
            <path d="M108,230 Q115,248 130,255 Q145,248 152,230" fill="none" stroke="#111" stroke-width="1" opacity="0.12" />
          </g>

          <ellipse cx="130" cy="232" rx="52" ry="42" fill="#111" />
          <ellipse cx="130" cy="242" rx="30" ry="26" fill="#fff" opacity="0.07" />

          <polygon points="62,120 44,58 96,96" fill="#111" />
          <polygon points="66,114 52,68 90,94" fill="#e0241c" />
          <polygon points="198,120 216,58 164,96" fill="#111" />
          <polygon points="194,114 208,68 170,94" fill="#e0241c" />

          <ellipse cx="130" cy="138" rx="72" ry="68" fill="#111" />
          <ellipse cx="130" cy="108" rx="28" ry="20" fill="#e0241c" opacity="0.15" />

          <ellipse cx="88" cy="156" rx="26" ry="20" fill="#fff" opacity="0.9" />
          <ellipse cx="172" cy="156" rx="26" ry="20" fill="#fff" opacity="0.9" />
          <ellipse cx="130" cy="158" rx="18" ry="14" fill="#fff" opacity="0.9" />

          <path d="M130,88 L122,106 L130,102 L138,106Z" fill="#e0241c" opacity="0.7" />

          <ellipse ref={eyeLWRef} cx="100" cy="128" rx="16" ry="15" fill="#fff" />
          <ellipse ref={eyeRWRef} cx="160" cy="128" rx="16" ry="15" fill="#fff" />
          <ellipse ref={eyeLIRef} cx="100" cy="128" rx="11" ry="11" fill="#e0241c" />
          <ellipse ref={eyeRIRef} cx="160" cy="128" rx="11" ry="11" fill="#e0241c" />
          <ellipse ref={eyeLPRef} cx="100" cy="128" rx="6" ry="6" fill="#111" />
          <ellipse ref={eyeRPRef} cx="160" cy="128" rx="6" ry="6" fill="#111" />
          <circle ref={shineLRef} cx="103" cy="124" r="2.5" fill="#fff" opacity="0.85" />
          <circle ref={shineRRef} cx="163" cy="124" r="2.5" fill="#fff" opacity="0.85" />

          <ellipse ref={blushLRef} cx="82" cy="152" rx="14" ry="8" fill="#e0241c" opacity="0.1" />
          <ellipse ref={blushRRef} cx="178" cy="152" rx="14" ry="8" fill="#e0241c" opacity="0.1" />

          <ellipse cx="130" cy="150" rx="7" ry="5" fill="#111" />
          <ellipse cx="128" cy="148" rx="2.5" ry="1.5" fill="#fff" opacity="0.4" />

          <path ref={mouthRef} d="M92,153 Q110,163 128,153" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" />

          <line x1="62" y1="148" x2="88" y2="152" stroke="#fff" stroke-width="1.2" opacity="0.45" />
          <line x1="60" y1="156" x2="87" y2="156" stroke="#fff" stroke-width="1.2" opacity="0.45" />
          <line x1="62" y1="164" x2="88" y2="160" stroke="#fff" stroke-width="1.2" opacity="0.45" />
          <line x1="198" y1="148" x2="172" y2="152" stroke="#fff" stroke-width="1.2" opacity="0.45" />
          <line x1="200" y1="156" x2="173" y2="156" stroke="#fff" stroke-width="1.2" opacity="0.45" />
          <line x1="198" y1="164" x2="172" y2="160" stroke="#fff" stroke-width="1.2" opacity="0.45" />
        </svg>
      </div>
    </div>
  );
}
