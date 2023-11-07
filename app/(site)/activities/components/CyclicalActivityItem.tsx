import {
  createBetweenHoursText,
  createListingOfAllPlacesSeparatedWithCommas,
} from '@/lib/textHelpers';
import { TOccurrence } from '@/types';
import { Place } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import CustomLink from '../../components/CustomLink';

type Props = {
  occurrence: TOccurrence;
  name: string;
  id: string;
  shortDescription: string;
  places: Place[];
  isLastActivityToDisplay: boolean;
  customLinkToDetails: string | null;
};

export default function CyclicalActivityItem(props: Props) {
  ////vars
  const {
    occurrence,
    name,
    id,
    shortDescription,
    places,
    isLastActivityToDisplay,
    customLinkToDetails,
  } = props;

  console.log({ occurrence });

  ////tsx

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      key={id}
    >
      <div className="font-large-bold ml-12 pt-[1px] text-skin-base">
        {createBetweenHoursText(
          occurrence.activityStart as Date,
          occurrence.activityEnd as Date
        )}
      </div>
      <div className="ml-[80px]">
        <div className="prose mt-[13px]">
          <h4>{name}</h4>
        </div>
        <div className="font-base-regular mt-[7px]">{shortDescription}</div>
        <div className="font-base-regular mt-[7px]">
          {createListingOfAllPlacesSeparatedWithCommas(places)}
        </div>
        <div
          className={clsx(
            'mt-[21px]',
            isLastActivityToDisplay ? 'mb-[60px]' : 'mb-[44px]'
          )}
        >
          <CustomLink
            url={customLinkToDetails ? customLinkToDetails : `activities/${id}`}
            descriptionText={`${name}`}
            visibleText="więcej..."
          />
        </div>
      </div>
    </motion.div>
  );
}
