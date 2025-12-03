'use client';

import Logo from '@/components/ui/Logo';
import HomeButtonBlock from '@/components/Home/HomeButtonBlock';
import { useRouter } from 'next/navigation';
import { Mail, CalendarDays, Settings } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    const BUTTONS = [
        {
            title: 'Оставить обращение',
            handleClick: () => {
                router.push('/appeals_auth');
            },
            icon: Mail,
        },
        {
            title: 'Записаться на приём',
            handleClick: () => {
                router.push('/appointment_auth');
                // handlePrint();
            },
            icon: CalendarDays,
        },
        // {
        //     title: 'Электронные услуги',
        //     handleClick: undefined,
        //     icon: Settings,
        // },
    ];
    return (
        <div
            className={` transition-all duration-200 min-h-screen gap-10  flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 p-4`}
        >
            <div className="w-full max-w-3xl ">
                <Logo
                    subTitle="Система обработки обращений граждан"
                    typeLogo={2}
                    title="Администрация городского округа Калуги"
                    className="text-2xl text-center mb-8"
                />
            </div>

            <HomeButtonBlock BUTTONS={BUTTONS} />
        </div>
    );
}
