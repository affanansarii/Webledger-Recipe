import axios from "axios";
import { createContext, useState } from "react";
import { BASEURL } from "../App";

export const AuthContextProvider = createContext();

const ContextAPI = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);

    const addFav = async (data) => {
        try {
            const res = await axios.post(`${BASEURL}/fav`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPopup(true);
            setMessage(res.data.message);

            setTimeout(() => {
                setPopup(false);
                setMessage("");
            }, 2000);
        } catch (error) {
            console.log(error);
            setPopup(true);
            setError(error.response.data.message);

            setTimeout(() => {
                setPopup(false);
                setError("");
            }, 2000);
        }
    };

    return (
        <AuthContextProvider.Provider
            value={{
                addFav,
                token,
                setToken,
                user,
                setUser,
                isAuth,
                setIsAuth,
                message,
                setMessage,
                error,
                setError,
                popup,
                setPopup,
            }}
        >
            {children}
        </AuthContextProvider.Provider>
    );
};

export default ContextAPI;
