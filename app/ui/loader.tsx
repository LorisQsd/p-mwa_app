import Image from "next/image";
import LoaderSVG from "../../public/loader-spin.svg";

type LoaderProps = {
  minWidth: number;
  maxWidth: number;
};

// The minWidth & maxWidht are important to set because it gives us a total control of the loader dimensions and we will reduce as much as possible the CLS (Cumulative Layout Shift)
export default function Loader({ minWidth, maxWidth }: LoaderProps) {
  return (
    <Image
      src={LoaderSVG}
      alt="Loader"
      width={25}
      height={25}
      className={`w-[${minWidth}px] md:w-[${maxWidth}px] aspect-square block m-auto`}
    />
  );
}
