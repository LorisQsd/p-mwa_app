import Image from "next/image";
import Link from "next/link";
// === SEMANTIC === //
import Footer from "./ui/semantic/footer";
import Logo from "./ui/logo";

export default function Home() {
  return (
    <>
      <header className="p-5 flex justify-end">
        <Logo to="/"/>
        <nav className="md:flex md:gap-4">
          <Link href={"/signin-signup"}>
            <button
              type="button"
              className="hidden md:block p-2 md:px-4 rounded-lg text-sm md:text-base duration-300 hover:bg-primary-400 hover:text-black hover:shadow-custom hover:scale-105"
            >
              S&apos;inscrire
            </button>
          </Link>
          <Link href={"/signin-signup"}>
            <button
              type="button"
              className="text-black bg-primary-400 p-2 md:px-4 rounded-lg text-sm md:text-base duration-300 hover:shadow-custom hover:scale-105"
            >
              Connexion
            </button>
          </Link>
        </nav>
      </header>

      <main className="grow px-5 flex flex-col justify-around my-14 lg:flex-row lg:gap-8 xl:px-32 xl:gap-32">
        <div>
          <h1 className="text-center md:text-3xl text-2xl md:mb-6 md:leading-[3rem] lg:text-start xl:text-4xl xl:leading-[4rem]">
            Suivre ses débiteurs n&apos;a jamais été aussi simple
          </h1>
          <Image
            src="/Dashboard.png"
            width={1080}
            height={460}
            className="hidden md:block rounded-lg w-3/4 mx-auto h-[250px] lg:h-[300px] xl:h-[400px] object-cover lg:w-full"
            alt="Portrait"
          />
        </div>

        <section className="md:flex md:flex-col md:mt-5 lg:justify-center">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="flex h-[50px] xl:h-[75px]">
              <Image
                src="/portrait01.avif"
                width={75}
                height={75}
                className="rounded-full h-full w-full aspect-square object-cover border-2 border-gray-300"
                alt="Portrait"
              />
              <Image
                src="/portrait02.avif"
                width={75}
                height={75}
                className="rounded-full h-full w-full aspect-square object-cover border-2 border-gray-300 -translate-x-4"
                alt="Portrait"
              />
              <Image
                src="/portrait03.avif"
                width={75}
                height={75}
                className="rounded-full h-full w-full aspect-square object-cover border-2 border-gray-300 -translate-x-8"
                alt="Portrait"
              />
            </div>

            <h2 className="text-sm md:text-base xl:text-xl">999k utilisateurs</h2>
          </div>
          <p className="my-6 text-center md:mb-0 lg:text-start xl:text-lg">
            Enregistrez, suivez, relancez vos débiteurs et débarrassez vous
            enfin des dettes qui vous sont dûes grâce à cette application
            intuitive.
          </p>
          <div className="flex flex-col gap-4 w-3/4 mx-auto">
            {/* Only visible if screen vw < 640px */}
            <button
              type="button"
              className="text-black bg-primary-400 p-2 rounded-lg text-sm md:hidden"
            >
              S&apos;inscrire
            </button>

            <button
              type="button"
              className="border-2 border-primary-400 p-2 rounded-lg text-sm md:text-base duration-300 hover:bg-primary-400 hover:text-black hover:shadow-custom hover:scale-105 md:mt-10 lg:mt-20"
            >
              Version d&apos;essai
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
