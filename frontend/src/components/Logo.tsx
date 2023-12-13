import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} className="w-8" />
      {/* <div className="text-white text-xl">CognitoVault</div> */}
    </div>
  );
};

export default Logo;
