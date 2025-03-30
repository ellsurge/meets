import TestTemplate from "@/components/templates/TestTemplate";
import { trpc } from "@/utils/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, YStack } from "tamagui";
import React from "react";

export default function TestScreen() {
    const queryClient = useQueryClient();

    // Fetch events with error handling
    const { 
        data: events = [], 
        isLoading,
        error,
        refetch
    } = trpc.event.getAll.useQuery();

    const addEvent = trpc.event.add.useMutation({
        onSuccess: () => {
            refetch(); // Refetch events after adding
        },
        onError: (error) => {
            console.error("Add event error:", error);
        },
    });

    const deleteMutation = trpc.event.delete.useMutation({
        onSuccess: () => {
            refetch(); // Refetch events after deletion
        },
        onError: (error) => {
            console.error("Delete event error:", error);
        },
    });

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
    return (
        <TestTemplate
            {...{
                eventList: { events, onDelete: deleteMutation.mutate }, // Pass events and delete handler
                onAdd: { onAdd: addEvent.mutate }, // Pass add handler
            }}
        />
    );
}