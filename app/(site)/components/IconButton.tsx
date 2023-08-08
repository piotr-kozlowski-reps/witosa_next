import Image from 'next/image';

type Props = {
  iconDefaultUrl: string;
  iconHoverUrl: string;
  actionFn: () => void;
};

export default function IconButton(props: Props) {
  ////vars
  const { iconDefaultUrl, iconHoverUrl, actionFn } = props;

  ////tsx
  return (
    <button className="relative w-8 h-8" onClick={() => actionFn()}>
      <div className="absolute top-0 bottom-0 left-0 right-0 opacity-100 hover:opacity-0 focus:opacity-0">
        <Image
          src={iconDefaultUrl}
          width={32}
          height={32}
          alt="Font size - normal."
        />
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 focus:opacity-100">
        <Image
          src={iconHoverUrl}
          width={32}
          height={32}
          alt="Font size - normal."
        />
      </div>
    </button>
  );
}
