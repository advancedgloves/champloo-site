import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://champloo.ai"),
  title: {
    default: "champloo.ai — Custom AI Systems for Regulated Industries",
    template: "%s | champloo.ai",
  },
  description:
    "We mix custom AI into your existing operations — trained on your data, running on your hardware. Built for mortgage, legal, healthcare, and production businesses in Salt Lake City.",
  keywords: [
    "AI consulting Salt Lake City",
    "local AI deployment",
    "on-premise AI",
    "mortgage AI automation",
    "AI lead qualification",
    "HIPAA compliant AI",
    "AI for small business",
    "fine-tuned AI models",
    "regulated industry AI",
    "production management software",
    "AI contract generation",
    "Freddie Mac AI governance",
    "local LLM deployment",
    "business process AI optimization",
  ],
  authors: [{ name: "champloo.ai" }],
  creator: "champloo.ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://champloo.ai",
    siteName: "champloo.ai",
    title: "champloo.ai — AI That Fits How You Already Work",
    description:
      "Custom AI systems mixed into your existing operations. Deployed on your hardware. Trained on your data. Built for regulated industries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "champloo.ai — Custom AI for regulated industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "champloo.ai — AI That Fits How You Already Work",
    description:
      "Custom AI systems mixed into your existing operations. Deployed on your hardware. Built for regulated industries in Salt Lake City.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://champloo.ai",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
