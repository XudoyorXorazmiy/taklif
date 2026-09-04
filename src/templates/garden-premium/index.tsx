import { Calendar } from "@/components/invitation/Calendar";
import { Countdown } from "@/components/invitation/Countdown";
import { Frame } from "@/components/invitation/Frame";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { Reveal } from "@/components/invitation/Reveal";
import { RsvpForm, type RsvpUi } from "@/components/invitation/RsvpForm";
import { Slot } from "@/components/invitation/Slot";
import { formatDate, formatDateDots, formatTime, formatWeekday, t } from "@/lib/i18n";
import { ROOT_DOMAIN } from "@/lib/site";
import { fontVars } from "../fonts";
import type { TemplateProps } from "../types";

/**
 * 04 · GARDEN-PREMIUM — "Bog' saroyi" (premium)
 * Har blok o'z fon rasmiga ega (akvarel illyustratsiya, admin yuklaydi).
 * Fon #EFEAE4 · matn #2C4130 · ikkinchi #5A5F48 · oltin #C0A268 · tugma #2B3A2E
 * Sarlavha va kalligrafiya: Cormorant Garamond (kirill ham qo'llab-quvvatlaydi) · Matn: Manrope
 */

const C = {
  bg: "#EFEAE4",
  bgSoft: "#F5EFE9",
  text: "#2C4130",
  muted: "#5A5F48",
  gold: "#C0A268",
  dark: "#2B3A2E",
  line: "rgba(44,65,48,.18)",
};

/** Fon bo'lmaganda ishlatiladigan yumshoq gradient */
const softBg = "radial-gradient(120% 90% at 50% 0%, #FBF8F4 0%, #F1ECE4 55%, #E7E2D8 100%)";

const rsvpUi: RsvpUi = {
  form: "flex w-full flex-col gap-4",
  label: "font-mr text-[13px] font-medium text-[#2C4130]",
  input:
    "h-[52px] w-full rounded-[26px] border border-[rgba(44,65,48,.25)] bg-white/70 px-5 font-mr text-[15px] text-[#2C4130] outline-none backdrop-blur placeholder:text-[#2C4130]/40 focus:border-[#2C4130]",
  option: "flex min-h-[52px] items-center gap-3 rounded-[26px] border border-[rgba(44,65,48,.25)] bg-white/50 px-5 py-3 text-left font-mr text-[15px] text-[#2C4130] backdrop-blur",
  optionActive: "flex min-h-[52px] items-center gap-3 rounded-[26px] border border-[#2C4130] bg-white/85 px-5 py-3 text-left font-mr text-[15px] font-semibold text-[#2C4130] backdrop-blur",
  dot: "grid h-5 w-5 flex-none place-items-center rounded-full border border-[rgba(44,65,48,.5)]",
  dotActive: "grid h-5 w-5 flex-none place-items-center rounded-full border-2 border-[#2C4130]",
  dotInner: "h-2.5 w-2.5 rounded-full bg-[#2C4130]",
  stepper: "flex h-[52px] overflow-hidden rounded-[26px] border border-[rgba(44,65,48,.25)] bg-white/70 backdrop-blur",
  stepperBtn: "grid w-[52px] place-items-center border-[rgba(44,65,48,.2)] font-cg text-2xl text-[#2C4130]",
  stepperVal: "flex flex-1 items-center justify-center font-mr text-base font-medium text-[#2C4130]",
  button: "mt-1 h-[54px] rounded-[27px] bg-[#2B3A2E] font-mr text-[15px] font-semibold text-[#F3EFE8] disabled:opacity-60",
  sent: "flex w-full flex-col items-center gap-3 rounded-3xl border border-[rgba(44,65,48,.2)] bg-white/70 px-6 py-9 text-center backdrop-blur",
  sentIcon: "grid h-14 w-14 place-items-center rounded-full border border-[#C0A268] font-cg text-2xl text-[#C0A268]",
  sentTitle: "font-cg text-[34px] italic leading-none text-[#2C4130]",
  sentText: "font-mr text-[15px] leading-[1.6] text-[#5A5F48]",
};

