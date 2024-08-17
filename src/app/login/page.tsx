import Form from "./form";
import AuthProvider from "@/context/AuthContext";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <AuthProvider>
          <Form />
        </AuthProvider>
      </div>
    </div>
  );
}
