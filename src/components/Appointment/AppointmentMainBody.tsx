'use client';
import { useRouter } from 'next/navigation';
import HomeButton from '../Home/HomeButton';
import Logo from '../ui/Logo';
import { Home, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { Unit } from '@/dtos/UnitDto';
import { getUnitTreeForApplication } from '@/lib/unit';
import { ApplicationI } from '@/dtos/ApplicationDto';
import ModalUnitTree from '../Modals/ModalUnitTree';
import ModalAppointment from '../Modals/ModalAppointment';
import ModalAlert from '../Modals/ModalAlert';
import { sendApplication } from '@/lib/appointment';
import KeyboardSimple from '../ui/KeyboardSimple';

interface AppointmentMainBodyProps {
    person: any;
}

export default function AppointmentMainBody({
    person,
}: AppointmentMainBodyProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<ApplicationI>({
        theme: '',
        question: '',
        assigned_unit_id: null,
    });

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

    const keyboardRef = useRef<HTMLDivElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);

    const [alert, setAlert] = useState<boolean>(false);
    const [showSend, setShowSend] = useState<boolean>(false);
    const [focusedField, setFocusedField] = useState<
        'theme' | 'question' | null
    >(null);
    const [showKeyboard, setShowKeyboard] = useState(false);

    const [unitName, setUnitName] = useState<string | null>(null);
    const [showUnit, setShowUnit] = useState<boolean>(false);
    const [unit, setUnit] = useState<Unit | null>(null);

    const [sendFlag, setSendFlag] = useState<boolean>(true);

    const handleSend = async () => {
        // await sendApplication({ ...person, ...data });
        setAlert(false);
        setShowSend(false);
        setStep(4);
    };

    const handleSubmitChangeUnit = (
        newSelected: number | null,
        newUnitName: string | null
    ) => {
        setData({ ...data, assigned_unit_id: newSelected });
        setUnitName(newUnitName);
        setShowUnit(false);
    };

    useEffect(() => {
        const load = async () =>
            setUnit((await getUnitTreeForApplication()).items);
        load();
    }, []);

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
            {step !== 4 && (
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
                                title="Запись на личный приём"
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
                            {step === 1 || step === 2 ? (
                                <Textarea
                                    value={
                                        step === 1 ? data.theme : data.question
                                    }
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [step === 1 ? 'theme' : 'question']:
                                                e.target.value,
                                        }))
                                    }
                                    placeholder={
                                        step === 1
                                            ? 'Введите тему обращения'
                                            : 'Введите подробности обращения'
                                    }
                                    onFocus={() => {
                                        setFocusedField(
                                            step === 1 ? 'theme' : 'question'
                                        );
                                        setShowKeyboard(true);
                                    }}
                                    className={`h-60 ${
                                        showKeyboard &&
                                        'ring-2 ring-blue-500 h-100'
                                    } `}
                                />
                            ) : step === 3 ? (
                                <div className="flex flex-col items-center gap-3 justify-center">
                                    <span>К кому приём:</span>
                                    <HomeButton
                                        styleColor="color"
                                        className="text-center w-120 h-30 items-center px-4 py-2 text-2xl rounded-xl"
                                        onClick={() => {
                                            setSendFlag(false);
                                            setShowUnit(true);
                                        }}
                                    >
                                        {sendFlag
                                            ? 'Выберите управление'
                                            : unitName ||
                                              'Автоматически определить управление'}
                                    </HomeButton>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-10 justify-center">
                                    <h3 className="text-4xl">
                                        Ваша заявка отправлена
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
                        {step !== 4 && (
                            <div className="flex justify-center gap-20">
                                <HomeButton
                                    styleColor="white"
                                    className="flex gap-3 items-center px-35 py-8 text-2xl rounded-4xl"
                                    onClick={() => {
                                        if (step !== 1) {
                                            setStep((prev) => prev - 1);
                                        } else {
                                            router.push('/');
                                        }
                                    }}
                                >
                                    Назад
                                </HomeButton>
                                <HomeButton
                                    styleColor="blue"
                                    className={`flex gap-3  ${
                                        step === 3 ? 'px-35' : 'px-35'
                                    } items-center  py-8 text-2xl rounded-4xl`}
                                    isActive={
                                        (step === 1 && !data.theme) ||
                                        (step === 2 && !data.question) ||
                                        (step === 3 && sendFlag)
                                    }
                                    onClick={() => {
                                        if (step !== 3)
                                            setStep((prev) => prev + 1);
                                        else setShowSend(true);
                                    }}
                                >
                                    {step === 3 ? 'Отправить' : 'Далее'}
                                </HomeButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showUnit && unit && (
                <ModalUnitTree
                    selectedNow={data.assigned_unit_id || 0}
                    unitTree={unit}
                    handleChange={handleSubmitChangeUnit}
                    onClose={() => setShowUnit(false)}
                ></ModalUnitTree>
            )}
            {showSend && (
                <ModalAppointment
                    unitName={unitName}
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
            {showKeyboard && (
                <div ref={keyboardRef}>
                    <KeyboardSimple onChange={onChange} />
                </div>
            )}
        </div>
    );
}
