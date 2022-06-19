import {
    useCallback,
    useReducer
} from "react";

const formReducer = (state: any, action: any) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputID in state.inputs) {
                if (!state.inputs[inputID]) {
                    continue;
                }

                if (inputID === action.inputID) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = state.inputs[inputID].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                        ...state.inputs,
                        [action.inputID]: {
                            value: action.value,
                            isValid: action.isValid
                        },
                    },
                    isValid: formIsValid,
            }
            case "SET_DATA":
                return {
                    inputs: action.inputs,
                        isValid: action.formIsValid
                };
            default:
                return state;
    }
}

export const useForm = (
    initialInputs: any,
    initialFormValidity: boolean
): [formState: any, inputHandler: (id ? : string, value ? : string, isValid ? : boolean) => void, setFormData: Function] => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const inputHandler = useCallback(
        (id ? : string, value ? : string, isValid ? : boolean) => {
            dispatch({
                type: "INPUT_CHANGE",
                value: value,
                isValid: isValid,
                inputID: id,
            })
        }, []);

    const setFormData = useCallback((inputData: any, formIsValid: boolean) => {
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formIsValid,
        })
    }, [])

    return [formState, inputHandler, setFormData];
}