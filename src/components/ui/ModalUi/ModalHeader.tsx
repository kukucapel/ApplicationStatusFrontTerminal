import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalHeaderProps {
    title: string;
    semiTitle?: string;
    onClose: () => void;
    children?: ReactNode;
}

export default function ModalHeader({
    title,
    onClose,
    children,
    semiTitle,
}: ModalHeaderProps) {
    return (
        <div className="sticky shadow-md px-6 py-5 rounded-tl-2xl">
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <span>{semiTitle}</span>
                </div>

                {children}
                <button
                    data-testid="create-modal-close-btn"
                    onClick={onClose}
                    className=" hover:text-blue-600 cursor-pointer hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                    <X className="w-6 h-6 transition-colors" />
                </button>
            </div>
        </div>
    );
}
