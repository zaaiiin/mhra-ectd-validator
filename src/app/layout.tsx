import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MHRA eCTD Validator",
  description: "Validate the administrative and structural completeness of UK MAA and Variation dossiers.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col m-0 p-0 bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
