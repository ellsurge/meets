import { YStack, Text, XStack, Stack, View } from "tamagui";
import EventList from "../organisms/EventList";
import React from "react";
import AddEvent from "../organisms/AddEvent";

// Reuse the prop type from EventList
type EventListProps = React.ComponentProps<typeof EventList>;

type props = {
    eventList: EventListProps;
    addEvent: React.ComponentProps<typeof AddEvent>; // Function to handle add action
};

export default function TestTemplate(props: props) {
    return (
        <YStack
            p={16}
            flex={1}
            verticalAlign="center"
            bg="#f5f5f5"
            gap={10}
        >
            <Text fontSize={24} fontWeight="bold" color="#333">
                Test Screen
            </Text>
            <YStack
                $md={{ flexDirection: "row" }}
                width={"100%"}
                gap={10}
                justify="center"
            >
                <AddEvent {...props.addEvent} />
                <EventList {...props.eventList} />
            </YStack>
        </YStack>
    );
}