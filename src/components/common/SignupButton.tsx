interface SignupButtonProps {
  onClick?: () => void;
}

const SignupButton = ({ onClick }: SignupButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="border border-brown-600 bg-brown-600 text-white px-10 py-3 rounded-full hover:opacity-70 text-center cursor-pointer"
    >
      <button className="cursor-pointer">Sign up</button>
    </div>
  );
};

export default SignupButton;
