import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Check } from "phosphor-react-native";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface PropsChecked extends TouchableOpacityProps {
    title: string;
    checked?: boolean;
}

export function CheckBox({ title, checked = false, ...rest }: PropsChecked) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row mb-2 items-center"
            {...rest}
        >
            {
                checked
                    ?
                    <Animated.View
                        className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
                        entering={ZoomIn}
                        exiting={ZoomOut}
                    >
                        <Check
                            size={20}
                            color={colors.white}
                        />
                    </Animated.View>
                    :
                    <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
            }
            <Text className="text-white text-base ml-3 font-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    )
}