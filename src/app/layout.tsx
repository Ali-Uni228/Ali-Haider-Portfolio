import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
  metadataBase: new URL("https://ali-haider-portfolio-livid.vercel.app"),
  title: "Ali Haider — Software Engineering & AI Portfolio",
  description:
    "Ali Haider — BS Artificial Intelligence student and software engineer. Builder of JARVIS, a local AI operating system, and DeathLeade Network, a full-stack Minecraft storefront. Looking for software engineering internships.",
  icons: {
    icon: [
      { url: "/assets/ali/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/ali/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/ali/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "Ali Haider — Software Engineering & AI",
    description:
      "Builder of JARVIS (a local AI operating system) and DeathLeade Network (a full-stack Minecraft storefront). Looking for software engineering internships.",
    images: ["/assets/ali/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Haider — Software Engineering & AI",
    description: "Builder of JARVIS and DeathLeade Network. Looking for software engineering internships.",
    images: ["/assets/ali/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ali Haider",
              jobTitle: "BS Artificial Intelligence Student",
              description:
                "Software engineering and AI internship candidate. Builder of JARVIS and DeathLeade Network.",
              email: "mailto:punjabali.bokhari2006@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/ali-haider-air/",
                "https://github.com/Ali-Uni228",
              ],
            }),
          }}
        />
      </head>
      <body>
        <RefreshRedirect />
        {children}
        </body>
    </html>
  );
}
