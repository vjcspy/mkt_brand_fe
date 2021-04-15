import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UPDATE_CONFIG } from "../../../constants";
import { PopupWrapperEditer, ContentEditer, GroupButton, WrapperButtonEditer } from "./styled";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../../components/button";

const EditerComponent = ({ config, path }) => {
  const [showEditerLanguage, setShowEditerLanguage] = useState();
  const { title, value } = config;
  const dispatch = useDispatch();
  const refEditer = useRef();
  const onChangeText = (value) => {
    dispatch({ type: UPDATE_CONFIG, path: [...path, showEditerLanguage], value });
  };

  return (
    <>
      <GroupButton>
        <Button onClick={() => setShowEditerLanguage("en")} size="tiny">
          Edit EN
        </Button>
        <Button onClick={() => setShowEditerLanguage("vi")} size="tiny">
          Edit VN
        </Button>
      </GroupButton>
      {showEditerLanguage && (
        <PopupWrapperEditer ref={refEditer}>
          <ContentEditer>
            <h3>{title}</h3>
            <Editor
              initialValue={value[showEditerLanguage]}
              init={{
                height: 500,
                menubar: false,
                plugins: 'link image code fullpage',
                toolbar:
                  "undo redo | formatselect |sizes  elect|forecolor|  bold italic underline backcolor |fontselect |fontsizeselect| link image|\
                  alignleft aligncenter alignright alignjustify  | code",
              }}
              onEditorChange={onChangeText}
            />
            <WrapperButtonEditer>
              <Button onClick={() => setShowEditerLanguage(false)}>Close </Button>
            </WrapperButtonEditer>
          </ContentEditer>
        </PopupWrapperEditer>
      )}
    </>
  );
};

export default EditerComponent;
