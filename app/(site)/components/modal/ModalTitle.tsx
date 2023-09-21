type Props = {
  text: string;
};

export default function ModalTitle(props: Props) {
  ////vars
  const { text } = props;

  ////tsx
  return <h1>{text}</h1>;
}
