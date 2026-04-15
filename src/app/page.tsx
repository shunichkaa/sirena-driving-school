import { ConsultationDialogProvider } from "@/features/book-consultation";
import { HomePageContent } from "@/widgets/home-page";

export default function Home() {
  return (
    <ConsultationDialogProvider>
      <HomePageContent />
    </ConsultationDialogProvider>
  );
}
