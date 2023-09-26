import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FantasyFootball',
  description: 'FantasyFootball app',
}

export default function DashboardLayout({children}) {
  return (
      <html>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </html>
  );
}

