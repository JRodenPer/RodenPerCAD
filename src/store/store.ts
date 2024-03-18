import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers"; // Importa el reducer raíz

export const store = configureStore({
  reducer: rootReducer,
  // Opcionalmente, puedes añadir middleware, devTools, etc.
});
