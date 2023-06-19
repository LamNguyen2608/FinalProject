import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../color";
import { Entypo } from "@expo/vector-icons";
const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const TransportationMonitor = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <FontAwesome
  //         name="search"
  //         size={24}
  //         color={colors.gray}
  //         style={{ marginLeft: 15 }}
  //       />
  //     ),
  //     headerRight: () => (
  //       <Image
  //         source={{ uri: catImageUrl }}
  //         style={{
  //           width: 40,
  //           height: 40,
  //           marginRight: 15,
  //         }}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <WebView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      keyboardDisplayRequiresUserAction={false}
      style={{ height: "100%" }}
      source={{
        uri: "https://transportation-miniapp-n9t5qto16-lamnguyen2608.vercel.app/miniapp/transportation/ZBa16LZrCvWGUHH6Tx72fHzu7br1",
      }}
    />
  );
};

export default TransportationMonitor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
