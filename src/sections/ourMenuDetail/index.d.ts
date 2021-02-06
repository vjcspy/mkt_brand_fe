export interface Component {
    
}

export interface DefaultConfig {
  name: String;
  code: String;
  title: String;
  components: [Component]
}

declare function OurMenus(): JSX.Element;
declare namespace OurMenus {
  declare const defaultConfig: DefaultConfig;
}

export default OurMenus;
