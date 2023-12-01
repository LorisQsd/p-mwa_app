import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="p-5 flex justify-between">
        <Image src="/logo.svg" width={60} height={40} alt="Logo" />
        <div className="md:flex md:gap-4">
          <button
            type="button"
            className="hidden md:block p-2 rounded-lg text-sm md:text-base duration-300 hover:bg-primary-400 hover:text-black hover:shadow-custom hover:scale-105"
          >
            S&apos;inscrire
          </button>
          <Link href={"/signin-signup"}>
            <button
              type="button"
              className="text-black bg-primary-400 p-2 rounded-lg text-sm md:text-base duration-300 hover:shadow-custom hover:scale-105"
            >
              Connexion
            </button>
          </Link>
        </div>
      </header>
      <main className="grow px-5 flex flex-col md:flex-row md:gap-10 justify-around my-14">
        <div>
          <h1 className="text-center md:text-left md:text-3xl text-2xl md:mb-6 md:leading-[3rem]">
            Suivre ses débiteurs n&apos;a jamais été aussi simple
          </h1>
          <Image
            src="/Dashboard.png"
            width={1080}
            height={460}
            className="hidden md:block rounded-lg w-[900px] h-[250px] object-cover"
            alt="Portrait"
          />
        </div>
        <section>
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex">
              <Image
                src="/portrait01.avif"
                width={50}
                height={50}
                className="rounded-full w-[50px] aspect-square object-cover border-2 border-gray-300"
                alt="Portrait"
              />
              <Image
                src="/portrait02.avif"
                width={50}
                height={50}
                className="rounded-full w-[50px] aspect-square object-cover border-2 border-gray-300 -translate-x-4"
                alt="Portrait"
              />
              <Image
                src="/portrait03.avif"
                width={50}
                height={50}
                className="rounded-full w-[50px] aspect-square object-cover border-2 border-gray-300 -translate-x-8"
                alt="Portrait"
              />
            </div>

            <h2 className="text-sm">999k utilisateurs</h2>
          </div>
          <p className="my-6">
            Enregistrez, suivez, relancez vos débiteurs et débarrassez vous
            enfin des dettes qui vous sont dûes grâce à cette application
            intuitive.
          </p>
          <div className="flex flex-col gap-4 w-3/4 mx-auto">
            <button
              type="button"
              className="text-black bg-primary-400 p-2 rounded-lg text-sm md:hidden"
            >
              S&apos;inscrire
            </button>

            <button
              type="button"
              className="border-2 border-primary-400 p-2 rounded-lg text-sm duration-300 hover:bg-primary-400 hover:text-black hover:shadow-custom hover:scale-105"
            >
              Version d&apos;essai
            </button>
          </div>
        </section>
      </main>
      <footer className="text-sm">
        <div
          role="separator"
          className="h-[2px] w-1/4 bg-white mx-auto rounded-full"
        />
        <ul className="flex justify-around items-center my-4">
          <li>À propos</li>
          <li>Contact</li>
          <li>
            <span className="text-center">Mentions</span>{" "}
            <span className="block text-center">Légales</span>
          </li>
        </ul>
      </footer>
    </>
  );
}
