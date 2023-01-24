import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
    progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <Progress.Root className="bg-background h-3 mt-1 rounded-lg">
            <Progress.Indicator
                className="bg-violet-500 h-3 rounded-lg transition-all"
                style={{width: `${progress}%`}}
            />
        </Progress.Root>
    )
}