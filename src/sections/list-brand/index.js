import React, { useState, useEffect } from "react";
import { Container } from "../../styles";
import {
  BrandName,
  ContentList,
  ItemListBrand,
  ItemLogo,
  ListLogo,
  WrapperListBrand,
  ListBrandNameTab,
  ListLogoBrand,
  NameBrand,
} from "./style";
import { useSelector } from "react-redux";

const Hotpot = "Hotpot";
const BBQ = "BBQ";
const Japanese = "Japanese";
const Western = "Western";
const Other = "Orther";

const dataBrands = [
  {
    name: Hotpot,
    title: "Concept",
    logos: ["hotpot_ashima.png", "hotpot_kichi.png", "hotpot_hutong.png", "hotpot_manwah.png", "hotpot_ktop.png"],
  },
  { name: BBQ, title: "Concept", logos: ["bbq_gogi.png", "bbq_hanquoc.png", "bbq_kpup.png", "bbq_sumo.png"] },
  { name: Japanese, title: "Concept", logos: ["japan_isushi.png", "japan_mask.png", "japan_shogun.png"] },
  {
    name: Western,
    title: "Concept",
    logos: ["wester_chilis.png", "wester_cowboy_pizzeria.png", "wester_cowboy_jack.png"],
  },
  {
    name: Other,
    title: "Concept",
    logos: ["other_icook.png", "other_yutang.png", "other_37_street.png", "other_the_coffee.png", "other_crystal.png"],
  },
];

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "list-brand",
  title: "List Brand",
};

const ListBrand = () => {
  const showListBrand = useSelector((state) => state.get("showListBrand"));
  const [brand, setBrand] = useState(Hotpot);

  return (
    showListBrand && (
      <WrapperListBrand>
        <Container>
          <ContentList>
            <ListBrandNameTab>
              {dataBrands.map((item, index) => (
                <NameBrand active={item.name === brand} onClick={() => setBrand(item.name)} key={index}>
                  {item.name}
                </NameBrand>
              ))}
            </ListBrandNameTab>
            <ListLogoBrand>
              {dataBrands
                .find((item) => item.name === brand)
                ?.logos.map((itemLogo, index) => (
                  <ItemLogo key={index}>
                    <img src={`/images/logobrands/${itemLogo}`} />
                  </ItemLogo>
                ))}
            </ListLogoBrand>
          </ContentList>
        </Container>
      </WrapperListBrand>
    )
  );
};
ListBrand.defaultConfig = defaultConfig;
export default ListBrand;
