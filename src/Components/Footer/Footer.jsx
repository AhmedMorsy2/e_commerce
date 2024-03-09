import React from "react";
import appstore from "../../assets/images/appstore.png";
import googleplay from "../../assets/images/googleplay.png";
import paypal from "../../assets/images/paypal.png";
import mastercard from "../../assets/images/mastercard.png";
import amazonpay from "../../assets/images/amazonpay.png";
export default function Footer() {
  return (
    <>
      <div className="cotainer-flud">
        <div className="p-4 bg-body-tertiary">
          <div>
            <h3 className="fw-bold">Get the FreshCart App</h3>
            <p className="text-body-tertiary">
              We will send you a link, open it on your phone to download the app
            </p>
            <div className="row">
              <div className="col-md-9 col-lg-10">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="form-control"
                />
              </div>
              <div className="col-md-3 col-lg-2 footBtn">
                <button className="btn bg-main text-white w-100 text-center">
                  Share App Link
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-content-center">
            <div>
              <div className="payment d-flex">
                <h6 className="align-self-center">Patment Paretners</h6>
                <div className="ms-2">
                  <img src={amazonpay} alt="" className="footerpngs" />
                  <img src={paypal} alt="" className="footerpngs" />
                  <img src={mastercard} alt="" className="footerpngs" />
                </div>
              </div>
            </div>
            <div>
              <div className="apps d-flex">
                <h6 className="align-self-center">
                  Get deliveries with FreshCart
                </h6>
                <div>
                  <img src={appstore} alt="" className="footerpngs" />
                  <img src={googleplay} alt="" className="footerpngs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
