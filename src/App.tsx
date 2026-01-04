import { useReducer, useEffect, useState } from "react";
import { defState, type A, type Dir, type S, type Pos } from "./types";
import T from "./T";
import { step, mx, my, getKeyAction } from "./helpers";

const randPos = (): Pos => [Math.floor(Math.random() * (mx + 1)), Math.floor(Math.random() * (my + 1))];

function reducer(s: S, a: A): S {
  switch (a.type) {
    case "set_p":
      return { ...s, tickCount: a.p };
    case "set_view":
      return { ...s, v: a.v };
    case "set_dir":
      return { ...s, dir: a.dir };
    case "turn_left":
      return {
        ...s,
        dir: ((s.dir + 3) % 4) as Dir,
      };
    case "turn_right":
      return {
        ...s,
        dir: ((s.dir + 1) % 4) as Dir,
      };
    case "tick": {
      let [nx, ny] = step(s.pos, s.dir);
      if (nx < 0) nx = mx;
      if (nx > mx) nx = 0;
      if (ny < 0) ny = my;
      if (ny > my) ny = 0;
      const oppieCollided = s.oppies.find(([ox, oy]) => ox === nx && oy === ny);
      const trailLength = oppieCollided ? s.trail.length + 1 : s.trail.length;
      let newOppies = s.oppies.filter(([ox, oy]) => !(ox === nx && oy === ny));
      while (newOppies.length < s.maxOppies) {
        newOppies.push(randPos());
      }
      return {
        ...s,
        pos: [nx, ny],
        tickCount: s.tickCount + 1,
        trail: [...s.trail, s.pos].slice(-trailLength),
        oppies: newOppies,
        oppiesSaved: oppieCollided ? s.oppiesSaved + 1 : s.oppiesSaved,
      };
    }
    default:
      return s;
  }
}

function App() {
  const [s, d] = useReducer(reducer, defState);
  const [tickReset, setTickReset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => d({ type: "tick" }), 333);
    return () => clearInterval(id);
  }, [tickReset]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const action = getKeyAction(e.key);
      if (action) {
        e.preventDefault();
        d({ type: action });
        d({ type: "tick" });
        setTickReset((n) => n + 1);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <>
      <header>
        <hgroup>
          <h1>Magic Table</h1>
          <p>Stop the jealous witch Cloverana from sabotaging your table!</p>
        </hgroup>
      </header>

      {s.v === 0 && (
        <>
          <p className="grid">
            <button onClick={() => d({ type: "set_view", v: 1 })}>
              Go to Table
            </button>
            <button
              className="secondary"
              onClick={() => d({ type: "set_view", v: 2 })}
            >
              Upgrades
            </button>
          </p>
        </>
      )}
      {s.v === 1 && (
        <>
          <h3>Table</h3>
          <section>
            <T s={s}></T>
          </section>
          <p className="grid">
            <button onClick={() => d({ type: "turn_left" })}>Turn Left</button>
            <button className="secondary" onClick={() => d({ type: "spin" })}>Spin</button>
            <button onClick={() => d({ type: "turn_right" })}>Turn Right</button>
          </p>
        </>
      )}
      {s.v === 2 && (
        <>
          <h3>Upgrades</h3>
          <p>
            <button
              className="secondary"
              onClick={() => d({ type: "set_view", v: 0 })}
            >
              Go back
            </button>
          </p>
          <article>
            <h4>Upgrades</h4>
          </article>
        </>
      )}
      <article>
        <p className="grid">
          <b data-tooltip="Points">* {s.tickCount}</b>
          <b data-tooltip="Opponents Defeated"># {s.oppiesSaved}</b>
        </p>
      </article>
    </>
  );
}

export default App;
