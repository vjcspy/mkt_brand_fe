import React from "react";
import { Container } from "../../styles";
import { BrandName, ContentList, ItemListBrand, ItemLogo, ListLogo, WrapperListBrand } from "./style";
import { useSelector } from "react-redux";
const dataBrands = [
  { name: "Hotpot", title: "Concept", logos: ["ashima.svg", "kichi_kichi.svg", "hutong.svg", "manwah.svg", "ktop.svg"] },
  { name: "BBQ", title: "Concept", logos: ["gogi.svg", "sumo.svg", "kpub.svg", "gogi_bakery.svg"] },
  { name: "Japanese", title: "Concept", logos: ["isushi.svg", "mask_japan.svg", "shogun.svg"] },
  { name: "beer", title: "Concept", logos: ["vuvuzela.svg"] },
  { name: "Western", title: "Concept", logos: ["cowboy.svg", "cowboy_pizzeria.svg", "grill_bar.svg"] },
  { name: "Other", title: "Concept", logos: ["icook.svg", "yutang.svg", "pho_ngon_37.svg", "coffe_inn.svg", "crystal_jade.svg"] },
];

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "list-brand",
  title: "List Brand",
};

const ListBrand = () => {
  const showListBrand = useSelector((state) => state.get("showListBrand"));
  return (
    showListBrand && (
      <WrapperListBrand>
        <Container>
          <ContentList>
            {dataBrands.map((item, key) => (
              <ItemListBrand key={key}>
                <BrandName>
                  <h4>{item.name}</h4>
                  <p>{item.title}</p>
                </BrandName>
                <ListLogo>
                  {item.logos.map((itemLogo, key) => (
                    <ItemLogo key={key}>
                      <img src={`/images/logobrands/${itemLogo}`} />
                    </ItemLogo>
                  ))}
                </ListLogo>
              </ItemListBrand>
            ))}
          </ContentList>
        </Container>
      </WrapperListBrand>
    )
  );
};
ListBrand.defaultConfig = defaultConfig;
export default ListBrand;
