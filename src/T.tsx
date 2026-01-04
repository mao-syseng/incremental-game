import { cols, letters, rows } from "./helpers";
import TCell from "./TCell";
import type { S } from "./types";

export default function T({ s }: { s: S }) {
  return (
    <div className="overflow-auto">
      <table className="striped" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th scope="col">↘</th>
            {letters.map((x) => (
              <th key={x} scope="col">
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((x) => (
            <tr key={x}>
              <th scope="row">{x}</th>
              {cols.map((y) => (
                <TCell
                  key={`${x}-${y}`}
                  isPlayer={s.pos[0] === y && s.pos[1] === x}
                  isTrail={s.trail.some(([tx, ty]) => tx === y && ty === x)}
                  isOppie={s.oppies.some(([ox, oy]) => ox === y && oy === x)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
