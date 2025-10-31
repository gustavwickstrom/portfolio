import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoaderOverlay from "@/components/LoaderOverlay"; // 👈 importera här

export const metadata = {
  title: "Gustav Wickström",
  description: "Portfolio by Gustav Wickström",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className="bg-background text-foreground">
        {/* Loader overlay visas först vid varje reload */}
        <LoaderOverlay />

        {/* Global container */}
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <Header />
          <main className="py-6 sm:py-8 lg:py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
