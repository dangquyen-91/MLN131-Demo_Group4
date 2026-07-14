"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type TeamId = "team1" | "team2" | "team3" | "team4";

interface Team {
  id: TeamId;
  name: string;
  color: string;
  soft: string;
  text: string;
}

interface TeamState {
  code: string;
  target: string;
  letters: string[];
  bag: string[];
  answer: string;
  solved: boolean;
  score: number;
}

interface Puzzle {
  code: string;
  target: string;
}

interface Question {
  prompt: string;
  answer: string;
  level: "Dễ" | "Vừa" | "Khó";
  reward: 1 | 2;
}

interface Snapshot {
  states: Record<TeamId, TeamState>;
  teamNames: Record<TeamId, string>;
  activeTeam: number;
  questionIndex: number;
  message: string;
  finished: boolean;
  gameStarted: boolean;
  selectedChoice: string | null;
}

const TEAMS: Team[] = [
  {
    id: "team1",
    name: "Nhóm 1",
    color: "#dc2626",
    soft: "#fee2e2",
    text: "#7f1d1d",
  },
  {
    id: "team2",
    name: "Nhóm 2",
    color: "#d97706",
    soft: "#fef3c7",
    text: "#78350f",
  },
  {
    id: "team3",
    name: "Nhóm 3",
    color: "#2563eb",
    soft: "#dbeafe",
    text: "#1e3a8a",
  },
  {
    id: "team4",
    name: "Nhóm 4",
    color: "#16a34a",
    soft: "#dcfce7",
    text: "#14532d",
  },
];

const PUZZLES: Puzzle[] = [
  { code: "Ô A", target: "CƠ CẤU XÃ HỘI" },
  { code: "Ô B", target: "LIÊN MINH GIAI CẤP" },
  { code: "Ô C", target: "ĐẠI ĐOÀN KẾT" },
  { code: "Ô D", target: "PHÁT TRIỂN BỀN VỮNG" },
];

