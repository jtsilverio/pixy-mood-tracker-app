import { Pressable, Text, View } from "react-native";
import useColors from "../hooks/useColors";

export default function LinkButton({ 
  type = 'primary', 
  onPress, 
  children, 
  style = {}, 
  icon = null 
}: {
  type?: 'primary' | 'secondary',
  onPress: () => any,
  children: React.ReactNode,
  style?: React.CSSProperties,
  icon?: React.ReactNode,
}) {
  const colors = useColors();
  
  const textColor = {
    primary: colors.primaryLinkButtonText,
    secondary: colors.secondaryLinkButtonText,
  }[type];
  
  return (
    <Pressable
      style={({ pressed }) => [{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.8 : 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
      }, style]}
      onPress={onPress}
    >
      {icon && <View style={{ marginRight: 5 }}>{icon}</View>}
      <Text style={{ 
        fontSize: 17, 
        fontWeight: type === 'primary' ? 'bold' : 'normal', 
        color: textColor,
      }}>{children}</Text>
    </Pressable>
  )
}