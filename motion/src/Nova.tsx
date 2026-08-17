import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/* NOVA panel in the Manyone COMPETE visual language:
   a slowly-drifting warm gradient, one thin line drawing itself across
   the frame, and a centered pill that typewrites cycling status phrases.
   Swap PHRASES / colors freely - everything is loop-safe. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* the three beats of the NOVA story - one per cycle */
const PHRASES = ['Generating page', 'Mounting MCP server', 'Editing together'];

export const Nova: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames; // 0..1 through the loop

  /* gradient drift: angle + stop positions wander and return (loop-safe sine) */
  const drift = Math.sin(t * Math.PI * 2);
  const angle = 135 + drift * 12;
  const stop = 50 + drift * 14;

  /* one cycle of the pill per phrase */
  const per = durationInFrames / PHRASES.length;
  const idx = Math.min(PHRASES.length - 1, Math.floor(frame / per));
  const local = frame - idx * per; // frame within this phrase's window
  const phrase = PHRASES[idx];
  const typed = Math.round(
    interpolate(local, [10, 10 + phrase.length * 2.2], [0, phrase.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const pillIn = interpolate(local, [0, 8, per - 10, per - 2], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const dot = 0.35 + 0.65 * Math.abs(Math.sin((local / 30) * Math.PI * 2));

  /* three organic lines (COMPETE-style): layered irregular sines sampled
     into smooth paths - no repeating wave pattern. Lower two draw
     together, the middle one joins later; all fade at the tail. */
  const draw = (from: number, to: number) =>
    interpolate(t, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const drawnA = draw(0.04, 0.82);
  const drawnB = draw(0.06, 0.88);
  const drawnC = draw(0.34, 0.94);
  const lineFade = interpolate(t, [0.92, 0.995], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #d94f42 0%, #e8836a ${stop}%, #f2b48c 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* soft inner glow, breathing with the loop */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(60% 55% at 50% 42%, rgba(255,255,255,.16), transparent 70%)',
          opacity: 0.6 + 0.4 * Math.abs(drift),
        }}
      />

      {/* trend lines */}
      <svg
        viewBox="0 0 1200 800"
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: lineFade}}
      >
        <NaturalLine line={LINES[0]} progress={drawnA} stroke="rgba(255,255,255,.85)" width={3} />
        <NaturalLine line={LINES[1]} progress={drawnB} stroke="rgba(255,255,255,.5)" width={2.5} />
        <NaturalLine line={LINES[2]} progress={drawnC} stroke="rgba(255,255,255,.38)" width={2} />
      </svg>

      {/* status pill */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          background: 'rgba(255,255,255,.92)',
          borderRadius: 999,
          padding: '26px 44px',
          opacity: pillIn,
          transform: `scale(${0.94 + 0.06 * pillIn})`,
          boxShadow: '0 18px 50px rgba(120,30,20,.18)',
        }}
      >
        <span style={{fontFamily: MONO, fontSize: 30, fontWeight: 600, color: '#7a2c22', letterSpacing: '.02em'}}>
          {phrase.slice(0, typed)}
        </span>
        <span style={{width: 16, height: 16, borderRadius: '50%', background: '#c62828', opacity: dot}} />
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
        }}
      >
        {'π·NOVA'}
      </div>
    </AbsoluteFill>
  );
};

/* ---- organic line generation ------------------------------------------- */

type LineSpec = {
  base: number;          /* vertical anchor */
  fall: number;          /* overall drift: positive = ends higher */
  waves: [number, number, number][]; /* [amplitude, frequency, phase] */
};

/* hand-tuned specs: irrational-ish frequency ratios keep the curves from
   ever looking periodic - long calm stretches with natural swells */
const LINES: LineSpec[] = [
  {base: 545, fall: 320, waves: [[46, 2.13, 0.8], [22, 4.71, 2.9], [9, 8.39, 1.2]]},
  {base: 655, fall: 250, waves: [[34, 1.71, 3.7], [18, 3.93, 0.4], [7, 7.27, 5.1]]},
  {base: 295, fall: -90, waves: [[28, 1.93, 1.9], [14, 4.37, 4.4], [6, 9.11, 0.6]]},
];

const samplePath = (spec: LineSpec) => {
  const pts: [number, number][] = [];
  for (let x = -40; x <= 1260; x += 8) {
    const u = (x + 40) / 1300; /* 0..1 */
    /* ease the drift so it feels like a natural trend, not a straight slope */
    const drift = spec.fall * (u * u * (3 - 2 * u));
    let y = spec.base - drift;
    for (const [a, f, p] of spec.waves) {
      /* amplitude breathes along the length so no two stretches match */
      const amp = a * (0.55 + 0.45 * Math.sin(u * Math.PI * 1.3 + p * 0.7));
      y += amp * Math.sin(u * Math.PI * f + p);
    }
    pts.push([x, y]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0]} ${pts[i][1].toFixed(1)}`;
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return {d, len};
};

const PATHS = LINES.map(samplePath);

const NaturalLine: React.FC<{line: LineSpec; progress: number; stroke: string; width: number}> = ({
  line,
  progress,
  stroke,
  width,
}) => {
  const {d, len} = PATHS[LINES.indexOf(line)];
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={len}
      strokeDashoffset={len * (1 - progress)}
    />
  );
};
