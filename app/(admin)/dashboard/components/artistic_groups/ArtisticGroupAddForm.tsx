import CustomButton from '@/app/(site)/components/CustomButton';
import CheckboxFormik from '@/app/(site)/components/forms/CheckboxFormik';
import ImagesUploadFormik from '@/app/(site)/components/forms/ImagesUploadFormik';
import InputFormik from '@/app/(site)/components/forms/InputFormik';
import RichTextEditorFormik from '@/app/(site)/components/forms/RichTextEditorFormik';
import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import { useNotificationState } from '@/context/notificationState';
import { useDashboardArtisticGroupsStore } from '@/context/useDashboardArtisticGroupsStore';
import { useFormikForArtisticGroups } from '@/hooks/useFormikForArtisticGroups';
import { prepareArtisticGroupValuesForBackend } from '@/lib/forms/artistic-groups-form';
import { TActionResponse, TArtisticGroupFormInputs } from '@/types';
import { FormikProps } from 'formik';
import React, { Fragment } from 'react';
import {
  dbReadingErrorMessage,
  preparationDataError,
} from '@/lib/api/apiTextResponses';
import { addArtisticGroup } from '@/actions/artisticGroupsActions';

type MainType = TArtisticGroupFormInputs;

export default function ArtisticGroupAddForm() {
  ////vars
  const { setShowNotification } = useNotificationState();
  const {
    // getIsAddArtisticGroupVisible,
    setIsAddArtisticGroupVisible,
    resetArtisticGroupFormikDataForPUT,
    getArtisticGroupFormikDataForPUT,
  } = useDashboardArtisticGroupsStore();

  const formik = useFormikForArtisticGroups();
  function resetFormToInitialState() {
    resetArtisticGroupFormikDataForPUT();
    formik.resetForm();
  }

  const isCurrentFormToPOSTData = !getArtisticGroupFormikDataForPUT().title;
  const isCurrentFormToPUTData = getArtisticGroupFormikDataForPUT().title;

  async function submitFormHandler(formik: FormikProps<MainType>) {
    let response: TActionResponse | null = null;

    let formikValuesPreparedForBackend: MainType;
    try {
      formikValuesPreparedForBackend =
        await prepareArtisticGroupValuesForBackend(formik.values);
    } catch (error) {
      setShowNotification('ERROR', (error as Error).message);
      return;
    }

    if (!formikValuesPreparedForBackend) {
      setShowNotification('ERROR', preparationDataError);
      return;
    }

    /**
     * post
     * */
    if (isCurrentFormToPOSTData) {
      try {
        response = await addArtisticGroup(formikValuesPreparedForBackend);
      } catch (error) {
        setShowNotification('ERROR', dbReadingErrorMessage);
      }
    }

    /**
     * put
     * */
    if (isCurrentFormToPUTData) {
      throw new Error(
        'ArtisticGroupAddForm -> submitFormHandler -> Not implemented yet'
      );
      //   const originalCyclicalActivity = getCyclicalActivityFormikDataForPUT();
      //   const changedCyclicalActivity = { ...formikValuesPreparedForBackend };
      //   try {
      //     response = await updateCyclicalActivity(
      //       originalCyclicalActivity as TCyclicalActivityFormInputs,
      //       changedCyclicalActivity
      //     );
      //   } catch (error) {
      //     setShowNotification('ERROR', dbReadingErrorMessage);
      //   }
    }

    if (!response || !response.status || !response.response) {
      setShowNotification('ERROR', dbReadingErrorMessage);
      return;
    }
    if (response.status === 'ERROR') {
      setShowNotification('ERROR', response.response);
      return;
    }
    setShowNotification('SUCCESS', response.response);

    if (isCurrentFormToPOSTData) {
      resetFormToInitialState();
      //   goToFirstStage();
    }
    if (isCurrentFormToPUTData) {
      resetFormToInitialState();
      setIsAddArtisticGroupVisible(false);
    }
  }

  ////tsx
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-[22px] mr-8 -mt-[18px]">
        <div className="prose">
          <h3>
            {isCurrentFormToPUTData
              ? 'Zmień grupę artystycznąć'
              : 'Dodaj grupę artystyczną'}
          </h3>
        </div>
        <div>
          <CloseIcon
            alt="Zamknij formularz."
            actionFn={() => {
              resetArtisticGroupFormikDataForPUT();
              setIsAddArtisticGroupVisible(false);
            }}
          />
        </div>
      </div>

      {/**
       * form start
       */}
      <form
        action={async (_formData) => {
          await submitFormHandler(formik);
        }}
      >
        <div className="-mt-[13px]">
          <CheckboxFormik<MainType>
            name="isToBePublished"
            label="Czy grupa artystyczna ma być widoczna?"
            // isCommentPopupVisible={true}
            // commentContent={<IsToBePublishedComment />}
            isToBeUsedAsPartFormik={true}
            formik={formik}
          />
        </div>

        <div className="form-input-width mt-[22px] ">
          <InputFormik<MainType>
            name="title"
            type="text"
            label={
              isCurrentFormToPUTData
                ? 'zmień grupę artystyczną:'
                : 'nazwa grupy artystycznej:'
            }
            placeholder="wpisz nazwę grupy artystycznej"
            formik={formik}
          />
        </div>

        <div className=" mt-[20px]">
          <RichTextEditorFormik<MainType>
            name="detailedDescription"
            label="opis:"
            formik={formik}
          />
        </div>

        <div className="mt-[20px]">
          <ImagesUploadFormik<MainType>
            formik={formik}
            name="images"
            label="obrazki:"
            isCurrentFormToPUTData={isCurrentFormToPUTData}
          />
        </div>

        {/* <div className="flex mb-12 font-base-regular">
           {stage.map((stageItem, index) => (
             <FormStageLink
               key={index}
               stage={stageItem}
               index={index}
               actionFn={() => goToNextGivenStageOrJustNextStageOfForm(index)}
             />
           ))}
         </div> */}

        {/* {stage[0].isActive ? (
           <CyclicalActivityAddFormStageOne<TCyclicalActivityFormInputs>
             isCurrentFormToPUTData={isCurrentFormToPUTData}
             formik={formik}
           />
         ) : null} */}

        {/* {stage[1].isActive ? (
           <CyclicalActivityAddFormStageTwo<TCyclicalActivityFormInputs>
             isCurrentFormToPUTData={isCurrentFormToPUTData}
             formik={formik}
           />
         ) : null} */}

        {/* {stage[2].isActive ? (
           <ComponentTransitionFromRightToLeft>
             <Fragment>
               <CyclicalActivityAddFormStageThree<TCyclicalActivityFormInputs>
                 isCurrentFormToPUTData={isCurrentFormToPUTData}
                 formik={formik}
               />
             </Fragment>
           </ComponentTransitionFromRightToLeft>
         ) : null} */}

        <div className="mt-[40px] flex gap-8">
          {/* <CustomButton
             text="poprzedni etap"
             descriptionText="Poprzedni etap."
             additionalClasses="mt-[4px]"
             disabled={!checkIfPrevIsEnabled()}
             actionFn={() => goToPrevGivenStageOrJustPrevStageOfForm()}
             outlined={true}
             currentlyActive={false}
           />
           <CustomButton
             text="następny etap"
             descriptionText="Następny etap."
             additionalClasses="mt-[4px]"
             disabled={!checkIfNextIsEnabled()}
             actionFn={() => goToNextGivenStageOrJustNextStageOfForm()}
             outlined={true}
           /> */}

          <CustomButton
            text={isCurrentFormToPUTData ? 'zmień' : 'dodaj grupę artystyczną'}
            descriptionText="Dodaj grupę artystyczną."
            additionalClasses="mt-[4px]"
            onSubmit={true}
            disabled={!formik.dirty || !formik.isValid}
          />
        </div>
      </form>
      {/**
       * form end
       */}
    </Fragment>
  );
}
