import DevelopmentLeftContent from "../developmentLeftContent";
import { DevelopmentMainContent, GridWrapper } from "./styled";
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
  faPencilAlt,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faImage, faFileAlt } from "@fortawesome/free-regular-svg-icons";
import DevelopmentHeader from "../developmentHeader";
import { IFrame } from "../developmentIFrame";
import { useSelector } from "react-redux";
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
  faUser,
  faPencilAlt,
  faBlog
);

const DevelopmentLayout = ({ children }) => {
  const viewPreview = useSelector((s) => s.get("viewPreview"));

  return (
    <GridWrapper className={`${viewPreview ? "viewPreview" : ""}`}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}

        <link rel="preload" href="/fonts/subset-SFProDisplay-Medium.ttf" as="font" crossOrigin="" />
        <link ref="preload" href="/css/font.css" as="css" crossOrigin="" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" /> */}
      </Head>
      <DevelopmentHeader viewPreview={viewPreview} />
      {/* <DevelopmentContainer><DevelopmentRightContent /></DevelopmentContainer> */}
      <DevelopmentLeftContent viewPreview={viewPreview} />
      <DevelopmentMainContent viewPreview={viewPreview}>
        <IFrame>{children}</IFrame>
      </DevelopmentMainContent>
      <MediaDialog />
    </GridWrapper>
  );
};

export default DevelopmentLayout;
