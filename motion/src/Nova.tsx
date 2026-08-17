import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

/* NOVA "message -> generated page" panel - a port of the CSS loop.
   Starting point only: change the prompt text, page blocks and pacing in Studio. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const RED = '#c62828';
const CREAM = '#f3ede2';
const INK = '#17181d';

const PROMPT = 'Build a landing page for Acme Analytics - dark hero, three feature cards';

export const Nova: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  /* loop-safe global fade: everything exits at the tail so frame 0 == last frame */
  const exit = interpolate(frame, [durationInFrames - 20, durationInFrames - 4], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bubbleIn = spring({frame, fps, config: {damping: 200}, durationInFrames: 18});
  const genIn = interpolate(frame, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const typed = Math.round(interpolate(frame, [6, 46], [0, PROMPT.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const pageIn = spring({frame: frame - 70, fps, config: {damping: 200}, durationInFrames: 20});
  const heroIn = interpolate(frame, [95, 108], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const caret = Math.floor(frame / 10) % 2 === 0 ? 1 : 0;

  return (
    <AbsoluteFill style={{background: CREAM, padding: 52, fontFamily: 'system-ui'}}>
      <div style={{opacity: exit, display: 'flex', flexDirection: 'column', gap: 26, height: '100%'}}>
        {/* chat */}
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '78%',
            background: INK,
            color: CREAM,
            fontSize: 23,
            lineHeight: 1.5,
            padding: '18px 26px',
            borderRadius: '24px 24px 6px 24px',
            opacity: bubbleIn,
            transform: `translateY(${(1 - bubbleIn) * 20}px)`,
          }}
        >
          {PROMPT.slice(0, typed)}
        </div>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 21, letterSpacing: '.06em', color: RED, opacity: genIn}}>
          {'π·NOVA  Generating HTML'}
          <span style={{display: 'inline-block', width: 12, height: 22, marginLeft: 8, background: RED, verticalAlign: -3, opacity: caret}} />
        </div>

        {/* generated page */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2d9c8',
            borderRadius: 18,
            padding: 26,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            opacity: pageIn,
            transform: `translateY(${(1 - pageIn) * 24}px)`,
          }}
        >
          {/* hero block */}
          <div style={{height: 170, borderRadius: 12, background: INK, position: 'relative', overflow: 'hidden', opacity: heroIn}}>
            <div style={{position: 'absolute', left: 28, top: 46, width: `${44 * heroIn}%`, height: 24, borderRadius: 6, background: RED}} />
            <div style={{position: 'absolute', left: 28, top: 92, width: `${62 * heroIn}%`, height: 14, borderRadius: 6, background: 'rgba(255,255,255,.35)'}} />
          </div>
          {/* three cards */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20}}>
            {[0, 1, 2].map((i) => {
              const cardIn = spring({frame: frame - 125 - i * 12, fps, config: {damping: 200}, durationInFrames: 16});
              return (
                <div
                  key={i}
                  style={{
                    height: 120,
                    borderRadius: 12,
                    background: CREAM,
                    border: '1px solid #e2d9c8',
                    opacity: cardIn,
                    transform: `translateY(${(1 - cardIn) * 14}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
