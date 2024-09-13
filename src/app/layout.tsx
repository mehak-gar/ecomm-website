/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
'use client';
import store  from "@/store";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
// import { store } from "./client-entry";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "E-Shop",
//   description: "Ecommmerce Website",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<head> 
      <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
</head>
      <body className={inter.className}>      <Provider store={store}>{children}    </Provider>
      <script type="text/javascript" src="js/materialize.min.js"></script> </body>
 
    </html>
  );
}
