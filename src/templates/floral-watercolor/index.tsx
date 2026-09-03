import { Calendar } from "@/components/invitation/Calendar";
import { Countdown } from "@/components/invitation/Countdown";
import { Frame } from "@/components/invitation/Frame";
import { InvitationShell } from "@/components/invitation/InvitationShell";
import { Reveal } from "@/components/invitation/Reveal";
import { RsvpForm, type RsvpUi } from "@/components/invitation/RsvpForm";
import { Slot } from "@/components/invitation/Slot";
import { formatDate, formatDateDots, formatDateNumeric, formatTime, formatWeekday, t } from "@/lib/i18n";
import { ROOT_DOMAIN } from "@/lib/site";
import { fontVars } from "../fonts";
import type { TemplateProps } from "../types";

/**
 * 02 · FLORAL-WATERCOLOR — "Gulli akvarel"
 * Fon #FFFFFF · matn #3B3A36 · urg'u #7A8C6E · 2-urg'u #C2A36B · pushti #F1D9D6 · yon fon #EEF0E6
 * Kalligrafiya: Great Vibes · Sarlavha: Cormorant Garamond 500 · Matn: Manrope
 * Akvarel gullar — assetlar (hozircha preview'da shtrix joy)
 */

const shadow = "shadow-[0_2px_10px_rgba(90,100,70,.08)]";
const ph = { background: "rgba(122,140,110,.08)", borderColor: "#7A8C6E" };

const rsvpUi: RsvpUi = {
  form: `flex w-full flex-col gap-[18px] rounded-[20px] bg-white p-6 ${shadow}`,
  label: "font-mr text-[11px] font-semibold uppercase tracking-[.12em] text-[#7A8C6E]",
  input: "h-[46px] w-full rounded-xl border border-[#DDE2D3] bg-white px-3.5 font-mr text-[15px] text-[#3B3A36] outline-none placeholder:text-[#3B3A36]/45",
  option: "flex h-[46px] items-center gap-2.5 rounded-[23px] border border-[#DDE2D3] px-4 font-mr text-sm font-medium text-[#3B3A36]",
  optionActive: "flex h-[46px] items-center gap-2.5 rounded-[23px] bg-[#7A8C6E] px-4 font-mr text-sm font-semibold text-white",
  dot: "grid h-3.5 w-3.5 place-items-center rounded-full border border-[#7A8C6E]",
  dotActive: "grid h-3.5 w-3.5 place-items-center rounded-full border border-white",
  dotInner: "h-1.5 w-1.5 rounded-full bg-white",
  stepper: "flex h-[46px] overflow-hidden rounded-xl border border-[#DDE2D3] bg-white",
  stepperBtn: "grid w-[46px] place-items-center border-[#DDE2D3] font-cg text-xl text-[#7A8C6E]",
  stepperVal: "flex flex-1 items-center justify-center font-mr text-base font-medium text-[#3B3A36]",
  button: "h-12 rounded-3xl bg-[#3B3A36] font-mr text-sm font-semibold tracking-[.06em] text-white disabled:opacity-60",
  sent: `flex w-full flex-col items-center gap-3 rounded-[20px] bg-white px-6 py-8 text-center ${shadow}`,
  sentIcon: "grid h-[52px] w-[52px] place-items-center rounded-full bg-[#F1D9D6] font-cg text-[22px] text-[#3B3A36]",
  sentTitle: "font-gv text-[44px] leading-none text-[#7A8C6E]",
  sentText: "font-mr text-sm leading-[1.6] text-[#5C5A54]",
};

