import HeroMessage from "@/components/icons/HeroMessage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid sm:grid-cols-2 gap-8 py-14 container">
      <div>
        <h1 className="capitalize leading-10">
          <span className="text-primary text-3xl font-bold">real chat</span>
          <span className="text-2xl font-medium ml-2.5">
            Is an{" "}
            <span className="hidden sm:inline">
              -<br />
            </span>{" "}
            Real <br className="block sm:hidden" /> time communication medium
          </span>
        </h1>
        <p className="mt-8 pb-4">
          Welcome to Real Chat, where seamless communication meets real-time
          interaction without the need for traditional phone calls. Real Chat
          revolutionizes the way you connect with friends, family, and
          colleagues, offering a dynamic platform for instant messaging akin to
          leading applications like Messenger.
        </p>
        <p className="pb-10">
          Our platform prioritizes simplicity and efficiency, allowing you to
          engage in meaningful conversations with ease. Whether you're sharing
          updates, coordinating plans, or simply catching up, Real Chat provides
          a streamlined experience that keeps you connected at all times.
        </p>
        <Link to="/chat">
          <Button className="capitalize">join the chat</Button>
        </Link>
      </div>
      <HeroMessage />
    </div>
  );
}
