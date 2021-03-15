import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SET_TOKEN } from "../../../constants";
import useSiteRouter from "../../../hooks/useSiteRouter";
import { ClickableStyle } from "../../../styles/developmentStyle";
import ImageMedia from "../../components/imageMedia";

const ProfileWrapper = styled.button`
  ${ClickableStyle}
  display: inline-block;
  position: relative;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0px;

  &:hover,
  &:active {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
  }

  img {
    width: 35px;
    height: 35px;
    background: #fefefe;
    cursor: pointer;
    object-fit: contain;
    border-radius: 50%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
`;

const Item = styled.button`
  ${ClickableStyle}
  color: #f64d0a;
  background: white;
  min-width: 200px;
  padding: 10px;

  svg {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }

  &:hover {
    background: #e5e5e5;
  }
`;

const Profile = ({ site }) => {
  const [show, setShow] = useState();
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    location.href = "/edit/signin";
    dispatch({ type: SET_TOKEN, remember: true });
  }, [dispatch]);

  return (
    <ProfileWrapper
      onBlur={() =>
        setTimeout(() => {
          setShow();
        }, 100)
      }
    >
      <ImageMedia media={site?.logo} formats="thumbnail" onClick={() => setShow(true)} />
      {show && (
        <Dropdown>
          <Item onClick={logout}>
            Log out <FontAwesomeIcon icon="sign-out-alt" />
          </Item>
        </Dropdown>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
