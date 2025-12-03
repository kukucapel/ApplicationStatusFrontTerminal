import { ReactNode } from 'react';

interface ButtonProps {
    className?: string;
    styleColor: string;
    onClick?: () => void;
    isActive?: boolean;
    children?: ReactNode;
}

export default function HomeButton({
    className,
    isActive = false,
    onClick,
    styleColor,
    children,
}: ButtonProps) {
    return (
        <button
            className={
                styleColor === 'white'
                    ? ` transition-all duration-150 border-2 rounded-4xl border-gray-200 font-medium ${className} duration-150 shadow-md ${
                          isActive
                              ? 'text-gray-500 bg-gray-100'
                              : 'cursor-pointer active:scale-95 hover:bg-gray-100 '
                      }
                    `
                    : `transition-all duration-150 border-2 rounded-4xl border-gray-200 font-medium ${className} ${
                          isActive
                              ? 'bg-blue-400 text-gray-100'
                              : 'cursor-pointer text-white bg-blue-600 hover:bg-blue-700 active:scale-95'
                      }  duration-150
                      `
            }
            onClick={onClick}
            disabled={isActive ? true : false}
        >
            {children}
        </button>
    );
}
