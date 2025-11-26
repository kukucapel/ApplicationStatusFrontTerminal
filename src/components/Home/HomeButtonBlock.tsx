import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';
import { useRouter } from 'next/navigation';

const BUTTONS = [
    ['', 'Оставить обращение'],
    ['', 'Записаться на приём'],
    ['', 'Электронные услуги'],
];
interface HomeButtonBlockProps {}

export default function HomeButtonBlock({}: HomeButtonBlockProps) {
    const router = useRouter();

    const handleGosClick = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://app.kaluga-gov.ru/v2/index.php';

        // скрытые поля
        const fields = {
            type: 'hidden',
            name: 'url',
            value: 'http://192.168.8.12:3001',
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

    return (
        <div className="flex gap-20">
            {/* <HomeButton
                styleColor="blue"
                className="px-30 py-12 text-2xl rounded-4xl"
                onClick={() => router.push('/manually')}
            >
                Вручную
            </HomeButton>
            <HomeButton styleColor="white" className="px-20 py-12 text-2xl">
                Через госуслуги
            </HomeButton> */}
            {BUTTONS.map((button, index) => (
                <HomeButton
                    styleColor={`${index % 2 === 0 ? 'blue' : 'white'}`}
                    className="px-20 py-12 text-2xl rounded-4xl"
                    key={index}
                    onClick={() => {
                        if (index === 1) handleGosClick();
                    }}
                >
                    {button[1]}
                </HomeButton>
            ))}
        </div>
    );
}
