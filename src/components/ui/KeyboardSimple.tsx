'use client';

import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface KeyboardSimpleProps {
    onChange: (input: string) => void;
}

const layouts = {
    en: [
        'q w e r t y u i o p',
        '{lang} a s d f g h j k l',
        '{shift} z x c v b n m {bksp}',
        '{space}',
    ],
    ru: [
        'й ц у к е н г ш щ з',
        '{lang} ф ы в а п р о л д',
        '{shift} я ч с м и т ь б {bksp}',
        '{space}',
    ],
};

export default function KeyboardSimple({ onChange }: KeyboardSimpleProps) {
    const [language, setLanguage] = useState<'en' | 'ru'>('ru');
    const [shift, setShift] = useState(false);

    const handleKeyPress = (button: string) => {
        if (button === '{shift}') {
            setShift(!shift);
            return;
        }

        if (button === '{lang}') {
            setLanguage(language === 'ru' ? 'en' : 'ru');
            setShift(false);
            return;
        }

        onChange(button);

        // сброс shift после обычной клавиши
        if (shift && button !== '{shift}') setShift(false);
    };

    const getShiftLayout = (rows: string[]) =>
        rows.map((row) =>
            row
                .split(' ')
                .map((key) =>
                    key.startsWith('{') && key.endsWith('}')
                        ? key
                        : key.toUpperCase()
                )
                .join(' ')
        );

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                height: '450px',
            }}
        >
            <Keyboard
                layoutName={shift ? 'shift' : 'default'}
                onKeyPress={handleKeyPress}
                layout={{
                    default: [...layouts[language]],
                    shift: [...getShiftLayout(layouts[language])],
                }}
                display={{
                    '{bksp}': '⌫',
                    '{space}': ' ', // обязательно маленькими буквами
                    '{lang}': '🌐',
                    '{shift}': '⇧',
                }}
                buttonTheme={[
                    { class: 'hg-shift', buttons: '{shift}' },
                    { class: 'hg-lang', buttons: '{lang}' },
                    { class: 'hg-space', buttons: '{space}' },
                ]}
                physicalKeyboardHighlight={true}
            />
            <style jsx global>{`
                .hg-button {
                    height: 120px !important;
                    font-size: 1.8rem !important;
                }
                .hg-row {
                    height: 110px !important; /* увеличенная высота строки */
                    margin-bottom: 8px !important;
                }
                .hg-button {
                    height: 100% !important;
                    font-size: 2rem !important;
                }
            `}</style>
        </div>
    );
}
