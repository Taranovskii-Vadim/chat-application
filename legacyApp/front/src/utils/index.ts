import { format } from 'date-fns';

export const formatDate = (value: string | Date): string => format(new Date(value), 'HH:mm');
