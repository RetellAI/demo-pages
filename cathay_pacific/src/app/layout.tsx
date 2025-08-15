import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import Script from "next/script";
export const metadata: Metadata = {
  title: "Retell AI Demo | Cathay Pacific",
  description: "Retell AI Demo for Cathay Pacific",
  icons: {
    icon: '/Retell-mark-black.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ErrorReporter />{children}
  <VisualEditsMessenger />
</body>
    </html>
  );
}
