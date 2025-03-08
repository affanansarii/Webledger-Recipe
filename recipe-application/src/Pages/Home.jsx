import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../App";
import { FaClock, FaPeopleGroup, FaStar } from "react-icons/fa6";
import { AuthContextProvider } from "../Context/ContextAPI";
import { CiSearch } from "react-icons/ci";
import { GiChickenOven } from "react-icons/gi";
import { AiFillHeart } from "react-icons/ai";

const Home = () => {
    const { isAuth, addFav } = useContext(AuthContextProvider);
    const [recipes, setRecipes] = useState([]);
    const [cuisines, setCuisines] = useState("");
    const [type, setType] = useState("");

    const [limit, setLimit] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${BASEURL}/foods?query=${query}&cuisine=${cuisines}&number=${limit}&type=${type}&addRecipeInformation=true`
            );
            setRecipes(res.data);
            console.log(res.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 2000);
        return () => clearTimeout(timer);
    }, [query, cuisines, limit, type]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error: {error.message}</p>
            </div>
        );
    }
    return (
        <div
            className="flex h-screen justify-start items-center flex-col"
            style={{ padding: "10px 5px", marginTop: "90px" }}
        >
            <div className="flex justify-between items-center gap-8">
                <div
                    className="border rounded-full flex items-center w-150"
                    style={{ marginTop: "40px", padding: "6px 12px" }}
                >
                    <button className="text-2xl">
                        <CiSearch />
                    </button>
                    <input
                        type="text"
                        placeholder="Search food..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none"
                    />
                </div>
            </div>

            <div
                className="w-full flex flex-col md:flex-row justify-between items-center gap-8"
                style={{ marginTop: "20px" }}
            >
                <div className="flex items-center gap-2">
                    <div className="bg-red-500 w-1 h-8"></div>
                    <h1 className="text-3xl rowdies-regular">
                        Find Your Favorite Food
                    </h1>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
                </div>
            ) : (
                <div
                    className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
                    style={{ padding: "10px 5px", marginTop: "20px" }}
                >
                    {recipes &&
                        recipes.map((recipe) => {
                            return (
                                <div key={recipe.id} className="relative">
                                    <Link to={`/recipe/${recipe.id}`}>
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-80 object-cover rounded-lg"
                                            style={{
                                                boxShadow:
                                                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                            }}
                                        />
                                        <div
                                            className="flex flex-col gap-2"
                                            style={{ marginTop: "10px" }}
                                        >
                                            <p className="exo capitalize font-bold text-red-500">
                                                {recipe?.cuisines[0] ||
                                                    "Indian"}
                                            </p>
                                            <h2 className="text-xl font-bold mt-2 saira hover:text-red-500">
                                                {recipe.title}
                                            </h2>
                                            <p className="text-gray-600">
                                                {recipe.cuisines}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between items-center saira">
                                        <p className="flex justify-center items-center gap-1 capitalize hover:text-red-500">
                                            <FaClock /> {recipe.readyInMinutes}{" "}
                                            min.
                                        </p>
                                        <p className="flex justify-center items-center gap-1 capitalize hover:text-red-500">
                                            <GiChickenOven />{" "}
                                            {recipe.vegetarian
                                                ? "Veg"
                                                : "Non-veg"}{" "}
                                            Food
                                        </p>
                                        <p className="flex justify-center items-center gap-1 capitalize hover:text-red-500">
                                            <FaPeopleGroup /> {recipe.servings}{" "}
                                            serves
                                        </p>
                                    </div>
                                    {isAuth && (
                                        <div
                                            className="w-full absolute top-2 flex justify-between items-center"
                                            style={{ padding: "6px" }}
                                        >
                                            <button
                                                className="bg-yellow-500 text-white p-2 rounded-full flex items-center gap-1"
                                                style={{ padding: "6px" }}
                                                title="Rate"
                                            >
                                                <FaStar /> 4.8
                                            </button>

                                            <button
                                                className="cursor-pointer bg-red-500 text-white p-2 rounded-full"
                                                style={{ padding: "6px" }}
                                                onClick={() =>
                                                    addFav({
                                                        foodId: recipe.id,
                                                        title: recipe.title,
                                                        image: recipe.image,
                                                    })
                                                }
                                            >
                                                <AiFillHeart size={30} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default Home;
