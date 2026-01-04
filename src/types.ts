type V = 0 | 1 | 2;
export type Pos = [number, number];
export type Dir = 0 | 1 | 2 | 3;

export interface S {
  v: V;
  pos: Pos;
  dir: Dir;
  tickCount: number;
  trail: Pos[];
  oppies: Pos[];
  oppiesSaved: number;
  maxOppies: number;
}

export type A =
  | { type: "set_p"; p: number }
  | { type: "set_view"; v: V }
  | { type: "set_dir"; dir: Dir }
  | { type: "spin" }
  | { type: "turn_left" }
  | { type: "turn_right" }
  | { type: "tick" };

export const defState: S = {
  v: 0,
  pos: [0, 0],
  dir: 1,
  tickCount: 0,
  trail: [],
  oppies: [[5, 5]],
  oppiesSaved: 0,
  maxOppies: 5,
};
