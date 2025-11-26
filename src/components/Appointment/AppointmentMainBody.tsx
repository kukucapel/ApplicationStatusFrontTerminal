'use client';
import { useRouter } from 'next/navigation';
import HomeButton from '../Home/HomeButton';
import Logo from '../ui/Logo';
import { Home, User } from 'lucide-react';
import { useState } from 'react';

interface AppointmentMainBodyProps {
    person: any;
}

export default function AppointmentMainBody({
    person,
}: AppointmentMainBodyProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ theme: '', question: '' });

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
                            <textarea
                                className="w-full h-50 rounded-lg border border-gray-200 shadow-md bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition duration-200 resize-none"
                                placeholder="Введите тему обращения"
                            ></textarea>
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
        </div>
    );
}
