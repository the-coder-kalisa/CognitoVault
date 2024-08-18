const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={"/logo.png"} className="w-8" />
      <div className="text-white text-xl">CognitoVault</div>
    </div>
  );
};

export default Logo;
