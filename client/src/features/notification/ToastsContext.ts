import { createContext, RefObject } from "react";
import { ToastsRefHandle } from "./ToastsTypes";

const ToastsContext = createContext<RefObject<ToastsRefHandle> | undefined>(undefined);
export default ToastsContext;
