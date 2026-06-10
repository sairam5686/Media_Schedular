import React from "react";
import { CheckCircle2, Link as LinkIcon } from "lucide-react";

interface SocialCardProps {
  icon: React.ReactNode;
  name: string;
  platform: string;
  status?: "Connected" | "Disconnected";
}

const SocialCard = ({
  icon,
  name,
  platform,
  status = "Connected",
}: SocialCardProps) => {
  return (
    <div className="w-90 flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
          {icon}
        </div>

        <div>
          <h3 className="font-medium text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{platform}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-sm text-green-600">
          <CheckCircle2 size={16} />
          <span>{status}</span>
        </div>

        <LinkIcon
          size={16}
          className="cursor-pointer text-slate-400 hover:text-slate-600"
        />
      </div>
    </div>
  );
};

export default SocialCard;