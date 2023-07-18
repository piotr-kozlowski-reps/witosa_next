import { NOTIFICATION_TYPES } from '@/types';
import { toast } from 'react-hot-toast';

export default function userNotificationHandler(
  type: NOTIFICATION_TYPES,
  message: string
) {
  switch (type) {
    case 'ERROR':
      toast.error(message);
      break;

    case 'SUCCESS':
      toast.success(message);
      break;
  }
}
