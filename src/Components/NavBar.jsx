import React from "react";
import { getAuth, signOut } from 'firebase/auth';
import logo from "../img/logo.png";
import logo_dark from "../img/logo_dark.png";
import { Link, useNavigate } from "react-router-dom";
import Perfilft from '../img/perfil.jpeg'; 
// prettier-ignore
import { Flex, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";

import { useSignOut } from 'react-firebase-hooks/auth';
import firebaseApp from "../firebase-config";

const auth = getAuth(firebaseApp);

const NavBar = ({ user, setsearchTerm, searchTerm }) => { 
const [signOut, loading, error] = useSignOut(auth);

const navigate = useNavigate(); 
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");
  
   if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      width={"100vw"}
      p={4}
    >
      <Link to={"/"}>
        <h1>GEDSON</h1>
      </Link>

     

      <Flex justifyContent={"center"} alignItems="center">
        <Flex
          width={"40px"}
          height="40px"
          margin={"10px"}
          justifyContent={"center"}
          alignItems="center"
          cursor={"pointer"}
          borderRadius="5px"
          onClick={toggleColorMode}
        >
          {colorMode == "light" ? (
            <IoMoon fontSize={25} />
          ) : (
            <IoSunny fontSize={25} />
          )}
        </Flex>
        <Menu>
          <MenuButton>
            <Image
              src={Perfilft}
              width="40px"
              height="40px"
              minWidth={"40px"}
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={"lg"}>
            <Link to={`/user/${user.user.providerData[0].uid}`}>
              <MenuItem>Conta</MenuItem>
            </Link>
             <Link to={`/add-video`}>
              <MenuItem>adcionar video</MenuItem>
            </Link>
            <MenuItem
              flexDirection={"row"}
              alignItems="center"
              gap={4}
              onClick={() => {signOut();
               window.location.reload(false);
              }}
            >
              Sair <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
