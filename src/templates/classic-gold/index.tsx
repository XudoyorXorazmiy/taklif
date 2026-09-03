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
 * 01 · CLASSIC-GOLD — "Klassik oltin"
 * Fon #FBF8F1 · matn #1E1A16 · urg'u #B8973F · 2-urg'u #8A7A5A · yon fon #EFE7D6
 * Sarlavha: Cormorant Garamond 500 · Kalligrafiya: Pinyon Script · Matn: Manrope
 */

const C = {
  bg: "#FBF8F1",
  alt: "#F5EEDF",
  text: "#1E1A16",
  body: "#4A423A",
  gold: "#B8973F",
  gold2: "#8A7A5A",
  line: "#C9AD5F",
  border: "#E2D6B8",
  border2: "#DCCB9E",
};

const rsvpUi: RsvpUi = {
  form: "flex w-full flex-col gap-[18px] border border-[#E2D6B8] bg-[#FBF8F1] p-6",
  label: "font-mr text-[11px] font-semibold uppercase tracking-[.12em] text-[#8A7A5A]",
  input: "h-[46px] w-full border border-[#DCCB9E] bg-white px-3.5 font-mr text-[15px] text-[#1E1A16] outline-none placeholder:text-[#1E1A16]/45",
  option: "flex h-[46px] items-center gap-2.5 border border-[#DCCB9E] bg-white px-3.5 font-mr text-sm font-medium text-[#1E1A16]",
  optionActive: "flex h-[46px] items-center gap-2.5 border border-[#B8973F] bg-[#B8973F] px-3.5 font-mr text-sm font-semibold text-[#FBF8F1]",
  dot: "grid h-3.5 w-3.5 place-items-center rounded-full border border-[#B8973F]",
  dotActive: "grid h-3.5 w-3.5 place-items-center rounded-full border border-[#FBF8F1]",
  dotInner: "h-1.5 w-1.5 rounded-full bg-[#FBF8F1]",
  stepper: "flex h-[46px] border border-[#DCCB9E] bg-white",
  stepperBtn: "grid w-[46px] place-items-center border-[#DCCB9E] font-cg text-xl text-[#B8973F]",
  stepperVal: "flex flex-1 items-center justify-center font-mr text-base font-medium text-[#1E1A16]",
  button: "h-12 bg-[#1E1A16] font-mr text-sm font-semibold tracking-[.08em] text-[#FBF8F1] disabled:opacity-60",
  sent: "flex w-full flex-col items-center gap-3 border border-[#E2D6B8] bg-[#FBF8F1] px-6 py-8 text-center",
  sentIcon: "grid h-[52px] w-[52px] place-items-center rounded-full border border-[#B8973F] font-cg text-[22px] text-[#B8973F]",
  sentTitle: "font-ps text-[34px] leading-none text-[#1E1A16]",
  sentText: "font-mr text-sm leading-[1.6] text-[#4A423A]",
};

function Corner({ cls }: { cls: string }) {
  return <div className={`pointer-events-none absolute h-[26px] w-[26px] border-[#B8973F] ${cls}`} />;
}

function Script({ children }: { children: React.ReactNode }) {
  return <div className="font-ps text-[26px] leading-none text-[#B8973F]">{children}</div>;
}
function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`m-0 font-cg text-[30px] font-medium leading-[1.15] text-[#1E1A16] ${className}`}>{children}</h2>;
}

