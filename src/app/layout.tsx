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
      <body>
        <MaterialUIProvider>
          <Header />
          {/* 只包main内容，头部和footer不变 */}
          <div className="app-content-container">
            <main>
              {children}
            </main>
          </div>
          <Footer />
        </MaterialUIProvider>
      </body>
    </html>
  );
}