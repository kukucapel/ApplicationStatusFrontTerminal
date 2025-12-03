import { Suspense } from 'react';
import AppointmentContent from './AppointmentContent';

export default function Page() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <AppointmentContent />
        </Suspense>
    );
}
