'use client';

import { useLayoutState } from '@/context/layoutState';
import { subMenuVariant } from '@/lib/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CustomLink from '../../components/CustomLink';

export default function EventsNotFound() {
  ////vars
  const { getCurrentForegroundColor } = useLayoutState();
  const currentForegroundColor = getCurrentForegroundColor();
  const router = useRouter();

  ////tsx
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={subMenuVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute z-40 w-full top-[128px] right-0 left-0 bg-skin-main-bg drop-shadow-big pt-24 pb-24"
      >
        <div className="proper-container-classes">
          <div className="flex flex-col items-start justify-start max-w-full gap-16 desktop:flex-row desktop:items-center">
            <div className="max-w-[376px] h-[132px]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 376 132"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M67.6272 130.167C66.2832 130.167 65.1225 129.678 64.145 128.7C63.1676 127.722 62.6788 126.561 62.6788 125.217V106.517H4.94833C3.60434 106.517 2.44362 106.028 1.46617 105.05C0.488724 104.072 0 102.911 0 101.567V82.1333C0 78.9556 0.794176 76.3278 2.38253 74.25L57.1807 5.13333C58.2803 3.78889 59.2578 2.93334 60.113 2.56667C61.0905 2.07778 62.3734 1.83333 63.9617 1.83333H91.6357C92.9797 1.83333 94.1404 2.32222 95.1179 3.3C96.0953 4.27778 96.5841 5.43889 96.5841 6.78333V77.1833H112.345C113.689 77.1833 114.85 77.6722 115.828 78.65C116.805 79.6278 117.294 80.7889 117.294 82.1333V101.567C117.294 102.911 116.805 104.072 115.828 105.05C114.85 106.028 113.689 106.517 112.345 106.517H96.5841V125.217C96.5841 126.561 96.0953 127.722 95.1179 128.7C94.1404 129.678 92.9797 130.167 91.6357 130.167H67.6272ZM63.5952 43.45L36.8376 77.1833H63.5952V43.45Z"
                  fill={currentForegroundColor}
                />
                <path
                  d="M241.575 49.6833C241.819 53.1056 241.941 58.6056 241.941 66.1833C241.941 73.6389 241.819 79.0167 241.575 82.3167C240.719 96.8611 235.893 108.778 227.096 118.067C218.421 127.356 205.409 132 188.059 132C170.71 132 157.636 127.356 148.839 118.067C140.164 108.778 135.399 96.8611 134.544 82.3167C134.3 75.7167 134.178 70.3389 134.178 66.1833C134.178 62.0278 134.3 56.5278 134.544 49.6833C135.399 35.1389 140.164 23.2222 148.839 13.9333C157.636 4.64445 170.71 0 188.059 0C205.409 0 218.421 4.64445 227.096 13.9333C235.893 23.2222 240.719 35.1389 241.575 49.6833ZM207.669 50.6C207.303 43.8778 205.653 38.6833 202.721 35.0167C199.789 31.2278 194.902 29.3333 188.059 29.3333C181.217 29.3333 176.33 31.2278 173.398 35.0167C170.465 38.6833 168.816 43.8778 168.449 50.6C168.205 57.2 168.083 62.2722 168.083 65.8167C168.083 69.1167 168.205 74.3111 168.449 81.4C168.694 88.1222 170.282 93.3778 173.214 97.1667C176.269 100.833 181.217 102.667 188.059 102.667C194.902 102.667 199.789 100.833 202.721 97.1667C205.776 93.3778 207.425 88.1222 207.669 81.4C207.914 77.8556 208.036 72.6611 208.036 65.8167C208.036 58.9722 207.914 53.9 207.669 50.6Z"
                  fill={currentForegroundColor}
                />
                <path
                  d="M326.333 130.167C324.989 130.167 323.829 129.678 322.851 128.7C321.874 127.722 321.385 126.561 321.385 125.217V106.517H263.655C262.311 106.517 261.15 106.028 260.172 105.05C259.195 104.072 258.706 102.911 258.706 101.567V82.1333C258.706 78.9556 259.5 76.3278 261.089 74.25L315.887 5.13333C316.987 3.78889 317.964 2.93334 318.819 2.56667C319.797 2.07778 321.08 1.83333 322.668 1.83333H350.342C351.686 1.83333 352.847 2.32222 353.824 3.3C354.802 4.27778 355.29 5.43889 355.29 6.78333V77.1833H371.052C372.396 77.1833 373.556 77.6722 374.534 78.65C375.511 79.6278 376 80.7889 376 82.1333V101.567C376 102.911 375.511 104.072 374.534 105.05C373.556 106.028 372.396 106.517 371.052 106.517H355.29V125.217C355.29 126.561 354.802 127.722 353.824 128.7C352.847 129.678 351.686 130.167 350.342 130.167H326.333ZM322.301 43.45L295.544 77.1833H322.301V43.45Z"
                  fill={currentForegroundColor}
                />
              </svg>
            </div>
            <div className="w-[2px] h-16 bg-skin-gray hidden  desktop:block"></div>
            <div className="flex flex-col items-start justify-center">
              <div className="prose">
                <h3>
                  Hmm, podane wydarzenie nie istnieje. <br />
                  Proponujemy:
                </h3>
              </div>
              <div className="flex flex-col tablet:flex-row justify-center items-start tablet:items-center gap-4 tablet:gap-8 mt-[25px]">
                <div>
                  <CustomLink
                    visibleText="powrót do wydarzeń"
                    url={`/events`}
                    descriptionText="Wróć do wszytskich wydarzeń."
                  />
                </div>
                <div className="prose">
                  <h3>albo</h3>
                </div>
                <div>
                  <CustomLink
                    visibleText="powrót do strony głównej"
                    url={`/`}
                    descriptionText="Powrót do strony głównej."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
