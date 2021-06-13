import { CFL } from "../helpers/utils";

const Nav = props => { 
  return(
    <nav className="nav">
      <div className="nav__img">
        <img src={props.store ? props.store.logo_url : "/storeLogo.svg"} alt="store-logo" />
      </div>
      <h1 style={{ textTransform: "capitalize" }}>{props && props.store.name}</h1>
      <p>{props && CFL(props.store.description)}</p>

      <div className="nav__divider">&nbsp;</div>
    </nav>
  )
}

export default Nav;
