import { terms } from "@/constant/terms";

export default function Terms() {
  const { para, lastPara, items } = terms;
  return (
    <div className="container">
      <h1 className="text-xl capitalize font-medium border-b my-8 py-1">
        terms and service
      </h1>
      <div className="sm:w-[80%] pb-10">
        <p className="mb-4">{para}</p>
        <ul className="py-2">
          {items.map((item, id) => (
            <li key={id} className="my-2">
              <span className="font-bold pr-2">{item.title}</span>:{item.text}
            </li>
          ))}
        </ul>
        <p>{lastPara}</p>
      </div>
    </div>
  );
}
