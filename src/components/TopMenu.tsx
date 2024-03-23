import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-30 border-b border-gray-300 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/img/logo.jpg"
          className="h-12 w-auto mr-4"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
        <div className="flex space-x-4">
          <TopMenuItem title="Select Hotel" pageRef="/hotel" />
          <TopMenuItem title="Booking" pageRef="/bookings" />
          <TopMenuItem title="About" pageRef="/about" />
        </div>
      </div>
      <div className="flex items-center">
        {session ? (
          <Link href="/api/auth/signout">
            <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
              Sign-Out of {session.user?.name}
            </div>
          </Link>
        ) : (
          <Link href="api/auth/signin">
            <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
              Sign-In
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}