import { styled } from "tamagui";
import { Text } from "tamagui"; // Import the Text component

export const DetailAtom = styled(Text, {
    fontSize: 16,
    color: "$color",
    fontWeight: 400,
    hoverStyle: {
        color: "blue",
    },
});