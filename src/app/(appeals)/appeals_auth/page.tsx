'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import HomeButton from '@/components/Home/HomeButton';
import Logo from '@/components/ui/Logo';

export default function AppealsAuth() {
    const router = useRouter();

    const handleGosClick = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = process.env.NEXT_PUBLIC_GOS_ACTION!;

        // скрытые поля
        const fields = {
            url: process.env.NEXT_PUBLIC_GOS_URL!,
            type: 'terminal',
            element_id: process.env.NEXT_PUBLIC_GOS_URL! + '?manual=appeals',
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

    useEffect(() => {
        const events = new EventSource('/api/stream');

        events.onmessage = (event) => {
            const personal = event.data;

            if (personal) {
                router.push(
                    `/appeals?personal=${encodeURIComponent(personal)}`
                );
            }
        };

        return () => events.close();
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
                    <div className="flex flex-col gap-10 items-center">
                        <Logo
                            className={`transition-all duration-200`}
                            typeLogo={3}
                            title="Оставить обращение"
                            subTitle="По № 59-ФЗ электронное обращение в госорган принимается только после идентификации через Госуслуги (ЕСИА)."
                        />
                        <img
                            src="/qr.png"
                            alt="Герб города"
                            className="w-100 h-100"
                        />
                        <p
                            className="text-sm underline"
                            onClick={() => handleGosClick()}
                        >
                            Если у Вас нету возможности отсканировать qr-код, Вы
                            можете ввести данные вручню
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
