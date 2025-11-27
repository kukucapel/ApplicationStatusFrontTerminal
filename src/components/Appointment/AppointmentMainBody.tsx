'use client';
import { useRouter } from 'next/navigation';
import HomeButton from '../Home/HomeButton';
import Logo from '../ui/Logo';
import { Home, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { Unit } from '@/dtos/UnitDto';
import { getUnitTreeForApplication } from '@/lib/unit';
import { ApplicationI } from '@/dtos/ApplicationDto';
import ModalUnitTree from '../Modals/ModalUnitTree';

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
    const [unitName, setUnitName] = useState<string | null>(null);
    const [showUnit, setShowUnit] = useState<boolean>(false);
    const [unit, setUnit] = useState<Unit | null>(null);
    console.log(unitName);
    const handleSubmitChangeUnit = (
        newSelected: number,
        newUnitName: string
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

    return (
        <div
            className={` transition-all duration-200 min-h-screen gap-10  flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 p-4`}
        >
            <HomeButton
                styleColor="white"
                className="absolute top-0 left-0 m-4 rounded-xl p-2 opacity-80 flex items-center"
                onClick={() => router.push('/')}
            >
                <Home className=" w-10 h-10 p-2" />
                <span className="text-xl pr-2">На главную</span>
            </HomeButton>

            <div className="w-full max-w-3xl ">
                <div className={`text-2xl text-center mb-8 animate-fade-in`}>
                    <div className="flex flex-col gap-10">
                        <Logo typeLogo={3} title="Запись на личный приём" />
                        <div className="flex items-center gap-5 justify-center text-gray-900 text-4xl">
                            <User className="bg-blue-100 w-10 h-10 rounded-2xl p-1" />
                            {person.fio}
                        </div>
                        <div>
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
                                />
                            ) : (
                                step === 3 && (
                                    <div className="flex gap-3 justify-center">
                                        <HomeButton
                                            styleColor="color"
                                            className="flex gap-3 items-center px-4 py-5 text-2xl rounded-xl"
                                            onClick={() => setShowUnit(true)}
                                        >
                                            {'Выберите управление'}
                                        </HomeButton>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="flex justify-center gap-20">
                            <HomeButton
                                styleColor="white"
                                className="flex gap-3 items-center px-35 py-8 text-2xl rounded-4xl"
                                isActive={step === 1}
                                onClick={() => {
                                    if (step !== 1) setStep((prev) => prev - 1);
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
                                    (step === 2 && !data.question)
                                }
                                onClick={() => {
                                    if (step !== 3) setStep((prev) => prev + 1);
                                }}
                            >
                                {step === 3 ? 'Отправить' : 'Далее'}
                            </HomeButton>
                        </div>
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
        </div>
    );
}