function Script({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-gv text-[40px] leading-none text-[#7A8C6E] ${className}`}>{children}</div>;
}

function Card({ initials, eyebrow, hint, date }: { initials: string; eyebrow: string; hint: string; date: string }) {
  return (
    <div className={`${fontVars} relative flex h-full w-full flex-col items-center justify-center gap-9 overflow-hidden bg-white font-mr`}>
      <Slot preview label="Akvarel oq atirgul + evkalipt, chap yuqori, 220×280" className="intro-decor intro-decor-l absolute -left-[30px] -top-[30px] h-[280px] w-[220px] rounded-br-[140px] text-[#7A8C6E]" style={ph} />
      <Slot preview label="Akvarel gul dastasi, o'ng past, 240×300" className="intro-decor intro-decor-r absolute -bottom-[30px] -right-[30px] h-[300px] w-[240px] rounded-tl-[150px] text-[#7A8C6E]" style={ph} />
      <div className="intro-card relative flex h-[340px] w-[260px] flex-col items-center justify-center gap-3.5 border border-[#DDE2D3] bg-[#FFFDF9] shadow-[0_16px_40px_rgba(90,100,70,.14)]">
        <div className="pointer-events-none absolute inset-2.5 border border-[#E7E2D2]" />
        <div className="text-[10px] font-medium uppercase tracking-[.3em] text-[#7A8C6E]">{eyebrow}</div>
        <div className="font-gv text-[44px] leading-[1.1] text-[#3B3A36]">{initials}</div>
        <div className="h-px w-9 bg-[#C2A36B]" />
        <div className="font-cg text-sm font-medium tracking-[.16em] text-[#3B3A36]">{date}</div>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <div className="text-[13px] font-medium tracking-[.08em] text-[#7A8C6E]">{hint}</div>
        <div className="h-7 w-px bg-[#C2A36B]" />
      </div>
    </div>
  );
}

export default function FloralWatercolor({ data, guest, preview, slots }: TemplateProps) {
  const { content: c, locale } = data;
  const L = t(locale);
  const b = c.blocks;
  const T = c.labels;
  const lb = (v: string, d: string) => (v.trim() === "-" ? null : v.trim() || d);
  const initials = c.hero.initials.trim() || (data.groomName || data.brideName ? `${data.groomName[0] ?? ""} & ${data.brideName[0] ?? ""}` : "♥");
  const venues = c.venues.filter((v) => v.name || v.address);

  return (
    <InvitationShell
      showIntro={c.hero.intro}
      music={data.music}
      musicClassName="fixed bottom-9 right-8 z-50 grid h-11 w-11 place-items-center rounded-full bg-[#7A8C6E] text-white shadow-[0_4px_12px_rgba(90,100,70,.25)]"
      intro={<Card initials={initials} eyebrow={L.introEyebrow} hint={L.tapToOpen} date={formatDateNumeric(data.eventAt)} />}
    >
      <Frame color="#EEF0E6">
        <div className={`${fontVars} relative min-h-dvh bg-white font-mr text-[#3B3A36]`}>
          {/* 01 cover */}
          <section id="cover" className="relative flex h-[844px] flex-col items-center justify-center overflow-hidden">
            <Slot preview={slots} label="Akvarel oq atirgul, chap yuqori, 200×260" className="absolute -left-5 -top-5 h-[260px] w-[200px] rounded-br-[120px] text-[#7A8C6E]" style={ph} />
            <Slot preview={slots} label="Evkalipt + och pushti gul, o'ng past, 220×260" className="absolute -bottom-5 -right-[30px] h-[260px] w-[220px] rounded-tl-[130px] text-[#7A8C6E]" style={ph} />
            <div className="text-[11px] font-medium uppercase tracking-[.32em] text-[#7A8C6E]">{c.hero.eyebrow || L.coverEyebrow}</div>
            {c.hero.title ? <div className="relative mt-6 max-w-[330px] text-center font-gv text-[50px] leading-[1.15]">{c.hero.title}</div> : (<><div className="mt-6 font-gv text-[66px] leading-[1.05]">{data.groomName}</div>
            <div className="my-0.5 font-gv text-[40px] leading-none text-[#C2A36B]">&amp;</div>
            <div className="font-gv text-[66px] leading-[1.05]">{data.brideName}</div></>)}
            {(data.coverImage || slots) && (
              <Slot src={data.coverImage} preview={slots} label="Kelin-kuyov rasmi · oval, 190×230" className="mt-[30px] h-[230px] w-[190px] rounded-[95px] text-[#7A8C6E]" imgClassName="rounded-[95px]" style={data.coverImage ? undefined : { background: "rgba(194,163,107,.08)", borderColor: "#C2A36B" }} />
            )}
            <div className="mt-[26px] font-cg text-base font-medium tracking-[.16em]">{formatDateDots(data.eventAt, locale)}</div>
            {c.hero.tagline && <div className="relative mt-3 max-w-[300px] px-4 text-center font-cg text-[15px] italic leading-[1.45] text-[#7A8C6E]">{c.hero.tagline}</div>}
            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[.2em] text-[#7A8C6E]">
              <span>{L.scrollHint}</span>
              <span className="h-[22px] w-px bg-[#C2A36B]" />
            </div>
          </section>

          {/* 02 greeting */}
          {b.greeting && (
            <Reveal as="section" id="greeting" className="flex flex-col items-center gap-3.5 px-8 pb-14 pt-16 text-center">
              {guest && <div className="font-gv text-[30px] leading-none text-[#7A8C6E]">{L.dear} {guest},</div>}
              <h2 className="m-0 font-cg text-[30px] font-medium leading-[1.15]">{c.greeting.title}</h2>
              <Slot preview={slots} label="barg ajratgich 120×14" className="h-3.5 w-[120px] !p-0 text-[8px] text-[#7A8C6E]" style={{ background: "rgba(194,163,107,.08)", borderColor: "#C2A36B" }} />
              <p className="m-0 text-[15px] leading-[1.75] text-[#5C5A54]">{c.greeting.text}</p>
            </Reveal>
          )}

          {/* 03 date */}
          {b.date && (
            <Reveal as="section" id="date" className="flex flex-col items-center gap-5 bg-[#F6F7F1] px-8 py-14">
              {lb(T.dateTitle, L.dateTitle) && <Script>{lb(T.dateTitle, L.dateTitle)}</Script>}
              <div className="text-center">
                <div className="font-cg text-[40px] font-medium leading-[1.05]">{formatDate(data.eventAt, locale)}</div>
                <div className="mt-1.5 text-[13px] font-medium uppercase tracking-[.2em] text-[#7A8C6E]">
                  {formatWeekday(data.eventAt, locale)} · {formatTime(data.eventAt)}
                </div>
              </div>
              <Calendar
                date={data.eventAt}
                labels={L}
                ui={{
                  wrap: `w-full rounded-2xl bg-white px-3.5 pb-3.5 pt-[18px] ${shadow}`,
                  month: "mb-3 text-center font-cg text-sm font-semibold tracking-[.2em]",
                  dayName: "font-mr text-[10px] font-semibold leading-6 text-[#7A8C6E]",
                  day: "font-mr text-sm text-[#5C5A54]",
                  active: "grid h-8 w-8 place-items-center rounded-full border border-[#C2A36B] bg-[#F1D9D6] font-mr text-sm font-semibold text-[#3B3A36]",
                }}
              />
              {b.countdown && (
                <Countdown
                  target={data.eventAt}
                  labels={L}
                  className="grid w-full grid-cols-4 gap-2"
                  cellClassName={`rounded-xl bg-white px-1 py-3.5 text-center ${shadow}`}
                  numberClassName="block font-cg text-[30px] font-medium leading-none tabular-nums"
                  labelClassName="mt-1.5 block text-[9px] font-medium uppercase tracking-[.14em] text-[#7A8C6E]"
                />
              )}
            </Reveal>
          )}

          {/* 04 schedule */}
          {b.schedule && c.schedule.length > 0 && (
            <Reveal as="section" id="schedule" className="relative flex flex-col items-center gap-7 overflow-hidden px-8 py-14">
              <Slot preview={slots} label="Evkalipt shoxi, 140×180" className="absolute -right-10 top-2.5 h-[180px] w-[140px] rounded-l-[70px] text-[9px] text-[#7A8C6E]" style={{ background: "rgba(122,140,110,.06)", borderColor: "#7A8C6E" }} />
              {lb(T.scheduleTitle, L.scheduleTitle) && <Script>{lb(T.scheduleTitle, L.scheduleTitle)}</Script>}
              <div className="flex w-full flex-col">
                {c.schedule.map((s, i) => (
                  <div key={i} className="grid min-h-[76px] grid-cols-[72px_24px_1fr] gap-x-3">
                    <div className="pt-0.5 text-right font-cg text-[22px] font-medium leading-none">{s.time}</div>
                    <div className="flex flex-col items-center">
                      <div className="mt-1.5 h-2.5 w-2.5 rounded-full border border-[#C2A36B] bg-[#F1D9D6]" />
                      {i < c.schedule.length - 1 && <div className="mt-1 w-px flex-1 bg-[#DDE2D3]" />}
                    </div>
                    <div className="pb-5">
                      <div className="text-[15px] font-semibold leading-[1.3]">{s.title}</div>
                      {s.note && <div className="mt-1 text-[13px] leading-[1.5] text-[#7A8C6E]">{s.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 05 venue */}
          {b.venues && venues.length > 0 && (
            <Reveal as="section" id="venue" className="flex flex-col items-center gap-6 bg-[#F6F7F1] px-8 py-14">
              {lb(T.venueTitle, L.venueTitle) && <Script>{lb(T.venueTitle, L.venueTitle)}</Script>}
              {venues.map((v, i) => {
                const main = i === venues.length - 1;
                return (
                  <div key={i} className={`flex w-full flex-col items-center gap-2.5 rounded-[20px] bg-white p-6 text-center ${shadow}`}>
                    <Slot
                      src={v.image}
                      preview={slots}
                      label={main ? "Akvarel to'yxona binosi illyustratsiyasi, 278×170" : "Akvarel uy illyustratsiyasi, 278×120"}
                      className={`w-full rounded-xl text-[#7A8C6E] ${main ? "h-[170px]" : "h-[120px]"}`}
                      imgClassName="rounded-xl"
                      style={v.image ? undefined : ph}
                    />
                    {(v.title || v.time) && <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[.24em] text-[#7A8C6E]">{[v.title, v.time].filter(Boolean).join(" · ")}</div>}
                    <div className="font-cg text-2xl font-medium leading-[1.2]">{v.name}</div>
                    <div className="text-sm leading-[1.5] text-[#5C5A54]">{v.address}</div>
                    {v.mapUrl && (
                      <a href={v.mapUrl} target="_blank" rel="noreferrer" className={`mt-2 flex h-11 items-center justify-center rounded-[22px] px-6 text-[13px] font-semibold tracking-[.04em] ${main ? "bg-[#7A8C6E] text-white" : "border border-[#7A8C6E] text-[#7A8C6E]"}`}>
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
              {lb(T.detailsTitle, L.detailsTitle) && <Script>{lb(T.detailsTitle, L.detailsTitle)}</Script>}
              <div className="flex w-full flex-col gap-3">
                {c.details.map((d, i) => (
                  <div key={i} className="flex flex-col gap-1 rounded-2xl bg-[#F6F7F1] px-5 py-[18px]">
                    <div className="font-cg text-[19px] font-medium leading-[1.2]">{d.title}</div>
                    <div className="text-sm leading-[1.6] text-[#5C5A54]">{d.text}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* 07 dresscode */}
          {b.dressCode && (c.dressCode.text || c.dressCode.colors.length > 0) && (
            <Reveal as="section" id="dresscode" className="flex flex-col items-center gap-[18px] bg-[#F6F7F1] px-8 py-14 text-center">
              {lb(T.dressCodeTitle, L.dressCodeTitle) && <Script>{lb(T.dressCodeTitle, L.dressCodeTitle)}</Script>}
              {c.dressCode.text && <p className="m-0 text-sm leading-[1.6] text-[#5C5A54]">{c.dressCode.text}</p>}
              {c.dressCode.colors.length > 0 && (
                <div className="mt-1.5 flex gap-3.5">
                  {c.dressCode.colors.map((col) => (
                    <div key={col} className="h-10 w-10 rounded-full shadow-[inset_0_0_0_1px_#DDE2D3]" style={{ background: col }} />
                  ))}
                </div>
              )}
            </Reveal>
          )}

          {/* 08 gallery — gorizontal karusel */}
          {b.gallery && (data.gallery.length > 0 || slots) && (
            <Reveal as="section" id="gallery" className="flex flex-col gap-6 overflow-hidden py-14 pl-8">
              {lb(T.galleryTitle, L.galleryTitle) && <Script className="pr-8 text-center">{lb(T.galleryTitle, L.galleryTitle)}</Script>}
              <div className="snap-x-carousel flex gap-3 overflow-x-auto pr-8">
                {(data.gallery.length ? data.gallery : [null, null, null, null, null]).map((g, i) => (
                  <Slot key={i} src={g} preview={slots} label={`Rasm ${i + 1} · 240×300`} className="h-[300px] w-[240px] flex-none rounded-t-[120px] rounded-b-2xl text-[#7A8C6E]" imgClassName="rounded-t-[120px] rounded-b-2xl" style={g ? undefined : ph} />
                ))}
              </div>
              <div className="flex justify-center gap-1.5 pr-8">
                {(data.gallery.length ? data.gallery : [1, 2, 3, 4, 5]).map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-[3px] ${i === 0 ? "w-4 bg-[#7A8C6E]" : "w-1.5 bg-[#DDE2D3]"}`} />
                ))}
              </div>
            </Reveal>
          )}

          {/* 09 rsvp */}
          {b.rsvp && (
            <Reveal as="section" id="rsvp" className="flex flex-col items-center gap-6 bg-[#F6F7F1] px-8 py-14">
              <div className="text-center">
                {lb(T.rsvpTitle, L.rsvpTitle) && <Script className="[text-wrap:balance]">{lb(T.rsvpTitle, L.rsvpTitle)}</Script>}
                {c.rsvp.deadline && <div className="mt-2.5 text-xs font-medium uppercase tracking-[.14em] text-[#7A8C6E]">{c.rsvp.deadline}</div>}
              </div>
              <RsvpForm invitationId={data.id} guest={guest} askGuests={c.rsvp.askGuests} askNote={c.rsvp.askNote} thanks={c.rsvp.thanks} eventDate={data.eventAt} locale={locale} labels={L} preview={preview} ui={rsvpUi} />
            </Reveal>
          )}

          {/* 10 contacts */}
          {b.contacts && c.contacts.length > 0 && (
            <Reveal as="section" id="contacts" className="flex flex-col items-center gap-6 px-8 py-14">
              {lb(T.contactsTitle, L.contactsTitle) && <Script>{lb(T.contactsTitle, L.contactsTitle)}</Script>}
              <div className="grid w-full grid-cols-2 gap-3">
                {c.contacts.map((k, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 rounded-2xl bg-[#F6F7F1] px-3.5 py-5 text-center">
                    <div className="text-[11px] font-medium uppercase tracking-[.2em] text-[#7A8C6E]">{k.name}</div>
                    <div className="whitespace-nowrap text-[14px] font-medium leading-[1.3]">{k.phone}</div>
                    <div className="flex w-full flex-col gap-2">
                      {k.phone && (
                        <a href={`tel:${k.phone.replace(/\s/g, "")}`} className="flex h-11 items-center justify-center rounded-[22px] bg-[#7A8C6E] text-xs font-semibold text-white">
                          {L.call}
                        </a>
                      )}
                      {k.telegram && (
                        <a href={`https://t.me/${k.telegram.replace(/^@/, "")}`} className="flex h-11 items-center justify-center rounded-[22px] border border-[#7A8C6E] text-xs font-semibold text-[#7A8C6E]">
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
            <Reveal as="section" id="closing" className="relative flex flex-col items-center gap-[18px] overflow-hidden bg-[#F6F7F1] px-8 pb-[90px] pt-20 text-center">
              <Slot preview={slots} label="Akvarel gul, chap past, 180×200" className="absolute -bottom-[30px] -left-[30px] h-[200px] w-[180px] rounded-tr-[100px] text-[9px] text-[#7A8C6E]" style={ph} />
              <Slot preview={slots} label="Akvarel gul, o'ng yuqori, 180×200" className="absolute -right-[30px] -top-[30px] h-[200px] w-[180px] rounded-bl-[100px] text-[9px] text-[#7A8C6E]" style={ph} />
              <div className="relative font-gv text-[50px] leading-[1.2] [text-wrap:balance]">{c.closing.text}</div>
              <div className="relative font-cg text-xl font-medium italic leading-[1.3] text-[#5C5A54]">
                {c.closing.signature.trim() ? (
                  <span className="whitespace-pre-line">{c.closing.signature.trim()}</span>
                ) : (
                  <>
                    {L.withLove}
                    <br />
                    {[data.groomName, data.brideName].filter(Boolean).join(` ${L.and} `)}
                  </>
                )}
              </div>
              <div className="relative mt-6 text-[10px] uppercase tracking-[.2em] text-[#7A8C6E]">{ROOT_DOMAIN}</div>
            </Reveal>
          )}
        </div>
      </Frame>
    </InvitationShell>
  );
}
