import { currentDate } from "@/utils";
import { RouterInput } from "@/utils/trpc";
import React from "react";
import { Button, Form, Input, Spinner, YStack, Text } from "tamagui";

type AddEventProps = {
    onAdd: (event: RouterInput["event"]["add"]) => void;
    isLoading: boolean;
};

export default function AddEvent({ onAdd, isLoading }: AddEventProps) {
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(currentDate);
    const [location, setLocation] = React.useState("");

    const handleSubmit = React.useCallback(() => {
        onAdd({ title, date, location });
    }, [onAdd, title, date, location]);

    return (
        <YStack
            p={16}
            rounded={12}
            bg="#ffffff"
            shadowColor="rgba(0, 0, 0, 0.1)"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            space={16}
            width="100%"
            maxW={400}
        >
            <Text fontSize={20} fontWeight="bold" color="#333" text="center">
                Add New Event
            </Text>
            <Form items="center" gap={12} onSubmit={handleSubmit}>
                <Input
                    flex={1}
                    size="$4"
                    width="100%"
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={12}
                    bg="#f9f9f9"
                />
                <Input
                    flex={1}
                    width="100%"
                    size="$4"
                    placeholder="Enter date (e.g., 2025-07-15T09:00:00.000Z)"
                    value={date}
                    onChangeText={setDate}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={12}
                    bg="#f9f9f9"
                />
                <Input
                    width="100%"
                    flex={1}
                    size="$4"
                    placeholder="Enter location"
                    value={location}
                    onChangeText={setLocation}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={12}
                    bg="#f9f9f9"
                />
                <Form.Trigger asChild>
                    <Button
                        size="$4"
                        width="100%"
                        bg={isLoading ? "#007BFF" : "#4CAF50"}
                        color="white"
                        rounded={8}
                        hoverStyle={{ bg: isLoading ? "#0056b3" : "#45A049" }}
                        pressStyle={{ bg: isLoading ? "#004085" : "#3E8E41" }}
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="small" color="white" />
                                <Text ml={8}>Loading...</Text>
                            </>
                        ) : (
                            "Add Event"
                        )}
                    </Button>
                </Form.Trigger>
            </Form>
        </YStack>
    );
}