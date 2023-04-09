import firebaseApp from "../firebase-config";
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where} from 'firebase/firestore';

// fetch all docs from firebase
const getAllFeeds = async (firestoreDb) => {
  const feeds = await getDocs(
    query(collection(firestoreDb, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map((doc) => doc.data());
};

// CategoryWise Feeds
const categoryFeeds = async (firestoreDb, categoryId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// Get recommended feeds
const recommendedFeed = async (firestoreDb, categoryId, videoId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      where("id", "!=", videoId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// useruploaded videos
const userUploadedVideos = async (firestoreDb, userId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("userId", "==", userId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};

// fetch the user information user userId

const gertUserInfo = async (firestoreDb, userId) => {
  const userRef = doc(firestoreDb, "users", userId);

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return "No Such Document";
  }
};

// fetch the specific Video
const getSpecificVideo = async (firestoreDb, videoId) => {
  const videoRef = doc(firestoreDb, "videos", videoId);

  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return "No Such Document";
  }
};

const deleteVideo = async (fireStoreDb, videoId) => {
  await deleteDoc(doc(fireStoreDb, "videos", videoId));
};

export {
deleteVideo,
getSpecificVideo,
gertUserInfo,
userUploadedVideos,
recommendedFeed,
getAllFeeds,
categoryFeeds
}
