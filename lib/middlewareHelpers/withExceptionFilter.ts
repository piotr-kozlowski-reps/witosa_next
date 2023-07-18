import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withExceptionFilter(req: NextApiRequest, res: NextApiResponse) {
  return async function (handler: NextApiHandler) {
    //impl
    console.log('withExceptionFilter');
    return handler(req, res);
  };
}
