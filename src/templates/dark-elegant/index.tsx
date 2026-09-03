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
 * 03 · DARK-ELEGANT — "Qorong'i elegant"
 * Fon #2B1D16 · matn #F1E6D2 · urg'u #C9A961 · kartochka #F6EEDD · yon fon #1F150F
 * Sarlavha: Marcellus · Kalligrafiya: Alex Brush · Matn: Manrope
 * Bloklar krem kartochka bo'lib to'q fonda turadi (margin 16px, radius 24px)
 */

const ph = { background: "rgba(156,127,62,.08)", borderColor: "#9C7F3E" };
const phDark = { background: "rgba(201,169,97,.06)", borderColor: "rgba(201,169,97,.6)" };

const rsvpUi: RsvpUi = {
  form: "flex w-full flex-col gap-[18px]",
  label: "font-mr text-[11px] font-semibold uppercase tracking-[.12em] text-[#7A6548]",
  input: "h-[46px] w-full rounded-xl border border-[#DCCBA8] bg-white px-3.5 font-mr text-[15px] text-[#2B1D16] outline-none placeholder:text-[#2B1D16]/45",
  option: "flex h-[46px] items-center gap-2.5 rounded-xl border border-[#DCCBA8] bg-white px-4 font-mr text-sm font-medium text-[#2B1D16]",
  optionActive: "flex h-[46px] items-center gap-2.5 rounded-xl bg-[#2B1D16] px-4 font-mr text-sm font-semibold text-[#F1E6D2]",
  dot: "grid h-3.5 w-3.5 place-items-center rounded-full border border-[#9C7F3E]",
  dotActive: "grid h-3.5 w-3.5 place-items-center rounded-full border border-[#C9A961]",
  dotInner: "h-1.5 w-1.5 rounded-full bg-[#C9A961]",
  stepper: "flex h-[46px] overflow-hidden rounded-xl border border-[#DCCBA8] bg-white",
  stepperBtn: "grid w-[46px] place-items-center border-[#DCCBA8] font-mc text-xl text-[#9C7F3E]",
  stepperVal: "flex flex-1 items-center justify-center font-mr text-base font-medium text-[#2B1D16]",
  button: "h-12 rounded-xl bg-[#C9A961] font-mr text-sm font-semibold tracking-[.08em] text-[#2B1D16] disabled:opacity-60",
  sent: "flex w-full flex-col items-center gap-3 rounded-2xl border border-[#DCCBA8] px-5 py-7 text-center",
  sentIcon: "grid h-[52px] w-[52px] place-items-center rounded-full bg-[#2B1D16] font-mc text-[22px] text-[#C9A961]",
  sentTitle: "font-ab text-[44px] leading-none text-[#9C7F3E]",
  sentText: "font-mr text-sm leading-[1.6] text-[#4E3F33]",
};

/** Krem kartochka */
function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <Reveal as="section" id={id} className={`relative mx-4 rounded-3xl bg-[#F6EEDD] text-[#2B1D16] ${className}`}>{children}</Reveal>;
}
function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`text-[11px] font-medium uppercase tracking-[.3em] ${dark ? "text-[#C9A961]" : "text-[#9C7F3E]"}`}>{children}</div>;
}
function H2({ children, light, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`m-0 font-mc text-[26px] leading-[1.2] ${light ? "text-[#F1E6D2]" : "text-[#2B1D16]"} ${className}`}>{children}</h2>;
}

