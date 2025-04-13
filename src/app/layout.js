import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor'; // ← Lägg till detta

export const metadata = {
  title: 'Gustav Wickström',
  description: 'Portfolio by Gustav Wickström',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className="bg-background text-foreground text-base">
        <CustomCursor />

        <div className="px-4 py-8 lg:px-14 xl:px-20">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
