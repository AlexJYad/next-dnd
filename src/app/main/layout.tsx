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
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between bg-white/70 dark:bg-black/70 sm:items-start shadow-lg shadow-black-600 dark:shadow-black-600 p-4 sm:p-6 lg:p-8">
               {children}
            </main>
         </div>
      </>
   );
}
