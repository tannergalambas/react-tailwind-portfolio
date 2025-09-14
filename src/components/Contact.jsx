import { Mail, MapPin, Clock, Download } from "lucide-react";

export default function Contact() {
  const email = "tanner.galambas@gmail.com";
  const mailto = `mailto:${email}?subject=Project%20Inquiry&body=Hi%20Tanner,%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20project.%0D%0AProject%20Type:%20%0D%0ATimeline:%20%0D%0ABudget:%20%0D%0A%0D%0AThanks!`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(email);
    } catch {}
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold dark:text-white mb-6">Let's Work Together</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto mb-6" />
        

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
          >
            <Mail className="h-4 w-4" /> Email Me
          </a>
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
          >
            <Download className="h-4 w-4" /> Resume (PDF)
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            type="button"
          >
            Copy Email
          </button>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#1e293b] rounded-2xl p-6 text-white">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mb-3">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <div className="font-semibold">Email</div>
            <a className="text-blue-300 hover:text-blue-200 text-sm" href={mailto}>{email}</a>
          </div>
          <div className="bg-[#1e293b] rounded-2xl p-6 text-white">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-3">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="font-semibold">Location</div>
            <div className="text-gray-300">Austin, Texas</div>
          </div>
          <div className="bg-[#1e293b] rounded-2xl p-6 text-white">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div className="font-semibold">Response Time</div>
            <div className="text-gray-300">Usually within 24 hours</div>
          </div>
        </div>

        {/* Social buttons removed per request */}
      </div>
    </section>
  );
}
