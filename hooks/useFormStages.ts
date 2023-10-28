import { TFormStage } from '@/types';
import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';

export function useFormStages<T>(
  stagesInitialStage: TFormStage[],
  formik: FormikProps<T>
) {
  const [stage, setStage] = useState<TFormStage[]>(stagesInitialStage);

  function getCurrentStageIndex() {
    return stage.findIndex((stageItem) => stageItem.isActive);
  }
  /**
   * if index argument not provided -> function works as go_to_next_stage
   * when index argument provided function goes to desired index
   * */
  function goToNextGivenStageOrJustNextStageOfForm(index?: number) {
    const currentIndex = getCurrentStageIndex();
    setStage((prevStage) => {
      const newState = prevStage.map((item) => ({
        ...item,
        isActive: false,
      }));

      index || index === 0
        ? (newState[index].isActive = true)
        : (newState[currentIndex + 1].isActive = true);

      return newState;
    });
  }
  function goToPrevGivenStageOrJustPrevStageOfForm(index?: number) {
    const currentIndex = getCurrentStageIndex();
    setStage((prevStage) => {
      const newState = prevStage.map((item) => ({ ...item, isActive: false }));

      index || index === 0
        ? (newState[index].isActive = true)
        : (newState[currentIndex - 1].isActive = true);

      newState[currentIndex - 1].isActive = true;
      return newState;
    });
  }
  function goToFirstStage() {
    setStage(stagesInitialStage);
  }
  function checkIfNextIsEnabled() {
    //index number
    const currentIndex = getCurrentStageIndex();

    //checking if we're on the end of array
    const isGoingNextStagePossibleWithCurrentIndex =
      currentIndex === stage.length - 1;
    if (isGoingNextStagePossibleWithCurrentIndex) {
      return false;
    }

    //checking if validation allows going further
    const isNextStageEnabedThrougValidation =
      stage[currentIndex + 1].isAccessToStage;

    return isNextStageEnabedThrougValidation ? true : false;
  }
  function checkIfPrevIsEnabled() {
    const currentIndex = getCurrentStageIndex();
    const isGoingPrevStagePossibleWithCurrentIndex = currentIndex !== 0;
    return isGoingPrevStagePossibleWithCurrentIndex;
  }

  useEffect(() => {
    for (let i = 0; i < stage.length - 1; i++) {
      const stageItem = stage[i];

      if (!stageItem.callbackValidatingStage)
        stageItem.callbackValidatingStage = () => true;

      const resultStageState = [...stage];

      if (stageItem.callbackValidatingStage(formik.values as Object)) {
        if (!resultStageState[i + 1].isAccessToStage) {
          resultStageState[i + 1].isAccessToStage = true;
          setStage(resultStageState);
        }
      }

      if (!stageItem.callbackValidatingStage(formik.values as Object)) {
        if (resultStageState[i + 1].isAccessToStage) {
          resultStageState[i + 1].isAccessToStage = false;
          setStage(resultStageState);
        }
      }
    }
  }, [formik]);

  return {
    goToFirstStage,
    stage,
    goToNextGivenStageOrJustNextStageOfForm,
    goToPrevGivenStageOrJustPrevStageOfForm,
    checkIfPrevIsEnabled,
    checkIfNextIsEnabled,
  };
}
