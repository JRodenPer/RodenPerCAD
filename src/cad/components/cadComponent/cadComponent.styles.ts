import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative; /* Establece el contenedor como referencia para la posición absoluta */
  max-width: 100%;
`;

export const OverlappingElement = styled.div`
  position: absolute; /* Posiciona el elemento absolutamente dentro del contenedor */
  top: 0; /* Ajusta la posición superior según sea necesario */
  left: 0; /* Ajusta la posición izquierda según sea necesario */
  height: 100%;
  background-color: #f0f0f0;
  /*padding: 10px;*/
  z-index: 1;
`;

export const OverlappingElement2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e0e0e0;
  //padding: 10px;
  z-index: 0;
`;
