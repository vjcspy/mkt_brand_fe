import { IconType } from "../icons";

type Item = {
  icon: IconType;
  label: String;
};

type TabsProps = {
  items: [Item];
  current: Number;
  onChange(index: Number): void;
};

declare function Tabs(props: TabsProps): JSX.Element;
export default Tabs;
