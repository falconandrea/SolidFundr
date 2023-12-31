/**
 * Renders the footer component.
 *
 * @return {JSX.Element} The footer component.
 */
const Footer = () => {
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
