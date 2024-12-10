import Head from "next/head";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // Optional: for CSS variables
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
      <meta name="PokeIndex" content="The Definite Pokemon Index" />
    </Head>
      <body
        className={`${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
