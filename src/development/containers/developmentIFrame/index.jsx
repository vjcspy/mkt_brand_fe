import Head from "next/head";
import StyledFrame from "react-styled-frame";
import { GlobalStyle } from "../../../styles/globals";

// export class IFrame extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mountNode: null,
//     };
//     this.setContentRef = (contentRef) => {
//       this.setState({
//         mountNode: contentRef?.contentWindow?.document?.body,
//       });
//     };
//   }

//   render() {
//     const { children, ...props } = this.props;
//     const { mountNode } = this.state;
//     return <StyledFrame style={{ width: "100%", height: "100%" }}>{children}</StyledFrame>;
//   }
// }

export const IFrame = ({ children }) => (
  <StyledFrame style={{ width: "100%", height: "100%" }}>
    <GlobalStyle />
    {children}
  </StyledFrame>
);
