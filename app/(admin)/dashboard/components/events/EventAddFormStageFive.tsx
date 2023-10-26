import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import TextareaFormik from '@/app/(site)/components/forms/TextareaFormik';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNotificationState } from '@/context/notificationState';
import { FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';
import KindOfEnterInfoComment from '../form_comments/KindOfEnterInfoComment';
import TicketBuyingUrlComment from '../form_comments/TicketBuyingUrlComment';
type Props<T> = {
  isCurrentFormToPUTData: string;
  formik: FormikProps<T>;
};

// const optionsForCustomLinkToDetails =
//   serveOptionsForCustomLinkToDetailsInEvents();

export default function EventAddFormStageFive<T>(props: Props<T>) {
  ////vars
  const { isCurrentFormToPUTData, formik } = props;
  const { setShowNotification } = useNotificationState();

  /** when isToBeOnlyInNewsSection_NotSeenInEvents===true nothing should be available  */
  const isDetailsToBeAdded = !formik.getFieldProps(
    'isToBeOnlyInNewsSection_NotSeenInEvents'
  ).value;
  const isPayed = formik.getFieldProps('isPayed').value;

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
              label="Czy wydarzenie jest płatne?"
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
                      name="ticketBuyingUrl"
                      type="text"
                      label="adres do strony z zakupem biletu online:"
                      placeholder="adres www do strony z detalami"
                      formik={formik}
                      isCommentPopupVisible={true}
                      commentContent={<TicketBuyingUrlComment />}
                    />
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