function Oval({ initials, eyebrow, open, hint }: { initials: string; eyebrow: string; open: string; hint: string }) {
  return (
    <div className={`${fontVars} relative flex h-full w-full flex-col items-center justify-center gap-9 overflow-hidden bg-[#2B1D16] font-mr`}>
      <div className="pointer-events-none absolute inset-4 rounded-t-[180px] border border-[#C9A961]/35" />
      <div className="intro-oval relative flex h-[380px] w-[280px] items-center justify-center rounded-[140px] border border-[#C9A961] p-3.5">
        <Slot preview label="lace (to'r) naqsh, oval, 300×400" className="absolute -inset-2.5 !items-start rounded-[150px] !pt-7 text-[9px] text-[#C9A961]" style={{ borderColor: "rgba(201,169,97,.5)" }} />
        <div className="flex h-full w-full flex-col items-center justify-center gap-[18px] rounded-[126px] border border-[#C9A961]/50 text-center">
          <div className="text-[10px] font-medium uppercase tracking-[.3em] text-[#C9A961]">{eyebrow}</div>
          <div className="font-ab text-[52px] leading-[1.1] text-[#F1E6D2]">{initials}</div>
          <div className="mt-1.5 flex h-[46px] items-center justify-center rounded-[23px] border border-[#C9A961] px-8 text-[13px] font-semibold uppercase tracking-[.14em] text-[#C9A961]">{open}</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <div className="text-[13px] font-medium tracking-[.08em] text-[#F1E6D2]/60">{hint}</div>
        <div className="h-7 w-px bg-[#C9A961]" />
      </div>
    </div>
  );
}

