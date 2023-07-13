'use client';
import { TLoginFormValues } from '@/types';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const LoginForm = () => {
  ////formik
  const validationSchema: z.ZodType<TLoginFormValues> = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  type loginFormInputs = z.TypeOf<typeof validationSchema>;

  async function submitFormHandler(
    values: TLoginFormValues,
    _formikHelpers: FormikHelpers<TLoginFormValues>
  ) {
    // console.log('form values: ', values);

    const valuesToBeSent: TLoginFormValues = {
      email: values.email,
      password: values.password,
    };

    signIn('credentials', { ...valuesToBeSent, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in successfully!');
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
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {(formik) => {
          // console.log(formik);

          return (
            <Form>
              <div>LoginForm - po zalogowaniu przejście do części admin</div>

              <div className="">
                <label htmlFor="name">Email: </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="wpisz swój email"
                ></Field>
              </div>
              <div className="">
                <label htmlFor="name">Hasło: </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="hasło"
                ></Field>
              </div>

              <button
                type="submit"
                className="p-2 cursor-pointer bg-skin-fill-inverted text-skin-inverted hover:bg-red-300 disabled:bg-gray-300 disabled:cursor-auto"
                disabled={
                  !formik.dirty ||
                  (formik.dirty && Object.keys(formik.errors).length !== 0)
                    ? true
                    : false
                }
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default LoginForm;
