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
                >
                    {button[1]}
                </HomeButton>
            ))}
        </div>
    );
}
