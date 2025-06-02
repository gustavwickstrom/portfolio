import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Gustav Wickström',
  description: 'Portfolio by Gustav Wickström',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className="bg-background text-foreground text-base">
        <div className="px-4 py-2 lg:px-8">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
