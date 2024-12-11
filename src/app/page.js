import Image from "next/image";
import Button from "./components/Button";

export default function Home() {

  return (
    <div className="">
      hello world

      <div className="flex flex-row flex-wrap gap-2">
        <Button data={'test'}>Knapp 1</Button>
        <Button data={'test'}>Knapp 2</Button>
      </div>  

    </div>
  );
}
