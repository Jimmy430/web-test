import { createContext } from "react";

const SelectorContext = createContext({
    activeComponentName: null,
    setActiveComponentName: (name) => name
})

export default {
    SelectorContext
}