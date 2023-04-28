import AsyncStorage from "@react-native-async-storage/async-storage";

const EMAIL = "EMAIL_TO_SEND";

export async function getEmail() {
  try {
    let data = await AsyncStorage.getItem(EMAIL);
    return data == null ? 'Email por configurar' : data;
  } catch (err) {
    console.log(err);
  }
}

export async function setEmail(email) {
  try {
    AsyncStorage.setItem(EMAIL, email)
  } catch (err) {
    console.log(err)
  }
}