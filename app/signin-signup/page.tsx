import Logo from "../ui/logo";
import Footer from "../ui/semantic/footer";

export default function Page() {
  return (
    <>
      <Logo to="/" />
      <main className="grow items-center flex px-2">
        <div className="rounded-lg bg-white mx-auto text-black py-10 px-4">
          <h1 className="text-center mb-5 text-xl">Connectez-vous</h1>

          <div className="flex gap-5">
            <button type="button">Connexion</button>
            <button type="button">Inscription</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
