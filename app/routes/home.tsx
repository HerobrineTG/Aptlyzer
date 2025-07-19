import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aptlyzer" },
    { name: "description", content: "AI resume feedbacks for getting hired!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Resume ratings & Applications, Tracked in one place</h1>
        <h2>Give your work a quick look and see what the AI has to say.</h2>
      </div>
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume}></ResumeCard>
          ))}
        </div>
      )}
    </section>
  </main>;
}
