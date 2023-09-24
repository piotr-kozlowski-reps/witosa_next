import { getPolishCategoryOfActivitiesName } from '@/lib/textHelpers';
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

        {(Object.keys(ActivityType) as Array<ActivityType>).map(
          (activityType) => (
            <CustomButton
              key={activityType}
              text={getPolishCategoryOfActivitiesName(activityType)}
              descriptionText={getPolishCategoryOfActivitiesName(activityType)}
              disabled={false}
              outlined={true}
              isChosen={checkButtonCategoryState(activityType) ? true : false}
              actionFn={() => toggleCategory(activityType)}
            />
          )
        )}
      </div>
    </div>
  );
}
