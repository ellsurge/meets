import { View } from 'tamagui';
import EventCard from '../molecules/EventCard';
import React from 'react';

// Reuse the prop type from EventCard
type EventCardProps = React.ComponentProps<typeof EventCard>;

interface EventListProps {
    events: 
        {
    id: string;
    title: string;
        date: string;
    location: string;

    }[]; // Use the EventCardProps type for consistency
    onDelete: (id: string) => void; // Function to handle delete action
}

export default function EventList({ events, onDelete }: EventListProps) {
    return (
        <StyledContainer>
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    {...event}
                    onDelete={() => onDelete(event.id)} // Pass the delete handler
                />
            ))}
        </StyledContainer>
    );
}

// Styled container for the EventList
const StyledContainer = (props: React.ComponentProps<typeof View>) => (
    <View
        p={'$4'}
        space={12}
        bg="#f9f9f9"
        rounded={12}
        shadowColor="black"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        borderWidth={1}
        borderColor="#e0e0e0"
    flex={1}
        {...props}
    />
);