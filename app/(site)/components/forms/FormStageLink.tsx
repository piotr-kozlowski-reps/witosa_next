import { TFormStage } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';
import TextButton from '../TextButton';

type Props = {
  stage: TFormStage;
  index: number;
  actionFn: () => void;
};

export default function FormStageLink(props: Props) {
  ////vars
  const { stage, index, actionFn } = props;

  ////tsx
  return (
    <Fragment>
      {index === 0 ? (
        <TextButton
          buttonName={stage.linkName}
          actionFn={actionFn}
          isSubmit={false}
          isActive={stage.isActive}
          isAccessToStage={stage.isAccessToStage}
        />
      ) : null}

      {index > 0 ? (
        <Fragment>
          <span
            className={clsx(
              'mx-11',
              stage.isAccessToStage ? '' : 'text-skin-gray opacity-50'
            )}
          >
            {'>'}
          </span>
          <TextButton
            buttonName={stage.linkName}
            actionFn={actionFn}
            isSubmit={false}
            isActive={stage.isActive}
            isAccessToStage={stage.isAccessToStage}
          />
        </Fragment>
      ) : null}
    </Fragment>
  );
}
