import { logAndRespondWithApiError } from '@/lib/errors/ApiErrorUtils';
import { responseMessages } from '@/lib/errors/messagesUtils';
import { HttpStatusCode } from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session?.user;
  const isAdmin = session?.user?.role === 'ADMIN';

  if (!isLoggedIn) {
    return logAndRespondWithApiError(
      responseMessages.responseMessageNotLoggedIn,
      HttpStatusCode.Forbidden
    );
  }

  if (!isAdmin) {
    return logAndRespondWithApiError(
      responseMessages.responseMessageNotAdminUser,
      HttpStatusCode.Forbidden
    );
  }

  // const filesList = await readFilesList('/logs');

  return NextResponse.json({ logFilesList: 'list' });

  // return res.json({ message: 'getting logs' });
  //overall error handling
  //res with listing of all log files in persisted folder
  //
  //
  // const body: TRegisterFormValuesSent = await req.json();
  // const { name, email, password } = body;
  // //TODO: check all them separatedly and log them with info which was not passed
  // if (!name || !email || !password) {
  //   return new NextResponse('Missing fields', { status: 400 });
  // }
  // const exist = await prisma.user.findUnique({ where: { email } });
  // if (exist) {
  //   //TODO: make middleware to handle Errors to log them
  //   throw new Error('Email already exist');
  // }
  // const hashedPassword = await bcrypt.hash(password, 10);
  // let user;
  // try {
  //   user = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       hashedPassword,
  //       //TODO: add role later ADMIN/USER
  //     },
  //   });
  // } catch (error) {
  //   //TODO: make middleware to handle Errors to log them
  //   throw new Error('User not persisted');
  // }
  // return NextResponse.json(user);
}

// async function readFilesList(folderName: string) {
//   const filesInDesiredFolder = await fs.readdir(folderName);
//   console.log(filesInDesiredFolder);
//   return filesInDesiredFolder;
// }
