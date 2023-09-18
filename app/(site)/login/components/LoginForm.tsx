'use client';
import { useNotificationState } from '@/context/notificationState';
import { loggedIn } from '@/lib/api/apiTextResponses';
import { loginEmailSchema, loginPasswordSchema } from '@/lib/errors/zodSchemas';
import { TLoginFormValues } from '@/types';
import { Form, Formik, FormikHelpers } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import CustomButton from '../../components/CustomButton';
import CustomLink from '../../components/CustomLink';
import InputFormik from '../../components/forms/InputFormik';

const LoginForm = () => {
  ////vars
  const router = useRouter();
  const { setShowNotification } = useNotificationState();
  const { update: sessionUpdate } = useSession();

  ////formik
  type loginFormInputs = z.TypeOf<typeof loginValidationSchema>;

  const loginValidationSchema: z.ZodType<TLoginFormValues> = z.object({
    email: loginEmailSchema,
    password: loginPasswordSchema,
  });

  async function submitFormHandler(
    values: TLoginFormValues,
    _formikHelpers: FormikHelpers<TLoginFormValues>
  ) {
    const valuesToBeSent: TLoginFormValues = {
      email: values.email,
      password: values.password,
    };

    signIn('credentials', { ...valuesToBeSent, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          console.log(callback.error);

          const errorText = callback.error.includes('No user found')
            ? 'Nie znaleziono użytkownika.'
            : 'Nie udało się zalogować';

          setShowNotification('ERROR', errorText);
        }
        if (callback?.ok && !callback?.error) {
          setShowNotification('SUCCESS', loggedIn);
          sessionUpdate();
          router.replace('/dashboard');
        }
      }
    );
  }

  return (
    <Fragment>
      <Formik<loginFormInputs>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={submitFormHandler}
        validationSchema={toFormikValidationSchema(loginValidationSchema)}
      >
        {(formik) => {
          return (
            <div className="absolute top-0 left-0 z-30 w-screen h-screen">
              <div className="flex flex-col items-center justify-center h-full bg-skin-main-bg">
                <div className="mx-mobile-margin tablet:mx-tablet-margin desktop:mx-0">
                  <div className="p-16 bg-skin-main-bg drop-shadow-big rounded-base">
                    <Form>
                      <div className="prose">
                        <h1>Zaloguj się,</h1>
                      </div>
                      <div className="prose">
                        <h2>by przejść do części administracyjnej.</h2>
                      </div>

                      <div className="mt-[20px]">
                        <InputFormik
                          name="email"
                          type="email"
                          label="podaj adres e-mail:"
                          placeholder="Twój e-mail"
                        />
                      </div>
                      <div className="mt-4">
                        <InputFormik
                          name="password"
                          type="password"
                          label="podaj hasło:"
                          placeholder="Twoje hasło"
                        />
                      </div>

                      <div className="mt-6">
                        <CustomButton
                          text="zaloguj"
                          descriptionText="Zaloguj się."
                          onSubmit={true}
                          disabled={
                            !formik.dirty ||
                            (formik.dirty &&
                              Object.keys(formik.errors).length !== 0)
                              ? true
                              : false
                          }
                          actionFn={() => {}}
                        />
                      </div>
                    </Form>
                    <div className="h-[1px] w-11 bg-skin-gray mt-11"></div>
                    <div className="mt-11">
                      <CustomLink
                        visibleText="powrót do strony głównej"
                        url={`/`}
                        descriptionText="Powrót do strony głównej."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default LoginForm;
