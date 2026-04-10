// app/layout.tsx
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}