import { TCurrentDevice, TsocialLinkName, TsocialLinks } from '@/types';
import { ImmutableObject } from '@hookstate/core';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

interface Props {
  getSocialLinkData: (
    _socialLinkName: TsocialLinkName
  ) => ImmutableObject<ImmutableObject<TsocialLinks>> | undefined;
  getCurrentDevice: () => TCurrentDevice;
}

export default function ContactInfo(props: Props) {
  ////vars
  const { getSocialLinkData } = props;

  ////tsx
  return (
    <div id="contact" className="w-full prose">
      <h4>Dane kontaktowe</h4>
      <div className="mt-[17px]">
        <b>ART CK</b>
        <p className="mt-1">Centrum Kultury w Knurowie </p>
        <p className="-mt-2">ul. Wincentego Witosa 6</p>
        <p className="-mt-2">44-196 Knurów</p>
      </div>
      <div className="mt-[23px]">
        <p className="mt-1">
          tel. biuro:{' '}
          <span className="inline-block not-prose">
            <a
              href={`tel:0048323326397`}
              className="font-semibold link-default"
            >
              +48 32 332 63 97
            </a>
          </span>
        </p>
        <p className="-mt-2">
          tel. recepcja:{' '}
          <span className="inline-block not-prose">
            <a
              href={`tel:0048323326379`}
              className="font-semibold link-default"
            >
              +48 32 332 63 79
            </a>
          </span>
        </p>
        <p className="mt-1">
          www:{' '}
          <span className="inline-block not-prose">
            <a
              href={`https://www.art-ck.pl`}
              className="font-semibold link-default"
            >
              www.art-ck.pl
            </a>
          </span>
        </p>
        <p className="mt-1">
          e-mail:{' '}
          <span className="inline-block not-prose">
            <a
              href={`mailto:info@art-ck.pl`}
              className="font-semibold link-default"
            >
              info@art-ck.pl
            </a>
          </span>
        </p>
      </div>
      <div className="mt-[28px] mb-8 separator-horizontal"></div>
      {/* internal socials ul  */}
      <div className="-mt-2 not-prose">
        <ul className="flex items-center justify-start gap-4 mt-4">
          <li>
            <FacebookIcon
              size="NORMAL"
              alt="Facebook"
              url={getSocialLinkData('FACEBOOK')!.path}
            />
          </li>
          <li>
            <InstagramIcon
              size="NORMAL"
              alt="Instagram"
              url={getSocialLinkData('INSTAGRAM')!.path}
            />
          </li>
          <li>
            <YoutubeIcon
              size="NORMAL"
              alt="Youtube"
              url={getSocialLinkData('YOUTUBE')!.path}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
