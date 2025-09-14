import { Link } from "react-router-dom";
import "../css/NavBar.css"

function NavBar() {
    return <nav className="navbar">
       <Link to="/">
  <img src="/KITE.jpg" alt="KITE" className="navbar-logo" />
</Link>




<div class="menu">
  <div class="item">
    <a href="#" class="link">
      <span> Discover </span>
      <svg viewBox="0 0 360 360" xml:space="preserve">
        <g id="SVGRepo_iconCarrier">
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          ></path>
        </g>
      </svg>
    </a>
    <div class="submenu">
      <div class="submenu-item">
          <div class="submenu-item">
        <Link to="/" class="submenu-link"> Home </Link>
      </div>
        <Link to="../pages/Artist" class="submenu-link"> Artist </Link>
        
      </div>
    
      <div class="submenu-item">
       <a href="https://saavn.dev/" 
       target="_blank" 
       rel="noopener noreferrer"
       class="submenu-link"> Api info </a>
      </div>
      <div class="submenu-item">
       <Link to="../pages/Contact" class="submenu-link"> Developer </Link>
      </div>
    </div>
  </div>
</div>


    </nav>
}

export default NavBar