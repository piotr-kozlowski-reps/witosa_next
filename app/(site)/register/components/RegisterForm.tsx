'use client';

import { TRegisterFormValues, TRegisterFormValuesSent } from '@/types';
import { UserRole } from '@prisma/client';
import axios from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function RegisterForm() {
  ////formik
  const validationSchema: z.ZodType<TRegisterFormValues> = z
    .object({
      name: z
        .string({
          required_error: 'Pole jest wymagane',
        })
        .min(2, { message: 'min 2 znaki' }),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
      userRole: z.nativeEnum(UserRole),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Wpisane hasła się różnią',
      path: ['confirmPassword'],
    });

  type registerFormInputs = z.TypeOf<typeof validationSchema>;

  async function submitFormHandler(
    values: TRegisterFormValues,
    _formikHelpers: FormikHelpers<TRegisterFormValues>
  ) {
    // console.log('form values: ', values);

    const valuesToBeSent: TRegisterFormValuesSent = {
      name: values.name,
      email: values.email,
      password: values.password,
      userRole: values.userRole,
    };

    axios
      .post('/api/register', valuesToBeSent)
      .then(() => toast.success('user created - implement further, +log '))
      .catch(() => toast.error('problem occured - implement further, +log '));
  }

  return (
    <Fragment>
      <Formik<registerFormInputs>
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          userRole: 'EDITOR',
        }}
        onSubmit={submitFormHandler}
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {(formik) => {
          // console.log(formik);

          return (
            <Form>
              <div>
                RegisterForm - rejestrowanie uczestników - finalnie tylko admin
              </div>
              <div className="">
                <label htmlFor="name">Imię i nazwisko: </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="wpisz swoje imie nazwisko"
                ></Field>
              </div>
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
              <div className="">
                <label htmlFor="name">Powtórz hasło: </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="powtórz hasło"
                ></Field>
              </div>
              <div className="">
                <label htmlFor="name">ADMIN/USER: </label>
                <Field
                  type="userRole"
                  name="Rola użytkownika"
                  placeholder="rola użytkownika"
                ></Field>
              </div>
              <button
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
}
