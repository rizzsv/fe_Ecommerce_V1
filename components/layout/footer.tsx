const Footer = () => {
  const FOOTER_ITEMS = [
    { name: "Support Center", path: "/support-center" },
    { name: "Invoicing", path: "/invoicing" },
    { name: "Contract", path: "/contract" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ,s", path: "/faq" },
  ];
  return (
    <footer className="container pb-[18px]">
      <div className="flex justify-between items-center pb-[50px]">
        <h1 className="font-spaceGrotesk text-[32px] font-normal leading-[100%] tracking-normal">
          FASCO
        </h1>

        <ul className="flex space-x-[38px]">
          {FOOTER_ITEMS.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="font-normal text-base leading-[100%]"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="flex justify-center text-xs font-normal leading-[26px] tracking-normal">
        Copyright © 2025 Xpro. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
