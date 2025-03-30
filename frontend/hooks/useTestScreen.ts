import { trpc } from "@/utils/trpc";


export function useTestScreen() {
    // Fetch events with error handling
        const { 
            data: events = [], 
            isLoading,
            error,
            refetch
        } = trpc.event.getAll.useQuery();
    const addEvent = trpc.event.add.useMutation({
            onSuccess: () => {
                refetch(); // Refetch events after adding a new one
            }
        })
        // Mutation for deleting an event with invalidation
        const deleteMutation = trpc.event.delete.useMutation({
            onSuccess: () => {
                refetch(); // Refetch events after deletion
            },
            onError: (error) => {
                console.error('Mutation error:', error);
            },
        });
        // Handle delete action
    
    

    return {
        events,
        isLoading,
        error,
        addEvent,
        deleteMutation,
    }
}