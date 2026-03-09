
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";

export default function Index() {

  const [image, setImage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [program, setProgram] = useState("");
  const [previousEdu, setPreviousEdu] = useState("");

  const [receipt, setReceipt] = useState<any | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {

    if (!name || !fatherName || !phone || !program) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const formData = {
      name,
      fatherName,
      cnic,
      phone,
      email,
      address,
      program,
      previousEdu,
      image,
      createdAt: new Date()
    };

    setReceipt(formData);

    Alert.alert("Success", "Admission Form Submitted");

    setName("");
    setFatherName("");
    setCnic("");
    setPhone("");
    setEmail("");
    setAddress("");
    setProgram("");
    setPreviousEdu("");
    setImage(null);
  };

  const printReceipt = async () => {

    if (!receipt) return;

    const html = `
      <html>
      <body style="font-family: Arial; padding:20px;">
        <h2>BZU Lodhran Admission Receipt</h2>
        <p><b>Name:</b> ${receipt.name}</p>
        <p><b>Father Name:</b> ${receipt.fatherName}</p>
        <p><b>CNIC:</b> ${receipt.cnic}</p>
        <p><b>Phone:</b> ${receipt.phone}</p>
        <p><b>Email:</b> ${receipt.email}</p>
        <p><b>Address:</b> ${receipt.address}</p>
        <p><b>Program:</b> ${receipt.program}</p>
        <p><b>Previous Education:</b> ${receipt.previousEdu}</p>
        <p><b>Submitted On:</b> ${receipt.createdAt.toLocaleString()}</p>
      </body>
      </html>
    `;

    await Print.printAsync({ html });
  };

  return (

    <ScrollView style={styles.container}>

      <Image
        source={require("../../assets/bzu_logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        BZU Lodhran Admission Form
      </Text>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>
          Upload Student Photo
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Father Name"
        value={fatherName}
        onChangeText={setFatherName}
      />

      <TextInput
        style={styles.input}
        placeholder="CNIC / B-Form Number"
        value={cnic}
        onChangeText={setCnic}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Home Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Program Applying For"
        value={program}
        onChangeText={setProgram}
      />

      <TextInput
        style={styles.input}
        placeholder="Previous Education"
        value={previousEdu}
        onChangeText={setPreviousEdu}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Submit Admission Form
        </Text>
      </TouchableOpacity>

      {receipt && (

        <View style={styles.receipt}>

          <Text style={styles.receiptTitle}>
            Admission Receipt
          </Text>

          {receipt.image && (
            <Image
              source={{ uri: receipt.image }}
              style={styles.receiptImage}
            />
          )}

          <Text>Name: {receipt.name}</Text>
          <Text>Father Name: {receipt.fatherName}</Text>
          <Text>CNIC: {receipt.cnic}</Text>
          <Text>Phone: {receipt.phone}</Text>
          <Text>Email: {receipt.email}</Text>
          <Text>Address: {receipt.address}</Text>
          <Text>Program: {receipt.program}</Text>
          <Text>Previous Education: {receipt.previousEdu}</Text>

          <Text style={{ marginTop: 10 }}>
            Submitted On: {receipt.createdAt.toLocaleString()}
          </Text>

          <TouchableOpacity
            style={styles.printButton}
            onPress={printReceipt}
          >
            <Text style={styles.printText}>
              Print Receipt
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9"
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    resizeMode: "contain"
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  imageButton: {
    backgroundColor: "#004aad",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },

  imageButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  preview: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc"
  },

  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  receipt: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },

  receiptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },

  receiptImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10
  },

  printButton: {
    backgroundColor: "#000",
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  printText: {
    color: "#fff",
    fontWeight: "bold"
  }

});