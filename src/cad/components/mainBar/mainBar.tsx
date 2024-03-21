import * as S from "./mainBar.styles";

export const Topbar = () => {
  return (
    <S.Container>
      {/* Contenido de la barra superior */}
      <h2>Barra Superior</h2>
      <div style={{ marginLeft: "auto" }}>
        <button>Botón 1</button>
        <button>Botón 2</button>
        <button>Botón 3</button>
      </div>
    </S.Container>
  );
};
