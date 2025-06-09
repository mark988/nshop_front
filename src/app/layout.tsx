import MaterialUIProvider from '@/providers/MaterialUIProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata = {
  title: 'NShop - Your Premium Home Furnishing Store',
  description: 'Discover curated collections of furniture and decor to transform your living space.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MaterialUIProvider>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </MaterialUIProvider>
      </body>
    </html>
  );
}
