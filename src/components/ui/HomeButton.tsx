import { ReactNode } from 'react';

interface ButtonProps {
    className?: string;
    styleColor: string;
    onClick?: () => void;
    children?: ReactNode;
}

export default function HomeButton({
    className,
    onClick,
    styleColor,
    children,
}: ButtonProps) {
    return (
        <button
            className={
                styleColor === 'white'
                    ? ` transition-all duration-150 border-2 rounded-4xl border-gray-200 font-medium ${className} cursor-pointer active:scale-95 hover:bg-gray-100 duration-150 shadow-md
                    `
                    : `transition-all duration-150 border-2 rounded-4xl border-gray-200 font-medium ${className} 
                              cursor-pointer text-white bg-blue-600 hover:bg-blue-700 active:scale-95  duration-150
                      `
            }
            onClick={onClick}
        >
            {children}
        </button>
    );
}
