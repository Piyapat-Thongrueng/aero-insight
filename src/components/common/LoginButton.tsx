interface LoginButtonProps {
  onClick: () => void;
}
const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <div onClick={onClick} className="border border-brown-400 bg-white text-brown-600 px-10 py-3 rounded-full hover:opacity-70 text-center cursor-pointer">
      <button className="cursor-pointer">Login</button>
    </div>
  );
};

export default LoginButton;
