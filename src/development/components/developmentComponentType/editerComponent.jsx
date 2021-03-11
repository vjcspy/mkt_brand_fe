import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UPDATE_CONFIG } from "../../../constants";
import { PopupWrapperEditer, ContentEditer, GroupButton } from "./styled";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../../components/button";

const EditerComponent = ({ config, path }) => {
  const locale = useSelector((s) => s.get("locale"));
  const { title } = useSelector((s) => s.getIn(path.slice(0, path.length - 2)))?.toJS();
  const [content, setContent] = useState("");
  const siteCode = useSelector((s) => s.getIn(["site", "site_code"])); // id site brand

  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [saved, setSaved] = useState(true);
  const refEditer = useRef();
  const onChange = useCallback(
    (e) => {
      // const p = ignoreLocale ? path : [...path, locale];
      // debugger;
      // console.log(p);
      // dispatch({ type: UPDATE_CONFIG, path, value: e.target.value });
    },
    [dispatch, path, locale]
  );
  const onChangeText = (value) => {
    setSaved(false);
  };

  const onClosePopup = () => {
    if (saved) {
      setOpenEdit(false);
      setSaved(true);
    } else {
      let result = confirm("File not save!. Close content ?");
      if (result) {
        setOpenEdit(false);
        setSaved(true);
      }
    }
  };

  const onSave = () => {
    if (saved) {
      setOpenEdit(false);
    } else {
      // luu roi moi tat
      setSaved(true);
      // setOpenEdit(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenEdit(true)}>Edit</Button>
      {openEdit && (
        <PopupWrapperEditer ref={refEditer}>
          <ContentEditer>
            <h3>{title.value[locale]}</h3>
            <Editor
              initialValue={`<p>${content}</p>`}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={onChangeText}
            />
            <GroupButton>
              <Button onClick={onClosePopup}>Cancel</Button>
              <Button onClick={onSave}>Save</Button>
            </GroupButton>
          </ContentEditer>
        </PopupWrapperEditer>
      )}
    </>
  );
};

export default EditerComponent;
