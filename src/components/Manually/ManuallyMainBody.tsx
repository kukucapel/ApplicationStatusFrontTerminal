'use client';

import ManuallyForm from './ManuallyForm';

interface ManuallyMainBodyProps {
    className?: string;
}

export default function ManuallyMainBody({ className }: ManuallyMainBodyProps) {
    return (
        <div className={`${className}`}>
            <ManuallyForm />
        </div>
    );
}
