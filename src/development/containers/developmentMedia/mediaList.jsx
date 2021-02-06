import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import IconSearch from "../../components/icons/icSearch";
import { ADD_FILES_UPLOAD, FETCH_MEDIAS, FETCH_MEDIA_COUNT } from "../../../constants";
import { DevPrimaryButton, DevSecondaryButton } from "../../../styles/developmentStyle";
import { DialogBody, DialogFooter, DialogHeader, SearchWrapper } from "../developmentDialog/styled";
import { LoadingWrapper, MediaBodyWrapper, MediaCard, MediaCardWrapper, MediaContent, PagingWrapper } from "./styled";
import { formatBytes } from "./ultils";
import cn from "classnames";
import useDebounce from "../../../hooks/useDebounce";
import LoadingIndicator from "../../components/LoadingIndicator";
import LimitSelection from "../../components/limitSelection";
import GlobalPagination from "../../components/GlobalPagination";
import useFromJS from "../../../hooks/useFromJS";

// const mapStateToProps = (state) => ({
//   medias: state.get("medias")?.toJS() ?? [],
//   mediaCount: state.get("mediaCount") ?? 0,
//   apiStatus: state.getIn(["apiStatus", "medias"])?.toJS() ?? {},
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchMedias: (_limit, _start, _q) => dispatch({ type: FETCH_MEDIAS, _limit, _start, _q }),
//   fetchMediaCount: () => dispatch({ type: FETCH_MEDIA_COUNT }),
//   addFilesUpload: (files) => dispatch({ type: ADD_FILES_UPLOAD, value: files }),
// });

const MediaList = ({ handleFinish, handleClose, handleAdd }) => {
  const medias = useFromJS(["medias"]) ?? [];
  const mediaCount = useFromJS(["mediaCount"]) ?? 0;
  const { success, loading } = useFromJS(["apiStatus", "medias"]) ?? {};

  const dispatch = useDispatch();
  const fetchMedias = useCallback((_limit, _start, _q) => dispatch({ type: FETCH_MEDIAS, _limit, _start, _q }), []);
  const fetchMediaCount = useCallback(() => dispatch({ type: FETCH_MEDIA_COUNT }), []);
  const addFilesUpload = useCallback((files) => dispatch({ type: ADD_FILES_UPLOAD, value: files }), []);

  const theme = useTheme();
  const [selected, setSelected] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleAllowDrop = (e) => e.preventDefault();

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
    handleAdd();
  };

  useEffect(() => {
    fetchMediaCount();
    fetchMedias(limit, (page - 1) * limit, debouncedSearchTerm);
  }, [debouncedSearchTerm, limit, page]);

  return (
    <MediaContent>
      <DialogHeader>
        <SearchWrapper>
          <IconSearch color={theme.devColor.text} />
          <input type="text" placeholder="Search for an asset" onChange={(e) => setSearchTerm(e.target.value)} />
        </SearchWrapper>
      </DialogHeader>
      <DialogBody>
        <MediaBodyWrapper>
          <LoadingWrapper loading={loading}>{loading && <LoadingIndicator />}</LoadingWrapper>
          <MediaCardWrapper>
            {medias.map((m) => (
              <MediaCard key={m.id}>
                <div className="media-img-wrapper">
                  <div className={cn(["media-img-content", selected?.id === m.id && "selected"])} onClick={() => setSelected(m)}>
                    <img className="media-img" src={m.url} alt={m.alternativeText} title={m.caption} />
                  </div>
                </div>
                <div className="media-name small">{m.name}</div>
                <div className="media-mime small">{`${m.ext?.substr(1)} — ${m.width}×${m.height} — ${formatBytes(m.size)}`}</div>
              </MediaCard>
            ))}
            <MediaCard onClick={handleAdd}>
              <div className="media-img-wrapper">
                <div
                  className={cn(["media-add", isDragging && "dragging"])}
                  onDragOver={handleAllowDrop}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                >
                  {isDragging && <div className="dragzone" onDragLeave={handleDragLeave} />}
                </div>
              </div>
            </MediaCard>
          </MediaCardWrapper>
          <PagingWrapper>
            <LimitSelection limit={limit} onChange={setLimit} />
            <GlobalPagination count={mediaCount} limit={limit} page={page} onChange={setPage} />
          </PagingWrapper>
        </MediaBodyWrapper>
      </DialogBody>
      <DialogFooter>
        <DevSecondaryButton onClick={handleClose}>Cancel</DevSecondaryButton>
        <DevPrimaryButton disabled={!selected} onClick={() => handleFinish(selected)}>
          Finish
        </DevPrimaryButton>
      </DialogFooter>
    </MediaContent>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(MediaList);
export default MediaList;
