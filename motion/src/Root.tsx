import {Composition} from 'remotion';
import {OfficePower} from './OfficePower';
import {Nova} from './Nova';
import {Particles} from './Particles';

/* Both panels render at 1200x800 (3:2, close to the on-page panel box).
   Keep the last frame visually identical to the first so <video loop>
   plays seamlessly. */
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="OfficePower"
        component={OfficePower}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={800}
      />
      <Composition
        id="Nova"
        component={Nova}
        durationInFrames={300}
        fps={30}
        width={1200}
        height={800}
      />
      <Composition
        id="Particles"
        component={Particles}
        durationInFrames={216}
        fps={24}
        width={720}
        height={720}
      />
    </>
  );
};
