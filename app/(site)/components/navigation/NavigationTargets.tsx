import { getPolishForWhomName } from '@/lib/textHelpers';
import { ForWhom } from '@prisma/client';
import CustomButton from '../CustomButton';

interface Props {
  toggleForWhom: (_passedForWhom: ForWhom) => void;
  checkButtonForWhomState: (_passedForWhom: ForWhom) => boolean;
  checkIfAllForWhomAreChosen: () => boolean;
  selectAllOrNoneForWhoms: () => void;
}

export default function NavigationTargets(props: Props) {
  ////vars
  const {
    checkIfAllForWhomAreChosen,
    selectAllOrNoneForWhoms,
    checkButtonForWhomState,
    toggleForWhom,
  } = props;

  ////tsx
  return (
    <div className="mt-[44px]">
      <div className="font-base-bold">Dla kogo:</div>
      <div className="flex items-center justify-start gap-4 mt-[11px] flex-wrap">
        <CustomButton
          text={
            checkIfAllForWhomAreChosen()
              ? 'ODZNACZ WSZYTSKIE'
              : 'ZAZNACZ WSZYSTKIE'
          }
          descriptionText={
            checkIfAllForWhomAreChosen()
              ? 'Odznacz wszytskie opcje dla kogo.'
              : 'Zaznacz wszytskie opcje dla kogo.'
          }
          disabled={false}
          outlined={true}
          actionFn={selectAllOrNoneForWhoms}
        />

        <div className="-mx-0 separator-vertical"></div>

        {(Object.keys(ForWhom) as Array<ForWhom>).map((ForWhom) => (
          <CustomButton
            key={ForWhom}
            text={getPolishForWhomName(ForWhom)}
            descriptionText={getPolishForWhomName(ForWhom)}
            disabled={false}
            outlined={checkButtonForWhomState(ForWhom) ? false : true}
            actionFn={() => toggleForWhom(ForWhom)}
          />
        ))}
      </div>
    </div>
  );
}
