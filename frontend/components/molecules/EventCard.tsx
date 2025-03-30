import { View, Text } from 'tamagui';
import { DetailAtom } from '../atoms/Detail'; // Ensure this path is correct

interface EventCardProps {
    id: string;
    title: string;
    date: string;
    location: string;
    onDelete?: () => void;
}

export default function EventCard({ title, date, onDelete, location }: EventCardProps) {
    return (
        <View bg="gray" p={4}  gap={10} rounded={4}>
            <Text fontSize="$5" fontWeight="bold" color={'black'}>{title}</Text>
            <Text color="black">{date}</Text>
            <Text color="black">{location}</Text>
            <DetailAtom onPress={onDelete}>Close Event</DetailAtom>
        </View>
    );
}