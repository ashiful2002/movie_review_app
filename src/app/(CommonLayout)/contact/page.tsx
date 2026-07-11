import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you. Fill out the form below or use our contact details.
          </p>
        </div>

        <div className="flex justify-around mb-20">
          {/* Contact Info Cards */}
          <div className="flex flex-col gap-5 w-1/2">
            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:support@mmdb.com"
                    className="text-primary font-medium hover:underline"
                  >
                    support@mmdb.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg shrink-0">
                  <Phone className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a
                    href="tel:01759907907"
                    className="text-primary font-medium hover:underline"
                  >
                    01759-907907
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Come say hello at our office HQ.
                  </p>
                  <span className="text-foreground font-medium">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="flex w-1/2 ">
            <Card className="shadow-xl border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out this form and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      className="bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us a little more about what you need..."
                      className="min-h-[150px] bg-background/50 focus:bg-background transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="button"
                    className="w-full sm:w-auto px-8 gap-2 hover:scale-105 transition-transform duration-300"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
