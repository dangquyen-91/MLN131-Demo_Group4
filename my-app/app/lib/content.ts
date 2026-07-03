export type ClassRole = "cong-nhan" | "nong-dan" | "tri-thuc" | "doanh-nhan";

export const roles: { id: ClassRole; label: string; color: string }[] = [
  { id: "cong-nhan", label: "Công nhân", color: "#dc2626" },
  { id: "nong-dan", label: "Nông dân", color: "#16a34a" },
  { id: "tri-thuc", label: "Trí thức", color: "#2563eb" },
  { id: "doanh-nhan", label: "Doanh nhân", color: "#d97706" },
];

export type LienMinhKhiaCanh = "chinh-tri" | "kinh-te" | "van-hoa-xa-hoi";

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  summary: string;
  detail: string;
  khiaCanh: LienMinhKhiaCanh[];
  roles: ClassRole[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  source: string;
}

export const khiaCanhLabel: Record<LienMinhKhiaCanh, string> = {
  "chinh-tri": "Chính trị",
  "kinh-te": "Kinh tế",
  "van-hoa-xa-hoi": "Văn hóa - Xã hội",
};

export const timeline: TimelineEvent[] = [
  {
    id: "xo-viet-nghe-tinh",
    year: "1930 - 1931",
    title: "Xô Viết Nghệ Tĩnh",
    summary:
      "Công nhân nhà máy Bến Thủy đình công, liên minh chặt chẽ với hàng vạn nông dân Nam Đàn, Hưng Nguyên biểu tình đòi ruộng đất.",
    detail:
      "Đây là minh chứng rõ nét về liên minh chính trị giữa giai cấp công nhân và giai cấp nông dân trước khi có chính quyền. Sức mạnh chính trị hình thành từ sự liên kết đấu tranh này đã làm rung chuyển chế độ thực dân, cho thấy liên minh giai cấp là yêu cầu khách quan ngay từ giai đoạn đầu của cách mạng.",
    khiaCanh: ["chinh-tri"],
    roles: ["cong-nhan", "nong-dan"],
    quiz: {
      question:
        "Xô Viết Nghệ Tĩnh (1930-1931) là minh chứng cho khía cạnh nào của liên minh giai cấp?",
      options: [
        "Liên minh kinh tế thông qua chuyển giao khoa học kỹ thuật",
        "Liên minh chính trị giữa công nhân và nông dân trong đấu tranh",
        "Liên minh văn hóa - xã hội trong xóa đói giảm nghèo",
        "Liên minh với đội ngũ doanh nhân",
      ],
      correctIndex: 1,
      explanation:
        "Công nhân Bến Thủy đình công, liên minh với nông dân biểu tình đòi ruộng đất — đây là hình thức liên minh chính trị, tập hợp lực lượng đấu tranh giành chính quyền.",
    },
    source: "Chương 5, Mục II — Ví dụ thực tiễn Xô Viết Nghệ Tĩnh",
  },
  {
    id: "cai-cach-ruong-dat",
    year: "1953 - 1956",
    title: "Cải cách ruộng đất",
    summary:
      "Chủ trương xóa bỏ quan hệ sản xuất phong kiến ở nông thôn, mang ý nghĩa lịch sử to lớn.",
    detail:
      "Cải cách ruộng đất thể hiện nỗ lực thay đổi cơ cấu kinh tế (quan hệ sở hữu ruộng đất) để từ đó biến đổi cơ cấu xã hội - giai cấp ở nông thôn. Do tính chất phức tạp, quá trình thực hiện đã xảy ra một số sai lầm như quy sai thành phần giai cấp, xử lý oan một số người; sau đó Đảng và Nhà nước đã tiến hành sửa sai triệt để. Đây là bài học về việc cơ cấu xã hội - giai cấp cần được nhận diện thận trọng, không giáo điều, máy móc.",
    khiaCanh: ["kinh-te", "chinh-tri"],
    roles: ["nong-dan"],
    quiz: {
      question:
        "Bài học lớn nhất từ Cải cách ruộng đất (1953-1956) đối với việc nhận diện cơ cấu xã hội - giai cấp là gì?",
      options: [
        "Cơ cấu xã hội - giai cấp là bất biến, không cần xem xét lại",
        "Cần nhận diện thành phần giai cấp thận trọng, tránh giáo điều, sẵn sàng sửa sai",
        "Chỉ nên liên minh với giai cấp công nhân",
        "Ruộng đất không liên quan đến cơ cấu xã hội - giai cấp",
      ],
      correctIndex: 1,
      explanation:
        "Do sai lầm trong quy thành phần giai cấp, Đảng và Nhà nước đã sửa sai triệt để — cho thấy cơ cấu xã hội - giai cấp cần được xem xét biện chứng, gắn với thực tiễn cụ thể.",
    },
    source: "Chương 5, Mục I.2 — Ví dụ thực tiễn Cải cách ruộng đất",
  },
  {
    id: "khoan-10",
    year: "1988",
    title: "Khoán 10",
    summary:
      "Nhà khoa học nông nghiệp chuyển giao giống lúa năng suất cao cho nông dân sau đổi mới cơ chế khoán.",
    detail:
      "Sự kết hợp giữa chính sách đổi mới của Nhà nước, đội ngũ trí thức (nhà khoa học nông nghiệp) và người nông dân đã góp phần đưa Việt Nam từ nước thiếu lương thực trở thành một trong những nước xuất khẩu gạo hàng đầu thế giới. Đây là ví dụ tiêu biểu cho nội dung kinh tế của liên minh giai cấp — nội dung được xem là cơ bản, quyết định nhất.",
    khiaCanh: ["kinh-te"],
    roles: ["nong-dan", "tri-thuc"],
    quiz: {
      question: "Khoán 10 (1988) minh họa rõ nhất cho nội dung nào của liên minh giai cấp?",
      options: [
        "Nội dung chính trị",
        "Nội dung văn hóa - xã hội",
        "Nội dung kinh tế — nội dung cơ bản, quyết định nhất",
        "Không thuộc nội dung nào của liên minh giai cấp",
      ],
      correctIndex: 2,
      explanation:
        "Trí thức nghiên cứu giống lúa, chuyển giao cho nông dân, gắn với chính sách đổi mới — đúng là nội dung kinh tế, được giáo trình xác định là nội dung cơ bản và quyết định nhất của liên minh.",
    },
    source: "Chương 5, Mục III.2 — Ví dụ thực tiễn sau Khoán 10",
  },
  {
    id: "nghi-quyet-09",
    year: "2011",
    title: "Nghị quyết 09-NQ/TW",
    summary:
      "Bộ Chính trị ban hành nghị quyết về xây dựng và phát huy vai trò đội ngũ doanh nhân Việt Nam.",
    detail:
      "Nghị quyết số 09-NQ/TW ngày 9/12/2011 khẳng định sự tôn vinh và vị trí của đội ngũ doanh nhân trong cơ cấu xã hội - giai cấp thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế. Đây là minh chứng cho quy luật cơ cấu xã hội - giai cấp biến đổi ngày càng đa dạng, phức tạp: bên cạnh công nhân, nông dân, trí thức, các tầng lớp mới như doanh nhân xuất hiện và được thừa nhận vai trò chính thức.",
    khiaCanh: ["kinh-te", "chinh-tri"],
    roles: ["doanh-nhan"],
    quiz: {
      question: "Nghị quyết 09-NQ/TW (2011) phản ánh quy luật biến đổi nào của cơ cấu xã hội - giai cấp?",
      options: [
        "Biến đổi gắn liền với cơ cấu kinh tế và ngày càng đa dạng, phức tạp",
        "Xóa bỏ hoàn toàn vai trò của giai cấp công nhân",
        "Chỉ có giai cấp nông dân mới có vai trò lãnh đạo",
        "Không có liên hệ với lý luận cơ cấu xã hội - giai cấp",
      ],
      correctIndex: 0,
      explanation:
        "Sự công nhận chính thức vai trò doanh nhân là biểu hiện của quy luật: cơ cấu xã hội - giai cấp biến đổi theo cơ cấu kinh tế và ngày càng đa dạng hơn khi kinh tế nhiều thành phần phát triển.",
    },
    source: "Chương 5, Mục III.1 — Ví dụ thực tiễn Nghị quyết 09-NQ/TW",
  },
  {
    id: "hien-nay",
    year: "Hiện nay",
    title: "Cơ cấu xã hội - giai cấp Việt Nam đương đại",
    summary:
      "Đô thị hóa và công nghiệp hóa làm tỷ lệ nông dân giảm dần; đội ngũ trí thức, doanh nhân và tầng lớp trung lưu phát triển nhanh.",
    detail:
      "Giai cấp công nhân tiếp tục là lực lượng lãnh đạo cách mạng qua đội tiên phong là Đảng Cộng sản Việt Nam. Giai cấp nông dân có xu hướng giảm dần về số lượng, tỷ lệ do đô thị hóa nhưng vẫn giữ vị trí chiến lược trong công nghiệp hóa, hiện đại hóa nông nghiệp, nông thôn. Đội ngũ trí thức và doanh nhân phát triển nhanh, cùng các lực lượng khác (thanh niên, phụ nữ, cựu chiến binh, đồng bào dân tộc, tôn giáo) tạo nên khối đại đoàn kết toàn dân tộc.",
    khiaCanh: ["kinh-te", "chinh-tri", "van-hoa-xa-hoi"],
    roles: ["cong-nhan", "nong-dan", "tri-thuc", "doanh-nhan"],
    quiz: {
      question: "Xu hướng nào KHÔNG đúng với cơ cấu xã hội - giai cấp Việt Nam hiện nay?",
      options: [
        "Tỷ lệ nông dân có xu hướng giảm dần do đô thị hóa",
        "Đội ngũ doanh nhân đang phát triển nhanh",
        "Cơ cấu xã hội - giai cấp hoàn toàn đứng yên, không biến đổi",
        "Đội ngũ trí thức có vai trò ngày càng quan trọng trong hội nhập quốc tế",
      ],
      correctIndex: 2,
      explanation:
        "Cơ cấu xã hội - giai cấp luôn vận động, biến đổi theo cơ cấu kinh tế — đây là quy luật xuyên suốt chương 5, không hề đứng yên.",
    },
    source: "Chương 5, Mục III.1 — Cơ cấu giai cấp - xã hội hiện nay",
  },
];

export const coreConcepts = [
  {
    term: "Cơ cấu xã hội - giai cấp",
    def:
      "Hệ thống các giai cấp và tầng lớp xã hội tồn tại trong một chế độ xã hội nhất định, được xác lập trên cơ sở quan hệ sở hữu tư liệu sản xuất, tổ chức quản lý sản xuất và địa vị chính trị - xã hội.",
  },
  {
    term: "Liên minh giai cấp, tầng lớp",
    def:
      "Sự liên kết, hợp tác và hỗ trợ lẫn nhau giữa các giai cấp, tầng lớp xã hội nhằm thực hiện những lợi ích chung, đồng thời tạo động lực xây dựng thành công chủ nghĩa xã hội.",
  },
  {
    term: "Ba quy luật biến đổi",
    def:
      "(1) Gắn liền với cơ cấu kinh tế; (2) Ngày càng đa dạng, phức tạp; (3) Vừa đấu tranh, vừa liên minh và xích lại gần nhau.",
  },
];
