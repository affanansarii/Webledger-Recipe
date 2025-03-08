import { useContext } from "react";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { AuthContextProvider } from "./Context/ContextAPI";

export const BASEURL = "https://foodrecipes-backend.onrender.com";
export const API = "895ed2248c404311ba89092d320ac76d";

const App = () => {
    const { popup, message, error } = useContext(AuthContextProvider);

    return (
        <>
            <div>
                <Navbar />
                <AllRoutes />
            </div>

            {popup && (
                <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
                    <div
                        className={`transform transition-transform duration-300 ease-in-out ${
                            popup ? "translate-y-0" : "translate-y-full"
                        } ${
                            message
                                ? "bg-green-300"
                                : error
                                ? "bg-red-300"
                                : "bg-white"
                        } p-6 shadow-lg rounded-t-lg w-full max-w-md sm:max-w-lg`}
                        style={{
                            padding: "10px 20px",
                            boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                        }}
                    >
                        {message && (
                            <div className="w-fit mt-4 bg-green-300 rounded-sm text-black px-3 py-1">
                                <p className="text-center">{message}</p>
                            </div>
                        )}
                        {error && (
                            <div className="w-fit mt-4 bg-red-300 rounded-sm text-black px-3 py-1">
                                <p className="text-center">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
