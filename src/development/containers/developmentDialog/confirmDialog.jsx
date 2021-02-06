import React, { useRef } from "react";
import useWindowResize from "../../../hooks/useWindowResize";
import Portal from "./portal";
import { DialogBackground, DialogBody, DialogFooter, DialogHeader, DialogWrapper } from "./styled";

const ConfirmDialog = ({ dialog, onClose }) => {
  const size = useWindowResize();
  const ref = useRef();
  const bgClass = size.height > (ref.current?.innerHeight ?? 0) ? "center" : "top";

  return dialog?.show ? (
    <Portal className="development-dialog">
      <DialogBackground
        className={bgClass}
        onClick={(e) => {
          if (e.target.classList.contains(DialogBackground.styledComponentId)) {
            onClose?.();
          }
        }}
      >
        <DialogWrapper ref={ref}>
          <DialogHeader>
            <h3>{dialog.title}</h3>
          </DialogHeader>
          <DialogBody>{dialog.body}</DialogBody>
          {dialog.buttons && <DialogFooter>{dialog.buttons}</DialogFooter>}
        </DialogWrapper>
      </DialogBackground>
    </Portal>
  ) : null;
};

export default ConfirmDialog;
