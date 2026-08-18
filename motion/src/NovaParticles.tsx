import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/* NOVA panel: the particle story in NOVA's own palette.
   Charcoal fragments drift on the warm-white ground, converge into a red
   point (the message), then bloom into the outline of a page with text
   lines (the product) while two cursors orbit it (the collaboration).
   1200x800, 24fps, 10s, loop-safe, fully deterministic. */

const W = 1200, H = 800, CX = W / 2, CY = H / 2;
const N = 300;

const RED = '#d80011';
const INK = '#070402';

const rand = (() => {
  let s = 424242;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
})();

/* target shape: a page outline (rounded portrait rect) + three text lines */
const pageTargets = (() => {
  const pts: [number, number][] = [];
  const pw = 340, ph = 460, x0 = CX - pw / 2, y0 = CY - ph / 2;
  const per = 2 * (pw + ph);
  const M = Math.round(N * 0.62);
  for (let i = 0; i < M; i++) {
    let d = (i / M) * per;
    let x, y;
    if (d < pw) { x = x0 + d; y = y0; }
    else if (d < pw + ph) { x = x0 + pw; y = y0 + (d - pw); }
    else if (d < 2 * pw + ph) { x = x0 + pw - (d - pw - ph); y = y0 + ph; }
    else { x = x0; y = y0 + ph - (d - 2 * pw - ph); }
    pts.push([x + (rand() - 0.5) * 7, y + (rand() - 0.5) * 7]);
  }
  /* interior: a hero bar + three text lines */
  const lines = [
    {y: y0 + 92, w: 210},
    {y: y0 + 180, w: 250},
    {y: y0 + 232, w: 250},
    {y: y0 + 284, w: 180},
  ];
  let li = 0;
  for (let i = M; i < N; i++) {
    const L = lines[li % lines.length]; li++;
    pts.push([CX - L.w / 2 + rand() * L.w, L.y + (rand() - 0.5) * 8]);
  }
  return pts;
})();

type P = {x0: number; y0: number; drift: number; size: number; tw: number; red: boolean};
const PARTICLES: P[] = Array.from({length: N}, (_, i) => ({
  x0: rand() * W,
  y0: rand() * H * 0.92,
  drift: 0.35 + rand() * 1.1,
  size: 1.3 + rand() * 2.1,
  tw: rand() * Math.PI * 2,
  red: rand() < 0.085,             /* a sprinkle of NOVA red among the charcoal */
}));

const ease = (t: number) => t * t * (3 - 2 * t);

const BEATS = [
  {text: 'From a plain message', from: 0.05, to: 0.3},
  {text: 'a page takes shape', from: 0.38, to: 0.62},
  {text: 'edited live, together', from: 0.7, to: 0.96},
];

export const NovaParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  const converge = ease(interpolate(t, [0.28, 0.44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const bloom = ease(interpolate(t, [0.58, 0.72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const dot = interpolate(t, [0.38, 0.46, 0.62, 0.7], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const env = interpolate(t, [0, 0.05, 0.955, 1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gAng = 135 + Math.sin(t * Math.PI * 2) * 14;
  const stop = 55 + Math.sin(t * Math.PI * 2) * 16;

  /* collaborating cursors ride the page perimeter in the last act */
  const cursors = interpolate(t, [0.72, 0.78, 0.955, 1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pw = 340, ph = 460, x0 = CX - pw / 2, y0 = CY - ph / 2, per = 2 * (pw + ph);
  const onPerim = (d: number): [number, number] => {
    d = ((d % per) + per) % per;
    if (d < pw) return [x0 + d, y0];
    if (d < pw + ph) return [x0 + pw, y0 + (d - pw)];
    if (d < 2 * pw + ph) return [x0 + pw - (d - pw - ph), y0 + ph];
    return [x0, y0 + ph - (d - 2 * pw - ph)];
  };
  const c1 = onPerim(t * per * 2.1);
  const c2 = onPerim(per * 0.55 - t * per * 1.6);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gAng}deg,#f8f4f2 0%,#efeae7 ${stop}%,#e8e2de 100%)`,
        justifyContent: 'center', alignItems: 'center',
      }}
    >
      <div style={{position: 'absolute', inset: 0,
        background: 'radial-gradient(62% 58% at 50% 44%, rgba(255,255,255,.55), transparent 72%)'}} />

      <svg viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
        {PARTICLES.map((p, i) => {
          const sy = (p.y0 + frame * p.drift) % H;
          const sx = p.x0 + Math.sin(frame / 42 + p.tw) * 7;
          const cx1 = sx + (CX - sx) * converge;
          const cy1 = sy + (CY - sy) * converge;
          const [tx, ty] = pageTargets[i];
          const x = cx1 + (tx - cx1) * bloom;
          const y = cy1 + (ty - cy1) * bloom;
          /* caption keep-out: ease particles out of the text ellipse */
          const keep = Math.max(...BEATS.map((b) =>
            interpolate(t, [b.from, b.from + 0.05, b.to - 0.05, b.to], [0, 1, 1, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
          let px = x, py = y;
          if (keep > 0) {
            const ex = (px - CX) / 300, ey = (py - CY) / 74, ed = Math.hypot(ex, ey);
            if (ed < 1 && ed > 0.0001) {
              const bx = CX + (ex / ed) * 300, by = CY + (ey / ed) * 74;
              const f = ease(1 - ed) * keep;
              px += (bx - px) * f; py += (by - py) * f;
            }
          }
          const hid = converge > 0.96 && bloom < 0.04 ? 0 : 1;
          const tw = 0.5 + 0.5 * Math.abs(Math.sin(frame / 15 + p.tw));
          return <circle key={i} cx={px} cy={py} r={p.size} fill={p.red ? RED : INK}
            opacity={env * hid * tw * (p.red ? 0.85 : 0.55)} />;
        })}
        {/* the message dot */}
        <circle cx={CX} cy={CY + 108} r={11 + 2 * Math.sin(frame / 5)} fill={RED} opacity={dot}
          style={{filter: 'drop-shadow(0 0 16px rgba(216,0,17,.55))'}} />
        {/* collaborating cursors */}
        <circle cx={c1[0]} cy={c1[1]} r={7} fill={RED} opacity={cursors} />
        <circle cx={c2[0]} cy={c2[1]} r={7} fill={INK} opacity={cursors * 0.8} />
      </svg>

      {BEATS.map((b) => {
        const o = interpolate(t, [b.from, b.from + 0.05, b.to - 0.05, b.to], [0, 1, 1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div key={b.text}
            style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: INK, fontFamily: 'system-ui', fontWeight: 600, fontSize: 34,
              opacity: o, textShadow: '0 1px 14px rgba(248,244,242,.8)'}}>
            {b.text}
          </div>
        );
      })}

      <div style={{position: 'absolute', left: 44, top: 38, fontFamily: 'ui-monospace,Menlo,monospace',
        fontSize: 20, fontWeight: 700, letterSpacing: '.08em', color: INK, opacity: env}}>
        {'π·NOVA'}
      </div>
    </AbsoluteFill>
  );
};
