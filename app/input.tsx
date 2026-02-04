import React, { useState } from "react";

import { router } from "expo-router";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const car = require("../assets/images/car.png");

const down_paymnet = [5, 10, 15, 20, 25, 30, 35];
const month_option = [24, 36, 48, 60, 72, 84];

export default function Input() {
  //สร้าง state เก็บข้อมูล
  const [carprise, setCarprise] = useState("");
  const [cardownpayment, setCardownpayment] = useState("");
  const [carmonth, setCarmonth] = useState("");
  const [carinterest, setCarinterest] = useState("");
  const [carinstallment, setCarinstallment] = useState("");

  const handleCalClick = () => {
    //validate
    if (
      carprise === "" ||
      cardownpayment === "" ||
      carmonth === "" ||
      carinterest === ""
    ) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    //คำนวณ
    let downpayment = (Number(carprise) * Number(cardownpayment)) / 100;
    //ยอดจัด
    let carPayment = Number(carprise) - downpayment;
    //คำนวณดอกเบี้ย
    let tatalInterest =
      (((carPayment * Number(carinterest)) / 100) * Number(carmonth)) / 12;
    //คำนวณยอดผ่อนต่อเดือน
    let installmentPay = (carPayment + tatalInterest) / Number(carmonth);
    //ส่งผลไปที่ result
    router.push({
      pathname: "/result",
      params: {
        downpayment: downpayment.toFixed(2),
        carPayment: carPayment.toFixed(2),
        carprise: Number(carprise).toFixed(2),
        installmentPay: installmentPay.toFixed(2),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* แสดงรูปบนสุด */}
        <Image source={car} style={styles.car} />
        {/* ส่วนใส่ข้อมูล */}
        <View style={styles.inputcontainer}>
          <Text style={{ fontSize: 30, fontFamily: "Kanit_700Bold" }}>
            คำนวณค่างวดรถ
          </Text>
          <Text style={styles.inputTitle}>ราคารถ (บาท)</Text>
          <TextInput
            placeholder="เช่น 5000000"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carprise}
            onChangeText={setCarprise}
          />
          {/* เลือกเงินดาว */}
          <Text style={styles.inputTitle}>เลือกเงินดาว (%)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {down_paymnet.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.downPayment,
                  cardownpayment === item.toString() &&
                    styles.downPaymentSelect,
                ]}
                onPress={() => setCardownpayment(item.toString())}
              >
                <Text
                  style={[
                    styles.downLabel,
                    cardownpayment === item.toString() &&
                      styles.downLabelSelect,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* เลือกระยะเวลาผ่อน */}
          <Text style={styles.inputTitle}>ระยะเวลาผ่อน (งวด)</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {month_option.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moneyOption,
                  carmonth === item.toString() && styles.moneyOptionSelect,
                ]}
                onPress={() => setCarmonth(item.toString())}
              >
                <Text
                  style={[
                    styles.moneyLabel,
                    carmonth === item.toString() && styles.moneyLabelSelect,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* ป้อนดอกเบี้ย */}
          <Text style={styles.inputTitle}>ดอกเบี้ย (% ต่อปี)</Text>
          <TextInput
            placeholder="เฃ่น 2.59"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carinterest}
            onChangeText={setCarinterest}
          />
          {/* ปุ่มคำนวณค่างวด */}
          <TouchableOpacity onPress={handleCalClick} style={styles.btncal}>
            <Text style={styles.labelcal}>คำนวณงวดรถ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btncal: {
    backgroundColor: "#049183",
    padding: 20,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  labelcal: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "white",
  },
  downPayment: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // width: 70,
    // height: 70,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
  },
  downLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
    color: "#777777",
  },
  downPaymentSelect: {
    backgroundColor: "#505050",
  },
  downLabelSelect: {
    color: "#ffffff",
  },
  moneyOption: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // width: 70,
    // height: 70,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
  },
  moneyLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
    color: "#777777",
  },
  moneyOptionSelect: {
    backgroundColor: "#505050",
  },
  moneyLabelSelect: {
    color: "#ffffff",
  },
  inputValue: {
    fontFamily: "Kanit_400Regular",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d8efff",
    backgroundColor: "#f1f5f9",
    marginTop: 10,
    opacity: 0.8,
  },
  inputTitle: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "#323232dd",
    marginTop: 20,
  },
  inputcontainer: {
    backgroundColor: "white",
    marginTop: -30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  car: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});
