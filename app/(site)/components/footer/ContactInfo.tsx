import { TsocialLinkName, TsocialLinks } from '@/types';
import { ImmutableObject } from '@hookstate/core';
import IconButton from '../IconButton';

interface Props {
  getSocialLinkData: (
    socialLinkName: TsocialLinkName
  ) => ImmutableObject<ImmutableObject<TsocialLinks>> | undefined;
}

export default function ContactInfo(props: Props) {
  ////vars
  const { getSocialLinkData } = props;

  ////tsx
  return (
    <div className="w-full prose">
      <h4>Dane kontaktowe</h4>
      <div className="mt-[17px]">
        <b>ART CK</b>
        <p className="mt-1">ul. Wincentego Witosa 5</p>
        <p className="-mt-2">44-196 Knurów</p>
      </div>
      <div className="mt-[23px]">
        <p className="mt-1">
          tel. <b>32 235 48 78</b>
        </p>
        <p className="-mt-2">
          e-mail: <b>witosa@artck.pl</b>
        </p>
      </div>
      <div className="mt-[28px] mb-8 separator-horizontal"></div>
      {/* internal socials ul  */}
      <div className="not-prose">
        <ul className="flex items-center justify-start gap-4 mt-4 ">
          <li>
            <IconButton
              isCurrentlyActive={false}
              iconDefaultUrl="facebook-xsm_default.svg"
              iconHoverUrl="facebook-xsm_hover.svg"
              alt="Facebook"
              size="SMALL"
              actionFn={() => {}}
              isLink={true}
              linkUrl={getSocialLinkData('FACEBOOK')!.path}
            />
          </li>
          <li>
            <IconButton
              isCurrentlyActive={false}
              iconDefaultUrl="instagram-xsm_default.svg"
              iconHoverUrl="instagram-xsm_hover.svg"
              alt="Instagram"
              size="SMALL"
              actionFn={() => {}}
              isLink={true}
              linkUrl={getSocialLinkData('INSTAGRAM')!.path}
            />
          </li>
          <li>
            <IconButton
              isCurrentlyActive={false}
              iconDefaultUrl="youtube-xsm_default.svg"
              iconHoverUrl="youtube-xsm_hover.svg"
              alt="Youtube"
              size="SMALL"
              actionFn={() => {}}
              isLink={true}
              linkUrl={getSocialLinkData('YOUTUBE')!.path}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
