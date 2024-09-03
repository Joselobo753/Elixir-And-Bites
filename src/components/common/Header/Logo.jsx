import { Link } from "react-router-dom";

const Logo = () => {
  return (
 
    <div className="position-relative text-center p-3">
        <Link className="navbar-brand" to="/">
        <img 
          src="/potion.svg"
            
          alt="logo del local" 
          className="mx-auto d-block potion"
        />
        <h1 className="mt-3 h1-titulo-enfasis">Elixir & Bites</h1>
        </Link>

          
      </div>
   
  );
}
export default Logo;