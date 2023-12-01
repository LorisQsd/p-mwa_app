export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="text-sm">
      <div
        role="separator"
        className="h-[2px] w-1/4 bg-white mx-auto rounded-full"
      />
      <ul className="flex justify-around items-center my-4 md:my-2">
        <li>À propos</li>
        <li>Contact</li>
        <li>
          <span className="text-center">Mentions</span>{" "}
          <span className="block text-center">Légales</span>
        </li>
      </ul>

      <p className="italic text-center text-xs mb-2">©{currentYear} P-MWA | Tous droits réservés</p>
    </footer>
  );
}
