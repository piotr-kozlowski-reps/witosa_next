import { useNavigationState } from '@/context/navigationState';
import { pageVariant } from '@/lib/animations/variants';
import { createListingOfAllPlacesSeparatedWithCommas } from '@/lib/textHelpers';
import { TEventTemporary } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import CustomLink from '../../components/CustomLink';
import SliderDateText from '../../components/slider_main/SliderDateText';

interface Props {
  chosenEvents: TEventTemporary[];
  isEventsArrayEmpty: boolean;
}

export default function EventsList(props: Props) {
  ////vars
  const { chosenEvents, isEventsArrayEmpty } = props;
  const { getCurrentDevice } = useNavigationState();
  const isCategorizedArrayEmpty = chosenEvents.length === 0;

  //content
  const contentWhenRootEventsArrayIsEmpty = (
    <div className="mt-[50px]">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-base-bold text-skin-base"
        >
          Brak aktualnych wydarzeń.
        </motion.div>
      </AnimatePresence>
    </div>
  );
  const contentWhenCategorizedEventsArrayIsEmpty = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-base-bold text-skin-base"
    >
      Niestety, nie ma wydarzeń dla wybranych przez Ciebie kategorii.
    </motion.div>
  );
  const contentWhenCategorizedEventsArrayHasItems = (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {chosenEvents.map((event, index) => {
          const isLastActivityToDisplay = chosenEvents.length === index + 1;

          return (
            <AnimatePresence mode="wait" key={event.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full "
              >
                <div className="w-full">
                  <div className="prose">
                    <h2 className="-mt-[1px]">
                      <SliderDateText date={event.eventStartDate} />
                    </h2>
                  </div>

                  <div
                    className={clsx(
                      'font-large-bold ml-12 -mt-[13px] text-skin-base',
                      getCurrentDevice() === 'MOBILE' ? 'pt-[20px]' : ''
                    )}
                  >
                    <div className="prose mt-[13px] w-full">
                      <h4>{event.title}</h4>
                    </div>

                    <div className="font-base-regular mt-[7px]">
                      {event.shortDescription}
                    </div>

                    <div className="font-base-regular mt-[7px]">
                      {createListingOfAllPlacesSeparatedWithCommas(
                        event.places
                      )}
                    </div>
                    <div
                      className={clsx(
                        'mt-[21px]',
                        isLastActivityToDisplay ? 'mb-[60px]' : 'mb-[59px]'
                      )}
                    >
                      <CustomLink
                        url={`events/${event.id}`}
                        descriptionText={`${event.title}`}
                        visibleText="więcej..."
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );

  ////tsx
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mt-[57px] proper-container-classes"
      >
        <div className="prose">
          <h1>Wydarzenia</h1>
        </div>
        {isEventsArrayEmpty ? (
          contentWhenRootEventsArrayIsEmpty
        ) : (
          <AnimatePresence mode="wait">
            <div className="mt-[50px]">
              <AnimatePresence mode="wait">
                {isCategorizedArrayEmpty
                  ? contentWhenCategorizedEventsArrayIsEmpty
                  : contentWhenCategorizedEventsArrayHasItems}
              </AnimatePresence>
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
