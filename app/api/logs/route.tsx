import { getSession } from 'next-auth/react';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const session = await getSession(); //TODO: znaleźć sposób aby uzyskać dostęp do sesji (przesłać pewnei cookies w zapytaniu)
  const _isLoggedIn = session?.user;
  const _isAdmin = session?.user?.role === 'ADMIN';

  // console.log({ session });
  // console.log({ isLoggedIn });
  // console.log({ isAdmin });

  // if (!isLoggedIn) {
  //   return logAndRespondWithApiError(
  //     createErrorMessageWithSpecifiedPath(
  //       responseMessages.responseMessageNotAdminUser,
  //       '/api/logs'
  //     ),
  //     HttpStatusCode.Forbidden
  //   );
  // }

  // if (!isAdmin) {
  //   return logAndRespondWithApiError(
  //     createErrorMessageWithSpecifiedPath(
  //       responseMessages.responseMessageNotAdminUser,
  //       '/api/logs'
  //     ),
  //     HttpStatusCode.Forbidden
  //   );
  // }

  // const filesList = await readFilesList('/logs');

  return NextResponse.json({ temporaryError: 'error' });

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
//   const filesInDesiredFolder = await fs.readdir(`%root/logs/`);
//   console.log(filesInDesiredFolder);
//   return filesInDesiredFolder;
// }
