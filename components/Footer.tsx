import { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <footer className="text-center p-4 bg-orange-400">
      <p>
        &copy; 2023 SolidFundr - Created by{" "}
        <a
          className="underline font-bold"
          href="https://linktr.ee/falconandrea"
          title="My links"
          target="_blank"
          rel="noreferrer"
        >
          Falcon Andrea
        </a>
      </p>
    </footer>
  );
};
export default Footer;
