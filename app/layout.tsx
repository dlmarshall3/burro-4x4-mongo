import { Provider } from "./provider";
import HeaderComponent from "../components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className="bg-[#dddad4] m-8 rounded-b-lg w-3/4">
          <HeaderComponent />
          <div className="bg-white p-8 bg-opacity-50 rounded-b-lg">
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
}
