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
        'a s d f g h j k l',
        '{shift} z x c v b n m {bksp}',
        '{numbers} {lang} {space} . {enter}',
    ],
    ru: [
        'й ц у к е н г ш щ з х',
        'ф ы в а п р о л д ж э',
        '{shift} я ч с м и т ь б ю {bksp}',
        '{numbers} {lang} {space} . {enter}',
    ],
    ru_num: [
        '1 2 3 4 5 6 7 8 9 0',
        '@ # ₽ _ & - + ( ) /',
        '* " \' : ; ! ? {bksp}',
        '{alf} , {space} . {enter}',
    ],
    en_num: [
        '1 2 3 4 5 6 7 8 9 0',
        '@ # ₽ _ & - + ( ) /',
        '* " \' : ; ! ? {bksp}',
        '{alf} , {space} . {enter}',
    ],
};

export default function KeyboardSimple({ onChange }: KeyboardSimpleProps) {
    const [language, setLanguage] = useState<'en' | 'ru' | 'ru_num' | 'en_num'>(
        'ru'
    );
    const [shift, setShift] = useState(false);
    const [numbers, setNumbers] = useState(false);

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
        if (button === '{numbers}') {
            setLanguage(language === 'ru' ? 'ru_num' : 'en_num');
            return;
        }
        if (button === '{alf}') {
            setLanguage(language === 'ru_num' ? 'ru' : 'en');
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
                    '{enter}': '⏎',
                    '{numbers}': '?123',
                    '{alf}': language === 'ru_num' ? 'АБВ' : 'ABC',
                }}
                buttonTheme={[
                    { class: 'hg-shift', buttons: '{shift}' },
                    { class: 'hg-lang', buttons: '{lang}' },
                    { class: 'hg-space', buttons: '{space}' },
                ]}
                physicalKeyboardHighlight={true}
            />
            <style jsx global>{`
                .hg-button.hg-space {
                    flex: 5 !important;
                }

                .hg-button.hg-lang {
                    width: 40px !important;
                }

                .hg-button.hg-lang span {
                    filter: grayscale(90%) brightness(0.5);
                }

                .hg-button.hg-shift {
                }

                .hg-row {
                    height: 104px !important;
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
