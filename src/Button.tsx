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
    if (isPressed)
      return {
        corner: pressedCornerChar,
        top: pressedBorderChar,
        bottom: pressedBorderChar,
      };

    if (isHovered)
      return {
        corner: hoverCornerChar,
        top: "‾",
        bottom: "_",
      };

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
        width: `${text.length + 2}ch`,
      }}
    >
      {topBorder}
      <br></br>|{text}|<br></br>
      {bottomBorder}
    </pre>
  );
}

export function AboutButton() {
  const [dialogRef, setDialogRef] = useState<HTMLDialogElement | null>(null);

  const handleClick = () => {
    dialogRef?.showModal();
  };

  const handleClose = () => {
    dialogRef?.close();
  };

  return (
    <>
      <pre
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "1ch",
          right: "2ch",
          cursor: "pointer",
          width: "1ch",
        }}
      >
        ⓘ
      </pre>
      <dialog
        ref={setDialogRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2ch",
          minWidth: "10ch",
        }}
      >
        <pre>
          A game about Birbs
          <br />
          <br />
          Inspired by Digseum
          <br />
          <br />
          <Button label="Close" onClick={handleClose} />
        </pre>
      </dialog>
    </>
  );
}
