import React, {useEffect, useState} from "react";
import { getAllFeeds } from "../utils/fetchData";
import { getFirestore } from "firebase/firestore";
import Spinner from "../Components/Spinner";
import firebaseApp from "../firebase-config";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { VideoPin } from ".";

  const firestoreDb = getFirestore(firebaseApp);

const Search = ({searchTerm}) => {
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState(null);
  const [ser, setSer] = useState(null);
  
const result = () => {
    setLoading(true);
      getAllFeeds(firestoreDb).then((data) => {
      const result = data.forEach(d => d.title ==  searchTerm)
        setFeeds(result);
        setLoading(false);
        
        console.log(result)
      });
  };
  
  
  return (<div>
  Search: {searchTerm} {result}
  </div>);
};

export default Search;
