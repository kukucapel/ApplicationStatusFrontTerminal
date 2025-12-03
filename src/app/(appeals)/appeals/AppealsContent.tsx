'use client';

import AppealsMainBody from '@/components/Appeals/AppealsMainBody';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppealsContent({}: {}) {
    const [person, setPerson] = useState(null);
    const search = useSearchParams();

    useEffect(() => {
        const personalEncoded = search.get('personal') ?? '';
        if (!personalEncoded) return;
        console.log(personalEncoded);
        fetch('/api/decrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personal: personalEncoded }),
        })
            .then((res) => res.json())
            .then((data) => setPerson(data))
            .catch((e) => console.error(e));
    }, []);
    useEffect;
    // return JSON.stringify(person);
    return person && <AppealsMainBody person={person} />;
}
