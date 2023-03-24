import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { AntDesign } from "@expo/vector-icons";
import color from "../color";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((err) => console.log("User signout error =>", err));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={color.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Message");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    //Concern here, if data isn't processed successfully => causing misinformation
    setMessages((prev) => GiftedChat.append(prev, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => onSend(message)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
      }}
      messagesContainerStyle={{
        backgroundColor: "white",
      }}
    />
  );
}
