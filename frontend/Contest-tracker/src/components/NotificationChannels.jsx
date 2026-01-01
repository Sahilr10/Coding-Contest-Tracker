// NotificationChannels.jsx
import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition relative ${
      enabled ? "bg-purple-600" : "bg-white/20"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
        enabled ? "right-0.5" : "left-0.5"
      }`}
    />
  </button>
);

const NotificationChannels = () => {
  const [email, setEmail] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1224] p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        Notification Channels
      </h3>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-white/80">
          <Mail size={16} /> Email Notifications
        </div>
        <Toggle enabled={email} onChange={() => setEmail(!email)} />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white/80">
          <MessageSquare size={16} /> WhatsApp Notifications
        </div>
        <Toggle
          enabled={whatsapp}
          onChange={() => setWhatsapp(!whatsapp)}
        />
      </div>
    </div>
  );
};

export default NotificationChannels;
