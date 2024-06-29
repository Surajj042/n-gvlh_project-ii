"use client";

import Starfield from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SliderToggle } from "@/components/ui/toggle-mode";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TypeWriter from "./_components/type-writer";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormData = z.infer<typeof schema>;

export default function LandingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const mailto = `mailto:foreducationalonlytbh@gmail.com?subject=${encodeURIComponent(`Message from ${data.name}`)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`)}`;
    window.location.href = mailto;
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Starfield
        starSize={2}
        starCount={200}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="black"
      />

      <main className="flex-1">
        <section className="radial-blur flex h-[100vh] flex-col items-center justify-center text-center">
          <header className="fixed top-0 z-[99999] flex h-[60px] w-full items-center justify-between bg-white px-4 dark:bg-black lg:px-6">
            <Link
              href="/"
              className="flex items-center justify-center"
              prefetch={false}
            >
              <Image
                height={30}
                width={30}
                src="/logo-dark-compact.svg"
                alt="logo"
              />
              <span className="sr-only">N-GVLH</span>
            </Link>
            <nav className="flex-center ml-auto gap-2 sm:gap-6">
              <div className="flex-center ml-auto gap-2 max-sm:hidden sm:gap-6">
                <Link
                  href="#features"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  prefetch={false}
                >
                  Features
                </Link>
                <Link
                  href="#faqs"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  prefetch={false}
                >
                  FAQs
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
              <SliderToggle />
            </nav>
          </header>
          <div className="mb-2">
            <div>
              <h1 className="mb-4 text-4xl font-bold">
                <TypeWriter text="EMPOWER YOUR LEARNING JOURNEY WITH US" />
              </h1>
            </div>
            <p className="mb-8 text-sm">
              Discover a world of knowledge and connect with passionate
              educators.
            </p>
            <Link href="/sign-up">
              <Button
                variant="gooeyRight"
                className="bg-slate-900 px-4 py-1 !text-light-900"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </section>
        <section
          id="features"
          className="radial-blur-rotate w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="sm:text-5xl xl:text-6xl/none text-3xl font-bold tracking-tighter">
                    Seamless Video Calling Feature
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect with your teachers and classmates through
                    high-quality video calls, enhancing your learning
                    experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 items-center justify-center rounded-md border-2 px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src="/landing/landing1.svg"
                width="550"
                height="550"
                alt="Hero"
                placeholder="blur"
                blurDataURL="/landing/landing1.jpg"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="radial-blur w-full border-none py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Q&A
                  </div>
                  <h2 className="sm:text-5xl text-3xl font-bold tracking-tighter">
                    Interactive Q&A Sessions
                  </h2>
                  <p className="lg:text-base/relaxed max-w-[600px] text-muted-foreground md:text-xl/relaxed xl:text-xl/relaxed">
                    Engage in dynamic Q&A sessions with experts, instructors,
                    and the community. Get your questions answered and
                    participate in insightful discussions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/all-questions"
                    className="inline-flex h-10 items-center justify-center rounded-md border-2 px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Join Q&A
                  </Link>
                </div>
              </div>
              <Image
                src="/landing/landing2.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="radial-blur-rotate w-full border-none py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Courses
                  </div>
                  <h2 className="sm:text-5xl text-3xl font-bold tracking-tighter">
                    Explore Our Curated Courses
                  </h2>
                  <p className="lg:text-base/relaxed max-w-[600px] text-muted-foreground md:text-xl/relaxed xl:text-xl/relaxed">
                    Browse our selection of online courses, each designed to
                    help you expand your knowledge and skills. Enroll today and
                    start your learning journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 items-center justify-center rounded-md border-2 px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Join Us
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-transparent dark:bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Image
                      src="/landing/l1.png"
                      width="550"
                      height="550"
                      alt="Hero"
                      placeholder="blur"
                      blurDataURL="/landing/landing1.jpg"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium">
                        Introduction to Web Development
                      </h3>
                      <p className="text-muted-foreground">$49.99</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent dark:bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Image
                      src="/landing/l2.png"
                      width="550"
                      height="550"
                      alt="Hero"
                      placeholder="blur"
                      blurDataURL="/landing/landing1.jpg"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium">
                        Mastering Advanced Data Visualization
                      </h3>
                      <p className="text-muted-foreground">$79.99</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent dark:bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Image
                      src="/landing/l3.png"
                      width="550"
                      height="550"
                      alt="Hero"
                      placeholder="blur"
                      blurDataURL="/landing/landing1.jpg"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium">
                        Artificial Intelligence Fundamentals
                      </h3>
                      <p className="text-muted-foreground">$99.99</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent dark:bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Image
                      src="/landing/l4.png"
                      width="550"
                      height="550"
                      alt="Hero"
                      placeholder="blur"
                      blurDataURL="/landing/landing1.jpg"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium">
                        Advanced JavaScript Techniques
                      </h3>
                      <p className="text-muted-foreground">$59.99</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section id="faqs" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="sm:text-5xl text-3xl font-bold tracking-tighter">
                  FAQs
                </h2>
              </div>
              <div className="w-full max-w-3xl space-y-4">
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      What is the purpose of N-GVLH?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      N-GVLH is a comprehensive platform that combines seamless
                      video calls, interactive Q&A, and a wide range of online
                      courses. Our goal is to empower individuals and
                      organizations with the tools they need to communicate,
                      learn, and grow effectively.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      How do I start a video call?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      Only teacher can start a video call/meetings. You can
                      request to be a teacher using{" "}
                      <Link href="#contact" className="text-purple-500">
                        contact form
                      </Link>
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      What courses are available on N-GVLH?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      We offer a wide range of online courses covering various
                      topics, from business and technology to personal
                      development and creative skills. You can browse our course
                      catalog in the Courses section to find the programs that
                      best suit your needs.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      How do I enroll in a course?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      After logging in, browse or search for the course you are
                      interested in. Click on the course, and then click the
                      "Enroll" button. Follow the prompts to complete the
                      enrollment process.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      Are there any free courses available?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      Yes, N-GVLH offers a selection of free courses.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left">
                    <h4 className="text-lg font-semibold">
                      How can I sell my own course on N-GVLH?
                    </h4>
                    <ChevronDownIcon className="h-5 w-5 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-3">
                    <p className="text-muted-foreground">
                      Teachers can sell their courses on N-GVLH. If you are not
                      a teacher yet,{" "}
                      <Link href="#contact" className="text-purple-500">
                        contact us
                      </Link>
                      .
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full pb-12 md:py-24 lg:py-32 xl:py-48"
        >
          <div className="animate-fade-in container flex flex-col items-center justify-center space-y-6 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h1 className="sm:text-5xl md:text-6xl lg:text-7xl text-4xl font-bold tracking-tighter">
                Get in Touch
              </h1>
              <p className="max-w-[700px] md:text-md">
                Have a question or want to work together? Fill out the form
                below and we'll get back to you as soon as possible.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="animate-slide-up w-full max-w-md space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Your Name"
                    className={`flex-1 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    className={`flex-1 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Textarea
                  {...register("message")}
                  id="message"
                  placeholder="Your Message"
                  className={`min-h-[160px] ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>
              <Button
                variant="gooeyRight"
                type="submit"
                className="w-full animate-bounce rounded-lg px-4 py-2 text-white duration-1000"
              >
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 N-GVLH. All rights reserved.
        </p>
        {/* <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav> */}
      </footer>
    </div>
  );
}
