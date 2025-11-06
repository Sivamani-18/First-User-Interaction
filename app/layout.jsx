import "./globals.css";
import InteractionListener from "./components/InteractionListener";

export const metadata = {
  title: "First User Interaction Demo",
  description: "Demo of global first user interaction tracking across tabs in Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <InteractionListener>{children}</InteractionListener>
      </body>
    </html>
  );
}
