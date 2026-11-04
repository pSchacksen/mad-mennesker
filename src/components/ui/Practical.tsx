import { BrandIcon } from "@/components/brand/BrandIcon";
import { directionsUrl, formatAddressLines, site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";

/** Diskret "følger snart"-markering for oplysninger, der endnu ikke er fastlagt. */
export function Pending({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("display-italic text-[1.15em] opacity-75", className)}>{children}</span>;
}

export function OpeningHours({ className }: { className?: string }) {
  if (!site.openingHours?.length) {
    return (
      <p className={className}>
        <Pending>Åbningstiderne følger snart.</Pending>
        {site.openingAnnouncement && <span className="mt-1 block">{site.openingAnnouncement}</span>}
      </p>
    );
  }
  return (
    <dl className={cn("grid grid-cols-[auto_1fr] gap-x-6 gap-y-1", className)}>
      {site.openingHours.map((row) => (
        <div key={row.days} className="contents">
          <dt>{row.days}</dt>
          <dd className="text-right tabular-nums">{row.hours}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AddressBlock({ className }: { className?: string }) {
  return (
    <address className={cn("not-italic", className)}>
      <span className="block">{site.name}</span>
      {formatAddressLines().map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </address>
  );
}

/** Kontaktlinjer. Viser kun det, der er bekræftet i content/site.ts. */
export function ContactLines({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  const { phone, email } = site.contact;
  return (
    <ul className={cn("space-y-3", className)}>
      <li className="flex items-start gap-3">
        <BrandIcon name="location" className={cn("mt-0.5 size-5", iconClassName)} />
        <span>
          {site.address.area}, {site.address.city}
          <a href={directionsUrl()} target="_blank" rel="noopener" className="ml-2 underline decoration-1 underline-offset-4 hover:no-underline">
            Rutevejledning<span className="sr-only"> (åbner Google Maps i nyt vindue)</span>
          </a>
        </span>
      </li>
      <li className="flex items-start gap-3">
        <BrandIcon name="phone" className={cn("mt-0.5 size-5", iconClassName)} />
        {phone ? <a href={telHref(phone)}>{phone}</a> : <Pending>Telefonnummer følger</Pending>}
      </li>
      <li className="flex items-start gap-3">
        <BrandIcon name="envelope" className={cn("mt-0.5 size-5", iconClassName)} />
        {email ? <a href={`mailto:${email}`}>{email}</a> : <Pending>E-mail følger</Pending>}
      </li>
    </ul>
  );
}
