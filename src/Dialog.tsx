import { forwardRef } from "react";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  size?: "small" | "medium" | "large";
}

export const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, onClose, size = "medium" }, ref) => {
    return (
      <dialog
        ref={ref}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2ch",
          width: getWidth(size),
        }}
      >
        <pre>
          {children}
          <br />
          <br />
          <Button label="Close" onClick={onClose} />
        </pre>
      </dialog>
    );
  }
);

function getWidth(size: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return "20ch";
    case "medium":
      return "30ch";
    case "large":
      return "40ch";
    default:
      return "20ch";
  }
}
