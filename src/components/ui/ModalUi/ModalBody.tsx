import { ReactNode } from 'react';

interface ModalBodyProps {
    children: ReactNode;
}

export default function ModalBody({ children }: ModalBodyProps) {
    return <div className="p-6 space-y-6">{children}</div>;
}
