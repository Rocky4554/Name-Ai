import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CtaButton from "@/components/CtaButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <Header />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Hero Badge */}
        <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <div className="bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20 border border-orange-200 dark:border-orange-800 rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-xs sm:text-sm font-medium text-orange-800 dark:text-orange-200 text-center block">
              Limited time offer on domains, Hurry Up!! <span className="font-bold ml-1 cursor-pointer hover:underline">Read More</span>
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-primary/30 mb-2 animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              Welcome Buddy
            </span>
            <span className="block animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-shine">
                Find Your Domain
              </span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            Only the best names and domains.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl mx-auto mb-20 animate-fade-in-up opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          <div className="relative">
            <SearchBar />
          </div>
        </div>
      </main>

      <CtaButton />
    </div>
  );
}
