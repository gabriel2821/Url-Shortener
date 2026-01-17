import { useState, useEffect } from "react";
import { shortenUrl } from "../api/url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { HistoryList, ResultCard, FeatureGrid } from "@/components/Shortener";

interface HistoryItem {
  original_url: string;
  short_url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  //load history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("url_history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);


  //Form submit
  const handleSubmit = async () => {

    if (!url) return toast.error("Please enter a URL");

    setLoading(true);
    try {
      const data = await shortenUrl(url);
      setShortUrl(data.short_url);

      const updatedHistory = [
        { original_url: url, short_url: data.short_url },
        ...history,
      ].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("url_history", JSON.stringify(updatedHistory));

      toast.success("Link shortened!");
      setUrl("");
    } catch (err) {
      toast.error("Failed to shorten link");
    } finally {
      setLoading(false);
    }
  };

  //copy url to clipboard
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white flex flex-col items-center px-4 pt-20 pb-20">
      <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <Link2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Shorten your <span className="text-blue-600">Links</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-lg mx-auto">
          Create short links in seconds.
        </p>
      </div>

      <Card className="w-full max-w-2xl border-none shadow-2xl bg-white/80 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="Paste link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-14 pl-4 text-lg rounded-xl"
            />
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Shorten Now"
              )}

              {loading && <span className="ml-2">Processing</span>}
            </Button>
          </div>

          {shortUrl && (
            <ResultCard
              shortUrl={shortUrl}
              originalUrl={history[0]?.original_url}
              onCopy={handleCopy}
            />
          )}
        </CardContent>
      </Card>

      <HistoryList
        items={history}
        onClear={() => {
          setHistory([]);
          localStorage.removeItem("url_history");
        }}
        onCopy={handleCopy}
      />

      <FeatureGrid />
    </div>
  );
}
