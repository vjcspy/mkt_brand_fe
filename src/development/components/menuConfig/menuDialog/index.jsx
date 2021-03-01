import { isEmpty, map, toUpper } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import useWindowResize from "../../../../hooks/useWindowResize";
import { DevInput, DevSecondaryButton } from "../../../../styles/developmentStyle";
import Portal from "../../../containers/developmentDialog/portal";
import { DialogBackground, DialogBody, DialogFooter, DialogHeader, DialogWrapper } from "../../../containers/developmentDialog/styled";
import { ComponentWrapper } from "../../developmentComponentType/styled";
import translations from "../../../../translations";
import { RadioButton } from "../../../../styles";

const MenuDialog = ({ dialog, onClose, onAddMenuItem }) => {
  const [label, setLabel] = useState({});
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState();
  const size = useWindowResize();
  const ref = useRef();
  const bgClass = size.height > (ref.current?.innerHeight ?? 0) ? "center" : "top";

  useEffect(() => {
    if (dialog.value) {
      setLabel(dialog.value.label);
      setUrl(dialog.value.url);
      setApiKey(dialog.value.apiKey);
    } else {
      setLabel({});
      setUrl();
    }
  }, [dialog]);

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
            {map(translations, (_, key) => (
              <ComponentWrapper key={key}>
                <label htmlFor="menu-item-label">Label {toUpper(key)}</label>
                <DevInput
                  name="menu-item-label"
                  value={label[key] ?? ""}
                  onChange={(e) => {
                    setLabel({ ...label, [key]: e.target.value });
                  }}
                  style={{ width: 400 }}
                />
              </ComponentWrapper>
            ))}

            <ComponentWrapper>
              <label htmlFor="menu-item-url">Url</label>
              <DevInput
                name="menu-item-url"
                value={url ?? ""}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                style={{ width: 400 }}
              />
            </ComponentWrapper>
            {dialog.showApi && (
              <ComponentWrapper>
                <RadioButton
                  checked={apiKey === "menu"}
                  onClick={() => {
                    setApiKey("menu");
                  }}
                >
                  Api Menu
                </RadioButton>
                <RadioButton
                  style={{ marginTop: 10 }}
                  checked={apiKey === "promo"}
                  onClick={() => {
                    setApiKey("promo");
                  }}
                >
                  Api Promo
                </RadioButton>
              </ComponentWrapper>
            )}
          </DialogBody>
          <DialogFooter>
            <DevSecondaryButton
              disabled={isEmpty(label) || isEmpty(url)}
              onClick={() => {
                onAddMenuItem({ ...dialog.value, label, url, apiKey }, dialog.path, dialog.index);
                setLabel({});
                setUrl("");
                setApiKey();
                onClose();
              }}
            >
              {dialog.value ? "Update" : "Add"}
            </DevSecondaryButton>
          </DialogFooter>
        </DialogWrapper>
      </DialogBackground>
    </Portal>
  ) : null;
};

export default MenuDialog;
