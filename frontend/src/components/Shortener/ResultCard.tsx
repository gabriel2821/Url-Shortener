import { Button } from "@/components/ui/button";
import { Globe, Copy } from "lucide-react";

interface ResultCardProps {
  shortUrl: string;
  originalUrl: string;
  onCopy: (url: string) => void;
}

export function ResultCard({ shortUrl, originalUrl, onCopy }: ResultCardProps) {
  return (
    <div className="mt-8 p-0 rounded-xl bg-white border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-500 overflow-hidden text-left">
      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 overflow-hidden flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Link Generated
            </span>
            <div className="flex flex-col">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-2xl font-semibold text-blue-600 hover:underline truncate"
              >
                {shortUrl}
              </a>
              <p className="text-sm text-slate-400 truncate mt-1">
                Original: {originalUrl}
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={() => window.open(shortUrl, "_blank")}
              className="flex-1 sm:flex-none text-slate-600 border border-slate-100"
            >
              <Globe className="w-4 h-4 mr-2" /> Visit
            </Button>
            <Button
              onClick={() => onCopy(shortUrl)}
              className="flex-1 sm:flex-none bg-blue-600 text-white"
            >
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
