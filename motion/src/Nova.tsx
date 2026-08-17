import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/* NOVA panel in the Manyone COMPETE visual language.
   Measured off the reference (720x720, 24fps, 7.34s):
     - the whole composition ramps in over ~16% of the loop and out over ~10%
     - the pill arrives first as a blurred capsule, then the text types
     - strokes are DRAWN by a travelling tip along a wandering parametric
       path (steep hairpins, not gentle waves). Once a stroke finishes it
       stays but softens - blurring and dimming as it ages - while the next
       one is already being drawn, so the frame keeps evolving.
   Loop-safe: the envelope returns to zero at the tail. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* the three beats of the NOVA story - one per cycle */
const PHRASES = ['Generating page', 'Mounting MCP server', 'Editing together'];

/* Each stroke is a parametric curve, so x can double back and form the
   hairpins the reference has. birth/draw/fade are fractions of the loop. */
type Stroke = {
  x0: number; y0: number; x1: number; y1: number;
  ax: number; fx: number; px: number;   /* x wander */
  ay: number; fy: number; py: number;   /* y wander */
  birth: number; draw: number;
  width: number;
};

const STROKES: Stroke[] = [
  /* long sweep entering top-left, settling right */
  {x0: -80, y0: 170, x1: 1180, y1: 470, ax: 120, fx: 1.6, px: 0.4, ay: 190, fy: 2.2, py: 1.1, birth: 0.02, draw: 0.34, width: 2.6},
  /* low riser that climbs out to the upper right */
  {x0: -60, y0: 700, x1: 1240, y1: 250, ax: 90, fx: 2.1, px: 2.6, ay: 130, fy: 1.7, py: 0.2, birth: 0.16, draw: 0.32, width: 2.2},
  /* the tall hairpin: climbs, arcs over, comes back down */
  {x0: 330, y0: 820, x1: 700, y1: 830, ax: 250, fx: 1.0, px: 1.57, ay: -640, fy: 1.0, py: 0, birth: 0.34, draw: 0.30, width: 2.8},
  /* diagonal cutting down to the lower right */
  {x0: 120, y0: 330, x1: 1150, y1: 780, ax: 70, fx: 1.4, px: 4.0, ay: 90, fy: 2.6, py: 3.3, birth: 0.52, draw: 0.28, width: 2.0},
  /* late soft arc across the middle */
  {x0: -60, y0: 560, x1: 1220, y1: 330, ax: 110, fx: 1.9, px: 5.2, ay: 150, fy: 1.4, py: 2.4, birth: 0.66, draw: 0.26, width: 2.4},
];

/* sample a stroke into a polyline + its length (for dash animation) */
const buildPath = (s: Stroke) => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 160; i++) {
    const u = i / 160;
    const ease = u * u * (3 - 2 * u);
    const x = s.x0 + (s.x1 - s.x0) * ease + s.ax * Math.sin(u * Math.PI * s.fx + s.px) - s.ax * Math.sin(s.px);
    const y = s.y0 + (s.y1 - s.y0) * ease + s.ay * Math.sin(u * Math.PI * s.fy + s.py) - s.ay * Math.sin(s.py);
    pts.push([x, y]);
  }
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const d = 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');
  return {d, len};
};
const PATHS = STROKES.map(buildPath);

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

      {/* strokes */}
      <svg
        viewBox="0 0 1200 800"
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: env}}
      >
        <defs>
          {STROKES.map((_, i) => {
            /* a stroke softens as it ages: sharp while drawing, hazy once old */
            const age = t - STROKES[i].birth - STROKES[i].draw;
            const blur = Math.max(0, Math.min(9, age * 26));
            return (
              <filter key={i} id={`sb${i}`} x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation={blur.toFixed(2)} />
              </filter>
            );
          })}
        </defs>
        {STROKES.map((s, i) => {
          const {d, len} = PATHS[i];
          /* the travelling tip */
          const drawn = interpolate(t, [s.birth, s.birth + s.draw], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          if (drawn <= 0) return null;
          /* full strength while being drawn, then settling back as it ages */
          const age = Math.max(0, t - s.birth - s.draw);
          const alpha = interpolate(age, [0, 0.14, 0.45], [0.9, 0.5, 0.22], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,1)"
              strokeOpacity={alpha}
              strokeWidth={s.width}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - drawn)}
              filter={`url(#sb${i})`}
            />
          );
        })}
      </svg>

      {/* frosted status pill - strokes stay visible through it */}
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
