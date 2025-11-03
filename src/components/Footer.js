import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer className="mt-4 text-center">
        FPS JOB © 2015–25 | Crafted by
        <Link to="/" className="text-decoration-none">
          Team Tallento.ai
        </Link>
      </footer>
    </>
  );
}

export default Footer;
