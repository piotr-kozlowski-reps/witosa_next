import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { getAllEvents } from '@/actions/eventsActions';
import { subMonths, getYear } from 'date-fns';

export async function GET() {
  const feed = new Feed({
    title: 'Art CK - Centrum Kultury w Knurowie',
    description: 'Samorządowa instytucja kultury z kawiarnią Art Cafe',
    id: 'https://www.art-ck.pl/',
    link: 'https://www.art-ck.pl/',
    language: 'pl',
    image: 'https://www.art-ck.pl/artck_logo.svg',
    favicon: 'https://www.art-ck.pl/favicon.ico',
    author: {
      name: 'Art CK',
      email: 'info@art-ck.pl ',
      link: 'https://www.art-ck.pl/',
    },
    copyright: `Copyright © ${getYear(new Date())} Centrum Kultury w Knurowie`,
  });

  const events = await getAllEvents();
  const response = events.response;
  if (Array.isArray(response)) {
    const threeMonthsAgo = subMonths(new Date(), 3);

    response
      //isToBePublished
      .filter((event) => {
        return event.isToBePublished;
      })

      //isToBeInRssChannel;
      .filter((event) => {
        return true;
      })

      //is not older than 3 months
      .filter((event) => {
        if (event.eventEndDate) return event.eventEndDate > threeMonthsAgo;
        if (event.eventStartDate) return event.eventStartDate > threeMonthsAgo;
        return false;
      })
      .forEach((event) => {
        feed.addItem({
          title: event.title,
          id: `${process.env.NEXT_PUBLIC_BASE_URL}events/${event.id}`,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}events/${event.id}`,
          description: event.detailedDescription, //TODO: ?? short ? czy pełny
          image: `${process.env.NEXT_PUBLIC_AWS_S3_MAIN_URL}${event.newsSectionImageUrl}`, //TODO: > jakis image ?
          published: event.visibleFrom ? event.visibleFrom : undefined,
          category: [{ name: 'Wydarzenie' }],
          date: event.eventStartDate,
        });
      });
  }

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
