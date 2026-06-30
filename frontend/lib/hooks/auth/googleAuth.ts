export const useGoogleAuth = () => {
  const handleGoogleLogin = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`
    window.location.href = url
  };

  return { handleGoogleLogin };
};
