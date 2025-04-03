import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { View, Button, Input, Label } from "tamagui";

export function SignUpScreen() {
  const { onGoogleAuth, onAppleAuth, handleRegistration } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = () => {
        handleRegistration.mutateAsync({
        email, password
    });
  };

  return (
    <View p={20} gap={10}>
      {showForm ? (
        <View gap={10}>
          <Label>Email</Label>
          <Input value={email} onChangeText={setEmail} placeholder="Enter email" />
          <Label>Password</Label>
          <Input value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
          <Button onPress={handleSubmit}>Register</Button>
          <Button onPress={() => setShowForm(false)}>Back</Button>
        </View>
      ) : (
        <View gap={10}>
          <Button onPress={() => setShowForm(true)}>Sign up with Email</Button>
          <Button onPress={onGoogleAuth}>Sign up with Google</Button>
          <Button onPress={onAppleAuth}>Sign up with Apple</Button>
        </View>
      )}
    </View>
  );
}
