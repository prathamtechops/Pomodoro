import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <section className="flex h-full items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default RootLayout;
