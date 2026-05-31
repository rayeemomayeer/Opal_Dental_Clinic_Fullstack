const FEATURES = ["Permanent solution", "Full mouth rehab"] as const;

/** Service overlay — the "planted" end state of the implant experience. */
export function ServiceLayer() {
  return (
    <div className="flex h-full items-center">
      <div className="container">
        <div className="max-w-lg">
          <h2
            data-svc="title"
            className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            Dental
            <br />
            Implants
          </h2>
          <p data-svc="sub" className="mt-6 text-lg leading-relaxed text-foreground/70">
            Digitally Guided Implant
            <br />
            All-on-4 Full Mouth Implant
          </p>
          <ul className="mt-10 space-y-5">
            {FEATURES.map((feature) => (
              <li key={feature} data-svc-item className="flex items-center gap-4 text-foreground/90">
                <span className="h-3 w-3 rotate-45 rounded-[2px] bg-primary shadow-[0_0_14px_rgba(255,148,16,0.65)]" />
                <span className="text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
