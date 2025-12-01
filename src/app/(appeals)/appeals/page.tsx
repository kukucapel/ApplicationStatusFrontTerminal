import { Suspense } from 'react';
import AppealsContent from './AppealsContent';

export default function Page() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <AppealsContent />
        </Suspense>
    );
}
