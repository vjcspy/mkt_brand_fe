import React, { useRef } from "react";
import { Sections } from "../../../sections";
import Portal from "./portal";
import _ from "lodash";
import useWindowResize from "../../../hooks/useWindowResize";
import { DialogBackground, DialogBody, DialogHeader, DialogWrapper } from "./styled";
import { SectionItem } from "../../components/sectionsConfig/styled";

const AddSectionDialog = ({ dialog, onClose, addSection }) => {
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
            <h3>Add Section</h3>
          </DialogHeader>
          <DialogBody>
            {_.map(Sections, (section) => (
              <SectionItem
                key={section.defaultConfig.name}
                onClick={() => {
                  addSection?.(section);
                  onClose?.();
                }}
              >
                {section.defaultConfig.title}
              </SectionItem>
            ))}
          </DialogBody>
        </DialogWrapper>
      </DialogBackground>
    </Portal>
  ) : null;
};

export default AddSectionDialog;
