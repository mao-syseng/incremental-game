interface P {
  isPlayer: boolean;
  isTrail: boolean;
  isOppie: boolean;
}
export default function TCell({ isPlayer, isTrail, isOppie }: P) {
  return <td>{isPlayer ? "@" : isTrail ? "o" : isOppie ? "x" : ""}</td>;
}
