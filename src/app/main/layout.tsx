import Header from "@/components/Header/Header";

export default function MainLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <Header user={undefined} />
         <div className="flex flex-col flex-1 items-center justify-center w-full">
            <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between bg-white/80 dark:bg-black/80 sm:items-start shadow-lg shadow-gray-600 dark:shadow-gray-900 py-8 px-20">
               {children}
            </main>
         </div>
      </>
   );
}
