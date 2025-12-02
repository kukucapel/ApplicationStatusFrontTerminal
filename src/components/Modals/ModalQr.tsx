'use client';

import { QRCodeCanvas } from 'qrcode.react';
import Modal from '../ui/ModalUi/Modal';
import ModalBody from '../ui/ModalUi/ModalBody';
import ModalHeader from '../ui/ModalUi/ModalHeader';
import HomeButton from '../Home/HomeButton';

interface ModalQr {
    url: string;
    onClose: () => void;
    handlePrint: () => void;
    printing: boolean;
}

export default function ModalQr({
    url,
    onClose,
    handlePrint,
    printing,
}: ModalQr) {
    return (
        <Modal type={2}>
            <ModalHeader
                onClose={onClose}
                title="QR код для отслеживания заявки"
                semiTitle="Здесь будет актуальная информация о ходе заявки"
            ></ModalHeader>
            <ModalBody>
                <div className="flex w-full justify-center">
                    <QRCodeCanvas size={400} value={url} />
                </div>
                <div className="flex gap-10  justify-between">
                    <HomeButton
                        className="py-1 text-xl grow rounded-xl"
                        styleColor="white"
                        onClick={onClose}
                    >
                        Отмена
                    </HomeButton>
                    <HomeButton
                        styleColor="blue "
                        className="py-5 rounded-xl text-xl  grow"
                        isActive={printing}
                        onClick={handlePrint}
                    >
                        Печать
                    </HomeButton>
                </div>
            </ModalBody>
        </Modal>
    );
}
