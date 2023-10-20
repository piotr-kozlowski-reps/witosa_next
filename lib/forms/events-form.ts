import * as Yup from 'yup';

const yupSchema = Yup.object({
  // ...cyclicalActivityValidationSchemaStageOneWithYup,
  // ...cyclicalActivityValidationSchemaStageTwoWithYup,
  // ...cyclicalActivityValidationSchemaStageThreeWithYup,
});

export function generateValidationForEvents() {
  return yupSchema;
}
