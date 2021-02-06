import DevelopmentLeftContent from "../developmentLeftContent";
import { DevelopmentContainer, DevelopmentMainContent, GridWrapper } from "./styled";
import Head from "next/head";
import MediaDialog from "../developmentMedia";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faTrashAlt,
  faTimes,
  faArrowLeft,
  faEllipsisV,
  faSignOutAlt,
  faPalette,
  faCog,
  faCaretDown,
  faHome,
  faProjectDiagram,
  faEyeSlash,
  faUtensils,
  faMap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faImage, faFileAlt } from "@fortawesome/free-regular-svg-icons";
import DevelopmentHeader from "../developmentHeader";
import { IFrame } from "../developmentIFrame";

library.add(
  faChevronLeft,
  faChevronRight,
  faTrashAlt,
  faTimes,
  faPlusSquare,
  faImage,
  faArrowLeft,
  faEllipsisV,
  faFileAlt,
  faSignOutAlt,
  faPalette,
  faCog,
  faCaretDown,
  faHome,
  faProjectDiagram,
  faEyeSlash,
  faUtensils,
  faMap,
  faUser
);

const DevelopmentLayout = ({ children, seo }) => {
  return (
    <GridWrapper>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link rel="preload" href="/fonts/SFProDisplay-Semibold.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/SFProDisplay-Medium.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/SFProDisplay-Regular.otf" as="font" crossOrigin="" />
        <link ref="preload" href="/css/font.css" as="css" crossOrigin="" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" /> */}
      </Head>
      <DevelopmentHeader />
      {/* <DevelopmentContainer><DevelopmentRightContent /></DevelopmentContainer> */}
      <DevelopmentLeftContent />
      <DevelopmentMainContent>
        <IFrame>{children}</IFrame>
      </DevelopmentMainContent>
      <MediaDialog />
    </GridWrapper>
  );
};

export default DevelopmentLayout;
