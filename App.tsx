import { Text, View, ScrollView, SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/Home/HomeScreen";

//// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Password Generator" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
