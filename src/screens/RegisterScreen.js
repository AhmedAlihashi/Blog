import React, { useState } from "react";
import { Layout, Text, Icon, Button, Spinner } from "@ui-kitten/components";
import { CommonActions } from "@react-navigation/native";
import TextInput from "../components/TextInput";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "../../core/utils";
import { signInUser } from "../api/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignUpPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const response = await signInUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <Layout
      style={{
        flex: 9,
      }}
    >
      <Layout
        style={{
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Icon
          style={{
            marginTop: 30,
            marginLeft: 10,
            width: 32,
            height: 32,
          }}
          fill="#8F9BB3"
          name="arrow-back"
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      </Layout>

      <Layout
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text category="h1" style={{ fontSize: 120 }}>
          Blog.
        </Text>
      </Layout>

      <Layout
        style={{
          flex: 6,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          status="basic"
          size="medium"
          onPress={() => onSignUpPressed()}
          accessoryLeft={() => (loading ? <Spinner /> : null)}
        >
          Sign Up
        </Button>
      </Layout>
    </Layout>
  );
};

export default RegisterScreen;
