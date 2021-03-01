type TranslateLabel = {
  vi: String;
  en: String;
};

type DialogMenuValue = {
  label: TranslateLabel;
  url: String;
  apiKey: "menu" | "promo";
};

type DialogMenuProps = {
  show: Boolean;
  value: DialogMenuValue;
  showApi: Boolean;
  path: [String];
  index: Number;
};

type MenuProps = {
  dialog: DialogMenuProps;
  onClose: () => void;
  onAddMenuItem: (value: DialogMenuValue, path: [String], index: Number) => void;
};

declare function MenuDialog(props: MenuProps): JSX.Element;

export default MenuDialog;
