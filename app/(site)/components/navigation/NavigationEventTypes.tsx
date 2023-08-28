import { getPolishCategoryOfEventsName } from '@/lib/textHelpers';
import { EventType } from '@prisma/client';
import CustomButton from '../CustomButton';

interface Props {
  toggleCategory: (_category: EventType) => void;
  checkButtonCategoryState: (_category: EventType) => boolean;
  checkIfAllCategoriesAreChosen: () => boolean;
  selectAllOrNoneCategories: () => void;
}

export default function NavigationEventTypes(props: Props) {
  ////vars
  const {
    toggleCategory,
    checkButtonCategoryState,
    checkIfAllCategoriesAreChosen,
    selectAllOrNoneCategories,
  } = props;

  ////tsx
  return (
    <div className="">
      <div className="font-base-bold pt-[10px]">Kategoria wydarzeń:</div>
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

        {(Object.keys(EventType) as Array<EventType>).map((eventType) => (
          <CustomButton
            key={eventType}
            text={getPolishCategoryOfEventsName(eventType)}
            descriptionText={getPolishCategoryOfEventsName(eventType)}
            disabled={false}
            outlined={checkButtonCategoryState(eventType) ? false : true}
            actionFn={() => toggleCategory(eventType)}
          />
        ))}
      </div>
    </div>
  );
}
