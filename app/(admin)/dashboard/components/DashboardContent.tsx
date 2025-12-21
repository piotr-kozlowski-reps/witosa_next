'use client';

import NotAuthenticatedError from '@/app/(site)/components/NotAuthenticatedError';
import Modal from '@/app/(site)/components/modal/Modal';
import ModalNotEnoughWidthForAdmin from '@/app/(site)/components/modal/ModalNotEnoughWidthForAdmin';
import { useModalState } from '@/context/modalState';
import { useNavigationState } from '@/context/navigationState';
import useLocalStorage from '@/hooks/useLocalStorage';
import {
  TGetAllCyclicalActivitiesResponse,
  TGetAllEventsResponse,
  TGetAllUsersResponse,
  TNewsletterDataCombo,
} from '@/types';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardInsidePages from './DashboardInsidePages';
import DashboardNavigation from './DashboardNavigation';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
  usersData: TGetAllUsersResponse;
  cyclicalActivitiesData: TGetAllCyclicalActivitiesResponse;
  eventsData: TGetAllEventsResponse;
};

export default function DashboardContent(props: Props) {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.userRole === 'ADMIN';
  const { newsletterDataCombo, usersData, cyclicalActivitiesData, eventsData } =
    props;
  const { getIsShowModal, setShowModal } = useModalState();
  const { getCurrentDevice } = useNavigationState();

  const [isModalNotEnoughWidthToBeSeen, setIsModalNotEnoughWidthToBeSeen] =
    useLocalStorage('isModalNotEnoughWidthToBeSeen', true);

  const theme = createTheme({
    palette: {
      primary: {
        light: 'rgba(41, 80, 71, 0.12)',
        main: '#256254',
        dark: '#256254',
        contrastText: '#fdfdfd',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            outlineStyle: 'solid',
            outlineWidth: '2px',
            outlineOffset: '-2px',
            outlineColor: 'var(--cta-primary)',
            fontSize: 'var(--font-size-normal)',
            lineHeight: 'var(--font-size-normal-line-height)',
            fontWeight: '300',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            border: 'none',
            '&:hover': {
              outlineColor: 'var(--cta-secondary)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            outlineStyle: 'solid',
            outlineWidth: '2px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            boxShadow: '-4px 4px 18px var(--color-shadow)',
          },
        },
      },
    },
  });

  // const isToShowModal =
  //   (getCurrentDevice() === 'TABLET' || getCurrentDevice() === 'MOBILE') &&
  //   isModalNotEnoughWidthToBeSeen;

  // console.log({ isToShowModal });

  // useEffect(() => {
  //   if (isToShowModal) {
  //     setIsModalNotEnoughWidthToBeSeen(false);
  //     setShowModal(true, <ModalNotEnoughWidthForAdmin />);
  //   }
  //   if (!isToShowModal) {
  //     setIsModalNotEnoughWidthToBeSeen(false);
  //     setShowModal(false, <></>);
  //   }
  // }, [isToShowModal]);

  ////tsx
  return (
    <Fragment>
      {session?.status === 'unauthenticated' ? <NotAuthenticatedError /> : null}
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
          {session && session?.data?.user ? (
            <Fragment>
              {/* {getIsShowModal() ? <Modal /> : null} */}
              <div className="proper-container-classes">
                <DashboardHeader userName={session?.data?.user?.name} />

                <div className="mt-[37px] relative">
                  <DashboardNavigation isAdmin={isAdmin} />
                  <DashboardInsidePages
                    newsletterDataCombo={newsletterDataCombo}
                    usersData={usersData}
                    cyclicalActivitiesData={cyclicalActivitiesData}
                    eventsData={eventsData}
                  />
                </div>
                {/* <FooterStamp /> */}
              </div>
            </Fragment>
          ) : null}
        </LocalizationProvider>
      </ThemeProvider>
    </Fragment>
  );
}
