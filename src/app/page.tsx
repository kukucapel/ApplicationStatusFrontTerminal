'use client';

import Logo from '@/components/ui/Logo';
import HomeButtonBlock from '@/components/Home/HomeButtonBlock';
import { useRouter } from 'next/navigation';
import { Mail, CalendarDays, Settings } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    const handleGosClick = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = process.env.NEXT_PUBLIC_GOS_ACTION!;

        // скрытые поля
        const fields = {
            url: 'http://localhost:3000/api/gos-terminal',
            type: 'terminal',
            element_id: process.env.NEXT_PUBLIC_GOS_URL!,
        };

        Object.entries(fields).forEach(([name, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    const BUTTONS = [
        {
            title: 'Оставить обращение',
            handleClick: undefined,
            icon: Mail,
        },
        {
            title: 'Записаться на приём',
            handleClick: () => {
                // router.push('/appointment');
                handleGosClick();
            },
            icon: CalendarDays,
        },
        {
            title: 'Электронные услуги',
            handleClick: undefined,
            icon: Settings,
        },
    ];
    return (
        <div
            className={` transition-all duration-200 min-h-screen gap-10  flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 p-4`}
        >
            <div className="w-full max-w-3xl ">
                <Logo
                    typeLogo={2}
                    title="Администрация городского округа Калуги"
                    className="text-2xl text-center mb-8"
                />
            </div>

            <HomeButtonBlock BUTTONS={BUTTONS} />
        </div>
    );
}
