import useColors from "@/hooks/useColors";
import useHaptics from "@/hooks/useHaptics";
import { Emotion } from "@/types";
import { Text, View, ViewStyle, useColorScheme } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { EmotionIndicator } from "./EmotionsIndicator";

export const EmotionButtonAdvanced = ({
  emotion, onPress, selected, style = {},
}: {
  emotion: Emotion;
  onPress: (emotion: Emotion) => void;
  selected: boolean;
  style?: ViewStyle;
}) => {
  const colors = useColors();
  const haptics = useHaptics();
  const colorScheme = useColorScheme();

  return (
    <RectButton
      onPress={() => {
        haptics.selection();
        onPress(emotion);
      }}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        ...style,
      }}
      activeOpacity={0}
    >
      <View
        style={{
          width: '100%',
          // backgroundColor: colors.cardBackground,
          backgroundColor: colors.logCardBackground,
          borderRadius: 8,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.tint : colorScheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: selected ? 7 : 8,
          paddingRight: selected ? 15 : 16,
          paddingLeft: selected ? 15 : 16,
        }}
      >
        <EmotionIndicator category={emotion.category} />
        <Text
          style={{
            color: colors.text,
            fontWeight: '500',
            fontSize: 17,
            flex: 1,
            paddingVertical: 6,
          }}
          numberOfLines={1}
        >
          {emotion.label}
        </Text>
      </View>
    </RectButton>
  );
};

export const EmotionButtonEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} />
  );
};
