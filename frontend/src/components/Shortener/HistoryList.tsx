import { useState } from "react";
import { Button } from "@/components/ui/button";
import { History, Trash2, Copy } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryItem {
  original_url: string;
  short_url: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  onClear: () => void;
  onCopy: (url: string) => void;
}

export function HistoryList({ items, onClear, onCopy }: HistoryListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-4 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-2 w-full">
        <h3 className="flex items-center gap-2 font-bold text-slate-700">
          <History className="w-4 h-4" /> Recent Links
        </h3>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Clear History
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Clear History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all history? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onClear();
                  setIsOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600"
              >
                Clear
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-blue-300 transition-all w-full text-left"
          >
            <div className="min-w-0 flex-1 pr-4">
              <p className="font-semibold text-blue-600 truncate">
                {item.short_url}
              </p>
              <p className="text-xs text-slate-400 truncate max-w-[250px] sm:max-w-md">
                {item.original_url}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopy(item.short_url)}
              className="h-9 w-9 shrink-0 ml-4 hover:bg-blue-50"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
