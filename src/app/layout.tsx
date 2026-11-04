import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./intro.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Cursor } from "@/components/layout/Cursor";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { defaultLoader } from "@/content/design";
import { introBootScript } from "@/lib/intro-boot";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({
    description:
      "Mad & Mennesker er et nyt spisested på Slotspladsen i Randers med klassisk dansk mad, smørrebrød, stjerneskud og wienerschnitzel — og god tid til hinanden.",
    path: "/",
  }),
  applicationName: site.name,
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#173B30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introBootScript(defaultLoader) }} />
        <IntroLoader />
        <Providers>
          <Header />
          <main id="indhold">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
