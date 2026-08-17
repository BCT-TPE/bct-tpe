import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/* NOVA panel in the Manyone COMPETE visual language.
   Measured off the reference (720x720, 24fps, 7.34s):
     - the whole composition ramps in over ~16% of the loop and out over ~8%
     - the pill arrives first as a blurred capsule, then the text types
     - lines never "draw and stop": they drift continuously across frame,
       soft-edged, at several blur depths, fading out at both ends
   Loop-safe because the envelope returns to zero at the tail. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* the three beats of the NOVA story - one per cycle */
const PHRASES = ['Generating page', 'Mounting MCP server', 'Editing together'];

/* Drifting lines at four depths. `blur` sets how far back a line sits,
   `speed` is how far it travels across the loop (in viewport widths). */
type LineSpec = {
  base: number;
  fall: number;
  waves: [number, number, number][];
  blur: number;
  opacity: number;
  width: number;
  speed: number;
};

const LINES: LineSpec[] = [
  {base: 470, fall: 300, waves: [[52, 2.3, 0.8], [26, 5.1, 2.9], [10, 9.7, 1.2]], blur: 0, opacity: 0.8, width: 2.4, speed: 0.3},
  {base: 610, fall: 210, waves: [[40, 1.7, 3.7], [20, 4.3, 0.4], [8, 8.1, 5.1]], blur: 5, opacity: 0.6, width: 5, speed: 0.22},
  {base: 330, fall: -140, waves: [[34, 2.1, 1.9], [16, 4.9, 4.4], [7, 9.3, 0.6]], blur: 12, opacity: 0.45, width: 9, speed: -0.18},
  {base: 545, fall: 60, waves: [[60, 1.3, 5.5], [24, 3.7, 2.1], [9, 7.1, 3.3]], blur: 22, opacity: 0.32, width: 14, speed: 0.12},
];

/* sample each spec into a long path (2.5x frame width) so it can drift through */
const samplePath = (spec: LineSpec) => {
  const pts: string[] = [];
  for (let x = -1000; x <= 2000; x += 10) {
    const u = (x + 1000) / 3000;
    const drift = spec.fall * (u * u * (3 - 2 * u));
    let y = spec.base - drift;
    for (const [a, f, p] of spec.waves) {
      const amp = a * (0.55 + 0.45 * Math.sin(u * Math.PI * 1.7 + p * 0.7));
      y += amp * Math.sin(u * Math.PI * f + p);
    }
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
};
const PATHS = LINES.map(samplePath);

export const Nova: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  /* global envelope, matching the reference's ramp ratios */
  const env = interpolate(t, [0, 0.16, 0.9, 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* gradient drift: wanders and returns */
  const drift = Math.sin(t * Math.PI * 2);
  const angle = 135 + drift * 14;
  const stop = 50 + drift * 16;

  /* pill: blurred capsule first, then the text types per phrase */
  const pillBlur = interpolate(t, [0, 0.11], [26, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pillScale = interpolate(t, [0, 0.14], [0.72, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const per = durationInFrames / PHRASES.length;
  const idx = Math.min(PHRASES.length - 1, Math.floor(frame / per));
  const local = frame - idx * per;
  const phrase = PHRASES[idx];
  const typeStart = idx === 0 ? 22 : 8; // the first phrase waits for the pill to arrive
  const typed = Math.round(
    interpolate(local, [typeStart, typeStart + phrase.length * 2.4], [0, phrase.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const textFade = interpolate(local, [0, 6, per - 14, per - 4], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dot = 0.35 + 0.65 * Math.abs(Math.sin((local / 34) * Math.PI * 2));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #d94f42 0%, #e8836a ${stop}%, #f2b48c 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* soft inner glow */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(62% 58% at 50% 44%, rgba(255,255,255,.18), transparent 72%)',
          opacity: 0.55 + 0.45 * Math.abs(drift),
        }}
      />

      {/* drifting lines */}
      <svg
        viewBox="0 0 1200 800"
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: env}}
      >
        <defs>
          {/* fades both ends of every stroke so lines never start or stop hard */}
          <linearGradient id="endfade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.18" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {LINES.map((l, i) =>
            l.blur ? (
              <filter key={i} id={`b${i}`} x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur stdDeviation={l.blur} />
              </filter>
            ) : null
          )}
        </defs>
        {LINES.map((l, i) => {
          /* each line drifts at its own pace - depth parallax */
          const x = -l.speed * 1200 * t;
          /* the far lines swell and ebb instead of holding one opacity */
          const breathe = 0.75 + 0.25 * Math.sin(t * Math.PI * 2 + i * 1.7);
          return (
            <g key={i} transform={`translate(${x.toFixed(1)} 0)`} filter={l.blur ? `url(#b${i})` : undefined}>
              <path
                d={PATHS[i]}
                fill="none"
                stroke="url(#endfade)"
                strokeOpacity={l.opacity * breathe}
                strokeWidth={l.width}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      {/* frosted status pill - lines stay visible through it */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          background: 'rgba(255,255,255,.34)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 999,
          padding: '26px 46px',
          opacity: env,
          filter: pillBlur > 0.2 ? `blur(${pillBlur.toFixed(1)}px)` : undefined,
          transform: `scaleX(${pillScale.toFixed(3)})`,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 30,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '.02em',
            opacity: textFade,
            whiteSpace: 'nowrap',
          }}
        >
          {phrase.slice(0, typed)}
        </span>
        <span style={{width: 15, height: 15, borderRadius: '50%', background: '#fff', opacity: dot * textFade}} />
      </div>

      {/* corner mark */}
      <div
        style={{
          position: 'absolute',
          left: 44,
          top: 38,
          fontFamily: MONO,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '.08em',
          color: 'rgba(255,255,255,.85)',
          opacity: env,
        }}
      >
        {'π·NOVA'}
      </div>
    </AbsoluteFill>
  );
};
