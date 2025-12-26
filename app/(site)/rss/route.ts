// import { Feed } from 'feed';
// import { GetServerSidePropsContext } from 'next';

// type Post = {
//   title: string;
//   description: string;
//   url: string;
//   date: Date;
// };

// const generateRssFeed = async (posts: Post[]) => {
//   const feed = new Feed({
//     title: "My Website's RSS Feed",
//     description: 'Stay up to date with my latest content',
//     id: 'http://localhost:3000',
//     link: 'http://localhost:3000',
//     language: 'en',
//     image: 'http://localhost:3000/logo.png',
//     favicon: 'http://localhost:3000/favicon.png',
//     author: {
//       name: 'John Doe',
//       email: 'john@example.com',
//       link: 'http://localhost:3000/about',
//     },
//     copyright: 'Copyright (c) 2023 My Website',
//   });

//   posts.forEach((post) => {
//     feed.addItem({
//       title: post.title,
//       id: post.url,
//       link: post.url,
//       description: post.description,
//       date: new Date(post.date),
//     });
//   });

//   return feed.rss2();
// };

// const Rss = () => {};

// export async function getServerSideProps({ res }: GetServerSidePropsContext) {
//   const posts = [
//     {
//       title: 'Post One',
//       description: 'This is the first post',
//       url: 'http://localhost:3000/posts/1',
//       date: new Date(),
//     },
//     {
//       title: 'Post Two',
//       description: 'This is the second post',
//       url: 'http://localhost:3000/posts/2',
//       date: new Date(),
//     },
//     {
//       title: 'Post Three',
//       description: 'This is the third post',
//       url: 'http://localhost:3000/posts/3',
//       date: new Date(),
//     },
//   ];

//   const rss = await generateRssFeed(posts);

//   res.setHeader('Content-Type', 'text/xml');
//   res.write(rss);
//   res.end();

//   return { props: {} };
// }

// export default Rss;

import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { getAllEvents } from '@/actions/eventsActions';
import { subMonths } from 'date-fns';

// type Post = {
//   title: string;
//   description: string;
//   url: string;
//   date: Date;
// };

export async function GET() {
  // const posts: Post[] = [
  //   {
  //     title: 'Post One',
  //     description: 'This is the first post',
  //     url: 'http://localhost:3000/posts/1',
  //     date: new Date(),
  //   },
  //   {
  //     title: 'Post Two',
  //     description: 'This is the second post',
  //     url: 'http://localhost:3000/posts/2',
  //     date: new Date(),
  //   },
  //   {
  //     title: 'Post Three',
  //     description: 'This is the third post',
  //     url: 'http://localhost:3000/posts/3',
  //     date: new Date(),
  //   },
  // ];

  const feed = new Feed({
    title: "My Website's RSS Feed", //TODO:
    description: 'Stay up to date with my latest content', //TODO:
    id: 'https://www.art-ck.pl/',
    link: 'https://www.art-ck.pl/',
    language: 'pl',
    image: 'http://localhost:3000/logo.png', //TODO:
    favicon: 'http://localhost:3000/favicon.png', //TODO:
    author: {
      //TODO:
      name: 'John Doe', //TODO:
      email: 'john@example.com', //TODO:
      link: 'http://localhost:3000/about', //TODO:
    }, //TODO:
    copyright: 'Copyright (c) 2023 My Website', //TODO:
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
        console.log({ event });
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

  console.log(feed.items);

  // posts.forEach((post) => {
  //   feed.addItem({
  //     title: post.title,
  //     id: post.url,
  //     link: post.url,
  //     description: post.description,
  //     date: post.date,
  //   });
  // });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
