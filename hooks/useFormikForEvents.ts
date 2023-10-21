import { useEventsState } from '@/context/eventsState';
import { generateValidationForEvents } from '@/lib/forms/events-form';
import { TEventFormInputs } from '@/types';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';

export function useFormikForEvents() {
  const validationSchema = generateValidationForEvents();
  const { getEventFormikDataForPUT } = useEventsState();

  const formik = useFormik<TEventFormInputs>({
    initialValues: getEventFormikDataForPUT() as TEventFormInputs,
    onSubmit: () => {},
    validate: (value) => {
      try {
        validateYupSchema(value, validationSchema, true, value);
      } catch (error) {
        return yupToFormErrors(error);
      }
    },
  });

  console.log({ formik });

  return formik;
}