function Envelope({ initials, eyebrow, hint }: { initials: string; eyebrow: string; hint: string }) {
  return (
    <div className={`${fontVars} relative flex h-full w-full flex-col items-center justify-center gap-10 bg-[#FBF8F1] font-mr`}>
      <div className="pointer-events-none absolute inset-4 border border-[#C9AD5F]" />
      <div className="pointer-events-none absolute inset-[22px] border border-[#C9AD5F]/45" />
      <div className="text-[11px] font-medium uppercase tracking-[.3em] text-[#B8973F]">{eyebrow}</div>
      <div className="relative h-[210px] w-[300px]" style={{ perspective: "900px" }}>
        <div className="absolute inset-0 border border-[#C9AD5F] bg-[#F3EBDA] shadow-[0_12px_30px_rgba(120,95,40,.15)]" />
        <div className="absolute bottom-0 left-0 h-[210px] w-[150px] bg-[#F7F0E1] opacity-90" style={{ clipPath: "polygon(0 0,100% 100%,0 100%)" }} />
        <div className="absolute bottom-0 right-0 h-[210px] w-[150px] bg-[#F7F0E1] opacity-90" style={{ clipPath: "polygon(100% 0,100% 100%,0 100%)" }} />
        <div className="envelope-flap absolute left-0 right-0 top-0 h-[120px] border-b border-[#C9AD5F] bg-[#EDE3CE]" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
        <div
          className="wax-seal absolute left-1/2 top-[120px] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-cg text-[22px] font-semibold tracking-[.04em] text-[#FBF8F1] shadow-[0_4px_10px_rgba(90,70,20,.3)]"
          style={{ background: "radial-gradient(circle at 35% 30%,#D9BD6E,#B8973F 60%,#8F7230)" }}
        >
          {initials}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <div className="text-[13px] font-medium tracking-[.08em] text-[#8A7A5A]">{hint}</div>
        <div className="h-7 w-px bg-[#C9AD5F]" />
      </div>
    </div>
  );
}

