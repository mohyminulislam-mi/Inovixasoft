import { Inter, DM_Sans, Syne } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ChatWidget from '@/components/ChatWidget';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'ScalexDevs | Elite Software Engineering Agency',
  description: 'Expert software agency helping startups and enterprises scale with cutting-edge web, mobile, and AI solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-body selection:bg-brand-blue/30 overflow-x-hidden relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor />
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="dark:block hidden absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
            <div className="dark:block hidden absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
