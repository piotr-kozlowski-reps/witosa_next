type Props = {
  sampleTextProp: string;
};

export const BaseTemplate: React.FC<Props> = (props: Props) => {
  ////vars
  const { sampleTextProp } = props;

  ////tsx
  return <div>BaseTemplate</div>;
};
