import { getGodsGrouped } from "@/lib/gods";
import { GodCard } from "@/components/GodCard/GodCard";
import { ImageWithFallback } from "@/components/ImageWithFallback/ImageWithFallback";

const categoryTitles: Record<string, string> = {
   main: "Основной пантеон",
   additional: "Дополнительные божества",
   folk: "Местные и деревенские боги",
};

const categoryOrder = ["main", "additional", "pre-divine", "folk"];

export default async function LoreReligionPage() {
   const grouped = await getGodsGrouped();

   return (
      <div className="container flex flex-col flex-1 self-center w-m-xl">
         <h1>Религия</h1>
         <blockquote>
            <p>
               Молитва от шизофрении отличается только тем, кто с кем говорит.
            </p>
            <footer>Томас Сас</footer>
         </blockquote>
         <p>
            Боги не ходят по земле и вообще не особо являются простым смертным,
            да и непростым тоже. В мире всё ещё нет единой религии. И чем дальше
            от столицы, тем разнообразнее становятся пантеоны, по большей части
            добавляя различные местные мотивы. Всё это сплетается в сложный
            клубок верований, магии и сказаний. Как вы могли уже заметить, всё в
            мире делят на светлое и темное (доброе и злое, свое и чужое), богов
            эта чаша тоже не миновала.
         </p>
         <p>
            Основная и насаждаемая светом религия носит название в честь богини
            жизни Альтер — альтерианство.
         </p>
         <hr />

         {categoryOrder
            .filter((cat) => grouped[cat]?.length)
            .map((category) => (
               <section key={category}>
                  <h2>{categoryTitles[category]}</h2>
                  {grouped[category].map((god, i) => (
                     <GodCard key={god.id} god={god} reverse={i % 2 === 1} />
                  ))}
               </section>
            ))}

         <hr />
         <p className="l">Также выделяют предбожественных сущностей:</p>
         <ul className="footnote">
            <li>
               <span className="white text-outline">Сути-я-тумы</span> —
               порождения света, несущие в себе проявления истинного магического
               величия (скорее блуждающие огни, чем ангелы, но зависит от
               региона)
            </li>
            <li className="dark">
               <span className="black">Тени</span> — безликие
               существа,порождения тьмы (по-нашему демоны)
            </li>
         </ul>
         <hr />
         <ImageWithFallback
            src={
               "https://mmwmxohfqbjnywsupfgh.supabase.co/storage/v1/object/public/img/main_8.png"
            }
            alt={``}
            fallbackSrc="/images/placeholder.png"
            className="img-primary"
         />
         <hr />
         <p>
            Ну и во всяких деревушках бывают свои темные боги топей, светлые
            боги озер и рек, лешие да домовые, и прочее, прочее, прочее… Тут уже
            кто во что горазд. На севере много богов, связанных с зимой и
            холодом, на юге — с виноделием и пустыней. Чаще всего светлые храмы,
            святилища и алтари представляют собой смесь христианской церкви с
            языческими идолами. В южных городах в храмах альтерианской церкви
            при входе стоят идолы бога моря и мореходства Авинтуры, рядом с ним
            покровитель виноделия — Вантуран. В северных, нередко деревянных,
            церквях можно найти изображения матушки Теплой Зимы. Только в
            столице центральный храм полностью посвящен Альтер и её милосердию.
         </p>
         <hr />
      </div>
   );
}
