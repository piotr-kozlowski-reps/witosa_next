import { checkIfLoggedIn } from '@/actions/actionHelpers';
import { Session } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      /**
       * checking session
       * */
      let session: Session;
      try {
        session = await checkIfLoggedIn();
      } catch (error) {
        throw new Error('Unauthorized');
      }

      // If you throw, the user will not be able to upload
      if (!session) throw new Error('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user };
    })
    .onUploadComplete(async (data) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