/** Fon rasmi + yumshoq oq parda (matn o'qilishi uchun) */
function Bg({ src, preview, label, veil = 0.55 }: { src?: string; preview?: boolean; label: string; veil?: number }) {
  return (
    <>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: softBg }} />
      )}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(247,243,237,${veil + 0.1}) 0%, rgba(247,243,237,${veil - 0.15}) 40%, rgba(247,243,237,${veil + 0.1}) 100%)` }} />
      {!src && preview && (
        <div className="absolute inset-x-6 top-6 z-[1]">
          <Slot preview label={label} className="h-16 w-full rounded-xl text-[#5A5F48]" style={{ borderColor: C.gold, background: "rgba(192,162,104,.06)" }} />
        </div>
      )}
    </>
  );
}

function Script({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-cg text-[38px] font-medium italic leading-[1.15] text-[#2C4130] ${className}`}>{children}</div>;
}

function Section({ id, bg, preview, label, veil, className = "", children }: { id: string; bg?: string; preview?: boolean; label: string; veil?: number; className?: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" id={id} className={`relative isolate overflow-hidden ${className}`}>
      <Bg src={bg} preview={preview} label={label} veil={veil} />
      <div className="relative z-[2]">{children}</div>
    </Reveal>
  );
}

function Cover({ initials, hint, eyebrow }: { initials: string; hint: string; eyebrow: string }) {
  return (
    <div className={`${fontVars} relative flex h-full w-full flex-col items-center justify-center gap-9 overflow-hidden font-mr`} style={{ background: softBg }}>
      <div className="pointer-events-none absolute inset-5 rounded-[200px_200px_24px_24px] border border-[#C0A268]/50" />
      <div className="text-[11px] font-medium uppercase tracking-[.34em] text-[#5A5F48]">{eyebrow}</div>
      <div className="intro-oval relative grid h-[186px] w-[186px] place-items-center rounded-full border border-[#C0A268]">
        <div className="absolute inset-2 rounded-full border border-[#C0A268]/40" />
        <div className="font-cg text-[46px] font-medium italic text-[#2C4130]">{initials}</div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="text-[13px] font-medium tracking-[.1em] text-[#5A5F48]">{hint}</div>
        <div className="h-8 w-px bg-[#C0A268]" />
      </div>
    </div>
  );
}

