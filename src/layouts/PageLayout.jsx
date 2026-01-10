import Header from "../components/Header.jsx";

export default function PageLayout({ children, className = "container mx-auto bg-white min-h-96 rounded-xl shadow-xl p-6 " }) {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-white shadow-md">
        <Header />
      </div>
      <div className="pt-6 pb-12">
        <main className={`${className} flex flex-col items-center gap-6`}>
          {children}
        </main>
      </div>
    </div>
  );
}