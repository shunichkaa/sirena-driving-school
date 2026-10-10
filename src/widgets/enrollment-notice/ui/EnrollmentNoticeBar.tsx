import { siteData } from "@/shared/config/site-data";

export function EnrollmentNoticeBar() {
  return (
    <div
      className="bg-[#B42318] px-4 py-3 text-center text-sm font-semibold leading-snug text-white md:text-base"
      role="region"
      aria-label={siteData.enrollmentNotice.title}
    >
      {siteData.enrollmentNotice.text}
    </div>
  );
}
