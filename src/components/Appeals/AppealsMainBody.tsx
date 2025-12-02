'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import HomeButton from '../Home/HomeButton';
import { Home, User } from 'lucide-react';
import Logo from '../ui/Logo';
import Textarea from '../ui/Textarea';
import KeyboardSimple from '../ui/KeyboardSimple';
import ModalAppeals from '../Modals/ModalAppeals';
import ModalAlert from '../Modals/ModalAlert';

interface AppealsMainBodyProps {
    person: any;
}

export default function AppealsMainBody({ person }: AppealsMainBodyProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        appeal: '',
    });
    const [focusedField, setFocusedField] = useState<'appeal' | null>(null);
    const [alert, setAlert] = useState<boolean>(false);
    const [showSend, setShowSend] = useState<boolean>(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const keyboardRef = useRef<HTMLDivElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const handleSend = async () => {
        // await sendApplication({ ...person, ...data });
        setAlert(false);
        setShowSend(false);
        setStep(2);
    };
    const onChange = (key: string) => {
        if (!focusedField) return;

        setData((prev) => {
            const current = prev[focusedField];

            let updated = current;

            if (key === '{space}') {
                updated = current + ' ';
            } else if (key === '{bksp}') {
                updated = current.slice(0, -1);
            } else if (key === '{enter}') {
                setShowKeyboard(false);
            } else {
                updated = current + key;
            }

            return {
                ...prev,
                [focusedField]: updated,
            };
        });
    };
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!showKeyboard) return;

            const target = e.target as Node;

            const clickedInsideKeyboard =
                keyboardRef.current && keyboardRef.current.contains(target);

            const clickedInsideTextarea =
                pageRef.current &&
                pageRef.current.querySelector('textarea')?.contains(target);

            if (!clickedInsideKeyboard && !clickedInsideTextarea) {
                setShowKeyboard(false);
                setFocusedField(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [showKeyboard]);

    return (
        <div
            ref={pageRef}
            className={` transition-all duration-200 min-h-screen gap-10  flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 p-4`}
        >
            {step !== 2 && (
                <HomeButton
                    styleColor="white"
                    className="absolute top-0 left-0 m-4 rounded-xl p-2 opacity-80 flex items-center"
                    onClick={() => router.push('/')}
                >
                    <Home className=" w-10 h-10 p-2" />
                    <span className="text-xl pr-2">На главную</span>
                </HomeButton>
            )}
            <div className="w-full max-w-3xl ">
                <div className={`text-2xl text-center mb-8 animate-fade-in`}>
                    <div className="flex flex-col gap-10">
                        <>
                            <Logo
                                className={`transition-all duration-200  ${
                                    !showKeyboard
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-10'
                                }`}
                                typeLogo={3}
                                title="Оставить обращение"
                            />
                        </>

                        <div
                            className={`transition-all duration-200  flex flex-col gap-10 ${
                                showKeyboard && '-translate-y-31'
                            }`}
                        >
                            <div className="flex items-center gap-5 justify-center text-gray-900 text-4xl">
                                <User className="bg-blue-100 w-10 h-10 rounded-2xl p-1" />
                                {person.fio}
                            </div>

                            {step === 1 ? (
                                <Textarea
                                    value={data.appeal}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            ['appeal']: e.target.value,
                                        }))
                                    }
                                    placeholder={'Введите текст обращения'}
                                    onFocus={() => {
                                        setFocusedField('appeal');
                                        setShowKeyboard(true);
                                    }}
                                    className={`h-60 ${
                                        showKeyboard &&
                                        'ring-2 ring-blue-500 h-100'
                                    } `}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-10 justify-center">
                                    <h3 className="text-4xl">
                                        Ваше обращение отправлено
                                    </h3>
                                    <HomeButton
                                        styleColor="color"
                                        className="text-center w-120 h-30 items-center px-4 py-2 text-2xl rounded-xl"
                                        onClick={() => router.push('/')}
                                    >
                                        Вернуться на главную
                                    </HomeButton>
                                </div>
                            )}
                        </div>
                        {step !== 2 && (
                            <div className="flex justify-center gap-20">
                                <HomeButton
                                    styleColor="blue"
                                    className={`flex gap-3  ${
                                        step === 3 ? 'px-35' : 'px-35'
                                    } items-center  py-8 text-2xl rounded-4xl`}
                                    isActive={step === 1 && !data.appeal}
                                    onClick={() => {
                                        setShowSend(true);
                                    }}
                                >
                                    {'Отправить'}
                                </HomeButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* {showKeyboard && (
                <div ref={keyboardRef}>
                    <KeyboardSimple onChange={onChange} />
                </div>
            )} */}
            {showSend && (
                <ModalAppeals
                    fullData={{ ...person, ...data }}
                    onClose={() => setShowSend(false)}
                    setAlert={setAlert}
                />
            )}
            {alert && (
                <ModalAlert
                    handleSubmit={() => handleSend()}
                    onClose={() => setAlert(false)}
                />
            )}
        </div>
    );
}
