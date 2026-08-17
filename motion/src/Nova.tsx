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

  /* three thin lines: the two lower ones draw together, the middle one
     joins later - all fade at the tail so the loop closes cleanly */
  const PATH_LEN = 1900;
  const draw = (from: number, to: number) =>
    interpolate(t, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const drawnA = draw(0.04, 0.82);       /* lower line 1 */
  const drawnB = draw(0.06, 0.88);       /* lower line 2, a beat behind */
  const drawnC = draw(0.34, 0.94);       /* middle line, arrives later */
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
        {/* lower pair - drawn together, slightly different waves */}
        <path
          d="M -40 560 C 180 520, 300 620, 460 540 S 720 330, 880 300 S 1120 220, 1260 150"
          fill="none"
          stroke="rgba(255,255,255,.85)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={PATH_LEN * (1 - drawnA)}
        />
        <path
          d="M -40 660 C 220 640, 360 700, 540 640 S 800 480, 980 440 S 1160 380, 1260 330"
          fill="none"
          stroke="rgba(255,255,255,.5)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={PATH_LEN * (1 - drawnB)}
        />
        {/* middle line - joins later, drifting the other way */}
        <path
          d="M -40 300 C 160 340, 320 250, 500 280 S 760 200, 940 230 S 1140 160, 1260 190"
          fill="none"
          stroke="rgba(255,255,255,.38)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={PATH_LEN * (1 - drawnC)}
        />
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
