import { format } from 'date-fns';

// dd.mm.yyyy
// TODO can add check if message send today show hours and minutes. If in limits of month show day and month. Else show day month and year
export const formatChatDate = (value: string | Date): string => format(new Date(value), 'HH:mm');
