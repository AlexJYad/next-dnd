"use client";

export default function Error({
   error,
   reset,
}: {
   error: Error;
   reset: () => void;
}) {
   return (
      <div className="flex flex-col items-center justify-center flex-1 w-full">
         <p>Что-то пошло не так</p>
         <button onClick={reset}>Попробовать снова</button>
      </div>
   );
}
