import AppointmentMainBody from '@/components/Appointment/AppointmentMainBody';
import HomeButton from '@/components/Home/HomeButton';
import Logo from '@/components/ui/Logo';
import { decrypt } from '@/lib/aes256';
import { Home, User } from 'lucide-react';

export default function Appointment({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const person = decrypt(
        'GlyBWzc39BpkngxzCRUkQfrbv+WgVqUuswvcbTgQCfB+dw8nQs8wpZBaTh3RSERZ9MTHrlYItJsQvEzObUM1KtEv9BcEeMbrQkkudcCNxUvxYvB3g5VWcnIOAEzPiVFFjUdc81YoWZ3yn8K7ju3NlFt7ZgsJFN9OxqC/fHJ56Li6+XFZLVnCMs/Dwj5HHhrTLyt9sZDmA6W3Xh2gUlzwk4/nnPVnd9KPSvA31eHOZZVRIEuF+wCDH3ralQ3SCiXbfiPCCFvKkAZf24GrXu/yAbGFUib5IBykWuFpNf6yIPo/Udy2tlqKTK9LRymacXQKZpAtsZ3vbR9Ldk5caqlt6t87WGW1HXlj0MIjA7/InnZ+F44C4tM7iUCFrybQ3E8kA4yU4nqLtc/j46kgQLXbLxPgt4/XFqhlwpA6JEefj9pVz9EfSDQ1MpfkBd4rnCHqLf6geyxWCNPq+UqcOkCY4+wtDw/rLquzqDg/ONOWSHpo3jIR5TMY5vyfkAcgpw6iMekUNLpbAgUAHzORT+RMQ23vi3r/88OsBFF3a84Nt6WPK3i6u8noD0kPqrwcXtyIw0ZrS8s3VLVrEBiGwx2vVcDjgJoJVYCYY6JNEb1BcQS+WpDLEsWO8/p3LYV9CS4fYddjt5eNFXtNn4lW2FSHI1OQe1o8A44/QbEgPj24fqFf/9ss22H7Y24bf7m/t3GeqKuG9mTYgrdS+t2vaSloJZ9+1lMBR+GudRN8QtpVylX45EPJnbxqcQgZRbZY8EefSiky24ndXERMW5l9bIKayjjiw0i71YpQrpoH'
    );
    // console.log(person);
    return <AppointmentMainBody person={person} />;
}
