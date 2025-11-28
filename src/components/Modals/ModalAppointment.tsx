'use client';

import { FullApplicationI } from '@/dtos/ApplicationDto';
import Modal from '../ui/ModalUi/Modal';
import ModalBody from '../ui/ModalUi/ModalBody';
import ModalHeader from '../ui/ModalUi/ModalHeader';
import ModalBodyBlock from '../ui/ModalUi/ModalBodyBlock';
import ModalBodyBlockField from '../ui/ModalUi/ModalBodyBlockField';
import { FileText, Mail, MapPinHouse, Phone, User } from 'lucide-react';
import HomeButton from '../Home/HomeButton';
import { useState } from 'react';
import ModalAlert from './ModalAlert';

interface ModalAppointmentProps {
    onClose: () => void;
    fullData: FullApplicationI;
    unitName: string | null;
    setAlert: (newState: boolean) => void;
}

export default function ModalAppointment({
    onClose,
    fullData,
    unitName,
    setAlert,
}: ModalAppointmentProps) {
    return (
        <Modal>
            <ModalHeader
                onClose={onClose}
                title={'Детали заявки'}
                semiTitle="Внимательно проверьте данные перед отправкой"
            ></ModalHeader>
            <ModalBody>
                <ModalBodyBlock title={'Заявитель'}>
                    <ModalBodyBlockField
                        nameField="ФИО"
                        valueField={fullData.fio}
                        icon={User}
                    />
                    <ModalBodyBlockField
                        nameField="Email"
                        valueField={fullData.email}
                        icon={Mail}
                    />
                    <ModalBodyBlockField
                        nameField="Телефон"
                        valueField={fullData.phone}
                        icon={Phone}
                    />
                    <ModalBodyBlockField
                        nameField="Адрес регистрации"
                        valueField={fullData.address1}
                        icon={MapPinHouse}
                    />
                    <ModalBodyBlockField
                        nameField="Адрес проживания"
                        valueField={fullData.address2}
                        icon={MapPinHouse}
                    />
                    <ModalBodyBlockField
                        nameField="Email"
                        valueField={fullData.email}
                        icon={Mail}
                    />
                    <ModalBodyBlockField
                        nameField="Индекс регистрации"
                        valueField={fullData.postal_code1}
                        icon={FileText}
                    />
                    <ModalBodyBlockField
                        nameField="Индекс проживания"
                        valueField={fullData.postal_code2}
                        icon={FileText}
                    />
                </ModalBodyBlock>
                <ModalBodyBlock typeStyle={2} title="Детали обращения">
                    <ModalBodyBlockField
                        nameField="Тема"
                        valueField={fullData.theme}
                        icon={FileText}
                        typeStyle={2}
                    />
                    {/* <ModalBodyBlockField
                        nameField="Вопрос"
                        valueField={fullData.question}
                        icon={FileText}
                        typeStyle={2}
                        bgColor="g"
                    /> */}
                    <ModalBodyBlockField
                        nameField="К какому управлению приём"
                        valueField={unitName || '-'}
                        icon={FileText}
                        typeStyle={2}
                        bgColor="g"
                    />
                </ModalBodyBlock>
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
                        onClick={() => setAlert(true)}
                    >
                        Оптравить
                    </HomeButton>
                </div>
            </ModalBody>
        </Modal>
    );
}
