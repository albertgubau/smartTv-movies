import { useRef, useState } from "react";
import "./Header.scss";

const movies = [
  {
    id: "001",
    title: "Grown Ups 2",
    logo: "https://image.tmdb.org/t/p/original/6kfqiQUNzWAgAuRdxgb9TIw9jVB.png",
    description:
      "A funny movie of 4 'adults' that Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed facilis velit eos sequi. Nostrum iure fuga facere asperiores tenetur beatae? Dolorum veritatis sapiente libero, facilis minus maxime ipsam blanditiis aperiam!",

    img: "https://www.elpuntavui.cat/imgpelis/02/48/0248125/alta/0248125_FOTO_020358_ninosgrandes2_3.jpg",
  },
  {
    id: "002",
    title: "Spider-Man 2",
    logo: "https://picfiles.alphacoders.com/663/66341.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed facilis velit eos sequi. Nostrum iure fuga facere asperiores tenetur beatae? Dolorum veritatis sapiente libero, facilis minus maxime ipsam blanditiis aperiam!",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpkGK_JMX9_hfZkk6iYha2XPssNBrLDfVuTA&s",
  },
  {
    id: "003",
    title: "Let me",
    logo: "https://images.fanart.tv/fanart/get-out-58e279e0c1809.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed facilis velit eos sequi. Nostrum iure fuga facere asperiores tenetur beatae? Dolorum veritatis sapiente libero, facilis minus maxime ipsam blanditiis aperiam!",

    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC3QLJxkSV1IJjF0WecEU5dkeBff7ywVI8PA&s",
  },
  // Agrega más películas aquí
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null); // Para almacenar el timeout

  const trailer = "https://www.w3schools.com/html/mov_bbb.mp4";

  const changeMovie = (movieIdx: number) => {
    setCurrentIndex(movieIdx);
    handleMouseLeave();
  };

  const handleMouseOverImage = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) videoRef.current.play();
    }, 1500); // Espera 1 segundo antes de reproducir el video
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) videoRef.current.pause();

    // Limpiar el timeout para evitar que el video se reproduzca si el mouse sale antes de tiempo
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null; // Limpia la referencia
    }
  };

  return (
    <div
      className="featured-movies"
      onMouseOver={handleMouseOverImage}
      onMouseLeave={handleMouseLeave}>
      <img
        src={movies[currentIndex].img}
        alt="Película"
        className={`movie-image ${isHovered ? "hidden" : ""}`}
        width="100%"
      />
      <video
        ref={videoRef}
        width="100%"
        src={trailer}
        autoPlay={true}
        loop={true}
        muted
        className={`movie-trailer`}
      />

      <div className="movie-info">
        <img width="400px" height="120px" src={movies[currentIndex].logo} />
        <p>{movies[currentIndex].description}</p>
        <button>Play</button>
      </div>
      <div className="movie-navigation">
        {movies.map((movie, movieIdx) => (
          <button
            key={movie.id}
            className="nav-btn"
            onClick={() => changeMovie(movieIdx)}>
            ·
          </button>
        ))}
      </div>
    </div>
  );
}
