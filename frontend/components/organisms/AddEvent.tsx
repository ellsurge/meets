import { currentDate } from "@/utils";
import React from "react";
import { Button, Form, Input, YStack } from "tamagui";

type AddEventProps = {
    onAdd: (event: { title: string; date: string; location: string }) => void;
};

export default function AddEvent({ onAdd }: AddEventProps) {
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(currentDate);
    const [location, setLocation] = React.useState("");

    return (
        <YStack
            p={16}
            rounded={12}
            bg="#f9f9f9"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            space={16}
            flex={1}
        >
            <Form
                items="center"
                gap={12}
                onSubmit={() => {
                    onAdd({ title, date, location });
                }}
            >
                <Input
                    flex={1}
                    size="$4"
                    width="100%"

                    placeholder="Enter title"
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={8}
                />
                <Input
                    flex={1}
                    width="100%"

                    size="$4"
                    placeholder="Enter date (e.g., 2025-07-15T09:00:00.000Z)"
                    value={date}
                    onChangeText={(value) => setDate(value)}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={8}
                />
                <Input
                    width="100%"
                    
                    flex={1}
                    size="$4"
                    placeholder="Enter location"
                    value={location}
                    onChangeText={(value) => setLocation(value)}
                    borderWidth={1}
                    borderColor="#ccc"
                    rounded={8}
                    p={8}
                />
                <Form.Trigger asChild>

                <Button
                    size="$4"
                    width="100%"
                    bg="#4CAF50"
                    color="white"
                    rounded={8}
                    hoverStyle={{ bg: "#45A049" }}
                    pressStyle={{ bg: "#3E8E41" }}
                    // type="submit"
                >
                    Add Event
                </Button>
                </Form.Trigger>
            </Form>
        </YStack>
    );
}