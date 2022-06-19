/* eslint-disable react-hooks/exhaustive-deps */
import {
    useState,
    useCallback,
    useRef,
    useEffect
} from "react";

export const useHttpClient = (): {
    isLoading: boolean,
    error: any,
    sendRequest: (url: string, method: string, body: any, headers: object) => void,
    clearError: Function
} => {
    const [isLoading, setIsLoading] = useState < boolean > (false);
    const [error, setError] = useState(null);
    const activeHttpRequests = useRef < AbortController[] > ([]);

    const sendRequest = useCallback(
        async (url: string, method = "GET", body = null, headers = {}) => {
            setIsLoading(true)
            const httpAbordtCtrll = new AbortController();

            activeHttpRequests.current.push(httpAbordtCtrll);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbordtCtrll.signal
                })

                const responseData: any = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbordtCtrll);

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);

                return responseData;
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
                throw err;
            }

        }, []);
    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    }
}