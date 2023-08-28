import { getPolishCategoryName } from '@/lib/textHelpers';
import { ActivityType } from '@prisma/client';
import CustomButton from '../CustomButton';

interface Props {
  toggleCategory: (_category: ActivityType) => void;
  checkButtonCategoryState: (_category: ActivityType) => boolean;
  checkIfAllCategoriesAreChosen: () => boolean;
  selectAllOrNoneCategories: () => void;
  categoryOfWhatText: string;
}

export default function NavigationActivityTypes(props: Props) {
  ////vars
  const {
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
    categoryOfWhatText,
  } = props;

  ////tsx
  return (
    <div className="">
      <div className="font-base-bold pt-[10px]">{`${categoryOfWhatText}:`}</div>
      <div className="flex items-center justify-start gap-4 mt-[11px] flex-wrap">
        <CustomButton
          text={
            checkIfAllCategoriesAreChosen()
              ? 'ODZNACZ WSZYTSKIE'
              : 'ZAZNACZ WSZYSTKIE'
          }
          descriptionText={
            checkIfAllCategoriesAreChosen()
              ? 'ODZNACZ WSZYTSKIE KATEGORIE'
              : 'ZAZNACZ WSZYSTKIE KATEGORIE'
          }
          disabled={false}
          outlined={true}
          actionFn={selectAllOrNoneCategories}
        />

        <div className="-mx-0 separator-vertical"></div>

        <CustomButton
          text={getPolishCategoryName('DANCE')}
          descriptionText={getPolishCategoryName('DANCE')}
          disabled={false}
          outlined={checkButtonCategoryState('DANCE') ? false : true}
          actionFn={() => toggleCategory('DANCE')}
        />

        <CustomButton
          text={getPolishCategoryName('PLASTICITY')}
          descriptionText={getPolishCategoryName('PLASTICITY')}
          disabled={false}
          outlined={checkButtonCategoryState('PLASTICITY') ? false : true}
          actionFn={() => toggleCategory('PLASTICITY')}
        />

        <CustomButton
          text={getPolishCategoryName('MULTIMEDIA')}
          descriptionText={getPolishCategoryName('MULTIMEDIA')}
          disabled={false}
          outlined={checkButtonCategoryState('MULTIMEDIA') ? false : true}
          actionFn={() => toggleCategory('MULTIMEDIA')}
        />

        <CustomButton
          text={getPolishCategoryName('THEATER')}
          descriptionText={getPolishCategoryName('THEATER')}
          disabled={false}
          outlined={checkButtonCategoryState('THEATER') ? false : true}
          actionFn={() => toggleCategory('THEATER')}
        />

        <CustomButton
          text={getPolishCategoryName('MUSIC')}
          descriptionText={getPolishCategoryName('MUSIC')}
          disabled={false}
          outlined={checkButtonCategoryState('MUSIC') ? false : true}
          actionFn={() => toggleCategory('MUSIC')}
        />

        <CustomButton
          text={getPolishCategoryName('EDUCATION')}
          descriptionText={getPolishCategoryName('EDUCATION')}
          disabled={false}
          outlined={checkButtonCategoryState('EDUCATION') ? false : true}
          actionFn={() => toggleCategory('EDUCATION')}
        />

        <CustomButton
          text={getPolishCategoryName('RECREATION')}
          descriptionText={getPolishCategoryName('RECREATION')}
          disabled={false}
          outlined={checkButtonCategoryState('RECREATION') ? false : true}
          actionFn={() => toggleCategory('RECREATION')}
        />

        <CustomButton
          text={getPolishCategoryName('OTHERS')}
          descriptionText={getPolishCategoryName('OTHERS')}
          disabled={false}
          outlined={checkButtonCategoryState('OTHERS') ? false : true}
          actionFn={() => toggleCategory('OTHERS')}
        />
      </div>
    </div>
  );
}
