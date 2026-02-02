import React from "react";
import { openingHours, socials } from "../constants";

const Contact = () => {
  return (
    <footer id="contact">
      <div className="content">
        <h2>Where to Find Us</h2>

        <div className="">
          <h3>Visit Our Store</h3>
          <p>456, Raq Blvd, #404, Los Angeles, CA 90210</p>
        </div>

        <div className="">
          <h3>Contact us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} :{time.time}
            </p>
          ))}
        </div>

        <div className="">
          <h3>Socials</h3>

          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
