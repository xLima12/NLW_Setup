import clsx from "clsx";
import dayjs from "dayjs";
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { generateProgressPorcentage } from "../utils/generate-progress-porcentage";

const weekDays = 7;

const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5);

interface HabitDayProps extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
} 

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: HabitDayProps) {

    const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPorcentage(amountOfHabits, amountCompleted) : 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
                ["bg-violet-800 border-violet-700"] : amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
                ["bg-violet-700 border-violet-600"] : amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : amountAccomplishedPercentage >= 80,
                ["border-white  border-4"] : isCurrentDay
            })}
            style={{width: daySize, height: daySize}}
            activeOpacity={0.7}
            {...rest}
        />
    )
}