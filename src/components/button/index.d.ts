type ButtonSize = "small" | "large" | "medium" | "tiny";
type Varian = "primary" | "outline" | "primary-router" | "outline-a" | "link" | "back";
type ButtonProps = { varian: Varian; width: "100%" | String | Number; size: ButtonSize; icon: Boolean };
declare function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element;
export default Button;
