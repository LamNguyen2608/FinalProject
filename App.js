import "react-native-gesture-handler";
import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { auth } from "./config/firebase";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Chat from "./src/screens/Chat";
import Home from "./src/screens/Home";
import TransportationMonitor from "./src/screens/TransportationMonitor";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomNavigation}
        screenOptions={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Transportation Monitor"
        component={TransportationMonitor}
      />
      <Drawer.Screen name="Sleep Monitor" component={Home} />
      <Drawer.Screen name="Clothes Monitor" component={Home} />
    </Drawer.Navigator>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator
      defaultScreenOptions={ChatStack}
      screenOptions={{
        activeTintColor: "#b7a5e7",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Full-time"
        component={ChatStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: "Full-time",
          tabBarIcon: () => (
            <FontAwesome name="calendar-check-o" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Arrange"
        component={Home}
        options={{
          headerTransparent: true,
          headerShown: false,
          tabBarLabel: "Arrange",
          tabBarIcon: () => <Entypo name="chat" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Part-time"
        component={Home}
        options={{
          tabBarLabel: "Part-time",
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5 name="money-bill-wave" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="ios-person-sharp" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
