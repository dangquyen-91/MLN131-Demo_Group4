import Nav from "@/app/components/Nav";
import ScrollSpyDots from "@/app/components/ScrollSpyDots";
import PullQuote from "@/app/components/PullQuote";
import HeroScene from "@/app/components/scenes/HeroScene";
import ConceptsScene from "@/app/components/scenes/ConceptsScene";
import StructureScene from "@/app/components/scenes/StructureScene";
import ChangeScene from "@/app/components/scenes/ChangeScene";
import AllianceScene from "@/app/components/scenes/AllianceScene";
import VietnamScene from "@/app/components/scenes/VietnamScene";
import TerritoryBattleScene from "@/app/components/scenes/TerritoryBattleScene";
import QuizScene from "@/app/components/scenes/QuizScene";
import AiUsageScene from "@/app/components/scenes/AiUsageScene";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Nav />
      <ScrollSpyDots />

      <HeroScene />
      <ConceptsScene />
      <StructureScene />
      <ChangeScene />

      <PullQuote
        text="Liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức là nền tảng chính trị - xã hội của Nhà nước xã hội chủ nghĩa, là cơ sở bảo đảm thực hiện thắng lợi sự nghiệp xây dựng chủ nghĩa xã hội."
        source="Chương 5, Mục II"
      />

      <AllianceScene />
      <VietnamScene />
      <TerritoryBattleScene />
      <QuizScene />
      <AiUsageScene />

      <footer className="bg-brand-red-dark px-6 py-10 text-center text-sm text-white/50">
        Sản phẩm học tập môn Chủ nghĩa xã hội khoa học — nội dung được xây dựng dựa
        trên Chương 5: Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp.
      </footer>
    </div>
  );
}