export default function GardenPremium({ data, guest, preview, slots }: TemplateProps) {
  const { content: c, locale } = data;
  const L = t(locale);
  const b = c.blocks;
  const T = c.labels;
  const bgs = c.backgrounds;
  const lb = (v: string, d: string) => (v.trim() === "-" ? null : v.trim() || d);
  const initials =
    c.hero.initials.trim() || (data.groomName || data.brideName ? `${data.groomName[0] ?? ""} & ${data.brideName[0] ?? ""}` : "♥");
  const venues = c.venues.filter((v) => v.name || v.address);
  const names = [data.groomName, data.brideName].filter(Boolean).join(` ${L.and} `);

  return (
    <InvitationShell
      showIntro={c.hero.intro}
      music={data.music}
      musicClassName="fixed bottom-9 right-7 z-50 grid h-12 w-12 place-items-center rounded-full border border-[#C0A268]/60 bg-[#F3EFE8]/90 text-[#2C4130] shadow-[0_6px_18px_rgba(43,58,46,.18)] backdrop-blur"
      intro={<Cover initials={initials} hint={L.tapToOpen} eyebrow={L.introEyebrow} />}
    >
      <Frame color="#E4DFD5">
        <div className={`${fontVars} relative min-h-dvh bg-[#EFEAE4] font-mr text-[#2C4130]`}>
          {/* 01 cover */}
          <section id="cover" className="relative isolate flex h-[844px] flex-col items-center justify-end overflow-hidden px-8 pb-24 text-center">
            <Bg src={bgs.cover} preview={slots} label="Muqova foni — akvarel bog' / arka, 390×844" veil={0.28} />
            <div className="relative z-[2] flex flex-col items-center">
              {c.hero.eyebrow && <div className="mb-5 text-[11px] font-medium uppercase tracking-[.34em] text-[#5A5F48]">{c.hero.eyebrow}</div>}
              {c.hero.title ? (
                <h1 className="m-0 max-w-[320px] font-cg text-[46px] font-medium italic leading-[1.15] text-[#2C4130]">{c.hero.title}</h1>
              ) : (
                <h1 className="m-0 max-w-[330px] font-cg text-[46px] font-medium italic leading-[1.2] text-[#2C4130]">{names}</h1>
              )}
              {c.hero.tagline && <p className="m-0 mt-5 max-w-[300px] text-[15px] leading-[1.65] text-[#3F4A3C]">{c.hero.tagline}</p>}
              <div className="mt-9 flex flex-col items-center gap-2 text-[12px] font-medium tracking-[.14em] text-[#5A5F48]">
                <span>{L.scrollHint}</span>
                <span className="h-7 w-px bg-[#C0A268]" />
              </div>
            </div>
          </section>

          {/* 02 greeting */}
          {b.greeting && (
            <Section id="greeting" bg={bgs.greeting} preview={slots} label="Salomlashuv foni — gul gulchambar, 390×700" className="flex flex-col items-center gap-4 px-8 py-16 text-center">
              {guest && <div className="font-cg text-[24px] font-medium italic text-[#5A5F48]">{L.dear} {guest},</div>}
              <Script className="text-[40px]">{formatDate(data.eventAt, locale)}</Script>
              <div className="mt-1 h-px w-14 bg-[#C0A268]" />
              {c.greeting.title && <h2 className="m-0 mt-2 font-cg text-[26px] font-medium leading-[1.25]">{c.greeting.title}</h2>}
              <p className="m-0 whitespace-pre-line text-[15px] leading-[1.75] text-[#3F4A3C]">{c.greeting.text}</p>
            </Section>
          )}

          {/* 03 date — kalendar */}
          {b.date && (
            <Section id="date" bg={bgs.date} preview={slots} label="Sana bloki foni, 390×620" className="flex flex-col items-center gap-6 px-8 py-16">
              {lb(T.dateTitle, L.dateTitle) && <Script>{lb(T.dateTitle, L.dateTitle)}</Script>}
              <div className="text-center">
                <div className="font-cg text-[34px] font-medium leading-[1.1]">{formatDate(data.eventAt, locale)}</div>
                <div className="mt-2 text-[12px] font-medium uppercase tracking-[.22em] text-[#5A5F48]">
                  {formatWeekday(data.eventAt, locale)}
                  {c.hero.showTime ? ` · ${formatTime(data.eventAt)}` : ""}
                </div>
              </div>
              <Calendar
                date={data.eventAt}
                labels={L}
                ui={{
                  wrap: "w-full rounded-3xl border border-[rgba(44,65,48,.16)] bg-white/55 px-4 pb-4 pt-5 backdrop-blur",
                  month: "mb-3 text-center font-cg text-[15px] font-medium tracking-[.24em]",
                  dayName: "font-mr text-[10px] font-semibold uppercase leading-6 tracking-[.08em] text-[#5A5F48]",
                  day: "font-mr text-sm text-[#3F4A3C]",
                  active: "grid h-9 w-9 place-items-center rounded-full bg-[#2B3A2E] font-mr text-sm font-semibold text-[#F3EFE8]",
                }}
              />
            </Section>
          )}

          {/* 04 countdown — oltin doira */}
          {b.countdown && (
            <Section id="countdown" bg={bgs.countdown} preview={slots} label="Sanoq foni — sarv daraxtlar / manzara, 390×620" className="flex flex-col items-center px-6 py-16">
              <div className="relative grid aspect-square w-full max-w-[330px] place-items-center">
                <div className="absolute inset-0 rounded-full border border-[#C0A268]" />
                <div className="absolute inset-[10px] rounded-full border border-[#C0A268]/35" />
                <div className="absolute left-1/2 top-[6px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-[#C0A268] bg-[#EFEAE4]" />
                <div className="absolute bottom-[6px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-[#C0A268] bg-[#EFEAE4]" />
                <div className="flex flex-col items-center gap-4 px-6">
                  <Script className="text-[30px]">{L.countdownTitle}</Script>
                  <Countdown
                    target={data.eventAt}
                    labels={L}
                    className="flex w-full justify-center gap-3"
                    cellClassName="flex min-w-[52px] flex-col items-center"
                    numberClassName="font-cg text-[30px] font-medium leading-none tabular-nums"
                    labelClassName="mt-1.5 text-[11px] font-medium text-[#5A5F48]"
                  />
                </div>
              </div>
            </Section>
          )}

          {/* 05 venue */}
          {b.venues && venues.length > 0 && (
            <Section id="venue" bg={bgs.venue} preview={slots} label="Manzil foni — ustunlar / arka, 390×760" className="flex flex-col items-center gap-7 px-8 py-16 text-center">
              {lb(T.venueTitle, L.venueTitle) && <Script>{lb(T.venueTitle, L.venueTitle)}</Script>}
              {venues.map((v, i) => (
                <div key={i} className="flex w-full flex-col items-center gap-2.5">
                  {(v.title || v.time) && (
                    <div className="text-[11px] font-medium uppercase tracking-[.24em] text-[#5A5F48]">{[v.title, v.time].filter(Boolean).join(" · ")}</div>
                  )}
                  <div className="font-cg text-[28px] font-medium italic leading-[1.2]">{v.name}</div>
                  <p className="m-0 text-[15px] leading-[1.6] text-[#3F4A3C]">{v.address}</p>
                  {v.mapUrl && (
                    <a
                      href={v.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex h-[52px] items-center justify-center rounded-[26px] border border-[rgba(44,65,48,.4)] bg-white/40 px-8 font-mr text-[14px] font-medium backdrop-blur"
                    >
                      {L.openMap}
                    </a>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* 06 schedule */}
          {b.schedule && c.schedule.length > 0 && (
            <Section id="schedule" bg={bgs.schedule} preview={slots} label="Dastur foni — arka / lyustra, 390×820" className="flex flex-col items-center gap-6 px-8 py-16">
              <div className="text-center">
                {lb(T.scheduleTitle, L.scheduleTitle) && <Script>{lb(T.scheduleTitle, L.scheduleTitle)}</Script>}
                <div className="mt-2 text-[15px] text-[#5A5F48]">{formatDate(data.eventAt, locale)}</div>
              </div>
              <div className="mt-2 flex w-full flex-col gap-5">
                {c.schedule.map((s, i) => (
                  <div key={i} className="grid grid-cols-[14px_64px_1fr] items-start gap-x-3">
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#2B3A2E]" />
                    <div className="font-mr text-[17px] font-semibold leading-tight">{s.time}</div>
                    <div>
                      <div className="text-[15px] leading-[1.4] text-[#3F4A3C]">{s.title}</div>
                      {s.note && <div className="mt-0.5 text-[13px] leading-[1.45] text-[#5A5F48]">{s.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 07 details */}
          {b.details && c.details.length > 0 && (
            <Section id="details" bg={bgs.details} preview={slots} label="Ma'lumot bloki foni, 390×620" className="flex flex-col items-center gap-6 px-8 py-16 text-center">
              {lb(T.detailsTitle, L.detailsTitle) && <Script>{lb(T.detailsTitle, L.detailsTitle)}</Script>}
              {c.details.map((d, i) => (
                <div key={i} className="w-full max-w-[320px]">
                  {d.title && <div className="font-cg text-[22px] font-medium italic">{d.title}</div>}
                  <p className="m-0 mt-1.5 text-[15px] leading-[1.7] text-[#3F4A3C]">{d.text}</p>
                </div>
              ))}
            </Section>
          )}

          {/* 08 dresscode */}
          {b.dressCode && (c.dressCode.text || c.dressCode.colors.length > 0) && (
            <Section id="dresscode" bg={bgs.dressCode} preview={slots} label="Kiyim tarzi foni — kostyum / libos, 390×720" className="flex flex-col items-center gap-5 px-8 py-16 text-center">
              {lb(T.dressCodeTitle, L.dressCodeTitle) && <Script>{lb(T.dressCodeTitle, L.dressCodeTitle)}</Script>}
              {c.dressCode.text && <p className="m-0 whitespace-pre-line text-[15px] leading-[1.7] text-[#3F4A3C]">{c.dressCode.text}</p>}
              {c.dressCode.colors.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-3.5">
                  {c.dressCode.colors.map((col) => (
                    <div key={col} className="h-11 w-11 rounded-full shadow-[0_2px_8px_rgba(43,58,46,.15),inset_0_0_0_1px_rgba(255,255,255,.5)]" style={{ background: col }} />
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* 09 gallery */}
          {b.gallery && (data.gallery.length > 0 || slots) && (
            <Section id="gallery" bg={bgs.gallery} preview={slots} label="Galereya foni, 390×700" className="flex flex-col items-center gap-6 px-6 py-16">
              {lb(T.galleryTitle, L.galleryTitle) && <Script>{lb(T.galleryTitle, L.galleryTitle)}</Script>}
              <div className="grid w-full grid-cols-2 gap-3">
                {(data.gallery.length ? data.gallery : [null, null, null, null]).map((g, i) => (
                  <Slot
                    key={i}
                    src={g}
                    preview={slots}
                    label={`Rasm ${i + 1} · 170×220`}
                    className={`h-[220px] w-full rounded-[110px_110px_14px_14px] text-[#5A5F48] ${i % 2 ? "mt-7" : ""}`}
                    imgClassName="rounded-[110px_110px_14px_14px]"
                    style={g ? undefined : { background: "rgba(192,162,104,.08)", borderColor: C.gold }}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* 10 rsvp */}
          {b.rsvp && (
            <Section id="rsvp" bg={bgs.rsvp} preview={slots} label="RSVP foni — gul kompozitsiya, 390×860" veil={0.62} className="flex flex-col items-center gap-6 px-7 py-16">
              <div className="text-center">
                {lb(T.rsvpTitle, L.rsvpTitle) && <Script className="text-[34px]">{lb(T.rsvpTitle, L.rsvpTitle)}</Script>}
                {c.rsvp.deadline && <p className="m-0 mt-2.5 text-[14px] leading-[1.5] text-[#5A5F48]">{c.rsvp.deadline}</p>}
              </div>
              <RsvpForm
                invitationId={data.id}
                guest={guest}
                askGuests={c.rsvp.askGuests}
                askNote={c.rsvp.askNote}
                askPhone={c.rsvp.askPhone}
                thanks={c.rsvp.thanks}
                eventDate={data.eventAt}
                locale={locale}
                labels={L}
                preview={preview}
                ui={rsvpUi}
              />
            </Section>
          )}

          {/* 11 contacts */}
          {b.contacts && c.contacts.length > 0 && (
            <Section id="contacts" bg={bgs.contacts} preview={slots} label="Kontaktlar foni, 390×560" className="flex flex-col items-center gap-6 px-8 py-16 text-center">
              {lb(T.contactsTitle, L.contactsTitle) && <Script>{lb(T.contactsTitle, L.contactsTitle)}</Script>}
              <div className="flex w-full flex-col gap-4">
                {c.contacts.map((k, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 rounded-3xl border border-[rgba(44,65,48,.16)] bg-white/50 px-5 py-5 backdrop-blur">
                    <div className="text-[11px] font-medium uppercase tracking-[.22em] text-[#5A5F48]">{k.name}</div>
                    <div className="whitespace-nowrap font-cg text-[22px] font-medium">{k.phone}</div>
                    <div className="mt-1 flex w-full gap-2.5">
                      {k.phone && (
                        <a href={`tel:${k.phone.replace(/\s/g, "")}`} className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#2B3A2E] text-[13px] font-semibold text-[#F3EFE8]">
                          {L.call}
                        </a>
                      )}
                      {k.telegram && (
                        <a href={`https://t.me/${k.telegram.replace(/^@/, "")}`} className="flex h-11 flex-1 items-center justify-center rounded-full border border-[rgba(44,65,48,.4)] text-[13px] font-semibold">
                          {L.telegram}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 12 closing */}
          {b.closing && (
            <Section id="closing" bg={bgs.closing} preview={slots} label="Yakun foni — sarv xiyoboni, 390×844" veil={0.35} className="flex min-h-[560px] flex-col items-center justify-center gap-4 px-8 py-20 text-center">
              <Script className="text-[38px] [text-wrap:balance]">{c.closing.text}</Script>
              <div className="mt-1 h-px w-14 bg-[#C0A268]" />
              {c.closing.signature.trim() ? (
                <div className="whitespace-pre-line font-cg text-[22px] font-medium leading-[1.4]">{c.closing.signature.trim()}</div>
              ) : (
                names && <div className="font-cg text-[22px] font-medium leading-[1.4]">{names}</div>
              )}
              <div className="text-[15px] text-[#5A5F48]">{formatDateDots(data.eventAt, locale)}</div>
              <div className="mt-8 text-[10px] uppercase tracking-[.26em] text-[#5A5F48]/80">{ROOT_DOMAIN}</div>
            </Section>
          )}
        </div>
      </Frame>
    </InvitationShell>
  );
}
