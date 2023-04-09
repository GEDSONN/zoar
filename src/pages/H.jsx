import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Image,
  Button,
  Switch,
  IconButton,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import {
  Category,
  Create,
  Feed,
  NavBar,
  Search,
  UserProfile,
  VideoPinDetail,
} from "../Components";
import { Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import categories from "../data";

const H = ({user}) => {
 const navigate = useNavigate();
 const [mobile, setmobile] = useState(false);
  const [result, setREsult] = useState(false);
 
 const { innerWidth: width, innerHeight: height } = window;

 
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <>
      <NavBar user={user} setsearchTerm={setsearchTerm} />

      <Flex width={"100vw"}>
       
        <Flex
     justifyContent={"space-between"}
      alignItems="center"
      width={"100vw"}
      p={4}
        >
          <Routes>
            <Route path="/" element={<Feed maxidth={innerWidth}/>} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/add-video" element={<Create />} />
            <Route path="/video/:videoId" element={<VideoPinDetail />} />
            <Route path="/user/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default H;
