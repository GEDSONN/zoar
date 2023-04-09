import { IoGameController, IoMusicalNote } from "react-icons/io5";
import { FaSmileWink, FaFilm, FaQq } from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import { MdEmojiNature } from "react-icons/md";

const categories = [
  { id: 1, name: "SEI LA", iconSrc: <IoGameController fontSize={30} /> },
  { id: 2, name: "MEMES", iconSrc: <FaSmileWink fontSize={30} /> },
  { id: 3, name: "PORNO", iconSrc: <FaQq fontSize={30} /> },
  { id: 4, name: "ANIME", iconSrc: <FaFilm fontSize={30} /> },
  { id: 5, name: "ZUERA", iconSrc: <GiAngelOutfit fontSize={30} /> },
  { id: 6, name: "MUSICA", iconSrc: <IoMusicalNote fontSize={30} /> },
  { id: 7, name: "ZUERA 2", iconSrc: <MdEmojiNature fontSize={30} /> },
];

export default categories;
