import type { Metadata } from "next";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Provider from "../components/sessionProvider";

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
          <Provider>{children}</Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
