// import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
// import { generateValidationForCyclicalActivities } from '@/lib/forms/cyclical-activities-form';
// import { TCyclicalActivityFormInputs } from '@/types';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';

import { useDashboardArtisticGroupsStore } from '@/context/useDashboardArtisticGroupsStore';
import { generateValidationForArtisticGroups } from '@/lib/forms/artistic-groups-form';
import { TArtisticGroupFormInputs } from '@/types';

export function useFormikForArtisticGroups() {
  const validationSchema = generateValidationForArtisticGroups();

  const { getArtisticGroupFormikDataForPUT } =
    useDashboardArtisticGroupsStore();

  const formik = useFormik<TArtisticGroupFormInputs>({
    initialValues: getArtisticGroupFormikDataForPUT(),
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
