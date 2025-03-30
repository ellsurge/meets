import TestTemplate from "@/components/templates/TestTemplate";
import { trpc } from "@/utils/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, YStack } from "tamagui";
import React from "react";
import { useTestScreen } from "@/hooks/useTestScreen";

export default function TestScreen() {

    const { events, isLoading, error, addEvent, deleteMutation} =  useTestScreen();
    // Show error state
    if (error) {
        return (
            <YStack p={1}>
                <Text color="red">Error loading events: {error.message}</Text>
            </YStack>
        );
    }

    // Render loading state
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Render the main template
    return <TestTemplate {...{
        eventList: { events, onDelete: deleteMutation.mutate }, // Pass events and delete handler
        addEvent: { onAdd: addEvent.mutate, isLoading: addEvent.isPending }, // Pass add handler
    }as React.ComponentProps<typeof TestTemplate>} />;
}