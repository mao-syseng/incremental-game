import { useState } from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const cornerChar = "□";
const hoverCornerChar = "⬚";
const pressedCornerChar = "■";
const pressedBorderChar = "⋯";

export default function Button({ label, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const text = ` ${label} `;

  const getBorderChars = () => {
    if (isPressed) {
      return {
        corner: pressedCornerChar,
        top: pressedBorderChar,
        bottom: pressedBorderChar,
      };
    }

    if (isHovered) {
      return {
        corner: hoverCornerChar,
        top: "‾",
        bottom: "_",
      };
    }

    return {
      corner: cornerChar,
      top: "-",
      bottom: "-",
    };
  };

  const { corner, top, bottom } = getBorderChars();
  const topBorder = corner + top.repeat(text.length) + corner;
  const bottomBorder = corner + bottom.repeat(text.length) + corner;

  return (
    <pre
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        cursor: "pointer",
        userSelect: "none",
        width: "fit-content",
      }}
    >
      {topBorder}
      <br></br>|{text}|<br></br>
      {bottomBorder}
    </pre>
  );
}
