import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import rough from 'roughjs';
import {ALL_SIX, DATA, INTELLIGENCE_COST} from './data';

const ink = '#171717';
const paper = '#fbfaf7';
const blue = '#4c6fff';
const warm = '#f08a5d';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const scale = (value: number, min: number, max: number, a: number, b: number) => a + (b - a) * ((value - min) / (max - min));

const RoughLine = ({x1, y1, x2, y2, seed}: {x1: number; y1: number; x2: number; y2: number; seed: number}) => {
  const paths = useMemo(() => rough.generator().toPaths(rough.generator().line(x1, y1, x2, y2, {
    seed, stroke: ink, strokeWidth: 4, roughness: 0.85, bowing: 0.7,
  })), [seed, x1, x2, y1, y2]);
  return <>{paths.map((path, i) => <path key={i} d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} fill={path.fill} />)}</>;
};

const Axis = ({x1, y1, x2, y2, label}: {x1: number; y1: number; x2: number; y2: number; label: string}) => (
  <>
    <svg style={{position: 'absolute', inset: 0}} width="1920" height="1080">
      <RoughLine x1={x1} y1={y1} x2={x2} y2={y2} seed={x1 + y1 + x2 + y2} />
    </svg>
    <div style={{position: 'absolute', left: x2 - 280, top: y2 + 24, fontSize: 34}}>{label}</div>
  </>
);

export const ParetoWhiteboard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = interpolate(frame, [0, 30, 100, 125], [0, 1, 1, 0], clamp);
  const chart = spring({frame: frame - 105, fps, config: {damping: 18}});
  const six = interpolate(frame, [225, 290], [0, 1], clamp);
  const conclusion = interpolate(frame, [310, 345], [0, 1], clamp);

  return (
    <AbsoluteFill style={{background: paper, color: ink, fontFamily: 'WhiteboardFont, Comic Sans MS, cursive', overflow: 'hidden'}}>
      <style>{`@font-face{font-family:WhiteboardFont;src:url('${staticFile('WhiteboardFont-Regular.woff2')}') format('woff2');}`}</style>
      <div style={{position: 'absolute', inset: 0, opacity: intro, display: 'grid', placeItems: 'center'}}>
        <div style={{width: 1320, textAlign: 'center'}}>
          <div style={{fontSize: 76, lineHeight: 1.25}}>“There are no solutions.<br/>There are only trade-offs.”</div>
          <div style={{fontSize: 36, color: '#666', marginTop: 36}}>— Thomas Sowell</div>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: chart}}>
        <div style={{position: 'absolute', left: 110, top: 70, fontSize: 58}}>A frontier is a set of undefeated trade-offs</div>
        <Axis x1={220} y1={870} x2={1710} y2={870} label={six < 0.5 ? 'cost →' : 'cost →  ·  color = coding  ·  area = time'} />
        <Axis x1={220} y1={870} x2={220} y2={220} label="" />
        <div style={{position: 'absolute', left: 48, top: 430, fontSize: 34, transform: 'rotate(-90deg)'}}>intelligence →</div>
        {DATA.map((d, i) => {
          const x = scale(Math.log10(d.cost), Math.log10(0.02), Math.log10(2.75), 260, 1640);
          const y = scale(d.intelligence, 40, 60, 820, 250);
          const is2d = INTELLIGENCE_COST.has(d.id);
          const is6d = ALL_SIX.has(d.id);
          const radius = 15 + six * scale(d.timeMinutes, 0.6, 9.2, 0, 32);
          const color = six > 0.05 ? `hsl(${scale(d.coding, 56, 79, 18, 225)} 70% 55%)` : is2d ? blue : '#b8b6af';
          const appear = spring({frame: frame - 125 - i * 3, fps, config: {damping: 16}});
          return (
            <div key={d.id} style={{position: 'absolute', left: x - radius, top: y - radius, opacity: appear, transform: `scale(${appear})`}}>
              <div style={{width: radius * 2, height: radius * 2, borderRadius: '48% 52% 50% 46%', background: color, border: `${is6d && six > 0.7 ? 6 : 3}px solid ${is6d && six > 0.7 ? ink : paper}`, boxShadow: is2d && six < 0.5 ? `0 0 0 4px ${ink}` : undefined}} />
              <div style={{position: 'absolute', left: radius * 2 + 10, top: -3, fontSize: 25, whiteSpace: 'nowrap', opacity: frame > 170 ? 1 : 0}}>{d.label}</div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 260, bottom: 46, fontSize: 32, color: six > 0.7 ? ink : blue}}>
          {six < 0.5 ? 'blue points: Pareto-optimal on intelligence × cost' : 'black rings: Pareto-optimal across all six dimensions'}
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: conclusion, background: `rgba(251,250,247,${conclusion * 0.94})`, display: 'grid', placeItems: 'center'}}>
        <div style={{fontSize: 76, textAlign: 'center', maxWidth: 1450}}>The “best” choice is not one point.<br/><span style={{color: warm}}>It is the trade-off that fits your objective.</span></div>
      </div>
    </AbsoluteFill>
  );
};
