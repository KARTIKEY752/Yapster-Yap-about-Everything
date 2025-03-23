const AuthImagePattern = ({ title, subtitle, gifUrl }) => {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 text-center">
        {/* GIF on Top */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={gifUrl}
            alt="Authentication Illustration"
            className="w-3/4 max-w-lg h-auto rounded-xl shadow-lg"
          />
        </div>
  
        {/* Title & Subtitle Below */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60 text-lg">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  