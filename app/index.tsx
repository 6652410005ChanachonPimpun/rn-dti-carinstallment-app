import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const carlogo = require("../assets/images/carlogo.png");

export default function Index() {
  //หน่วงเวลาหน้าจอ
  useEffect(() => {
    setTimeout(() => {
      router.replace("/input");
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <Image source={carlogo} style={styles.carlogo} />
      <Text style={styles.appname}>Start Auto Loan</Text>
      <Text style={styles.appnameth}>วางแผนออกรถฉบับมือโปร</Text>
      <ActivityIndicator
        size="large"
        color="#E6F4FE"
        style={{ marginTop: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appname: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    color: "#E6F4FE",
  },
  appnameth: {
    fontFamily: "Kanit_400Regular",
    fontSize: 15,
    color: "#E6F4FE",
    marginTop: 10,
  },
  carlogo: {
    width: 170,
    height: 170,
  },
  container: {
    flex: 1,
    backgroundColor: "#049183",
    alignItems: "center",
    justifyContent: "center",
  },
});
