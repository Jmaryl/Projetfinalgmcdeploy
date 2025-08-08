import { useState } from "react";
import { Mail, Send } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`; // Change si nécessaire

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Veuillez entrer votre e-mail.");

    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/api/user/forgot-password`, { email });
      toast.success(data.message || "Un lien de réinitialisation a été envoyé.");
      setEmail("");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
        <ToastContainer position="top-center" autoClose={3000} />
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Mot de passe oublié ?</h2>
        <p className="text-gray-500 text-sm mt-1">Entrez votre e-mail pour recevoir un lien de réinitialisation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-purple-100 rounded-lg px-3 py-2">
          <Mail className="text-purple-500 w-5 h-5 mr-2" />
          <input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none text-sm text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : (
            <>
              <Send className="w-4 h-4" /> Envoyer le lien
            </>
          )}
        </button>
      </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
