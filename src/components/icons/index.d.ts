import { Color } from "react-color";

export type IconType = "tab-profile" | "tab-promo" | "tab-history" | "tab-gift" | "camera" | "coin";

type IconProps = {
  width: Number | String;
  height: Number | String;
  icon: IconType;
  color: Color;
};

declare function Icon(props: IconProps): JSX.Element;

export default Icon;
