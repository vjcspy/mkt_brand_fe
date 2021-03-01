import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_VALUE_TRANSITION } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { Content, FieldEdit, TitleSection, WrapperLanguageConfig, WrapperSectionLanguage } from "./style";

const checkHaveSection = (text) => {
  let t = text.match(/\w+\./)?.[0]?.replace(".", "");
  return t;
};

const English = ({ popStage }) => {
  const en = useFromJS(["modifiedConfig", "translation", "en"]);
  const dispatch = useDispatch();

  const onChangeValueTransition = (e) => {
    const { value, name } = e.target;
    dispatch({ type: UPDATE_VALUE_TRANSITION, path: ["en", name], value });
  };

  const listKeyOfEn = useMemo(() => {
    return en ? Object.keys(en) : [];
  }, []);
  const listTitleSection = useMemo(() => {
    return listKeyOfEn.reduce((arr, current) => {
      let t = current.match(/\w+\./)?.[0]?.replace(".", "");
      if (arr.includes(t) || !t) return arr;
      return arr.concat(t);
    }, []);
  }, []);

  return (
    <SectionWrapper className="section-language">
      <WrapperLanguageConfig className="wrapper-language">
        <SectionHeader>
          <DevSecondaryButton icon onClick={popStage}>
            <FontAwesomeIcon icon="arrow-left" />
          </DevSecondaryButton>
          <h4>English Setting</h4>
        </SectionHeader>
        <div>
          {listTitleSection?.map((section, index) => (
            <WrapperSectionLanguage key={index}>
              <TitleSection>{section}</TitleSection>
              <Content>
                {listKeyOfEn.map((item, indexItem) => (
                  <React.Fragment key={indexItem}>
                    {checkHaveSection(item) === section && (
                      <FieldEdit>
                        <label>{item}</label>
                        <input value={en[item]} name={item} onChange={(e) => onChangeValueTransition(e)} />
                      </FieldEdit>
                    )}
                  </React.Fragment>
                ))}
              </Content>
            </WrapperSectionLanguage>
          ))}
        </div>
      </WrapperLanguageConfig>
    </SectionWrapper>
  );
};

export default English;
