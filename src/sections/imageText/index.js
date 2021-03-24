import _ from "lodash";
import { Container } from "../../styles";

const defaultConfig = {
  type: "section",
  name: "image_text",
  code: "code-djfhwu",
  title: "Image Text",
  components: {
    image: {
      type: "image",
      name: "image",
      value: null,
    },
    title: {
      type: "text",
      name: "title",
      value: "Title",
    },
    banner_text: {
      type: "text",
      name: "banner_text",
      value: "Description Text",
    },
    // sections: {
    //   type: "sections",
    //   name: "sections",
    //   value: [{
    //     name: 'container',
    //     code: "code2",
    //     title: "COntainer Section",
    //     components: {}
    //   }]
    // }
  },
};

// const Sections = {
//   'container': Container
// }

const ImageText = ({ config = defaultConfig }) => {
  const components = _.mapKeys(config.components, "name");
  return (
    <div style={{ width: "100%", background: "white" }}>
      <Container>
        <h4 style={{ textAlign: "center" }}>{components?.title.value}</h4>
        <div style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
          <div style={{ width: "50%", padding: "0px 15px" }}>
            <img src={components.image?.value?.url ?? "/images/default-image.svg"} alt="" title="" />
          </div>
          <div style={{ width: "50%", padding: "0px 15px" }}>
            <div>{components?.banner_text.value}</div>
          </div>
        </div>
        {/* <div>
          {components.sections.map(config => {
            var S = Sections[config.name];
            return <S config={config}/>;

          })}
        </div> */}
      </Container>
    </div>
  );
};

ImageText.defaultConfig = defaultConfig;

export default ImageText;
