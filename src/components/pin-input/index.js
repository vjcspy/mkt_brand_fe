import React, { useState, useEffect, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Wrapper, Code } from "./style";

const PinInput = forwardRef(({ length = 6, value, type, isSecured, onChange }, ref) => {
  const [modified, setModified] = useState([]);
  const [focus, setFocus] = useState();

  const handleChange = useCallback(
    (e) => {
      let val = `${e.target.value}`.replace(/[^\d]/g, "");
      if (modified.join("") !== val) {
        let modify = [];
        for (let i = 0; i < length; i++) {
          modify.push(val[i] || "");
        }
        setModified(modify);
        onChange && onChange(val);
      }
    },
    [modified, length, onChange]
  );

  const onFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  const onSetFocus = useCallback(() => {
    ref && ref.current.focus();
  }, [ref]);

  useEffect(() => {
    // if (modified.length !== length || modified.join("") !== value) {
    let val = value || "";
    let modify = [];
    for (let i = 0; i < length; i++) {
      modify.push(val[i] || "");
    }
    setModified(modify);
    // }
  }, [value, length]);

  return (
    <Wrapper className={focus && "focus"} onClick={onSetFocus}>
      <input
        type={type ?? "text"}
        maxLength={length}
        value={value}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        // inputMode="numeric"
      />
      {modified.map((v, i) => (
        <Code key={i}>{isSecured && v ? "*" : v}</Code>
      ))}
    </Wrapper>
  );
});

PinInput.propTypes = {
  value: PropTypes.string,
  length: PropTypes.number,
  isSecured: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PinInput;
