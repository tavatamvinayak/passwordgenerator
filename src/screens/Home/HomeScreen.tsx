import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";

import BouncyCheckbox from "react-native-bouncy-checkbox";

// //Form validation
import * as Yup from "yup";
import { Formik } from "formik";

//
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, `should be min of 4 char`)
    .max(16, `should be max of 16 char`)
    .required(`length is required`),
});

function HomeScreen() {
  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+?~";

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (number) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    // console.log(result);
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView className="flex-1">
        <View className="m-3 p-3">
          {/* <Text className="text-3xl font-bold mt-5 text-red-500">Password Generator</Text> */}
          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              console.log(values);
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View className="flex-1 flex-row justify-between my-2">
                  <View>
                    <Text>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                    className="border px-1 w-[30%] rounded-md"
                  ></TextInput>
                </View>

                {/* LowerCase checkbox */}
                <View className="flex-1 flex-row justify-between my-2">
                  <Text>Include LowerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#FED85D"
                  />
                </View>

                {/* UpperCase checkbox */}
                <View className="flex-1 flex-row justify-between my-2">
                  <Text>Include UpperCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>

                {/* NumberCase checkbox */}
                <View className="flex-1 flex-row justify-between my-2">
                  <Text>Include NumberCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="#C9A0DC"
                  />
                </View>

                {/* symbols checkbox */}
                <View className="flex-1 flex-row justify-between my-2">
                  <Text>Include symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#Fc80A5"
                  />
                </View>

                <View className="flex-1 justify-center items-center">
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    className="border rounded-md px-2 py-1 w-[45%] my-4"
                  >
                    <Text className="text-center">Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                    className="border rounded-md px-2 py-1 w-16"
                  >
                    <Text className="text-center">Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <View className="w-[100%] h-[40vh] border flex-1 justify-center items-center">
            {isPassGenerated ? (
              <View>
                <Text className="text-green-500">Result :</Text>
                <Text selectable={true} className="text-2xl text-blue-500">
                  {password}
                </Text>
                <Text className="text-gray-400">Long Press to Copy</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View className="m-3">
          <View className="flex-1 flex-row justify-center items-center">
            <Text className="text-gray-400">
              Create by{" "}
              <Text className=" text-blue-400">vinayak tavatam</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default HomeScreen;
