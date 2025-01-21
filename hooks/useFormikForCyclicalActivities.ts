import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { generateValidationForCyclicalActivities } from '@/lib/forms/cyclical-activities-form';
import { TCyclicalActivityFormInputs } from '@/types';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';

export function useFormikForCyclicalActivities() {
  const validationSchema = generateValidationForCyclicalActivities();
  const { getCyclicalActivityFormikDataForPUT } = useCyclicalActivitiesState();

  const formik = useFormik<TCyclicalActivityFormInputs>({
    initialValues:
      getCyclicalActivityFormikDataForPUT() as TCyclicalActivityFormInputs,
    onSubmit: () => {},
    validate: (value) => {
      try {
        validateYupSchema(value, validationSchema, true, value);
      } catch (error) {
        return yupToFormErrors(error);
      }
    },
  });

  return formik;
}
