
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Provider from '../Provider';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Kamalaya',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kamalaya</title>
      </head>
      <Provider session={session}>
        <body>
          <Sidebar />
          {children}
        </body>
      </Provider>
    </html>
  );
}

// https://www.youtube.com/watch?v=KpGZjrrS3pY
