import type { Metadata } from "next";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import SessionProvider from "../components/SessionProvider";

export const metadata: Metadata = {
  title: "Pin-Map",
  description: "Pin any location!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <SessionProvider>{children}</SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
