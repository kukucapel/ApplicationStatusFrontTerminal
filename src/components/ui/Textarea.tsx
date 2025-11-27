'use client';

interface TextareaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

export default function Textarea({
    value,
    onChange,
    placeholder = 'Введите тему обращения',
}: TextareaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className="w-full h-50 rounded-lg border border-gray-200 shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition duration-200 resize-none"
            placeholder={placeholder}
        ></textarea>
    );
}
