import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/* Particle story in the style of the reference clip:
   fragments drift -> converge into one glowing point -> bloom into an
   orbiting ring. Three text beats ride the same timeline.
   720x720, 24fps, ~9s. All motion is deterministic (seeded LCG). */

const N = 260;
const SIZE = 720;
const CX = SIZE / 2, CY = SIZE / 2;

/* seeded PRNG so every render is identical */
const rand = (() => {
  let s = 1234567;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
})();

type P = {x0: number; y0: number; drift: number; ang: number; rad: number; size: number; tw: number};
const PARTICLES: P[] = Array.from({length: N}, (_, i) => ({
  x0: rand() * SIZE,               /* scattered start */
  y0: rand() * SIZE * 0.9,
  drift: 0.4 + rand() * 1.2,       /* fall speed while scattered */
  ang: (i / N) * Math.PI * 2 + rand() * 0.12,  /* ring slot */
  rad: 190 + (rand() - 0.5) * 34,  /* ring radius with jitter */
  size: 1 + rand() * 1.9,
  tw: rand() * Math.PI * 2,        /* twinkle phase */
}));

const ease = (t: number) => t * t * (3 - 2 * t);

const BEATS = [
  {text: 'From fragments', from: 0.06, to: 0.3},
  {text: 'to vision', from: 0.38, to: 0.62},
  {text: 'by AI acceleration', from: 0.7, to: 0.97},
];

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  /* phases: 0-0.33 scattered / 0.33-0.62 converge+dot / 0.62-1 ring */
  const converge = ease(interpolate(t, [0.3, 0.45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const bloom = ease(interpolate(t, [0.62, 0.74], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const spin = interpolate(t, [0.62, 1], [0, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dot = interpolate(t, [0.4, 0.48, 0.66, 0.74], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const env = interpolate(t, [0, 0.05, 0.96, 1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  /* background: teal-blue gradient slowly swinging */
  const gAng = 150 + Math.sin(t * Math.PI * 2) * 25;

  return (
    <AbsoluteFill style={{background: '#bfe6e2', justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          position: 'absolute', inset: 26, borderRadius: 10, overflow: 'hidden',
          background: `linear-gradient(${gAng}deg, #1537a8 0%, #2f6fd0 34%, #2fa8b8 62%, #bfe9e4 100%)`,
          boxShadow: '0 30px 80px rgba(20,60,120,.25)',
        }}
      >
        {/* soft moving glow */}
        <div style={{position: 'absolute', inset: 0,
          background: `radial-gradient(55% 50% at ${30 + 40 * Math.sin(t * 6.28)}% ${70 - 30 * Math.sin(t * 6.28)}%, rgba(255,255,255,.34), transparent 70%)`}} />

        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
          {PARTICLES.map((p, i) => {
            /* scattered position drifts downward, wraps */
            const sy = (p.y0 + frame * p.drift) % SIZE;
            const sx = p.x0 + Math.sin(frame / 40 + p.tw) * 6;
            /* ring position, orbiting */
            const a = p.ang + spin * Math.PI * 2 * 0.35;
            const rx = CX + Math.cos(a) * p.rad;
            const ry = CY + Math.sin(a) * p.rad;
            /* converge target is the centre dot */
            const cx1 = sx + (CX - sx) * converge;
            const cy1 = sy + (CY - sy) * converge;
            const x = cx1 + (rx - cx1) * bloom;
            const y = cy1 + (ry - cy1) * bloom;
            /* while fully converged, hide individual particles inside the dot */
            const hid = converge > 0.96 && bloom < 0.04 ? 0 : 1;
            const tw = 0.45 + 0.55 * Math.abs(Math.sin(frame / 14 + p.tw));
            return <circle key={i} cx={x} cy={y} r={p.size} fill="#fff" opacity={env * hid * tw * 0.9} />;
          })}
          {/* the vision dot */}
          <circle cx={CX} cy={CY + 14} r={10 + 2 * Math.sin(frame / 5)} fill="#fff" opacity={dot}
            style={{filter: 'drop-shadow(0 0 18px rgba(255,255,255,.9))'}} />
        </svg>

        {/* text beats */}
        {BEATS.map((b) => {
          const o = interpolate(t, [b.from, b.from + 0.05, b.to - 0.05, b.to], [0, 1, 1, 0],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={b.text}
              style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'system-ui', fontWeight: 600, fontSize: 25, letterSpacing: '.01em',
                opacity: o, textShadow: '0 2px 18px rgba(10,40,90,.35)',
                transform: b.text === 'to vision' ? 'translateY(-26px)' : 'none'}}>
              {b.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
