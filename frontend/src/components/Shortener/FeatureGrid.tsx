import { Zap, Shield, Globe } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      icon: <Zap className="text-blue-600 w-6 h-6" />,
      title: "Instant Redirect",
      desc: "No waiting screens or ads.",
    },
    {
      icon: <Shield className="text-blue-600 w-6 h-6" />,
      title: "Secure Links",
      desc: "Every link is encrypted.",
    },
    {
      icon: <Globe className="text-blue-600 w-6 h-6" />,
      title: "Reliable Uptime",
      desc: "Powered by PostgreSQL.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full text-center">
      {features.map((f, i) => (
        <div key={i} className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
            {f.icon}
          </div>
          <h3 className="font-bold text-slate-900">{f.title}</h3>
          <p className="text-slate-500 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
