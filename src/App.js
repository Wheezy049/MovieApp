import { useState, useEffect } from "react";
import { Search, Bell, UserRound } from "lucide-react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const [scrolling, setScrolling] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/discover/movie?sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setData(data.results || []);
    } catch (error) {
      console.log(`Error fetching movie ${error}`);
      setError("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (error) {
    <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen w-full">
      {/* Navbar */}
      <div
        className={`container mx-auto max-w-screen-xl flex justify-between items-center py-4 px-6 fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
          scrolling ? "bg-black/80" : "bg-transparent"
        }`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold text-red-500">Movie</h1>
          <ul className=" hidden md:flex list-none space-x-4">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">
              New & Popular
            </li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="cursor-pointer"
            >
              <Search />
            </button>

            {/* Search Input */}
            {searchVisible && (
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Titles, people, genres"
                className="absolute right-12 top-0 w-64 px-2 py-1 outline-none border bg-transparent text-white"
                autoFocus
              />
            )}
          </div>
          <Bell className="cursor-pointer" />
          <UserRound className="cursor-pointer" />
        </div>
      </div>

      {/* Hero Section with Background Video */}
      <div className="relative w-full min-h-screen pt-20">
        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            src="/image/back-in-action.mp4"
            autoPlay
            loop
            playsInline
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute bottom-32 left-10 md:left-20 z-10 text-white space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Movie Title</h1>
          <p className="max-w-lg text-lg text-gray-300">
            This is the description of the movie, similar to Netflix trailers.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-300">
              ▶ Play
            </button>
            <button className="bg-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-500">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-screen-xl px-8 py-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default App;