const QUESTIONS: Question[] = [
  {
    prompt: "Hệ thống các giai cấp, tầng lớp xã hội tồn tại khách quan trong một chế độ xã hội nhất định được gọi là gì?\nA. Cơ cấu xã hội - dân cư.\nB. Cơ cấu xã hội - giai cấp.\nC. Cơ cấu xã hội - nghề nghiệp.\nD. Cơ cấu xã hội - dân tộc.",
    answer: "B. Cơ cấu xã hội - giai cấp.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Loại hình cơ cấu xã hội nào giữ vị trí quan trọng hàng đầu trong thời kỳ quá độ lên CNXH?\nA. Cơ cấu xã hội - dân số.\nB. Cơ cấu xã hội - tôn giáo.\nC. Cơ cấu xã hội - giai cấp.\nD. Cơ cấu xã hội - dân tộc.",
    answer: "C. Cơ cấu xã hội - giai cấp.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Sự biến đổi của cơ cấu xã hội - giai cấp bị quy định bởi yếu tố nào sau đây?\nA. Sự biến đổi của văn hóa.\nB. Sự biến đổi của cơ cấu kinh tế.\nC. Sự biến đổi của dân số.\nD. Sự biến đổi của địa giới hành chính.",
    answer: "B. Sự biến đổi của cơ cấu kinh tế.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Trong thời kỳ quá độ, cơ cấu xã hội - giai cấp biến đổi theo hướng nào?\nA. Đơn giản hóa các giai cấp.\nB. Xóa bỏ ngay lập tức các giai cấp.\nC. Đa dạng và phức tạp, xuất hiện các tầng lớp mới.\nD. Không thay đổi so với chế độ cũ.",
    answer: "C. Đa dạng và phức tạp, xuất hiện các tầng lớp mới.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Nội dung nào là cơ sở cho sự xích lại gần nhau giữa các giai cấp, tầng lớp trong thời kỳ quá độ?\nA. Sự khác biệt về lợi ích kinh tế ngày càng tăng.\nB. Sự đấu tranh quyết liệt để tiêu diệt lẫn nhau.\nC. Những cải biến cách mạng toàn diện của thời kỳ quá độ.\nD. Sự tách biệt giữa thành thị và nông thôn.",
    answer: "C. Những cải biến cách mạng toàn diện của thời kỳ quá độ.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Vì sao giai cấp công nhân cần thiết lập liên minh với giai cấp nông dân và các tầng lớp lao động khác?\nA. Để chia sẻ lợi ích cá nhân.\nB. Để tập hợp lực lượng thực hiện sứ mệnh lịch sử.\nC. Để thay thế vai trò lãnh đạo của Đảng.\nD. Vì đây là yêu cầu tự phát của nông dân.",
    answer: "B. Để tập hợp lực lượng thực hiện sứ mệnh lịch sử.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Nội dung nào là nội dung cơ bản quyết định nhất, là cơ sở vật chất của liên minh giai cấp?\nA. Nội dung kinh tế.\nB. Nội dung chính trị.\nC. Nội dung văn hóa.\nD. Nội dung tư tưởng.",
    answer: "A. Nội dung kinh tế.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Ở Việt Nam, lực lượng nào là giai cấp lãnh đạo cách mạng thông qua đội tiên phong là Đảng Cộng sản?\nA. Giai cấp công nhân.\nB. Giai cấp nông dân.\nC. Đội ngũ trí thức.\nD. Đội ngũ doanh nhân.",
    answer: "A. Giai cấp công nhân.",
    level: "Dễ",
    reward: 1,
  },
  {
    prompt: "Lực lượng nào có vị trí chiến lược trong sự nghiệp công nghiệp hóa, hiện đại hóa nông nghiệp, nông thôn ở Việt Nam?\nA. Giai cấp công nhân.\nB. Giai cấp nông dân.\nC. Đội ngũ doanh nhân.\nD. Đội ngũ trí thức.",
    answer: "B. Giai cấp nông dân.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Đội ngũ trí thức Việt Nam có vai trò gì trong khối liên minh?\nA. Trực tiếp sản xuất ra của cải vật chất trong công nghiệp.\nB. Là lực lượng lao động sáng tạo đặc biệt quan trọng.\nC. Là lực lượng duy nhất lãnh đạo cách mạng.\nD. Là lực lượng cung cấp vốn cho nền kinh tế.",
    answer: "B. Là lực lượng lao động sáng tạo đặc biệt quan trọng.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Xu hướng \"trí tuệ hóa\" giai cấp công nhân Việt Nam hiện nay gắn liền với yếu tố nào?\nA. Giảm số lượng công nhân.\nB. Cách mạng khoa học và công nghệ hiện đại.\nC. Tăng thời gian lao động chân tay.\nD. Xóa bỏ vai trò của trí thức.",
    answer: "B. Cách mạng khoa học và công nghệ hiện đại.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Nội dung chính trị của liên minh giai cấp ở Việt Nam hiện nay là gì?\nA. Xây dựng các đảng phái đối lập.\nB. Giữ vững vai trò lãnh đạo của Đảng Cộng sản.\nC. Chia quyền lực cho mọi giai cấp một cách đồng đều.\nD. Hạn chế quyền làm chủ của nhân dân.",
    answer: "B. Giữ vững vai trò lãnh đạo của Đảng Cộng sản.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Mục tiêu tổng quát của cách mạng Việt Nam là gì?\nA. Làm giàu cho một nhóm người.\nB. Đưa đất nước trở lại thời kỳ phong kiến.\nC. Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.\nD. Chỉ tập trung phát triển nông nghiệp.",
    answer: "C. Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Sự biến đổi cơ cấu xã hội - giai cấp ở Việt Nam từ sau Đại hội VI (1986) chuyển mạnh sang cơ chế nào?\nA. Cơ chế tập trung quan liêu bao cấp.\nB. Cơ chế kinh tế thuần nông.\nC. Cơ chế thị trường định hướng xã hội chủ nghĩa.\nD. Cơ chế tự cung tự cấp.",
    answer: "C. Cơ chế thị trường định hướng xã hội chủ nghĩa.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Đội ngũ doanh nhân Việt Nam hiện nay phát triển nhanh về số lượng nhằm mục đích gì?\nA. Thay thế giai cấp công nhân lãnh đạo.\nB. Góp phần giải quyết việc làm và phát triển kinh tế.\nC. Để trở thành giai cấp bóc lột mới.\nD. Để hạn chế sự phát triển của trí thức.",
    answer: "B. Góp phần giải quyết việc làm và phát triển kinh tế.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "\"Dân biết, dân bàn, dân làm, dân kiểm tra\" là phương châm thuộc nội dung nào của liên minh?\nA. Nội dung kinh tế.\nB. Nội dung chính trị.\nC. Nội dung văn hóa.\nD. Nội dung khoa học.",
    answer: "B. Nội dung chính trị.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Một trong những phương hướng cơ bản để xây dựng cơ cấu xã hội - giai cấp ở Việt Nam là gì?\nA. Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước.\nB. Ngừng phát triển kinh tế thị trường.\nC. Hạn chế vai trò của tầng lớp trí thức.\nD. Ưu tiên phát triển thành phần kinh tế cá thể.",
    answer: "A. Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước.",
    level: "Vừa",
    reward: 1,
  },
  {
    prompt: "Để phát triển giai cấp công nhân về chất lượng, cần chú trọng giải pháp nào?\nA. Giáo dục, đào tạo, bồi dưỡng tay nghề và bản lĩnh chính trị.\nB. Chỉ tăng số lượng công nhân.\nC. Giảm tiền lương của công nhân.\nD. Xóa bỏ các tổ chức công đoàn.",
    answer: "A. Giáo dục, đào tạo, bồi dưỡng tay nghề và bản lĩnh chính trị.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Chính sách đối với giai cấp nông dân Việt Nam hiện nay là gì?\nA. Ép buộc nông dân vào các hợp tác xã kiểu cũ.\nB. Hỗ trợ chuyển đổi cơ cấu lao động, ứng dụng tiến bộ khoa học.\nC. Ngừng đầu tư cho nông thôn.\nD. Chỉ tập trung xuất khẩu nông sản thô.",
    answer: "B. Hỗ trợ chuyển đổi cơ cấu lao động, ứng dụng tiến bộ khoa học.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Để phát huy vai trò của đội ngũ trí thức, Nhà nước cần làm gì?\nA. Kiểm soát chặt chẽ tư duy sáng tạo.\nB. Tôn trọng và phát huy tự do tư tưởng trong nghiên cứu.\nC. Giảm đãi ngộ đối với nhân tài.\nD. Thay thế trí thức bằng máy móc hoàn toàn.",
    answer: "B. Tôn trọng và phát huy tự do tư tưởng trong nghiên cứu.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Nội dung nào không thuộc nội dung văn hóa - xã hội của liên minh?\nA. Xóa đói giảm nghèo.\nB. Xây dựng nền văn hóa tiên tiến.\nC. Thiết lập chuyên chính vô sản.\nD. Nâng cao chất lượng nguồn nhân lực.",
    answer: "C. Thiết lập chuyên chính vô sản.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Cơ cấu xã hội - giai cấp là căn cứ để xây dựng chính sách phát triển kinh tế, văn hóa, xã hội của mỗi quốc gia trong:\nA. Chỉ thời kỳ phong kiến.\nB. Chỉ thời kỳ tư bản chủ nghĩa.\nC. Từng giai đoạn lịch sử cụ thể.\nD. Tương lai xa vời.",
    answer: "C. Từng giai đoạn lịch sử cụ thể.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Sự biến đổi của cơ cấu xã hội - giai cấp trong thời kỳ quá độ mang tính chất:\nA. Tự phát.\nB. Đơn giản.\nC. Phức tạp, đa dạng.\nD. Không mang tính quy luật.",
    answer: "C. Phức tạp, đa dạng.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Lực lượng nào là \"lực lượng lao động sáng tạo đặc biệt quan trọng\" trong khối liên minh?\nA. Công nhân.\nB. Nông dân.\nC. Trí thức.\nD. Thanh niên.",
    answer: "C. Trí thức.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Nền tảng của khối đại đoàn kết toàn dân tộc ở Việt Nam là:\nA. Liên minh giữa doanh nhân và trí thức.\nB. Liên minh giữa công nhân, nông dân và trí thức.\nC. Liên minh giữa các tôn giáo.\nD. Liên minh giữa các dân tộc thiểu số.",
    answer: "B. Liên minh giữa công nhân, nông dân và trí thức.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Theo quan điểm của chủ nghĩa Mác - Lênin, cơ cấu xã hội - giai cấp phản ánh chủ yếu điều gì?\nA. Trình độ phát triển khoa học.\nB. Quan hệ giữa các giai cấp, tầng lớp trong xã hội.\nC. Sự phân bố dân cư theo vùng miền.\nD. Sự khác biệt về tôn giáo.",
    answer: "B. Quan hệ giữa các giai cấp, tầng lớp trong xã hội.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, giai cấp nào giữ vai trò lãnh đạo thông qua Đảng Cộng sản?\nA. Giai cấp nông dân.\nB. Đội ngũ trí thức.\nC. Giai cấp công nhân.\nD. Đội ngũ doanh nhân.",
    answer: "C. Giai cấp công nhân.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Đặc điểm nổi bật của cơ cấu xã hội - giai cấp trong thời kỳ quá độ là:\nA. Chỉ còn một giai cấp duy nhất.\nB. Không có sự thay đổi.\nC. Tồn tại nhiều giai cấp, tầng lớp với sự biến đổi liên tục.\nD. Xóa bỏ hoàn toàn sự khác biệt xã hội.",
    answer: "C. Tồn tại nhiều giai cấp, tầng lớp với sự biến đổi liên tục.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Đâu là nguyên tắc quan trọng trong xây dựng khối liên minh giai cấp ở Việt Nam?\nA. Bình đẳng, đoàn kết và hợp tác cùng phát triển.\nB. Loại bỏ vai trò của nông dân.\nC. Chỉ phát triển kinh tế tư nhân.\nD. Tập trung quyền lực vào doanh nhân.",
    answer: "A. Bình đẳng, đoàn kết và hợp tác cùng phát triển.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Liên minh công nhân - nông dân - trí thức được xây dựng nhằm mục tiêu:\nA. Tăng cạnh tranh giữa các giai cấp.\nB. Tạo nền tảng cho khối đại đoàn kết toàn dân tộc.\nC. Giảm vai trò của Nhà nước.\nD. Xóa bỏ mọi thành phần kinh tế.",
    answer: "B. Tạo nền tảng cho khối đại đoàn kết toàn dân tộc.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Trong nền kinh tế thị trường định hướng xã hội chủ nghĩa, đội ngũ doanh nhân có vai trò chủ yếu là:\nA. Lãnh đạo Đảng Cộng sản.\nB. Thúc đẩy sản xuất, kinh doanh và tạo việc làm.\nC. Thay thế giai cấp công nhân.\nD. Chỉ đầu tư vào nông nghiệp.",
    answer: "B. Thúc đẩy sản xuất, kinh doanh và tạo việc làm.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Một trong những phương hướng xây dựng cơ cấu xã hội - giai cấp ở Việt Nam là:\nA. Thu hẹp giáo dục nghề nghiệp.\nB. Phát triển nguồn nhân lực chất lượng cao.\nC. Giảm đầu tư cho khoa học.\nD. Hạn chế đổi mới công nghệ.",
    answer: "B. Phát triển nguồn nhân lực chất lượng cao.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Sự liên minh giữa công nhân, nông dân và trí thức được hình thành trên cơ sở:\nA. Mâu thuẫn lợi ích.\nB. Mục tiêu xây dựng chủ nghĩa xã hội.\nC. Khác biệt về nghề nghiệp.\nD. Đấu tranh giữa các tầng lớp.",
    answer: "B. Mục tiêu xây dựng chủ nghĩa xã hội.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Trong liên minh giai cấp, nội dung văn hóa - xã hội hướng đến mục tiêu nào?\nA. Phát triển con người toàn diện.\nB. Tăng khoảng cách giàu nghèo.\nC. Giảm đầu tư giáo dục.\nD. Chỉ phát triển kinh tế.",
    answer: "A. Phát triển con người toàn diện.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Việc phát triển đội ngũ trí thức có ý nghĩa quan trọng vì:\nA. Trí thức là lực lượng sáng tạo tri thức và công nghệ.\nB. Trí thức thay thế hoàn toàn công nhân.\nC. Trí thức không tham gia sản xuất.\nD. Trí thức chỉ hoạt động trong giáo dục.",
    answer: "A. Trí thức là lực lượng sáng tạo tri thức và công nghệ.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Yếu tố nào góp phần thúc đẩy quá trình trí thức hóa giai cấp công nhân?\nA. Giảm trình độ đào tạo.\nB. Ứng dụng khoa học - công nghệ hiện đại.\nC. Chỉ tăng lao động thủ công.\nD. Hạn chế đổi mới sáng tạo.",
    answer: "B. Ứng dụng khoa học - công nghệ hiện đại.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Một trong những mục tiêu của liên minh giai cấp ở Việt Nam hiện nay là:\nA. Xây dựng xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.\nB. Xóa bỏ hoàn toàn kinh tế tư nhân.\nC. Chỉ phát triển công nghiệp nặng.\nD. Giảm vai trò của Nhà nước.",
    answer: "A. Xây dựng xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Để phát huy vai trò của giai cấp nông dân trong thời kỳ mới, cần:\nA. Đẩy mạnh ứng dụng khoa học kỹ thuật vào sản xuất nông nghiệp.\nB. Giảm đầu tư hạ tầng nông thôn.\nC. Hạn chế tiếp cận thị trường.\nD. Giảm đào tạo nghề cho nông dân.",
    answer: "A. Đẩy mạnh ứng dụng khoa học kỹ thuật vào sản xuất nông nghiệp.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Khối liên minh công nhân - nông dân - trí thức là nền tảng của:\nA. Kinh tế thị trường tự do.\nB. Khối đại đoàn kết toàn dân tộc.\nC. Các tổ chức quốc tế.\nD. Các doanh nghiệp tư nhân.",
    answer: "B. Khối đại đoàn kết toàn dân tộc.",
    level: "Khó",
    reward: 2,
  },
  {
    prompt: "Việc xây dựng cơ cấu xã hội - giai cấp hợp lý có ý nghĩa gì?\nA. Tạo điều kiện phát triển ổn định và bền vững đất nước.\nB. Làm gia tăng mâu thuẫn xã hội.\nC. Hạn chế phát triển kinh tế.\nD. Chỉ phục vụ mục tiêu chính trị.",
    answer: "A. Tạo điều kiện phát triển ổn định và bền vững đất nước.",
    level: "Khó",
    reward: 2,
  },
];

