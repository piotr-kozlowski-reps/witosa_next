type Props = {
  nameForListingElements: string;
  elementsNamesArray: string[];
};

export default function ModalElementsToBeDeleted(props: Props) {
  ////vars
  const { nameForListingElements, elementsNamesArray } = props;

  ////tsx
  return (
    <h3 className="-mt-[10px]">
      <span>{nameForListingElements}</span>
      <ul className="ml-6 -mt-2 custom-list-bullet">
        {elementsNamesArray.map((el, index) => (
          <li key={index} className="font-base-regular text-size-large">
            {el}
          </li>
        ))}
      </ul>
    </h3>
  );
}
