import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, Clock, Download } from "lucide-react";

export default function Contact() {
  const email = "tanner.galambas@gmail.com";
  const mailto = `mailto:${email}?subject=Project%20Inquiry&body=Hi%20Tanner,%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20project.%0D%0AProject%20Type:%20%0D%0ATimeline:%20%0D%0ABudget:%20%0D%0A%0D%0AThanks!`;
  const formId = import.meta.env.VITE_FORMSPREE_ID || "mjkedkpp";
  const [state, handleSubmit] = useForm(formId);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold dark:text-white mb-6">Let's Work Together</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto mb-6" />
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl text-left bg-[#1e293b] rounded-2xl p-6 shadow">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-slate-300">First Name</label>
              <input id="firstName" name="firstName" autoComplete="given-name" required className="mt-1 w-full rounded-md bg-slate-800/70 px-3 py-2 text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-slate-300">Last Name</label>
              <input id="lastName" name="lastName" autoComplete="family-name" required className="mt-1 w-full rounded-md bg-slate-800/70 px-3 py-2 text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-slate-300">Email</label>
              <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md bg-slate-800/70 px-3 py-2 text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="projectType" className="block text-sm text-slate-300">Project Type</label>
            <select id="projectType" name="projectType" required className="mt-1 w-full rounded-md bg-slate-800/70 px-3 py-2 text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a project type</option>
              <option>Web Development</option>
              <option>Design</option>
              <option>Consultation</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm text-slate-300">Message</label>
            <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-md bg-slate-800/70 px-3 py-2 text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="consent" value="yes" required className="h-4 w-4 rounded border border-white/20 bg-slate-800/70 text-blue-600 focus:ring-blue-500" />
              I agree to be contacted about this project.
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button type="submit" disabled={state.submitting} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50">
              {state.submitting ? 'Sending…' : state.succeeded ? 'Sent!' : 'Send Message'}
            </button>
            <div className="flex gap-3 justify-center">
              <a href={mailto} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"><Mail className="h-4 w-4" />Email</a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"><Download className="h-4 w-4" />Resume</a>
            </div>
          </div>
          {state.succeeded && (
            <p className="mt-3 text-sm text-emerald-300">Thanks! Your message was sent.</p>
          )}
        </form>

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
