import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import useWindowResize from "../../../hooks/useWindowResize";
import { DevInput, DevSecondaryButton } from "../../../styles/developmentStyle";
import Portal from "../../containers/developmentDialog/portal";
import { DialogBackground, DialogBody, DialogFooter, DialogHeader, DialogWrapper } from "../../containers/developmentDialog/styled";
import { ComponentWrapper } from "../developmentComponentType/styled";

const AddMenuDialog = ({ dialog, onClose, onAddMenu }) => {
  const [title, setTitle] = useState("");
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
            <h3>Add Menu</h3>
          </DialogHeader>
          <DialogBody>
            <ComponentWrapper>
              <label htmlFor="menu-title">Title</label>
              <DevInput name="menu-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </ComponentWrapper>
          </DialogBody>
          <DialogFooter>
            <DevSecondaryButton
              disabled={isEmpty(title)}
              onClick={() => {
                onAddMenu?.(title);
                setTitle("");
              }}
            >
              Add
            </DevSecondaryButton>
          </DialogFooter>
        </DialogWrapper>
      </DialogBackground>
    </Portal>
  ) : null;
};

export default AddMenuDialog;
