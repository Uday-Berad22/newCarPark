import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

const ParkingAllotted = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy data for demonstration
  const parkingData = [
    { id: "1", name: "John Doe", parkingSpot: "A1", carModel: "Toyota Camry" },
    { id: "2", name: "Jane Smith", parkingSpot: "B2", carModel: "Honda Civic" },
    { id: "3", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "4", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "5", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "6", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "7", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "8", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    { id: "9", name: "Bob Johnson", parkingSpot: "C3", carModel: "Ford Focus" },
    {
      id: "10",
      name: "Bob Johnson",
      parkingSpot: "C3",
      carModel: "Ford Focus",
    },
    {
      id: "11",
      name: "Bob Johnson",
      parkingSpot: "C3",
      carModel: "Ford Focus",
    },
    {
      id: "12",
      name: "Bob Johnson",
      parkingSpot: "C3",
      carModel: "Ford Focus",
    },
    // Add more data as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedPerson(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text>Parking Spot: {item.parkingSpot}</Text>
    </TouchableOpacity>
  );

  const renderDetails = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Name: {selectedPerson?.name}</Text>
          <Text style={styles.modalText}>
            Parking Spot: {selectedPerson?.parkingSpot}
          </Text>
          <Text style={styles.modalText}>
            Car Model: {selectedPerson?.carModel}
          </Text>

          {/* Assume the logged-in user's ID is '1' for this example */}
          {selectedPerson?.id === "1" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Handle "Want to Car Pool" logic here
                console.log("Want to Car Pool pressed");
              }}
            >
              <Text style={styles.buttonText}>Want to Car Pool</Text>
            </TouchableOpacity>
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
        data={parkingData}
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

export default ParkingAllotted;
