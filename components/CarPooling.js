import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";

const CarPooling = () => {
  const [selectedCarPool, setSelectedCarPool] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(true); // This would be set based on user authentication

  // Dummy data for demonstration
  const carPoolData = [
    {
      id: "1",
      name: "John Doe",
      seats: 3,
      route: "City Center to Business Park",
      location: "City Center",
      arrivalTime: "08:30 AM",
      departureTime: "09:00 AM",
      address: "123 Main St, City Center",
      status: "Available",
    },
    {
      id: "2",
      name: "Jane Smith",
      seats: 2,
      route: "Suburb to Downtown",
      location: "Suburb",
      arrivalTime: "07:45 AM",
      departureTime: "08:15 AM",
      address: "456 Oak Rd, Suburb",
      status: "Available",
    },
    // Add more data as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedCarPool(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text>Route: {item.route}</Text>
      <Text>Available Seats: {item.seats}</Text>
    </TouchableOpacity>
  );

  const handleRequest = () => {
    // Handle request logic here
    console.log("Request sent");
    // Update the status to 'Pending' in your actual implementation
  };

  const handleAccept = () => {
    // Handle accept logic here
    console.log("Request accepted");
    // Update the status to 'Accepted' in your actual implementation
  };

  const handleDeny = () => {
    // Handle deny logic here
    console.log("Request denied");
    // Update the status to 'Denied' in your actual implementation
  };

  const handleEdit = () => {
    // Handle edit logic here
    console.log("Edit car pool information");
    // Implement edit functionality in your actual implementation
  };

  const handleRemove = () => {
    // Handle remove logic here
    console.log("Remove car from car pooling");
    // Implement remove functionality in your actual implementation
  };

  const renderDetails = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Name: {selectedCarPool?.name}</Text>
          <Text style={styles.modalText}>
            Available Seats: {selectedCarPool?.seats}
          </Text>
          <Text style={styles.modalText}>Route: {selectedCarPool?.route}</Text>
          <Text style={styles.modalText}>
            Location: {selectedCarPool?.location}
          </Text>
          <Text style={styles.modalText}>
            Arrival Time: {selectedCarPool?.arrivalTime}
          </Text>
          <Text style={styles.modalText}>
            Departure Time: {selectedCarPool?.departureTime}
          </Text>
          <Text style={styles.modalText}>
            Address: {selectedCarPool?.address}
          </Text>
          <Text style={styles.modalText}>
            Status: {selectedCarPool?.status}
          </Text>

          {!isOwner && (
            <TouchableOpacity style={styles.button} onPress={handleRequest}>
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
          )}

          {isOwner && (
            <View>
              <TouchableOpacity style={styles.button} onPress={handleAccept}>
                <Text style={styles.buttonText}>Accept Request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDeny}>
                <Text style={styles.buttonText}>Deny Request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit Information</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRemove}>
                <Text style={styles.buttonText}>Remove Car Pool</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={carPoolData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {renderDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CarPooling;
