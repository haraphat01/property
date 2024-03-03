const SignUpLogInPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <header className="text-4xl font-bold mb-8">Welcome Back!</header>
        {/* Sign-up and log-in forms can be added here */}
        <footer className="mt-8">
          <nav className="flex flex-col items-center justify-center space-x-4">
            <a href="#" className="text-white hover:text-gray-300">Already have an account? Log in here.</a>
            <a href="#" className="text-white hover:text-gray-300">New user? Sign up now.</a>
          </nav>
          {/* Social media icons can be added here */}
        </footer>
      </div>
    );
  };
  
  export default SignUpLogInPage;