export default function ClassicGold({ data, guest, preview, slots }: TemplateProps) {
  const { content: c, locale } = data;
  const L = t(locale);
  const b = c.blocks;
  const T = c.labels;
  const lb = (v: string, d: string) => (v.trim() === "-" ? null : v.trim() || d);
  const initials = c.hero.initials.trim() || (data.groomName || data.brideName ? `${data.groomName[0] ?? ""}&${data.brideName[0] ?? ""}` : "♥");
  const venues = c.venues.filter((v) => v.name || v.address);

  return (
    <InvitationShell
      showIntro={c.hero.intro}
      music={data.music}
      musicClassName="fixed bottom-9 right-8 z-50 grid h-11 w-11 place-items-center rounded-full bg-[#B8973F] text-[#FBF8F1] shadow-[0_4px_12px_rgba(120,95,40,.25)]"
      intro={<Envelope initials={initials} eyebrow={L.introEyebrow} hint={L.tapToOpen} />}
    >
      <Frame color="#EFE7D6">
        <div className={`${fontVars} relative min-h-dvh bg-[#FBF8F1] font-mr text-[#1E1A16]`}>
          {/* 01 cover */}
          <section id="cover" className="relative flex h-[844px] flex-col items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-4 border border-[#C9AD5F]" />
            <Corner cls="left-6 top-6 border-l border-t" />
            <Corner cls="right-6 top-6 border-r border-t" />
            <Corner cls="bottom-6 left-6 border-b border-l" />
            <Corner cls="bottom-6 right-6 border-b border-r" />
            <div className="mb-[26px] flex h-16 w-16 items-center justify-center rounded-full border border-[#C9AD5F] font-cg text-xl font-medium text-[#B8973F]">{initials}</div>
            <div className="text-[11px] font-medium uppercase tracking-[.32em] text-[#B8973F]">{c.hero.eyebrow || L.coverEyebrow}</div>
            {c.hero.title ? <div className="mt-[22px] max-w-[330px] text-center font-ps text-[44px] leading-[1.15]">{c.hero.title}</div> : (<><div className="mt-[22px] font-ps text-[58px] leading-[1.05]">{data.groomName}</div>
            <div className="my-1 font-cg text-[30px] italic leading-none text-[#B8973F]">&amp;</div>
            <div className="font-ps text-[58px] leading-[1.05]">{data.brideName}</div></>)}
            {(data.coverImage || slots) && (
              <div className="mt-[26px] h-[230px] w-[180px] rounded-t-[90px] border border-[#C9AD5F] p-1.5">
                <Slot src={data.coverImage} preview={slots} label="Kelin-kuyov rasmi · 168×218" className="h-full w-full rounded-t-[84px] text-[#8A7A5A]" imgClassName="rounded-t-[84px]" style={data.coverImage ? undefined : { background: "rgba(184,151,63,.07)" }} />
              </div>
            )}
            <div className="mt-6 font-cg text-lg font-medium tracking-[.14em]">{formatDateDots(data.eventAt, locale)}</div>
            {c.hero.tagline && <div className="mt-3 max-w-[300px] px-4 text-center font-cg text-[15px] italic leading-[1.45] text-[#8A7A5A]">{c.hero.tagline}</div>}
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[.2em] text-[#8A7A5A]">
              <span>{L.scrollHint}</span>
              <span className="h-[22px] w-px bg-[#C9AD5F]" />
            </div>
          </section>

          {/* 02 greeting */}
          {b.greeting && (
            <Reveal as="section" id="greeting" className="flex flex-col items-center gap-3.5 px-8 pb-14 pt-16 text-center">
              {guest && <div className="font-cg text-[22px] font-medium italic leading-none text-[#8A7A5A]">{L.dear} {guest},</div>}
              <H2>{c.greeting.title}</H2>
              <div className="h-px w-12 bg-[#B8973F]" />
              <p className="m-0 text-[15px] leading-[1.75] text-[#4A423A]">{c.greeting.text}</p>
            </Reveal>
          )}

          {/* 03 date */}
          {b.date && (
            <Reveal as="section" id="date" className="flex flex-col items-center gap-5 bg-[#F5EEDF] px-8 py-14">
              {lb(T.dateTitle, L.dateTitle) && <Script>{lb(T.dateTitle, L.dateTitle)}</Script>}
              <div className="text-center">
                <div className="font-cg text-[40px] font-medium leading-[1.05]">{formatDate(data.eventAt, locale)}</div>
                <div className="mt-1.5 text-[13px] font-medium uppercase tracking-[.2em] text-[#8A7A5A]">
                  {formatWeekday(data.eventAt, locale)}{c.hero.showTime ? ` · ${formatTime(data.eventAt)}` : ""}
                </div>
              </div>
              <Calendar
                date={data.eventAt}
                labels={L}
                ui={{
                  wrap: "w-full border border-[#E2D6B8] bg-[#FBF8F1] px-3.5 pb-3.5 pt-[18px]",
                  month: "mb-3 text-center font-cg text-sm font-semibold tracking-[.2em]",
                  dayName: "font-mr text-[10px] font-semibold leading-6 text-[#8A7A5A]",
                  day: "font-mr text-sm text-[#4A423A]",
                  active: "grid h-8 w-8 place-items-center rounded-full bg-[#B8973F] font-mr text-sm font-semibold text-[#FBF8F1]",
                }}
              />
              {b.countdown && (
                <Countdown
                  target={data.eventAt}
                  labels={L}
                  className="grid w-full grid-cols-4 gap-2"
                  cellClassName="border border-[#E2D6B8] bg-[#FBF8F1] px-1 py-3.5 text-center"
                  numberClassName="block font-cg text-[30px] font-medium leading-none tabular-nums"
                  labelClassName="mt-1.5 block text-[9px] font-medium uppercase tracking-[.14em] text-[#8A7A5A]"
                />
              )}
            </Reveal>
          )}

          {/* 04 schedule */}
          {b.schedule && c.schedule.length > 0 && (
            <Reveal as="section" id="schedule" className="flex flex-col items-center gap-7 px-8 py-14">
              <div className="text-center">
                {lb(T.scheduleEyebrow, L.scheduleEyebrow) && <Script>{lb(T.scheduleEyebrow, L.scheduleEyebrow)}</Script>}
                {lb(T.scheduleTitle, L.scheduleTitle) && <H2 className="mt-1.5">{lb(T.scheduleTitle, L.scheduleTitle)}</H2>}
              </div>
              <div className="flex w-full flex-col">
                {c.schedule.map((s, i) => (
                  <div key={i} className="grid min-h-[76px] grid-cols-[72px_24px_1fr] gap-x-3">
                    <div className="pt-0.5 text-right font-cg text-[22px] font-medium leading-none">{s.time}</div>
                    <div className="flex flex-col items-center">
                      <div className="mt-1.5 h-[9px] w-[9px] rounded-full border border-[#B8973F] bg-[#FBF8F1]" />
                      {i < c.schedule.length - 1 && <div className="mt-1 w-px flex-1 bg-[#DCCB9E]" />}
                    </div>
                    <div className="pb-5">
                      <div className="text-[15px] font-semibold leading-[1.3]">{s.title}</div>
                      {s.note && <div className="mt-1 text-[13px] leading-[1.5] text-[#8A7A5A]">{s.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 05 venue */}
          {b.venues && venues.length > 0 && (
            <Reveal as="section" id="venue" className="flex flex-col items-center gap-6 bg-[#F5EEDF] px-8 py-14">
              <div className="text-center">
                {lb(T.venueEyebrow, L.venueEyebrow) && <Script>{lb(T.venueEyebrow, L.venueEyebrow)}</Script>}
                {lb(T.venueTitle, L.venueTitle) && <H2 className="mt-1.5">{lb(T.venueTitle, L.venueTitle)}</H2>}
              </div>
              {venues.map((v, i) => {
                const main = i === venues.length - 1;
                return (
                  <div key={i} className="flex w-full flex-col items-center gap-2.5 border border-[#E2D6B8] bg-[#FBF8F1] p-6 text-center">
                    <Slot
                      src={v.image}
                      preview={slots}
                      label={main ? "Saroy / to'yxona oltin chiziqli illyustratsiyasi, 326×160" : "Oltin chiziqli uy illyustratsiyasi, 326×120"}
                      className={`w-full text-[#8A7A5A] ${main ? "h-40" : "h-[120px]"}`}
                      style={v.image ? undefined : { background: "rgba(184,151,63,.07)", borderColor: "#C9AD5F" }}
                    />
                    {(v.title || v.time) && (
                      <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[.24em] text-[#B8973F]">
                        {[v.title, v.time].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    <div className="font-cg text-2xl font-medium leading-[1.2]">{v.name}</div>
                    <div className="text-sm leading-[1.5] text-[#4A423A]">{v.address}</div>
                    {v.mapUrl && (
                      <a
                        href={v.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-2 flex h-11 items-center justify-center px-6 text-[13px] font-semibold tracking-[.06em] ${main ? "bg-[#B8973F] text-[#FBF8F1]" : "border border-[#B8973F] text-[#B8973F]"}`}
                      >
                        {L.openMap}
                      </a>
                    )}
                  </div>
                );
              })}
            </Reveal>
          )}

          {/* 06 details */}
          {b.details && c.details.length > 0 && (
            <Reveal as="section" id="details" className="flex flex-col items-center gap-6 px-8 py-14">
              {lb(T.detailsTitle, L.detailsTitle) && <H2>{lb(T.detailsTitle, L.detailsTitle)}</H2>}
              <div className="flex w-full flex-col">
                {c.details.map((d, i) => (
                  <div key={i} className="grid grid-cols-[96px_1fr] gap-3 border-t border-[#E2D6B8] py-[18px]">
                    <div className="font-cg text-[19px] font-medium leading-[1.2] text-[#B8973F]">{d.title}</div>
                    <div className="text-sm leading-[1.6] text-[#4A423A]">{d.text}</div>
                  </div>
                ))}
                <div className="border-t border-[#E2D6B8]" />
              </div>
            </Reveal>
          )}

          {/* 07 dresscode */}
          {b.dressCode && (c.dressCode.text || c.dressCode.colors.length > 0) && (
            <Reveal as="section" id="dresscode" className="flex flex-col items-center gap-[18px] bg-[#F5EEDF] px-8 py-14 text-center">
              {lb(T.dressCodeTitle, L.dressCodeTitle) && <H2>{lb(T.dressCodeTitle, L.dressCodeTitle)}</H2>}
              {c.dressCode.text && <p className="m-0 text-sm leading-[1.6] text-[#4A423A]">{c.dressCode.text}</p>}
              {c.dressCode.colors.length > 0 && (
                <div className="mt-1.5 flex gap-3.5">
                  {c.dressCode.colors.map((col) => (
                    <div key={col} className="h-10 w-10 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]" style={{ background: col }} />
                  ))}
                </div>
              )}
            </Reveal>
          )}

          {/* 08 gallery */}
          {b.gallery && (data.gallery.length > 0 || slots) && (
            <Reveal as="section" id="gallery" className="flex flex-col items-center gap-6 px-8 py-14">
              <div className="text-center">
                {lb(T.galleryEyebrow, L.galleryEyebrow) && <Script>{lb(T.galleryEyebrow, L.galleryEyebrow)}</Script>}
                {lb(T.galleryTitle, L.galleryTitle) && <H2 className="mt-1.5">{lb(T.galleryTitle, L.galleryTitle)}</H2>}
              </div>
              <div className="grid w-full grid-cols-2 gap-2.5">
                {(data.gallery.length ? data.gallery : [null, null, null, null]).map((g, i) => (
                  <Slot
                    key={i}
                    src={g}
                    preview={slots}
                    label={`Rasm ${i + 1} · 158×200`}
                    className={`h-[200px] w-full text-[#8A7A5A] ${i % 2 === 1 ? "mt-6" : ""}`}
                    style={g ? undefined : { background: "rgba(184,151,63,.07)", borderColor: "#C9AD5F" }}
                  />
                ))}
              </div>
            </Reveal>
          )}

          {/* 09 rsvp */}
          {b.rsvp && (
            <Reveal as="section" id="rsvp" className="flex flex-col items-center gap-6 bg-[#F5EEDF] px-8 py-14">
              <div className="text-center">
                {lb(T.rsvpTitle, L.rsvpTitle) && <H2>{lb(T.rsvpTitle, L.rsvpTitle)}</H2>}
                {c.rsvp.deadline && <div className="mt-2 text-xs font-medium uppercase tracking-[.14em] text-[#8A7A5A]">{c.rsvp.deadline}</div>}
              </div>
              <RsvpForm invitationId={data.id} guest={guest} askGuests={c.rsvp.askGuests} askNote={c.rsvp.askNote} thanks={c.rsvp.thanks} eventDate={data.eventAt} locale={locale} labels={L} preview={preview} ui={rsvpUi} />
            </Reveal>
          )}

          {/* 10 contacts */}
          {b.contacts && c.contacts.length > 0 && (
            <Reveal as="section" id="contacts" className="flex flex-col items-center gap-6 px-8 py-14">
              {lb(T.contactsTitle, L.contactsTitle) && <H2>{lb(T.contactsTitle, L.contactsTitle)}</H2>}
              <div className="grid w-full grid-cols-2 gap-3">
                {c.contacts.map((k, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 border border-[#E2D6B8] px-3.5 py-5 text-center">
                    <div className="text-[11px] font-medium uppercase tracking-[.2em] text-[#B8973F]">{k.name}</div>
                    <div className="whitespace-nowrap text-[14px] font-medium leading-[1.3]">{k.phone}</div>
                    <div className="flex w-full flex-col gap-2">
                      {k.phone && (
                        <a href={`tel:${k.phone.replace(/\s/g, "")}`} className="flex h-11 items-center justify-center bg-[#B8973F] text-xs font-semibold text-[#FBF8F1]">
                          {L.call}
                        </a>
                      )}
                      {k.telegram && (
                        <a href={`https://t.me/${k.telegram.replace(/^@/, "")}`} className="flex h-11 items-center justify-center border border-[#B8973F] text-xs font-semibold text-[#B8973F]">
                          {L.telegram}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 11 closing */}
          {b.closing && (
            <Reveal as="section" id="closing" className="relative flex flex-col items-center gap-[18px] bg-[#F5EEDF] px-8 pb-20 pt-[72px] text-center">
              <div className="pointer-events-none absolute inset-4 border border-[#C9AD5F]" />
              <div className="font-ps text-[44px] leading-[1.2] text-[#B8973F] [text-wrap:balance]">{c.closing.text}</div>
              <div className="h-px w-12 bg-[#B8973F]" />
              {c.closing.signature.trim() && (
                <div className="font-cg text-xl font-medium italic leading-[1.3] whitespace-pre-line">{c.closing.signature.trim()}</div>
              )}
              <div className="mt-6 text-[10px] uppercase tracking-[.2em] text-[#8A7A5A]">{ROOT_DOMAIN}</div>
            </Reveal>
          )}
        </div>
      </Frame>
    </InvitationShell>
  );
}

export const palette = C;
