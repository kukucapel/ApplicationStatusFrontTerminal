'use client';

import Modal from '../ui/ModalUi/Modal';

interface ModalQr {
    url: string;
}

export default function ModalQr({ url }: ModalQr) {
    return <Modal>{url}</Modal>;
}
