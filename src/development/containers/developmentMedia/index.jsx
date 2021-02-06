import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_MEDIA_DIALOG } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";
import useWindowResize from "../../../hooks/useWindowResize";
import Portal from "../developmentDialog/portal";
import { DialogBackground, DialogWrapper } from "../developmentDialog/styled";
import MediaAdd from "./mediaAdd";
import MediaList from "./mediaList";
import MediaUpload from "./mediaUpload";

const LIST = "LIST";
const ADD = "ADD";
const UPLOAD = "UPLOAD";

const MediaDialog = () => {
  const dispatch = useDispatch();
  const setDialog = useCallback((dialog) => dispatch({ type: SET_MEDIA_DIALOG, value: dialog }), []);
  const dialog = useFromJS(["mediaDialog"]);

  const [state, setState] = useState(LIST);
  const size = useWindowResize();
  const ref = useRef();
  const bgClass = size.height > (ref.current?.innerHeight ?? 0) ? "center" : "top";

  const handleAdd = useCallback(() => {
    setState(ADD);
  }, []);

  const handleBack = useCallback(() => {
    setState(LIST);
  }, []);

  const handleUpload = useCallback(() => {
    setState(UPLOAD);
  }, []);

  const handleClose = useCallback(() => {
    setDialog({ show: false });
  }, [setDialog]);

  const handleFinish = useCallback(
    (media) => {
      dialog?.onSuccess?.(media);
      setDialog({ show: false });
    },
    [dialog, setDialog]
  );

  return dialog?.show ? (
    <Portal className="media-dialog">
      <DialogBackground
        className={bgClass}
        onClick={(e) => {
          if (e.target.classList.contains(DialogBackground.styledComponentId)) {
            handleClose();
          }
        }}
      >
        <DialogWrapper>
          {state == LIST ? (
            <MediaList handleAdd={handleAdd} handleClose={handleClose} handleFinish={handleFinish} />
          ) : state === ADD ? (
            <MediaAdd handleBack={handleBack} handleClose={handleClose} handleUpload={handleUpload} />
          ) : state === UPLOAD ? (
            <MediaUpload handleBack={handleBack} handleClose={handleClose} handleFinish={handleFinish} />
          ) : null}
        </DialogWrapper>
      </DialogBackground>
    </Portal>
  ) : null;
};

// const mapStateToProps = (state) => ({
//   dialog: state.get("mediaDialog")?.toJS(),
// });

// const mapDispatchToProps = (dispatch) => ({
//   setDialog: (dialog) => dispatch({ type: SET_MEDIA_DIALOG, value: dialog }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MediaDialog);
export default MediaDialog;
