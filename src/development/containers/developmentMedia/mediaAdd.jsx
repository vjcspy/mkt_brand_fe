import React, { useRef, useState } from "react";
import { useTheme } from "styled-components";
import cn from "classnames";
import IconChevronLeft from "../../components/icons/icChevronLeft";
import IconUpload from "../../components/icons/icUpload";
import Tab from "../../components/tab";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import { DialogBody, DialogFooter, DialogHeader } from "../developmentDialog/styled";
import { BtnBack, FromURLWrapper, MediaContent, DragDropWrapper, MediaBodyWrapper } from "./styled";
import { ADD_FILES_UPLOAD, DOWNLOAD_FILE } from "../../../constants";
import { useDispatch } from "react-redux";

// const mapDispatchToProps = (dispatch) => ({
//   addFilesUpload: (files) =>
//     dispatch({
//       type: ADD_FILES_UPLOAD,
//       value: files,
//     }),
//   downloadFiles: (url) => dispatch({ type: DOWNLOAD_FILE, url }),
// });

const Tabs = [
  { title: "From Computer", name: "from_computer" },
  { title: "From Url", name: "from_url" },
];

const MediaAdd = ({ handleBack, handleUpload, handleClose }) => {
  const dispatch = useDispatch();

  const addFilesUpload = useCallback(
    (files) =>
      dispatch({
        type: ADD_FILES_UPLOAD,
        value: files,
      }),
    []
  );
  const downloadFiles = useCallback((url) => dispatch({ type: DOWNLOAD_FILE, url }), []);

  const [isDragging, setIsDragging] = useState(false);
  const [tab, setTab] = useState(Tabs[0]);
  const [url, setUrl] = useState();
  const theme = useTheme();
  const ref = useRef();

  const handleAllowDrop = (e) => e.preventDefault();

  const handleChange = ({ target: { files } }) => {
    addFilesUpload(files);
    handleUpload();
  };

  const handleClick = () => {
    ref.current.click();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);
    addFilesUpload(e.dataTransfer.files);
    handleUpload();
  };

  return (
    <MediaContent>
      <DialogHeader className="has-btn">
        <BtnBack onClick={handleBack}>
          <IconChevronLeft color={theme.devColor.text} width="30" height="40" />
        </BtnBack>
        <h3>Upload Asset</h3>
      </DialogHeader>
      <DialogBody>
        <MediaBodyWrapper>
          <Tab tabs={Tabs} current={tab} onChange={setTab} />
          {tab.name === "from_computer" ? (
            <DragDropWrapper
              className={cn(isDragging && "dragging")}
              onDragOver={handleAllowDrop}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
            >
              <IconUpload color={theme.devColor.text} color="#E9EAEB" width="70" height="70" />
              <p>
                <b>Drag & drop</b> to upload or
              </p>
              <DevPrimaryButton onClick={handleClick}>Browse files</DevPrimaryButton>
              <input ref={ref} style={{ display: "none" }} type="file" accept="image/*" onChange={handleChange} multiple name="files" />
              {isDragging && <div className="dragzone" onDragLeave={handleDragLeave} />}
            </DragDropWrapper>
          ) : (
            <FromURLWrapper>
              <textarea value={url} onChange={(e) => setUrl(e.target.value)} />
              <p>Separate your URL links by a carriage return.</p>
            </FromURLWrapper>
          )}
        </MediaBodyWrapper>
      </DialogBody>
      <DialogFooter>
        <DevSecondaryButton onClick={handleClose}>Cancel</DevSecondaryButton>
        {tab.name == "from_url" && (
          <DevPrimaryButton
            disabled={_.isEmpty(url)}
            onClick={() => {
              downloadFiles(url);
              handleUpload();
            }}
          >
            Download
          </DevPrimaryButton>
        )}
      </DialogFooter>
    </MediaContent>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(MediaAdd);
export default MediaAdd;
