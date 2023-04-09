import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FaMoon, FaSun } from "react-icons/fa";
import firebaseApp from "../firebase-config";

const auth = getAuth(firebaseApp);

import H from './H';

const Home = () => {  
const { colorMode, toggleColorMode } = useColorMode();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const firebaseDb = getFirestore(firebaseApp);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (user) {
    const { refreshToken, providerData } = user.user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

     setDoc(
      doc(firebaseDb, "users", providerData[0].uid),
      providerData[0]
    );
    return <H  user={user}/>
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>        
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Conecte-se</Heading>
          <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="50px"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email:</FormLabel>
              <Input type="email"  onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha:</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => signInWithEmailAndPassword(email, password)}
                >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Home;
