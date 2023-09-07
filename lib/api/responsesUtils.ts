// export function sendCustomResponseWithAllowOriginAndContentTypeJSON(
//   objectToBeSent: Object,
//   status: number
// ) {
//   return new NextResponse(JSON.stringify(objectToBeSent), {
//     status,
//     headers: {
//       'Access-Control-Allow-Origin': origin, //make it for Postman: origin || '*'
//       'Content-Type': 'application/json',
//     },
//   });
// }

export function stringifyObject(objectToBeSent: Object) {
  return JSON.stringify(objectToBeSent);
}

export function addStatusAndAllowOriginContent(
  status: number,
  origin: string | null
) {
  return {
    status,
    headers: {
      'Access-Control-Allow-Origin': origin || '', //make it for Postman: origin || '*'
      'Content-Type': 'application/json',
    },
  };
}
