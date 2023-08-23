import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    icon: React.ReactElement
    className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    icon,
    className,
}) => {
    return (
        <div>
            <button
                //onClick={onclick}
                className={cn(
                    "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
                    className
                )}
            >
                {icon}
            </button>
        </div>
    )
}

export default IconButton
