import { Anton, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Hitesh H | Software, AI & Security Engineer",
  description:
    "Portfolio of Hitesh H, a Computer Science engineering student building smart, scalable and secure software. Full-stack, AI and cybersecurity.",
  openGraph: {
    title: "Hitesh H | Software, AI & Security Engineer",
    description: "Engineering software that's smart, scalable and secure.",
    type: "website",
  },
};

export const viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
