'use client';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface KeyboardSimpleProps {
    onChange: (input: string) => void;
}

export default function KeyboardSimple({ onChange }: KeyboardSimpleProps) {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
            }}
        >
            <Keyboard onChange={onChange} />
        </div>
    );
}
