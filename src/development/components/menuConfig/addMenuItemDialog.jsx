import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import useWindowResize from "../../../hooks/useWindowResize";
import { DevInput, DevSecondaryButton } from "../../../styles/developmentStyle";
import Portal from "../../containers/developmentDialog/portal";
import { DialogBackground, DialogBody, DialogFooter, DialogHeader, DialogWrapper } from "../../containers/developmentDialog/styled";
import { ComponentWrapper } from "../developmentComponentType/styled";

const AddMenuItemDialog = ({ dialog, onClose, onAddMenuItem }) => {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
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
            <h3>Add Menu Item</h3>
          </DialogHeader>
          <DialogBody>
            <ComponentWrapper>
              <label htmlFor="menu-item-label">Label</label>
              <DevInput name="menu-item-label" value={label} onChange={(e) => setLabel(e.target.value)} />
            </ComponentWrapper>
            <ComponentWrapper>
              <label htmlFor="menu-item-url">Url</label>
              <DevInput name="menu-item-url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </ComponentWrapper>
          </DialogBody>
          <DialogFooter>
            <DevSecondaryButton
              disabled={isEmpty(label) || isEmpty(url)}
              onClick={() => {
                onAddMenuItem({ label, url }, dialog.path, dialog.count);
                setLabel("");
                setUrl("");
                onClose();
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

export default AddMenuItemDialog;
