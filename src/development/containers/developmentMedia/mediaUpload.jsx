import React, { useEffect } from "react";
import { BtnBack, MediaCard, MediaCardWrapper, MediaContent, MediaBodyWrapper } from "./styled";
import { formatBytes } from "./ultils";
import IconTrash from "../../components/icons/icTrash";
import { useDispatch } from "react-redux";
import { DialogBody, DialogFooter, DialogHeader } from "../developmentDialog/styled";
import IconChevronLeft from "../../components/icons/icChevronLeft";
import { useTheme } from "styled-components";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import { REMOVE_FILES_UPLOAD, UPLOAD_FILES } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";

// const mapStateToProps = (state) => ({
//   filesUpload: state.get("filesUpload")?.toJS() ?? [],
//   uploadStatus: state.getIn(["apiStatus", "uploadFiles"])?.toJS() ?? {},
// });

// const mapDispatchToProps = (dispatch) => ({
//   removeFileUpload: (file) => {
//     dispatch({ type: REMOVE_FILES_UPLOAD, value: file });
//   },
//   uploadFiles: () => dispatch({ type: UPLOAD_FILES }),
// });

const MediaUpload = ({ handleClose, handleBack }) => {
  const filesUpload = useFromJS(["filesUpload"]) ?? [];
  // const { loading, success } = useFromJS(["apiStatus", "uploadFiles"]) ?? {};

  const dispatch = useDispatch();
  const removeFileUpload = useCallback((file) => {
    dispatch({ type: REMOVE_FILES_UPLOAD, value: file });
  }, []);
  const uploadFiles = useCallback(() => dispatch({ type: UPLOAD_FILES }), []);

  const theme = useTheme();

  useEffect(() => {
    if (filesUpload.length == 0) {
      handleBack();
    }
  }, [handleBack, filesUpload]);

  return (
    <MediaContent>
      <DialogHeader className="has-btn">
        <BtnBack onClick={handleBack}>
          <IconChevronLeft color={theme.devColor.text} width="30" height="40" />
        </BtnBack>
        <h3>Pending Asset</h3>
      </DialogHeader>
      <DialogBody>
        <MediaBodyWrapper>
          <MediaCardWrapper>
            {filesUpload?.map((fileUpload, index) => (
              <MediaCard key={index}>
                <div className="media-img-wrapper">
                  <div className="media-img-content">
                    <img
                      className="media-img"
                      src={fileUpload.url}
                      alt={fileUpload.fileInfo.alternativeText}
                      title={fileUpload.fileInfo.caption}
                    />
                    <button className="media-delete" onClick={() => removeFileUpload(fileUpload)}>
                      <IconTrash />
                    </button>
                  </div>
                </div>
                <div className="media-name small">{fileUpload.file.name}</div>
                <div className="media-mime small">{`${fileUpload.ext ?? ""}${
                  fileUpload.file.width && fileUpload.file.height ? ` — ${fileUpload.file.width}×${fileUpload.file.height}` : ""
                } — ${formatBytes(fileUpload.file.size)}`}</div>
              </MediaCard>
            ))}
          </MediaCardWrapper>
        </MediaBodyWrapper>
      </DialogBody>
      <DialogFooter>
        <DevSecondaryButton onClick={handleClose}>Cancel</DevSecondaryButton>
        <DevPrimaryButton disabled={filesUpload?.length == 0} onClick={() => uploadFiles()}>
          {`Upload${filesUpload.length ? ` ${filesUpload.length} item(s)` : ""}`}
        </DevPrimaryButton>
      </DialogFooter>
    </MediaContent>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(MediaUpload);
export default MediaUpload;
