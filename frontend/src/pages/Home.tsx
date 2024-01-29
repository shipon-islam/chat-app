import HeroMessage from "@/components/icons/HeroMessage";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid sm:grid-cols-2 gap-8 py-14 container">
      <div>
        <h1 className="capitalize font-bold text-2xl leading-10">
          <span className="text-primary text-3xl">real-chat</span> is an -
          <br />
          real time communication medium
        </h1>
        <p className="mt-8 pb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          delectus unde perspiciatis atque earum maxime distinctio excepturi
          optio repellendus. Dicta, labore a? Ad, dicta, optio quae dolor ipsum
          error autem voluptatibus placeat harum minus, numquam deserunt omnis
          dolorem corporis commodi. Ad sequi facilis iure dolores architecto
          harum maiores dignissimos nam.
        </p>
        <Button className="capitalize">join the chat</Button>
      </div>
      <HeroMessage />
    </div>
  );
}
