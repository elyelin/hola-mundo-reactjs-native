import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [permisos, setPermisos] = useState(null);
  const [tipo, setTipo] = useState(Camera.Constants.Type.front);

  const getPermisos = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermisos(status == "granted");
    console.log(status);
  };

  useEffect(() => {
    getPermisos();
  });

  if (permisos === null) {
    return (
      <View>
        <Text>Esperando permisos</Text>
      </View>
    );
  }
  if (permisos === false) {
    return (
      <View>
        <Text>No tenemos acceso</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={tipo}>
        <Button
          title="Voltear"
          onPress={() => {
            const { front, back } = Camera.Constants.Type;
            const nuevoTipo = tipo === back ? front : back;
            setTipo(nuevoTipo);
          }}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#E0777D",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 25,
  },
});
