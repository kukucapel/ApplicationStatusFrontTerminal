import Logo from '../ui/Logo';
import HomeButtonBlock from './HomeButtonBlock';

interface HomeMainBodyProps {}

export default function HomeMainBody({}: HomeMainBodyProps) {
    return (
        <div
            className={` transition-all duration-200 min-h-screen gap-10  flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 p-4`}
        >
            <div className="w-full max-w-md">
                <Logo
                    typeLogo={2}
                    title="Администрация городского округа Калуги"
                    className="text-2xl text-center mb-8"
                />
            </div>
            <HomeButtonBlock />
        </div>
    );
}
