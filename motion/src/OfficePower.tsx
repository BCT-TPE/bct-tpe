import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/* Office Power control-plane panel - a port of the CSS loop on the home page.
   Starting point only: swap LOG lines, stats and colors freely in Studio. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const RED = '#e14b4b';

const STATS = [
  {v: '$1,284', k: 'COST / MO'},
  {v: '6', k: 'AGENTS ONLINE'},
  {v: '3,912', k: 'MESSAGES'},
];

const LOG = [
  {tag: '▲ DEPLOY', rest: ' HR helper → Discord'},
  {tag: '⛔ GUARDRAIL', rest: ' keyword "salary" blocked'},
  {tag: '$ BILLING', rest: ' $1,284 of $3,000 budget'},
  {tag: '◇ UPLOAD', rest: ' policy_v2 · live instantly'},
  {tag: '✓ AUDIT', rest: ' 3,912 conversations traceable'},
];

const LINE_WINDOW = 60; // frames each line stays highlighted (2s at 30fps)

export const OfficePower: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#0f1117', padding: 56, fontFamily: MONO}}>
      {/* browser bar */}
      <div style={{display: 'flex', alignItems: 'center', gap: 14, color: '#8b93a3', fontSize: 22, fontWeight: 600}}>
        <Dot c={RED} />
        <Dot c="#2a2f3c" />
        <Dot c="#2a2f3c" />
        <span style={{marginLeft: 16}}>officepower.local / dashboard</span>
        <span style={{marginLeft: 'auto', color: '#4ade80', letterSpacing: '.12em', opacity: pulse(frame)}}>LIVE</span>
      </div>

      {/* stat tiles */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 40}}>
        {STATS.map((s) => (
          <div key={s.k} style={{background: '#171b25', border: '1px solid #232936', borderRadius: 18, padding: '28px 32px'}}>
            <div style={{fontSize: 42, color: '#fff', fontWeight: 700, fontFamily: 'system-ui'}}>{s.v}</div>
            <div style={{fontSize: 19, letterSpacing: '.08em', color: '#77808f', marginTop: 8}}>{s.k}</div>
          </div>
        ))}
      </div>

      {/* cycling ops log */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 26, marginTop: 52, fontSize: 24, lineHeight: 1.5, color: '#aeb6c4'}}>
        {LOG.map((l, i) => {
          const t = (frame - i * LINE_WINDOW + 300) % 300; // this line's local clock
          const hot = interpolate(t, [0, 8, 45, 60], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
          const opacity = 0.28 + 0.72 * hot;
          const x = 8 * hot;
          return (
            <div key={l.tag} style={{opacity, transform: `translateX(${x}px)`}}>
              <span style={{fontWeight: 700, color: RED}}>{l.tag}</span>
              {l.rest}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Dot: React.FC<{c: string}> = ({c}) => (
  <span style={{width: 16, height: 16, borderRadius: '50%', background: c, display: 'inline-block'}} />
);

/* gentle 1s LIVE pulse that ends where it starts (loop-safe) */
const pulse = (frame: number) => 0.7 + 0.3 * Math.abs(Math.sin((frame / 30) * Math.PI));
