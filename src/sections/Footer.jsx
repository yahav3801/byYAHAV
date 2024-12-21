const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between mt-40 items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        <a href="https://github.com/yahav3801" target="_blank" rel="noreferrer">
          <button className="social-icon">
            <img
              src="/assets/github.svg"
              alt="github"
              className="w-1/2 h-1/2"
            />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/yahav-ben-harush-92652430b/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="social-icon">
            <img
              src="/assets/linkedin.png"
              alt="twitter"
              className="w-1/2 h-1/2"
            />
          </div>
        </a>
        <a
          href="https://www.instagram.com/yahav_bh/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="social-icon">
            <img
              src="/assets/instagram.svg"
              alt="instagram"
              className="w-1/2 h-1/2"
            />
          </div>
        </a>
      </div>

      <p className="text-white-500">
        © 2024 Yahav Ben Harush. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
