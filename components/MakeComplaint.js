import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const MakeComplaint = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // This would be set based on user authentication
  const [complaints, setComplaints] = useState([]); // This would be fetched from a backend in a real app

  const handleSubmit = () => {
    if (subject.trim() === "" || description.trim() === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Here you would typically send the complaint to your backend
    const newComplaint = {
      id: Date.now().toString(),
      subject,
      description,
      attachment: attachment ? attachment.name : "No attachment",
      status: "Pending",
    };

    setComplaints([...complaints, newComplaint]);
    Alert.alert("Success", "Complaint submitted successfully");
    setSubject("");
    setDescription("");
    setAttachment(null);
  };

  const handleAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === "success") {
        setAttachment(result);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const renderComplaint = ({ item }) => (
    <View style={styles.complaintItem}>
      <Text style={styles.complaintSubject}>{item.subject}</Text>
      <Text>{item.description}</Text>
      <Text>Attachment: {item.attachment}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isAdmin ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.button} onPress={handleAttachment}>
            <Text style={styles.buttonText}>
              {attachment ? "Change Attachment" : "Add Attachment"}
            </Text>
          </TouchableOpacity>
          {attachment && (
            <Text style={styles.attachmentText}>{attachment.name}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Complaint</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.header}>All Complaints</Text>
          <FlatList
            data={complaints}
            renderItem={renderComplaint}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  attachmentText: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  complaintItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  complaintSubject: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default MakeComplaint;
