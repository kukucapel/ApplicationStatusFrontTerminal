'use client';

import Logo from '@/components/ui/Logo';
import HomeButtonBlock from '@/components/Home/HomeButtonBlock';
import { useRouter } from 'next/navigation';
import { Mail, CalendarDays, Settings } from 'lucide-react';
import KeyboardSimple from '@/components/ui/KeyboardSimple';

export default function Home() {
    const router = useRouter();

    const onChange = (key: string) => {
        console.log(key);
    };

    const handleGosClick = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://app.kaluga-gov.ru/v2/index.php';

        // скрытые поля
        const fields = {
            url: 'http://192.168.8.12:3001',
            type: 'terminal',
            element_id: window.location.href,
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
                router.push('/appointment');
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
            <KeyboardSimple onChange={onChange} />
            <HomeButtonBlock BUTTONS={BUTTONS} />
        </div>
    );
}
