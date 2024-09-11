// import React from "react";
// import { Text, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
// import BookParking from "./components/BookParking";
// import ParkingAllotted from "./components/ParkingAllotted";
// import CarPooling from "./components/CarPooling";
// import MakeComplaint from "./components/MakeComplaint";

// const Tab = createBottomTabNavigator();

// const CompanyHeader = () => (
//   <Text style={styles.headerText}>Commvault Pune</Text>
// );

// const HomePage = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Book Parking") {
//               iconName = focused ? "car" : "car-outline";
//             } else if (route.name === "Parking Allotted") {
//               iconName = focused
//                 ? "checkmark-circle"
//                 : "checkmark-circle-outline";
//             } else if (route.name === "Car Pooling") {
//               iconName = focused ? "people" : "people-outline";
//             } else if (route.name === "Make Complaint") {
//               iconName = focused ? "warning" : "warning-outline";
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           headerTitle: () => <CompanyHeader />,
//           headerStyle: {
//             backgroundColor: "#000000", // You can change this to match your app's theme
//           },
//           headerTintColor: "#fff",
//           headerTitleAlign: "center",
//         })}
//         tabBarOptions={{
//           activeTintColor: "tomato",
//           inactiveTintColor: "gray",
//         }}
//       >
//         <Tab.Screen name="Book Parking" component={BookParking} />
//         <Tab.Screen name="Parking Allotted" component={ParkingAllotted} />
//         <Tab.Screen name="Car Pooling" component={CarPooling} />
//         <Tab.Screen name="Make Complaint" component={MakeComplaint} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff", // This should contrast with your header background color
//   },
// });

// export default HomePage;

import React from "react";
import { Text, View, Image, StyleSheet, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import BookParking from "./components/BookParking";
import ParkingAllotted from "./components/ParkingAllotted";
import CarPooling from "./components/CarPooling";
import MakeComplaint from "./components/MakeComplaint";

const Tab = createBottomTabNavigator();

const CompanyHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require("./assets/CommvaultLogo.png")} // Make sure this path is correct
      style={styles.logo}
    />
    <Text style={styles.headerText}>Commvault Pune</Text>
  </View>
);

const HomePage = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Book Parking") {
              iconName = focused ? "car" : "car-outline";
            } else if (route.name === "Parking Allotted") {
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline";
            } else if (route.name === "Car Pooling") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Make Complaint") {
              iconName = focused ? "warning" : "warning-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          headerTitle: () => <CompanyHeader />,
          headerStyle: {
            backgroundColor: "#ffffff", // Light background for the header
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
          },
          headerTintColor: "#000000", // Black color for any default header text
          headerTitleAlign: "center",
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Book Parking" component={BookParking} />
        <Tab.Screen name="Parking Allotted" component={ParkingAllotted} />
        <Tab.Screen name="Car Pooling" component={CarPooling} />
        <Tab.Screen name="Make Complaint" component={MakeComplaint} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000", // Black text color
    marginLeft: 10, // Space between logo and text
  },
  logo: {
    width: 30, // Adjust based on your logo's dimensions
    height: 30, // Adjust based on your logo's dimensions
    resizeMode: "contain",
  },
});

export default HomePage;
