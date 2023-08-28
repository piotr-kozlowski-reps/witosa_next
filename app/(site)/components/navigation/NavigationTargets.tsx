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

        <CustomButton
          text={getPolishForWhomName('CHILDREN')}
          descriptionText={getPolishForWhomName('CHILDREN')}
          disabled={false}
          outlined={checkButtonForWhomState('CHILDREN') ? false : true}
          actionFn={() => toggleForWhom('CHILDREN')}
        />

        <CustomButton
          text={getPolishForWhomName('TEENS')}
          descriptionText={getPolishForWhomName('TEENS')}
          disabled={false}
          outlined={checkButtonForWhomState('TEENS') ? false : true}
          actionFn={() => toggleForWhom('TEENS')}
        />

        <CustomButton
          text={getPolishForWhomName('ADULTS')}
          descriptionText={getPolishForWhomName('ADULTS')}
          disabled={false}
          outlined={checkButtonForWhomState('ADULTS') ? false : true}
          actionFn={() => toggleForWhom('ADULTS')}
        />

        <CustomButton
          text={getPolishForWhomName('SENIORS')}
          descriptionText={getPolishForWhomName('SENIORS')}
          disabled={false}
          outlined={checkButtonForWhomState('SENIORS') ? false : true}
          actionFn={() => toggleForWhom('SENIORS')}
        />

        <CustomButton
          text={getPolishForWhomName('WOMEN')}
          descriptionText={getPolishForWhomName('WOMEN')}
          disabled={false}
          outlined={checkButtonForWhomState('WOMEN') ? false : true}
          actionFn={() => toggleForWhom('WOMEN')}
        />
      </div>
    </div>
  );
}
