import React from "react";
import { MultiViewer } from "../multiViewer";
import { Topbar } from "../mainBar";
import { Sidebar } from "../sideBar";
import * as S from "./cadComponent.styles";

export const CadComponent = () => {
  return (
    <div>
      <Topbar />
      <S.MenuContainer>
        <S.OverlappingElement>
          <Sidebar />
        </S.OverlappingElement>
        <S.OverlappingElement2>
          <MultiViewer />
        </S.OverlappingElement2>
        {/*<Sidebar />
        <MultiViewer />*/}
      </S.MenuContainer>
    </div>
  );
};
