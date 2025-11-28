'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const events = new EventSource('/api/stream');

        events.onmessage = (event) => {
            const personal = event.data;

            if (personal) {
                router.push(
                    `/appointment?personal=${encodeURIComponent(personal)}`
                );
            }
        };

        return () => events.close();
    }, []);

    return <h1>Load</h1>;
}
