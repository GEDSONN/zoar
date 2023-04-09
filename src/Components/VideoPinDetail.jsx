import {
  Box,
  Flex,
  Grid,
  GridItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
  Image,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { IoHome, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import {
  MdForward10,
  MdFullscreen,
  MdOutlineReplay10,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";

import Spinner from "../Components/Spinner";
import firebaseApp from "../firebase-config";
import {
  deleteVideo,
  gertUserInfo,
  getSpecificVideo,
  recommendedFeed,
} from "../utils/fetchData";
import logo from "../img/logo.png";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import { fetchUser } from "../utils/fetchUser";
import RecommendedVideos from "./RecommendedVideos";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")} : ${ss}`;
    // 01:02:32
  }

  return `${mm}:${ss}`;
  // 02:35
};

const avatar =
  "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const VideoPinDetail = () => {
  const { videoId } = useParams();
  const textColor = useColorModeValue("gray.900", "gray.50");
  const navigate = useNavigate();
  // firestore database instance
  const firestoreDb = getFirestore(firebaseApp);
  const [localUser] = fetchUser();

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  // Custom reference
  const playerRef = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpecificVideo(firestoreDb, videoId).then((data) => {
        setVideoInfo(data);

        recommendedFeed(firestoreDb, data.category, videoId).then((feed) => {
          setFeeds(feed);
        });

        gertUserInfo(firestoreDb, data.userId).then((user) => {
          setUserInfo(user);
        });

        setIsLoading(false);
      });
    }
  }, [videoId]);

  const onvolumechange = (e) => {
    setVolume(parseFloat(e / 100));

    e === 0 ? setMuted(true) : setMuted(false);
  };

  const handleFastRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (!seeking) {
      setPlayed(parseFloat(changeState.played / 100) * 100);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e / 100));
  };

  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(e / 100);
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  const deleteTheVideo = (videoId) => {
    setIsLoading(true);
    deleteVideo(firestoreDb, videoId);
    navigate("/", { replace: true });
  };

  if (isLoading) return <Spinner />;

  return (
    <Flex
      width={"full"}
      height="auto"
      justifyContent={"center"}
      alignItems="center"
      direction={"column"}
      py={2}
      px={3}
    >
    <h1>TITULO: {videoInfo?.title}</h1><br/>{videoInfo?.id && (
                    <Text fontSize={12}>
                      {moment(
                        new Date(parseInt(videoInfo.id)).toISOString("pt-BR")
                      ).fromNow()}
                    </Text>
                  )}
     <video src={videoInfo?.videoUrl} width="750" height="500" controls play>
     </video>
           <Flex justifyContent={"space-around"} mt={6}>
          {userInfo?.uid === localUser.uid && (
                  <Popover closeOnEsc>
                    <PopoverTrigger>
                      <Button colorScheme={"red"}>
                        <IoTrash fontSize={20} color="#fff" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete it?
                      </PopoverBody>

                      <PopoverFooter d="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button
                            colorScheme="red"
                            onClick={() => deleteTheVideo(videoId)}
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}
                 {videoInfo?.description && (
            <Flex my={6} direction="column">
              <Text my={2} fontSize={25} fontWeight="semibold">
                Description
              </Text>
              {HTMLReactParser(videoInfo?.description)}
            </Flex>
          )}
    </Flex>
    
       </Flex>
  );
};

export default VideoPinDetail;
