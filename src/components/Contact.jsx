import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Clock, Download, Github, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine(val => val, "Consent is required"),
});

export default function Contact() {
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { consent, ...emailData } = data;

      await emailjs.send(
        "service_hl5nevp",
        "template_z0h6or3",
        {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          project_type: data.projectType,
          message: data.message,
        },
        "v3z2DNYWQV7NbXhz_"
      );

      setIsSubmitted(true);
      reset();
    } catch (err) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-white">Message Sent!</h2>
        <p className="text-muted-foreground mt-2">Thank you — I'll get back to you within 24 hours.</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600"
        >
          Send Another
        </Button>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white mb-4">Let's Work Together</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto mb-8"></div>
          <p className="text-lg text-white">
            Ready to bring your ideas to life? Let's chat about your next project.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  {...register("firstName")}
                  className={`w-full rounded-md px-3 py-2 ${
                    errors.firstName ? "border-red-500 bg-red-900" : "bg-[#1e293b]"
                  }`}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input
                  {...register("lastName")}
                  className={`w-full rounded-md px-3 py-2 ${
                    errors.lastName ? "border-red-500 bg-red-900" : "bg-[#1e293b]"
                  }`}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                {...register("email")}
                className={`w-full rounded-md px-3 py-2 ${
                  errors.email ? "border-red-500 bg-red-900" : "bg-[#1e293b]"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label>Project Type</Label>
              <select
                {...register("projectType")}
                className={`w-full rounded-md border border-border bg-[#1e293b] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.projectType ? "border-red-500 bg-red-900" : ""
                }`}
              >
                <option value="">Select a project type</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Consultation">Consultation</option>
              </select>
              {errors.projectType && <p className="text-sm text-red-500">{errors.projectType.message}</p>}
            </div>

            <div>
              <Label>Message *</Label>
              <Textarea
                rows={4}
                {...register("message")}
                className={`w-full rounded-md px-3 py-2 ${
                  errors.message ? "border-red-500 bg-red-900" : "bg-[#1e293b]"
                }`}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <Controller
  name="consent"
  control={control}
  defaultValue={false}
  render={({ field }) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="consent"
        checked={field.value}
        onCheckedChange={field.onChange}
        className="bg-white text-black border border-gray-300 rounded-sm shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <Label htmlFor="consent">
        I agree to be contacted about this project.
      </Label>
    </div>
  )}
/>
{errors.consent && (
  <p className="text-sm text-red-500">{errors.consent.message}</p>
)}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-full shadow-md transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="animate-fade-in-right">
            <div className="bg-[#1e293b] rounded-2xl p-8 shadow-lg text-white text-left">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">tanner.galambas@gmail.com</p>
                    <a
                      href="mailto:tanner.galambas@gmail.com"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Send an email →
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-300">Austin, Texas</p>
                    <p className="text-sm text-gray-400">Available for remote work</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Response Time</h4>
                    <p className="text-gray-300">Usually within 24 hours</p>
                    <p className="text-sm text-gray-400">Monday – Friday, 9 AM – 5 PM CST</p>
                  </div>
                </div>
              </div>

              {/* Resume Download */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Download Resume</h4>
                    <p className="text-sm text-gray-300">Get a detailed overview of my experience</p>
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700 hover:bg-slate-600 text-gray-200 px-3 py-1 rounded-md flex items-center text-sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-semibold mb-4">Connect Online</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/tannergalambas"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-slate-700 text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/tannergalambas"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-slate-700 text-gray-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:tanner.galambas@gmail.com"
                    className="w-10 h-10 bg-slate-700 text-gray-300 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}