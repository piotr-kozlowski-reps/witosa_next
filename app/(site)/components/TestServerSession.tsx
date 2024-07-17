import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';

export default async function TestServerSession() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h1>Session data</h1>
      <pre>{JSON.stringify(session)}</pre>
    </section>
  );
}
