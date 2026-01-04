import type { Dir, Pos } from "./types";

export const cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
export const mx = cols.length - 1; // Max x index
export const my = rows.length - 1; // Max y index

export const step = (p: Pos, d: Dir): Pos =>
  [+p[0] + [0, 1, 0, -1][d], +p[1] + [-1, 0, 1, 0][d]] as Pos;

export const m: Record<string, number> = {
  ArrowUp: 0,
  ArrowRight: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
};

export const getKeyAction = (key: string): "turn_right" | "turn_left" | null => {
  if (key === "ArrowRight") return "turn_right";
  if (key === "ArrowLeft") return "turn_left";
  return null;
}