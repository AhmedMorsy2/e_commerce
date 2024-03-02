import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { cartContext } from "../../Context/CartContextProvider";

export default function MainNav() {
  let {
    counter,
    setCounter,
    getCart,
    setWishListCounter,
    wishListCounter,
    getWishList,
  } = useContext(cartContext);
  let token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      let data = await getCart();
      let list = await getWishList();
      setWishListCounter(list.count);
      setCounter(data.numOfCartItems);
    })();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid mx-3 py-2">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Categories">
                  Categories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/Brands">
                  Brands
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      to="/profile"
                    >
                      <i className="fa-solid fa-user me-1"></i> Profile
                    </NavLink>
                    <ul className="dropdown-menu  ">
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/users/updatepassword"
                        >
                          Change Password
                        </NavLink>
                      </li>
                     
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/signup"
                          onClick={() => localStorage.clear()}
                        >
                          SignOut{" "}
                          <i className="fa-solid fa-right-to-bracket"></i>
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="/Cart">
                      <i className="fa-solid fa-cart-shopping"></i> Cart
                      {counter ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main ">
                          {counter}
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link position-relative"
                      to="/wishlist"
                    >
                      <i className="fa-solid fa-heart"></i> Wishlist
                      {wishListCounter ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main ">
                          {wishListCounter}
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      SignIn <i className="fa-solid fa-door-open"></i>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
