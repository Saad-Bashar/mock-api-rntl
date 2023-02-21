import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from "react-native";

export default function App() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const sendFeedback = async feedback => {
    try {
      const response = await fetch("https://api.productboard.com/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 123`,
        },
        body: JSON.stringify(feedback),
      });
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    const feedbackObj = {
      title: "Feedback Mobile App",
      content: feedback,
      user: {
        email: "saad@test.com",
        external_id: "123",
      },
    };

    const res = await sendFeedback(feedbackObj);

    console.log("res => ", res);

    if (res.data) {
      setSuccess("Thank you for your feedback!");
      setIsSubmitting(false);
      Keyboard.dismiss();
    } else {
      setSuccess("Something went wrong!");
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {success ? <Text>{success}</Text> : null}

      <TextInput
        placeholder="Your feedback"
        style={styles.input}
        onChangeText={text => setFeedback(text)}
      />

      {isSubmitting ? (
        <ActivityIndicator />
      ) : (
        <Button title="Submit" testID="submit-button" onPress={submit} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
});
