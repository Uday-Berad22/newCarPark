// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const BookParking = () => {
//   const [arrivalTime, setArrivalTime] = useState(new Date());
//   const [departureTime, setDepartureTime] = useState(new Date());
//   const [reason, setReason] = useState("");
//   const [address, setAddress] = useState("");
//   const [showArrivalPicker, setShowArrivalPicker] = useState(false);
//   const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//   const [isBookingTime, setIsBookingTime] = useState(false);

//   // Mock data for tokens (in a real app, this would come from a backend)
//   const totalTokens = 5;
//   const usedTokensThisWeek = 1;

//   useEffect(() => {
//     const checkBookingTime = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       setIsBookingTime(hours >= 12 || hours < 0); // 6 PM to 12 AM
//     };

//     checkBookingTime();
//     const interval = setInterval(checkBookingTime, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = () => {
//     if (!isBookingTime) {
//       Alert.alert(
//         "Booking Not Available",
//         "Please wait until 6:00 PM to book parking."
//       );
//       return;
//     }

//     if (usedTokensThisWeek >= 2) {
//       Alert.alert("Token Limit Reached", "You can only use 2 tokens per week.");
//       return;
//     }

//     // Here you would typically send this data to your backend
//     console.log("Booking submitted:", {
//       arrivalTime,
//       departureTime,
//       reason,
//       address,
//     });
//     Alert.alert(
//       "Booking Submitted",
//       "Your parking has been booked successfully!"
//     );
//   };

//   if (!isBookingTime) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Book Parking</Text>
//         <Text style={styles.message}>
//           Booking is only available from 6:00 PM to 12:00 AM.
//         </Text>
//         <Text style={styles.message}>
//           Please wait until 6:00 PM to book parking.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book Parking</Text>

//       <Text style={styles.label}>Arrival Time:</Text>
//       <Button
//         onPress={() => setShowArrivalPicker(true)}
//         title={arrivalTime.toLocaleString()}
//       />
//       {showArrivalPicker && (
//         <DateTimePicker
//           value={arrivalTime}
//           mode="datetime"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowArrivalPicker(false);
//             if (selectedDate) setArrivalTime(selectedDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Departure Time:</Text>
//       <Button
//         onPress={() => setShowDeparturePicker(true)}
//         title={departureTime.toLocaleString()}
//       />
//       {showDeparturePicker && (
//         <DateTimePicker
//           value={departureTime}
//           mode="datetime"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDeparturePicker(false);
//             if (selectedDate) setDepartureTime(selectedDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Specific Reason:</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setReason}
//         value={reason}
//         placeholder="Enter reason"
//       />

//       <Text style={styles.label}>Address:</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setAddress}
//         value={address}
//         placeholder="Enter address"
//       />

//       <Button title="Submit" onPress={handleSubmit} />

//       <View style={styles.tokenInfo}>
//         <Text>Total Tokens: {totalTokens}</Text>
//         <Text>Used Tokens This Week: {usedTokensThisWeek}</Text>
//         <Text>
//           Remaining Tokens This Week:{" "}
//           {Math.min(2 - usedTokensThisWeek, totalTokens)}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   tokenInfo: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//   },
//   message: {
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: "center",
//   },
// });

// export default BookParking;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const BookParking = () => {
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [isBookingTime, setIsBookingTime] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock data for tokens (in a real app, this would come from a backend)
  const totalTokens = 5;
  const usedTokensThisWeek = 1;

  useEffect(() => {
    const checkBookingTime = () => {
      const now = new Date();
      const hours = now.getHours();
      setIsBookingTime(hours >= 12 || hours < 0); // 6 PM to 12 AM
    };

    checkBookingTime();
    const interval = setInterval(checkBookingTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (arrivalTime >= departureTime) {
      newErrors.time = "Departure time must be after arrival time";
    }
    if (reason.trim().length === 0) {
      newErrors.reason = "Reason is required";
    }
    if (address.trim().length === 0) {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!isBookingTime) {
      Alert.alert(
        "Booking Not Available",
        "Please wait until 6:00 PM to book parking."
      );
      return;
    }

    if (usedTokensThisWeek >= 2) {
      Alert.alert("Token Limit Reached", "You can only use 2 tokens per week.");
      return;
    }

    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmBooking = () => {
    // Here you would typically send this data to your backend
    console.log("Booking submitted:", {
      arrivalTime,
      departureTime,
      reason,
      address,
    });
    Alert.alert(
      "Booking Submitted",
      "Your parking has been booked successfully!"
    );
    setShowConfirmation(false);
    // Reset form
    setReason("");
    setAddress("");
  };

  const renderBookingTimeIndicator = () => (
    <View style={styles.bookingTimeIndicator}>
      <Ionicons
        name={isBookingTime ? "time" : "time-outline"}
        size={24}
        color={isBookingTime ? "green" : "red"}
      />
      <Text
        style={[
          styles.bookingTimeText,
          { color: isBookingTime ? "green" : "red" },
        ]}
      >
        {isBookingTime ? "Booking Window Open" : "Booking Window Closed"}
      </Text>
    </View>
  );

  if (!isBookingTime) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Book Parking</Text>
        {renderBookingTimeIndicator()}
        <Text style={styles.message}>
          Booking is only available from 6:00 PM to 12:00 AM.
        </Text>
        <Text style={styles.message}>
          Please wait until 6:00 PM to book parking.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Parking</Text>
      {renderBookingTimeIndicator()}

      <Text style={styles.label}>Arrival Time:</Text>
      <Button
        onPress={() => setShowArrivalPicker(true)}
        title={arrivalTime.toLocaleString()}
      />
      {showArrivalPicker && (
        <DateTimePicker
          value={arrivalTime}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowArrivalPicker(false);
            if (selectedDate) setArrivalTime(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Departure Time:</Text>
      <Button
        onPress={() => setShowDeparturePicker(true)}
        title={departureTime.toLocaleString()}
      />
      {showDeparturePicker && (
        <DateTimePicker
          value={departureTime}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDeparturePicker(false);
            if (selectedDate) setDepartureTime(selectedDate);
          }}
        />
      )}
      {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

      <Text style={styles.label}>Specific Reason:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setReason}
        value={reason}
        placeholder="Enter reason"
      />
      {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Enter address"
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <Button title="Submit" onPress={handleSubmit} />

      <View style={styles.tokenInfo}>
        <Text>Total Tokens: {totalTokens}</Text>
        <Text>Used Tokens This Week: {usedTokensThisWeek}</Text>
        <Text>
          Remaining Tokens This Week:{" "}
          {Math.min(2 - usedTokensThisWeek, totalTokens)}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirm Booking</Text>
            <Text>Arrival: {arrivalTime.toLocaleString()}</Text>
            <Text>Departure: {departureTime.toLocaleString()}</Text>
            <Text>Reason: {reason}</Text>
            <Text>Address: {address}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmBooking}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tokenInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  bookingTimeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bookingTimeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#FF6347",
  },
  buttonConfirm: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BookParking;