function lettersOf(target: string) {
  return Array.from(target.replace(/\s/g, ""));
}

function seededBag(target: string, offset: number) {
  const letters = lettersOf(target);
  return letters.map((_, index) => letters[(index * 3 + offset) % letters.length]);
}

function assignedPuzzles(randomize: boolean) {
  const puzzles = [...PUZZLES];
  if (!randomize) return puzzles;
  for (let i = puzzles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzles[i], puzzles[j]] = [puzzles[j], puzzles[i]];
  }
  return puzzles;
}

function createStates(randomize = false): Record<TeamId, TeamState> {
  const puzzles = assignedPuzzles(randomize);
  return TEAMS.reduce((acc, team, index) => {
    const puzzle = puzzles[index];
    acc[team.id] = {
      code: puzzle.code,
      target: puzzle.target,
      letters: [],
      bag: seededBag(puzzle.target, index),
      answer: "",
      solved: false,
      score: 0,
    };
    return acc;
  }, {} as Record<TeamId, TeamState>);
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Đ/g, "D")
    .replace(/đ/g, "d")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
}

function nextIndex(current: number) {
  return (current + 1) % QUESTIONS.length;
}

function sortedScore(states: Record<TeamId, TeamState>) {
  return TEAMS.map((team) => ({
    team,
    ...states[team.id],
  })).sort((a, b) => b.score - a.score || Number(b.solved) - Number(a.solved) || b.letters.length - a.letters.length);
}

