import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import TextareaFormik from '@/app/(site)/components/forms/TextareaFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import KindOfEnterInfoComment from '../form_comments/KindOfEnterInfoComment';
import TicketBuyingIdComment from '../form_comments/TicketBuyingIdComment';
type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

// const optionsForCustomLinkToDetails =
//   serveOptionsForCustomLinkToDetailsInEvents();

export default function EventAddFormStageFive<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;

  /** when isToBeOnlyInNewsSection_NotSeenInEvents===true nothing should be available  */
  const isDetailsToBeAdded = !formik.getFieldProps(
    'isToBeOnlyInNewsSection_NotSeenInEvents'
  ).value;
  const isPayed = formik.getFieldProps('isPayed').value;

  const isAnyDataAvailableInTicketBuyingId =
    formik.getFieldProps('ticketBuyingId').value !== '';
  const isErrorInTicketBuyingId =
    formik.getFieldMeta('ticketBuyingId').error !== undefined;

  return (
    <Fragment>
      {!isDetailsToBeAdded ? (
        <div className="font-base-regular -mt-[9px]">
          Nie ma możliwości dodania większej ilości informacji.
          <br /> W sekcji &quot;aktualności&quot; została wybrana opcja,
          mówiąca, iż wydarzenie ma się pojawić TYLKO w dziale aktualności.
        </div>
      ) : null}

      {isDetailsToBeAdded ? (
        <Fragment>
          <div className="-mt-[9px] mr-8">
            <TextareaFormik<T>
              name="kindOfEnterInfo"
              label={
                isCurrentFormToPUTData
                  ? 'zmień informację o płatności / wstępie wolnym:'
                  : 'informacja o płatności / wstępie wolnym:'
              }
              placeholder="wpisz informacje o wstępie ...."
              formik={formik}
              height={70}
              isCommentPopupVisible={true}
              commentContent={<KindOfEnterInfoComment />}
            />
          </div>
          <div className="mt-[6px] mr-8">
            <CheckboxFormik<T>
              name="isPayed"
              label="Czy jest możliwość zakupu biletów online?"
              isToBeUsedAsPartFormik={true}
              formik={formik}
            />
          </div>

          <AnimatePresence mode="wait">
            {isPayed ? (
              <ComponentTransitionFromRightToLeft>
                <Fragment>
                  <div className="mt-[26px] form-input-width">
                    <InputFormik<T>
                      name="ticketBuyingId"
                      type="text"
                      label="id wydarzenia wprowadzone w systemie biletowym:"
                      placeholder="id wydarzenia z systemu biletowego"
                      formik={formik}
                      isCommentPopupVisible={true}
                      commentContent={<TicketBuyingIdComment />}
                    />
                  </div>
                  <div className="mt-[8px]">
                    <a
                      aria-label="Sprawdź czy otwiera się odpowiednia strona z podanym ID."
                      href={`${process.env.NEXT_PUBLIC_VISUAL_TICKET_URL}${
                        formik.getFieldProps('ticketBuyingId').value
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Otwiera się w nowej zakładce."
                    >
                      <CustomButton
                        text="sprawdź czy ID jest poprawne"
                        descriptionText="Ustaw pole na dzisiejszą datę."
                        disabled={
                          !isAnyDataAvailableInTicketBuyingId ||
                          isErrorInTicketBuyingId
                        }
                        outlined={true}
                      />
                    </a>
                  </div>
                </Fragment>
              </ComponentTransitionFromRightToLeft>
            ) : null}
          </AnimatePresence>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
