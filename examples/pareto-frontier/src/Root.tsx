import React from 'react';
import {Composition} from 'remotion';
import {ParetoWhiteboard} from './ParetoWhiteboard';

export const Root: React.FC = () => (
  <Composition
    id="ParetoWhiteboard"
    component={ParetoWhiteboard}
    durationInFrames={360}
    fps={30}
    width={1920}
    height={1080}
  />
);
