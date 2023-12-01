export default function Footer() {
  return (
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
  );
}
