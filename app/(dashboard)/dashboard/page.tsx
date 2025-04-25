// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth"; // Adjust based on your config path
import { redirect } from "next/navigation";
import Head from "next/head";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  return (
    <>
      <Head>
        <title>PaySwift — Fast & Secure Payments</title>
      </Head>

      <main className="w-full min-h-screen flex flex-col bg-gray-100 overflow-hidden">
        {/* Hero */}
        <section className="w-full flex-1 flex items-center justify-center px-6 py-20 text-center">
          <div className="max-w-2xl w-full">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">
              Send & Receive Money Instantly
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              PaySwift lets you handle all your payments securely and effortlessly. Send
              money to friends, or cash out to your bank.
            </p>

            <form action={isLoggedIn ? "/transfer" : "/api/auth/signup"}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </section>

        {/* Features */}
        <section className="w-full bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">Why PaySwift?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
                <p className="text-gray-600 text-sm">Send and receive money in seconds, 24/7.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Bank Integration</h3>
                <p className="text-gray-600 text-sm">Link your bank for quick top-ups and cashouts.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600 text-sm">We use bank-grade security to protect your data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-100 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PaySwift. All rights reserved.
        </footer>
      </main>
    </>
  );
}

