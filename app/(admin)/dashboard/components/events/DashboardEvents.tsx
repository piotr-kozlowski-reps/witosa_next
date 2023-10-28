import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useEventsState } from '@/context/eventsState';
import { TGetAllEventsResponse } from '@/types';
import { Event } from '@prisma/client';
import { Fragment } from 'react';
import EventAddForm from './EventAddForm';
import EventsDataTable from './EventsDataTable';
import { columnsEvents } from './columnsEvents';

type Props = {
  eventsData: TGetAllEventsResponse;
};

export default function DashboardEvents(props: Props) {
  ////vars
  const { eventsData } = props;
  const {
    getIsAddEventVisible,
    setIsAddEventVisible,
    resetEventFormikDataForPUT,
  } = useEventsState();

  ////tsx
  return (
    <Fragment>
      {getIsAddEventVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <EventAddForm />
        </ComponentTransitionFromRightToLeft>
      ) : null}

      {!getIsAddEventVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <Fragment>
            <div className="flex items-center justify-between mb-4 mr-8 -mt-[10px]">
              <div className="prose">
                <h3>Lista wydarzeń</h3>
              </div>
              <div>
                <CustomButton
                  disabled={false}
                  text="dodaj wydarzenie"
                  descriptionText="dodaj wydarzenie"
                  actionFn={() => {
                    resetEventFormikDataForPUT();
                    setIsAddEventVisible(true);
                  }}
                />
              </div>
            </div>
            <EventsDataTable
              columns={columnsEvents}
              data={eventsData.response as Event[]}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