function assignmentSummary(states: Record<TeamId, TeamState>, names?: Record<TeamId, string>) {
  return TEAMS.map((team) => `${names?.[team.id]?.trim() || team.name} -> ${states[team.id].code}`).join(" · ");
}

function defaultTeamNames(): Record<TeamId, string> {
  return TEAMS.reduce((acc, team) => {
    acc[team.id] = team.name;
    return acc;
  }, {} as Record<TeamId, string>);
}

function parseQuestion(question: Question) {
  const lines = question.prompt.split("\n");
  const options = lines
    .map((line) => line.match(/^([A-D])\.\s*(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({ key: match[1], text: match[2] }));
  const text = lines.filter((line) => !/^[A-D]\.\s*/.test(line)).join("\n");
  return { text, options };
}

function correctChoice(question: Question) {
  return question.answer.trim().slice(0, 1).toUpperCase();
}

export default function TerritoryBattleScene() {
  const [states, setStates] = useState<Record<TeamId, TeamState>>(createStates);
  const [teamNames, setTeamNames] = useState<Record<TeamId, string>>(defaultTeamNames);
  const [activeTeam, setActiveTeam] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [message, setMessage] = useState("Nhập tên nhóm, rồi bấm Bắt đầu để random kho chữ.");
  const [finished, setFinished] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [pendingCorrect, setPendingCorrect] = useState<boolean | null>(null);

  const currentTeam = TEAMS[activeTeam];
  const currentQuestion = QUESTIONS[questionIndex];
  const visibleQuestion = parseQuestion(currentQuestion);
  const ranking = useMemo(() => sortedScore(states), [states]);
  const allSolved = TEAMS.every((team) => states[team.id].solved);

  function teamName(team: Team) {
    return teamNames[team.id]?.trim() || team.name;
  }

  function saveSnapshot() {
    setHistory((items) => [
      ...items,
      {
        states,
        teamNames,
        activeTeam,
        questionIndex,
        message,
        finished,
        gameStarted,
        selectedChoice,
      },
    ]);
  }

  function changeTeamName(teamId: TeamId, name: string) {
    setTeamNames((current) => ({ ...current, [teamId]: name }));
  }

  function startGame() {
    saveSnapshot();
    const nextStates = createStates(true);
    setStates(nextStates);
    setActiveTeam(0);
    setQuestionIndex(0);
    setFinished(false);
    setGameStarted(true);
    setSelectedChoice(null);
    setMessage(`Đã random kho chữ: ${assignmentSummary(nextStates, teamNames)}. Chọn nhóm trả lời để bắt đầu.`);
  }

  function updateTeam(teamId: TeamId, updater: (state: TeamState) => TeamState) {
    setStates((current) => ({
      ...current,
      [teamId]: updater(current[teamId]),
    }));
  }

  function grantLetters(successText: string) {
    const reward = currentQuestion.reward;
    const state = states[currentTeam.id];
    const gained = state.bag.slice(0, reward);

    if (!gained.length) {
      setMessage(`${teamName(currentTeam)} đã lấy đủ chữ. Hãy ghép đáp án. Admin chọn nhóm tiếp theo.`);
      setQuestionIndex(nextIndex(questionIndex));
      setSelectedChoice(null);
      return;
    }

    updateTeam(currentTeam.id, (teamState) => ({
      ...teamState,
      letters: [...teamState.letters, ...gained],
      bag: teamState.bag.slice(gained.length),
      score: teamState.score + gained.length * 10,
    }));
    setMessage(`${successText} Nhận chữ: ${gained.join(", ")}. Admin chọn nhóm tiếp theo.`);
    setQuestionIndex(nextIndex(questionIndex));
    setSelectedChoice(null);
  }

  function awardLetters() {
    if (finished) return;
    saveSnapshot();
    grantLetters(`${teamName(currentTeam)} được admin chấm đúng.`);
  }

  function chooseOption(choice: string) {
    if (finished || selectedChoice !== null) return;
    saveSnapshot();
    setSelectedChoice(choice);
    setPendingCorrect(choice === correctChoice(currentQuestion));
  }

  function advanceAfterChoice() {
    if (selectedChoice === null) return;
    saveSnapshot();
    if (pendingCorrect) {
      grantLetters(`${teamName(currentTeam)} chọn ${selectedChoice} chính xác.`);
    } else {
      const correctAnswer = correctChoice(currentQuestion);
      setQuestionIndex(nextIndex(questionIndex));
      setSelectedChoice(null);
      setMessage(
        `${teamName(currentTeam)} chọn ${selectedChoice} chưa đúng. Đáp án đúng: ${correctAnswer}. Admin chọn nhóm tiếp theo.`
      );
    }
    setPendingCorrect(null);
  }

  function missQuestion() {
    if (finished) return;
    saveSnapshot();
    setQuestionIndex(nextIndex(questionIndex));
    setSelectedChoice(null);
    setMessage(`${teamName(currentTeam)} chưa ghi điểm. Admin chọn nhóm tiếp theo.`);
  }

  function changeAnswer(teamId: TeamId, answer: string) {
    updateTeam(teamId, (teamState) => ({ ...teamState, answer }));
  }

  function checkAnswer(team: Team) {
    if (finished) return;
    saveSnapshot();
    const state = states[team.id];
    const isCorrect = normalize(state.answer) === normalize(state.target);

    if (!isCorrect) {
      setMessage(`${teamName(team)} ghép chưa đúng. Có thể sắp xếp lại kho chữ và thử tiếp.`);
      return;
    }

    updateTeam(team.id, (teamState) => ({
      ...teamState,
      solved: true,
      score: teamState.score + 40 + teamState.bag.length * 5,
    }));
    setMessage(`${teamName(team)} đã giải mã ${state.code}: ${state.target}.`);
  }

  function revealOne(team: Team) {
    if (finished) return;
    const state = states[team.id];
    if (!state.bag.length) return;
    saveSnapshot();
    const gained = state.bag[0];
    updateTeam(team.id, (teamState) => ({
      ...teamState,
      letters: [...teamState.letters, gained],
      bag: teamState.bag.slice(1),
      score: Math.max(0, teamState.score - 5),
    }));
    setMessage(`Admin mở gợi ý cho ${teamName(team)}: thêm chữ ${gained}, trừ 5 điểm.`);
  }

  function finishGame() {
    saveSnapshot();
    setFinished(true);
    setMessage(`Chốt trận: ${teamName(ranking[0].team)} đang dẫn đầu với ${ranking[0].score} điểm.`);
  }

  function resetGame() {
    saveSnapshot();
    setStates(createStates());
    setActiveTeam(0);
    setQuestionIndex(0);
    setMessage("Đã về màn setup. Nhập tên nhóm, rồi bấm Bắt đầu để random kho chữ.");
    setFinished(false);
    setGameStarted(false);
    setSelectedChoice(null);
    setPendingCorrect(null);
  }

  function undo() {
    const last = history[history.length - 1];
    if (!last) return;
    setStates(last.states);
    setTeamNames(last.teamNames);
    setActiveTeam(last.activeTeam);
    setQuestionIndex(last.questionIndex);
    setMessage(last.message);
    setFinished(last.finished);
    setGameStarted(last.gameStarted);
    setSelectedChoice(last.selectedChoice);
    setHistory((items) => items.slice(0, -1));
  }

  return (
    <section id="tro-choi" className="w-full bg-[#f4f1e8] px-4 py-12 text-stone-950 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl shadow-stone-900/10"
        >
          <div className="grid gap-0 lg:grid-cols-[1fr_390px]">
            <div className="bg-stone-950 p-6 text-white sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-gold">Trò chơi giải mã</p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
                Mật Mã <span className="text-brand-gold">Liên Minh</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                Nhập tên nhóm, random kho chữ vào Ô A/B/C/D, trả lời trắc nghiệm để nhận chữ rồi giải mã cụm từ.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-px bg-stone-200 text-center">
              <div className="bg-white px-4 py-6">
                <p className="text-3xl font-black text-brand-red">{QUESTIONS.length}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-stone-500">Câu hỏi</p>
              </div>
              <div className="bg-white px-4 py-6">
                <p className="text-3xl font-black text-brand-red">4</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-stone-500">Nhóm</p>
              </div>
              <div className="bg-white px-4 py-6">
                <p className="text-3xl font-black text-brand-red">A-D</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-stone-500">Kho chữ</p>
              </div>
            </div>
          </div>
        </motion.div>

        {!gameStarted ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-lg border border-stone-200 bg-white p-5 shadow-lg shadow-stone-900/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Thiết lập trước trận</p>
                  <h3 className="mt-2 text-2xl font-black">Đặt tên nhóm</h3>
                </div>
                <span className="rounded-md bg-stone-950 px-3 py-2 text-xs font-bold text-white/70">
                  Kho chữ đang khóa
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {TEAMS.map((team, index) => (
                  <label
                    key={team.id}
                    className="rounded-lg border bg-stone-50 p-4"
                    style={{ borderColor: `${team.color}66` }}
                  >
                    <span className="text-xs font-black uppercase tracking-wide" style={{ color: team.color }}>
                      Nhóm {index + 1}
                    </span>
                    <input
                      value={teamNames[team.id]}
                      onChange={(event) => changeTeamName(team.id, event.target.value)}
                      className="mt-3 w-full rounded-md border border-stone-200 bg-white px-3 py-3 text-sm font-black text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-brand-gold"
                      placeholder={`Tên ${team.name}`}
                    />
                  </label>
                ))}
              </div>

              <button
                onClick={startGame}
                className="mt-5 w-full rounded-lg bg-brand-gold px-5 py-4 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:bg-yellow-300"
              >
                Bắt đầu & random kho chữ
              </button>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="rounded-lg border border-stone-200 bg-white p-5 text-stone-950 shadow-lg shadow-stone-900/10"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">Luật nhanh</p>
              <div className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-stone-700">
                <p>1. Nhập tên bốn nhóm.</p>
                <p>2. Bấm bắt đầu để random mỗi nhóm vào một Ô A/B/C/D.</p>
                <p>3. Trả lời đúng để nhận chữ trong kho riêng.</p>
                <p>4. Ghép đúng cụm từ để mở thông điệp cuối.</p>
              </div>
              <p className="mt-5 rounded-lg bg-stone-100 p-3 text-sm font-bold text-stone-600">{message}</p>
            </motion.aside>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[270px_1fr_300px]">
            <aside className="flex flex-col gap-4">
              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Chọn nhóm</p>
                <div className="mt-3 grid gap-2">
                  {TEAMS.map((team, index) => {
                    const state = states[team.id];
                    return (
                      <button
                        key={team.id}
                        onClick={() => setActiveTeam(index)}
                        disabled={finished || selectedChoice !== null}
                        className="rounded-lg border p-3 text-left shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        style={{
                          borderColor: activeTeam === index ? team.color : "#e7e5e4",
                          background: activeTeam === index ? team.soft : "#fafaf9",
                          color: activeTeam === index ? team.text : "#292524",
                        }}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-black">{teamName(team)}</span>
                          <span className="rounded bg-stone-950 px-2 py-1 text-[11px] font-black text-white">
                            {state.code}
                          </span>
                        </span>
                        <span className="mt-2 block text-[11px] font-bold opacity-70">
                          {state.letters.length}/{lettersOf(state.target).length} chữ · {state.score} điểm
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">Điều khiển</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={awardLetters}
                    disabled={finished || selectedChoice !== null}
                    className="rounded-md bg-brand-gold px-3 py-2 text-xs font-black text-stone-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
                  >
                    Đúng
                  </button>
                  <button
                    onClick={missQuestion}
                    disabled={finished || selectedChoice !== null}
                    className="rounded-md border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-stone-700 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-50 disabled:text-stone-300"
                  >
                    Sai
                  </button>
                  <button
                    onClick={undo}
                    disabled={!history.length || selectedChoice !== null}
                    className="rounded-md border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-stone-700 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-50 disabled:text-stone-300"
                  >
                    Hoàn tác
                  </button>
                  <button
                    onClick={finishGame}
                    disabled={finished || selectedChoice !== null}
                    className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-50 disabled:text-stone-300"
                  >
                    Chốt điểm
                  </button>
                  <button
                    onClick={resetGame}
                    className="col-span-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:border-red-400 hover:bg-red-100"
                  >
                    Chơi lại
                  </button>
                </div>
              </div>
            </aside>

            <main className="flex flex-col gap-4">
              {finished && (
                <motion.section
                  initial={{ opacity: 0, scale: 0.96, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-lg border border-brand-gold bg-stone-950 text-white shadow-xl shadow-stone-900/20"
                >
                  <div className="grid gap-0 md:grid-cols-[1fr_220px]">
                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-gold">Chiến thắng</p>
                      <h3 className="mt-2 text-3xl font-black">
                        {teamName(ranking[0].team)}
                      </h3>
                      <p className="mt-2 text-sm font-bold text-white/65">
                        Dẫn đầu với {ranking[0].score} điểm và {ranking[0].letters.length} chữ đã mở.
                      </p>
                    </div>
                    <div className="flex items-center justify-center bg-brand-gold p-5 text-stone-950">
                      <div className="text-center">
                        <p className="text-5xl font-black">#{1}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-wide">Đội thắng</p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              <motion.section
                key={questionIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="rounded-lg border border-stone-200 bg-white p-5 text-stone-950 shadow-xl shadow-stone-900/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md px-3 py-2 text-xs font-black uppercase" style={{ background: currentTeam.soft, color: currentTeam.text }}>
                    {teamName(currentTeam)}
                  </span>
                  <span className="rounded-md bg-stone-950 px-3 py-2 text-xs font-black text-white">
                    Câu {questionIndex + 1}/{QUESTIONS.length} · {currentQuestion.level} · +{currentQuestion.reward} chữ
                  </span>
                </div>
                <p className="mt-5 whitespace-pre-line text-2xl font-black leading-snug">{visibleQuestion.text}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {visibleQuestion.options.map((option) => {
                    const revealed = selectedChoice !== null;
                    const isPicked = selectedChoice === option.key;
                    const isCorrectOption = revealed && option.key === correctChoice(currentQuestion);
                    return (
                      <button
                        key={option.key}
                        onClick={() => chooseOption(option.key)}
                        disabled={finished || revealed}
                        className={`grid grid-cols-[42px_1fr] items-center gap-3 rounded-lg border p-3 text-left transition ${
                          isCorrectOption
                            ? "border-green-500 bg-green-100 text-green-900"
                            : revealed && isPicked
                              ? "border-red-400 bg-red-50 text-red-800"
                              : "border-stone-200 bg-stone-50 hover:border-brand-gold"
                        } disabled:cursor-not-allowed`}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-stone-950 text-base font-black text-white">
                          {option.key}
                        </span>
                        <span className="text-sm font-bold leading-snug">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {selectedChoice !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      role="status"
                      className={`mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-black ${
                        pendingCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span aria-hidden>{pendingCorrect ? "✓" : "✗"}</span>
                        {pendingCorrect
                          ? `Chính xác! +${currentQuestion.reward} chữ cho ${teamName(currentTeam)}.`
                          : `Chưa đúng — đáp án đúng: ${correctChoice(currentQuestion)}.`}
                      </span>
                      <button
                        onClick={advanceAfterChoice}
                        className="rounded-md bg-stone-950 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-stone-800"
                      >
                        Câu tiếp theo →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <details className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <summary className="cursor-pointer text-xs font-black uppercase tracking-wide text-stone-500">
                    Đáp án cho admin
                  </summary>
                  <p className="mt-2 text-sm font-bold leading-relaxed text-stone-700">{currentQuestion.answer}</p>
                </details>
              </motion.section>

              <section className="grid gap-3 md:grid-cols-2">
                {TEAMS.map((team) => {
                  const state = states[team.id];
                  const targetLetters = lettersOf(state.target);
                  return (
                    <motion.div
                      key={team.id}
                      layout
                      className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5"
                      style={{ boxShadow: state.solved ? `0 0 0 2px ${team.color}` : undefined }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black" style={{ color: team.color }}>{teamName(team)}</p>
                          <p className="mt-1 text-xs font-bold text-stone-500">{state.code} · {state.letters.length}/{targetLetters.length} chữ</p>
                        </div>
                        <span className="rounded bg-stone-100 px-2 py-1 text-sm font-black text-stone-800">{state.score}</span>
                      </div>
                      <div className="mt-3 flex min-h-12 flex-wrap gap-2">
                        {state.letters.length ? state.letters.map((letter, index) => (
                          <span key={`${letter}-${index}`} className="flex h-9 w-9 items-center justify-center rounded-md text-base font-black text-white" style={{ background: team.color }}>
                            {letter}
                          </span>
                        )) : <span className="text-xs font-bold text-stone-400">Chưa có chữ</span>}
                      </div>
                      <div className="mt-3 flex gap-1">
                        {targetLetters.map((_, index) => (
                          <span key={index} className="h-2 flex-1 rounded-full" style={{ background: index < state.letters.length ? team.color : "rgba(255,255,255,0.14)" }} />
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <input
                          value={state.answer}
                          onChange={(event) => changeAnswer(team.id, event.target.value)}
                          disabled={finished || state.solved}
                          placeholder="Nhập cụm từ"
                          className="min-w-0 flex-1 rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-bold text-stone-950 outline-none focus:border-brand-gold disabled:opacity-60"
                        />
                        <button onClick={() => checkAnswer(team)} disabled={finished || state.solved} className="rounded-md bg-stone-950 px-3 py-2 text-xs font-black text-white disabled:opacity-40">
                          Kiểm tra
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2 text-xs font-bold text-stone-500">
                        <span>{state.solved ? `Đã giải mã: ${state.target}` : `${state.bag.length} chữ còn khóa`}</span>
                        <button onClick={() => revealOne(team)} disabled={finished || state.solved || !state.bag.length} className="rounded border border-stone-200 px-2 py-1 text-stone-700 disabled:opacity-35">
                          Gợi ý
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </section>
            </main>

            <aside className="flex flex-col gap-4">
              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Bảng điểm</p>
                <div className="mt-3 flex flex-col gap-2">
                  {ranking.map((entry, index) => (
                    <div key={entry.team.id} className="grid grid-cols-[30px_1fr_auto] items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 p-2">
                      <span className="text-sm font-black text-stone-400">{index + 1}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black" style={{ color: entry.team.color }}>{teamName(entry.team)}</span>
                        <span className="block text-[11px] text-stone-500">{entry.code} · {entry.solved ? "đã giải mã" : `${entry.letters.length} chữ`}</span>
                      </span>
                      <span className="text-lg font-black">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {finished && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  className="rounded-lg border border-brand-gold bg-brand-gold p-4 text-stone-950 shadow-lg shadow-stone-900/10"
                >
                  <p className="text-xs font-black uppercase tracking-[0.22em]">Bảng vinh danh</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {ranking.map((entry, index) => (
                      <div key={entry.team.id} className="flex items-center justify-between rounded-md bg-white/65 px-3 py-2">
                        <span className="text-sm font-black">
                          #{index + 1} {teamName(entry.team)}
                        </span>
                        <span className="text-sm font-black">{entry.score}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">Diễn biến</p>
                <p className="mt-3 min-h-20 text-sm font-bold leading-relaxed text-stone-700">{message}</p>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">Thông điệp cuối</p>
                <div className="mt-3 flex flex-col gap-2">
                  {TEAMS.map((team) => (
                    <div key={team.id} className="rounded-md border border-stone-200 p-3" style={{ background: states[team.id].solved ? team.soft : "#fafaf9" }}>
                      <p className="text-sm font-black" style={{ color: states[team.id].solved ? team.text : "#78716c" }}>
                        {states[team.id].solved ? `${states[team.id].code}: ${states[team.id].target}` : `${states[team.id].code}: •••• ••••`}
                      </p>
                    </div>
                  ))}
                </div>
                {(allSolved || finished) && (
                  <div className="mt-3 rounded-lg bg-brand-gold p-3 text-stone-950">
                    <p className="text-xs font-black uppercase tracking-wide">Kết luận</p>
                    <p className="mt-1 text-sm font-black leading-snug">
                      Cơ cấu xã hội ổn định, liên minh giai cấp vững chắc và đại đoàn kết là nền tảng cho phát triển bền vững.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
