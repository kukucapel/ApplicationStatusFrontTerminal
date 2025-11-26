import Button from '../ui/Button';
import HomeButton from './HomeButton';

import { Icon } from 'lucide-react';

interface HomeButtonBlockProps {
    BUTTONS: {
        title: string;
        handleClick: undefined | (() => void);
        icon: React.ElementType;
    }[];
}

export default function HomeButtonBlock({ BUTTONS }: HomeButtonBlockProps) {
    return (
        <div className="flex gap-20">
            {BUTTONS.map((button, index) => {
                const IconComponent = button.icon;
                return (
                    <HomeButton
                        styleColor={`${index % 2 === 0 ? 'blue' : 'white'}`}
                        className="flex gap-3 items-center px-15 py-12 text-2xl rounded-4xl"
                        key={index}
                        onClick={button.handleClick && button.handleClick}
                    >
                        {IconComponent && <IconComponent size={32} />}
                        {button.title}
                    </HomeButton>
                );
            })}
        </div>
    );
}
