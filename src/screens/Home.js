import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../color";
import { FONT, SIZES, COLORS } from "../constants/theme";
import { AuthenticatedUserContext } from "../../App";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import Typography from "../components/Typography";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Home = () => {
  const navigation = useNavigation();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const { myObject, setMyObject } = useContext(AuthenticatedUserContext);

  return (
    <View>
      <Image
        source={require("../background.png")}
        style={{ flex: 1, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
