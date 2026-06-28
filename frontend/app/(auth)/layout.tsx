import Image from "next/image";
import { Heart } from "lucide-react";

export default function AuthLayout({ children }: Children) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="relative hidden md:flex flex-1 flex-col justify-between p-9 bg-slate-900">
        <Image
          src="/images/authImage.jpg"
          alt="Fashion store"
          fill
          sizes="50vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            e-shop
          </span>
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-[22px] font-semibold leading-snug tracking-tight mb-2.5">
            Style that speaks
            <br />
            <span className="text-blue-300">before you do.</span>
          </h2>
          <p className="text-white/50 text-[13px] leading-relaxed">
            Curated collections for every occasion,
            <br />
            delivered to your door.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["Free shipping", "Easy returns", "New arrivals weekly"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[11px] text-white/70 border border-white/20 bg-white/7 px-2.5 py-1 rounded-full"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[50%] shrink-0 bg-card flex flex-col justify-center overflow-y-auto border-l border-border">
        {children}
      </div>
    </div>
  );
}
