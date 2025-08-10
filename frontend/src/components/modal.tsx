import crossIcon from "src/assets/cross.png"
import type { ReactNode } from "react";

type ModalComponentProps = {
    title: string
    isClosable: boolean
    children: ReactNode
    onClose?: () => void
}

export const ModalComponent = ({ title, isClosable, onClose, children } : ModalComponentProps) => {
    return (
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <div className="flex justify-between items-center pb-5">
                    <h1 className="text-2xl font-bold text-center text-emerald-700">
                        {title}
                    </h1>
                    { isClosable && (
                        <img src={crossIcon} style={{ width: 20, height: 20, objectFit: "contain" }} alt="cross icon" onClick={onClose}/>
                    )}
                    
                </div>
                {children}
            </div>
    )
}