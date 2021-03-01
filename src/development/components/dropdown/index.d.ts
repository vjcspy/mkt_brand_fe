import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Item = {
  icon: IconProp;
  label: String;
  onClick: Function;
  disabled: Boolean;
};

export type DropdownProps = {
  items: [Item];
  icon: Boolean;
  current: String;
};

export default function Dropdown(props: DropdownProps): JSX.Element;
