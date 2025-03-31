import { AppNodeMissingInputs } from "@/types/appNode"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type FlowValidationContextType ={
    invalidInputs : AppNodeMissingInputs[];
    setInvaildInputs : Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
    clearErrors: () => void
}

export const FlowValidationContext = createContext<FlowValidationContextType | null >(null)

export function FlowValidationContextProvider({children}:{children:ReactNode}) {
    const [invalidInputs,setInvaildInputs] = useState<AppNodeMissingInputs[]>([])
    const clearErrors = () => {
        setInvaildInputs([]);
    }
    return <FlowValidationContext.Provider value={{
        invalidInputs,
        setInvaildInputs: setInvaildInputs,
        clearErrors
    }}>{children}</FlowValidationContext.Provider>
}