export default function DarkElegant({ data, guest, preview, slots }: TemplateProps) {
  const { content: c, locale } = data;
  const L = t(locale);
  const b = c.blocks;
  const T = c.labels;
  const lb = (v: string, d: string) => (v.trim() === "-" ? null : v.trim() || d);
  const initials = c.hero.initials.trim() || `${data.groomName[0] ?? ""} & ${data.brideName[0] ?? ""}`;
  const venues = c.venues.filter((v) => v.name || v.address);

  return (
    <InvitationShell
      showIntro={c.hero.intro}
      music={data.music}
      musicClassName="fixed bottom-9 right-8 z-50 grid h-11 w-11 place-items-center rounded-full bg-[#C9A961] text-[#2B1D16] shadow-[0_4px_12px_rgba(0,0,0,.3)]"
      intro={<Oval initials={initials} eyebrow={L.introEyebrow} open={L.open} hint={L.tapToOpen} />}
    >
      <Frame color="#1F150F">
        <div className={`${fontVars} relative flex min-h-dvh flex-col gap-5 bg-[#2B1D16] pb-5 font-mr text-[#F1E6D2]`}>
          {/* 01 cover */}
          <section id="cover" className="relative flex h-[844px] flex-col items-center justify-center overflow-hidden">
            <Slot preview={slots} label="Oltin burchak naqshi, 150×150" className="absolute left-0 top-0 h-[150px] w-[150px] text-[9px] text-[#C9A961]" style={phDark} />
            <Slot preview={slots} label="Oltin burchak naqshi, 150×150 (aylantirilgan)" className="absolute bottom-0 right-0 h-[150px] w-[150px] text-[9px] text-[#C9A961]" style={phDark} />
            <div className="relative flex h-[520px] w-[300px] flex-col items-center justify-center rounded-[150px] border border-[#C9A961] p-6">
              <Slot preview={slots} label="lace oval ramka, 324×544" className="absolute -inset-3 !items-end rounded-[162px] !pb-1.5 text-[9px] text-[#C9A961]" style={{ borderColor: "rgba(201,169,97,.4)" }} />
              <Eyebrow dark>{c.hero.eyebrow || L.coverEyebrow}</Eyebrow>
              {c.hero.title ? <div className="mt-[26px] max-w-[240px] text-center font-ab text-[46px] leading-[1.15]">{c.hero.title}</div> : (<><div className="mt-[26px] font-ab text-[64px] leading-[1.1]">{data.groomName}</div>
              <div className="my-1 font-mc text-[26px] leading-none text-[#C9A961]">&amp;</div>
              <div className="font-ab text-[64px] leading-[1.1]">{data.brideName}</div></>)}
              {(data.coverImage || slots) && (
                <Slot src={data.coverImage} preview={slots} label="Kelin-kuyov rasmi, 130×150" className="mt-[22px] h-[150px] w-[130px] rounded-t-[65px] text-[9px] text-[#C9A961]" imgClassName="rounded-t-[65px]" style={data.coverImage ? undefined : phDark} />
              )}
              <div className="mt-[22px] font-mc text-[15px] tracking-[.18em]">{formatDateDots(data.eventAt, locale)}</div>
              {c.hero.tagline && <div className="mt-3 max-w-[240px] text-center font-cg text-[14px] italic leading-[1.45] text-[#F1E6D2]/70">{c.hero.tagline}</div>}
            </div>
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[.2em] text-[#F1E6D2]/55">
              <span>{L.scrollHint}</span>
              <span className="h-[22px] w-px bg-[#C9A961]" />
            </div>
          </section>

          {/* 02 greeting */}
          {b.greeting && (
            <Card id="greeting" className="flex flex-col items-center gap-3.5 rounded-t-[120px] px-7 pb-12 pt-16 text-center">
              {guest && <div className="font-ab text-[32px] leading-none text-[#9C7F3E]">{L.dear} {guest},</div>}
              <H2>{c.greeting.title}</H2>
              <div className="h-px w-12 bg-[#C9A961]" />
              <p className="m-0 text-[15px] leading-[1.75] text-[#4E3F33]">{c.greeting.text}</p>
            </Card>
          )}

          {/* 03 date */}
          {b.date && (
            <Card id="date" className="flex flex-col items-center gap-5 px-6 py-12">
              {lb(T.dateTitle, L.dateTitle) && <Eyebrow>{lb(T.dateTitle, L.dateTitle)}</Eyebrow>}
              <div className="text-center">
                <div className="font-mc text-[34px] leading-[1.1]">{formatDate(data.eventAt, locale)}</div>
                <div className="mt-2 text-[13px] font-medium uppercase tracking-[.2em] text-[#7A6548]">
                  {formatWeekday(data.eventAt, locale)} · {formatTime(data.eventAt)}
                </div>
              </div>
              <Calendar
                date={data.eventAt}
                labels={L}
                ui={{
                  wrap: "w-full border-y border-[#DCCBA8] px-1 py-4",
                  month: "mb-3 text-center font-mc text-[13px] tracking-[.24em]",
                  dayName: "font-mr text-[10px] font-semibold leading-6 text-[#9C7F3E]",
                  day: "font-mr text-sm text-[#4E3F33]",
                  active: "grid h-8 w-8 place-items-center rounded-full bg-[#2B1D16] font-mr text-sm font-semibold text-[#C9A961]",
                }}
              />
              {b.countdown && (
                <Countdown
                  target={data.eventAt}
                  labels={L}
                  className="grid w-full grid-cols-4 gap-2"
                  cellClassName="rounded-[14px] bg-[#2B1D16] px-1 py-3.5 text-center"
                  numberClassName="block font-mc text-[28px] leading-none text-[#F1E6D2] tabular-nums"
                  labelClassName="mt-1.5 block text-[9px] font-medium uppercase tracking-[.14em] text-[#C9A961]"
                />
              )}
            </Card>
          )}

          {/* 04 schedule — to'q fonda */}
          {b.schedule && c.schedule.length > 0 && (
            <Reveal as="section" id="schedule" className="flex flex-col items-center gap-7 px-8 py-10">
              <div className="text-center">
                {lb(T.scheduleEyebrow, L.scheduleEyebrow) && <Eyebrow dark>{lb(T.scheduleEyebrow, L.scheduleEyebrow)}</Eyebrow>}
                {lb(T.scheduleTitle, L.scheduleTitle) && <H2 light className="mt-2.5">{lb(T.scheduleTitle, L.scheduleTitle)}</H2>}
              </div>
              <div className="flex w-full flex-col">
                {c.schedule.map((s, i) => (
                  <div key={i} className="grid min-h-[76px] grid-cols-[72px_24px_1fr] gap-x-3">
                    <div className="pt-0.5 text-right font-mc text-xl leading-none text-[#C9A961]">{s.time}</div>
                    <div className="flex flex-col items-center">
                      <div className="mt-1.5 h-[9px] w-[9px] rounded-full bg-[#C9A961]" />
                      {i < c.schedule.length - 1 && <div className="mt-1 w-px flex-1 bg-[#C9A961]/35" />}
                    </div>
                    <div className="pb-5">
                      <div className="text-[15px] font-semibold leading-[1.3]">{s.title}</div>
                      {s.note && <div className="mt-1 text-[13px] leading-[1.5] text-[#F1E6D2]/60">{s.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 05 venue */}
          {b.venues && venues.length > 0 && (
            <Reveal as="section" id="venue" className="flex flex-col items-center gap-4 px-4 py-5">
              <div className="py-3 text-center">
                {lb(T.venueEyebrow, L.venueEyebrow) && <Eyebrow dark>{lb(T.venueEyebrow, L.venueEyebrow)}</Eyebrow>}
                {lb(T.venueTitle, L.venueTitle) && <H2 light className="mt-2.5">{lb(T.venueTitle, L.venueTitle)}</H2>}
              </div>
              {venues.map((v, i) => {
                const main = i === venues.length - 1;
                return (
                  <div key={i} className="flex w-full flex-col items-center gap-2.5 rounded-3xl bg-[#F6EEDD] p-6 text-center text-[#2B1D16]">
                    <Slot src={v.image} preview={slots} label={main ? "To'yxona kechki rasmi, 310×170" : "Uy rasmi yoki oltin chiziqli illyustratsiya, 310×120"} className={`w-full rounded-[14px] text-[#7A6548] ${main ? "h-[170px]" : "h-[120px]"}`} imgClassName="rounded-[14px]" style={v.image ? undefined : ph} />
                    {(v.title || v.time) && <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[.24em] text-[#9C7F3E]">{[v.title, v.time].filter(Boolean).join(" · ")}</div>}
                    <div className="font-mc text-[22px] leading-[1.2]">{v.name}</div>
                    <div className="text-sm leading-[1.5] text-[#4E3F33]">{v.address}</div>
                    {v.mapUrl && (
                      <a href={v.mapUrl} target="_blank" rel="noreferrer" className={`mt-2 flex h-11 items-center justify-center rounded-[22px] px-6 text-[13px] font-semibold tracking-[.04em] ${main ? "bg-[#2B1D16] text-[#C9A961]" : "border border-[#2B1D16] text-[#2B1D16]"}`}>
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
            <Card id="details" className="flex flex-col items-center gap-5 px-6 py-11">
              {lb(T.detailsTitle, L.detailsTitle) && <H2>{lb(T.detailsTitle, L.detailsTitle)}</H2>}
              <div className="flex w-full flex-col">
                {c.details.map((d, i) => (
                  <div key={i} className="grid grid-cols-[96px_1fr] gap-3 border-t border-[#DCCBA8] py-4">
                    <div className="font-mc text-base leading-[1.3] text-[#9C7F3E]">{d.title}</div>
                    <div className="text-sm leading-[1.6] text-[#4E3F33]">{d.text}</div>
                  </div>
                ))}
                <div className="border-t border-[#DCCBA8]" />
              </div>
            </Card>
          )}

          {/* 07 dresscode — to'q fonda */}
          {b.dressCode && (c.dressCode.text || c.dressCode.colors.length > 0) && (
            <Reveal as="section" id="dresscode" className="flex flex-col items-center gap-[18px] px-8 py-10 text-center">
              {lb(T.dressCodeTitle, L.dressCodeTitle) && <H2 light>{lb(T.dressCodeTitle, L.dressCodeTitle)}</H2>}
              {c.dressCode.text && <p className="m-0 text-sm leading-[1.6] text-[#F1E6D2]/70">{c.dressCode.text}</p>}
              {c.dressCode.colors.length > 0 && (
                <div className="mt-1.5 flex gap-3.5">
                  {c.dressCode.colors.map((col) => (
                    <div key={col} className="h-10 w-10 rounded-full shadow-[inset_0_0_0_1px_rgba(201,169,97,.4)]" style={{ background: col }} />
                  ))}
                </div>
              )}
            </Reveal>
          )}

          {/* 08 gallery */}
          {b.gallery && (data.gallery.length > 0 || slots) && (
            <Card id="gallery" className="flex flex-col items-center gap-[22px] px-5 py-11">
              {lb(T.galleryTitle, L.galleryTitle) && <H2>{lb(T.galleryTitle, L.galleryTitle)}</H2>}
              <div className="grid w-full grid-cols-2 gap-2.5">
                {(data.gallery.length ? data.gallery : [null, null, null, null, null]).map((g, i) => {
                  const wide = i % 5 === 2;
                  return (
                    <Slot key={i} src={g} preview={slots} label={`Rasm ${i + 1} · ${wide ? "318×210 (keng)" : "154×190"}`} className={`w-full rounded-[14px] text-[#7A6548] ${wide ? "col-span-2 h-[210px]" : "h-[190px]"}`} imgClassName="rounded-[14px]" style={g ? undefined : ph} />
                  );
                })}
              </div>
            </Card>
          )}

          {/* 09 rsvp */}
          {b.rsvp && (
            <Card id="rsvp" className="flex flex-col items-center gap-[22px] px-6 py-11">
              <div className="text-center">
                {lb(T.rsvpTitle, L.rsvpTitle) && <h2 className="m-0 font-mc text-2xl leading-[1.25]">{lb(T.rsvpTitle, L.rsvpTitle)}</h2>}
                {c.rsvp.deadline && <div className="mt-2 text-xs font-medium uppercase tracking-[.14em] text-[#9C7F3E]">{c.rsvp.deadline}</div>}
              </div>
              <RsvpForm invitationId={data.id} guest={guest} askGuests={c.rsvp.askGuests} askNote={c.rsvp.askNote} thanks={c.rsvp.thanks} eventDate={data.eventAt} locale={locale} labels={L} preview={preview} ui={rsvpUi} />
            </Card>
          )}

          {/* 10 contacts — to'q fonda */}
          {b.contacts && c.contacts.length > 0 && (
            <Reveal as="section" id="contacts" className="flex flex-col items-center gap-[22px] px-4 py-10">
              {lb(T.contactsTitle, L.contactsTitle) && <H2 light>{lb(T.contactsTitle, L.contactsTitle)}</H2>}
              <div className="grid w-full grid-cols-2 gap-3">
                {c.contacts.map((k, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 rounded-[20px] border border-[#C9A961]/40 px-3.5 py-5 text-center">
                    <div className="text-[11px] font-medium uppercase tracking-[.2em] text-[#C9A961]">{k.name}</div>
                    <div className="whitespace-nowrap text-[14px] font-medium leading-[1.3]">{k.phone}</div>
                    <div className="flex w-full flex-col gap-2">
                      {k.phone && (
                        <a href={`tel:${k.phone.replace(/\s/g, "")}`} className="flex h-11 items-center justify-center rounded-xl bg-[#C9A961] text-xs font-semibold text-[#2B1D16]">
                          {L.call}
                        </a>
                      )}
                      {k.telegram && (
                        <a href={`https://t.me/${k.telegram.replace(/^@/, "")}`} className="flex h-11 items-center justify-center rounded-xl border border-[#C9A961] text-xs font-semibold text-[#C9A961]">
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
            <Card id="closing" className="flex flex-col items-center gap-[18px] rounded-b-[120px] px-7 pb-20 pt-14 text-center">
              <div className="font-ab text-[48px] leading-[1.2] text-[#9C7F3E] [text-wrap:balance]">{c.closing.text}</div>
              <div className="h-px w-12 bg-[#C9A961]" />
              <div className="font-mc text-[17px] leading-[1.4]">
                {c.closing.signature.trim() ? (
                  <span className="whitespace-pre-line">{c.closing.signature.trim()}</span>
                ) : (
                  <>
                    {L.withLove}
                    <br />
                    {data.groomName} {L.and} {data.brideName}
                  </>
                )}
              </div>
              <div className="mt-5 text-[10px] uppercase tracking-[.2em] text-[#7A6548]">{ROOT_DOMAIN}</div>
            </Card>
          )}
        </div>
      </Frame>
    </InvitationShell>
  );
}
