import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../../App";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Home = () => {
  const navigation = useNavigation();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const { myObject, setMyObject } = useContext(AuthenticatedUserContext);

  //Load Item for date
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown_view}>
        <TouchableHighlight style={styles.submit} underlayColor="#fff">
          <Text></Text>
        </TouchableHighlight>
      </View>
      <View style={styles.calendar_view}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={"2017-05-16"}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  countdown_view: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  calendar_view: {
    width: "100%",
    flex: 2.5,
  },
  submit: {
    flex: 1,
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFE1A4",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    paddingTop: 20,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
