import { TFormStage } from '@/types';
import TextButton from '../TextButton';

type Props = {
  stage: TFormStage;
};

export default function FormStageLink(props: Props) {
  ////vars
  const { stage } = props;

  ////tsx
  return (
    <TextButton
      buttonName={stage.linkName}
      actionFn={() => {}}
      isSubmit={false}
      isActive={stage.isActive}
      isClickable={stage.isAccessToStage}
    />
  );
}
