export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "example"; text: string }
  | { type: "summary"; title: string; items: string[] };

export interface Subsection {
  heading: string;
  blocks: Block[];
}

export interface ChapterSection {
  id: string;
  roman: string;
  title: string;
  intro?: Block[];
  subsections: Subsection[];
}

export const chapterSections: ChapterSection[] = [
  {
    id: "phan-1",
    roman: "I",
    title: "Cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    subsections: [
      {
        heading: "1) Khái niệm và vị trí của cơ cấu xã hội - giai cấp trong cơ cấu xã hội",
        blocks: [
          {
            type: "p",
            text: "Khái niệm cơ cấu xã hội: Cơ cấu xã hội là tổng thể các cộng đồng người cùng các mối quan hệ xã hội giữa họ. Có nhiều loại cơ cấu xã hội như dân cư, nghề nghiệp, dân tộc, tôn giáo và giai cấp.",
          },
          {
            type: "p",
            text: "Khái niệm cơ cấu xã hội - giai cấp: Cơ cấu xã hội - giai cấp là hệ thống các giai cấp và tầng lớp xã hội tồn tại trong một chế độ xã hội nhất định, được xác lập trên cơ sở quan hệ sở hữu tư liệu sản xuất, tổ chức quản lý sản xuất và địa vị chính trị - xã hội.",
          },
          {
            type: "p",
            text: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, cơ cấu xã hội - giai cấp gồm nhiều giai cấp, tầng lớp và nhóm xã hội cùng hợp tác dưới sự lãnh đạo của Đảng Cộng sản để xây dựng xã hội mới, trong đó lực lượng cơ bản là công nhân, nông dân và trí thức.",
          },
          {
            type: "ul",
            items: [
              "Vị trí của cơ cấu xã hội - giai cấp: giữ vị trí quan trọng hàng đầu vì gắn với quyền sở hữu tư liệu sản xuất, tổ chức quản lý lao động, phân phối thu nhập và quyền lực chính trị.",
              "Sự biến đổi của cơ cấu xã hội - giai cấp tác động đến các cơ cấu xã hội khác và ảnh hưởng đến toàn bộ đời sống kinh tế, chính trị, văn hóa, xã hội; là căn cứ quan trọng để xây dựng chủ trương, chính sách phát triển phù hợp với từng giai đoạn.",
              "Tuy nhiên, không nên tuyệt đối hóa vai trò của cơ cấu xã hội - giai cấp mà cần xem xét trong mối quan hệ với các loại hình cơ cấu xã hội khác.",
            ],
          },
        ],
      },
      {
        heading:
          "2) Sự biến đổi có tính quy luật của cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội",
        blocks: [
          {
            type: "p",
            text: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, cơ cấu xã hội - giai cấp luôn vận động và biến đổi theo những quy luật khách quan, thể hiện qua ba nội dung cơ bản:",
          },
          {
            type: "ul",
            items: [
              "Thứ nhất — Biến đổi gắn liền và chịu sự quy định của cơ cấu kinh tế: cơ cấu xã hội - giai cấp biến đổi theo sự phát triển của cơ cấu kinh tế. Sự thay đổi về phương thức sản xuất, cơ cấu ngành nghề, thành phần kinh tế và lực lượng sản xuất dẫn đến thay đổi vị trí, vai trò của các giai cấp, tầng lớp. Quá trình công nghiệp hóa, hiện đại hóa, phát triển kinh tế thị trường định hướng XHCN và hội nhập quốc tế làm cơ cấu kinh tế ngày càng hiện đại, kéo theo biến đổi cơ cấu xã hội - giai cấp.",
              "Thứ hai — Biến đổi ngày càng đa dạng, phức tạp: thời kỳ quá độ vẫn tồn tại nhiều thành phần kinh tế và nhiều giai cấp, tầng lớp khác nhau. Bên cạnh công nhân, nông dân, trí thức, xuất hiện và phát triển các tầng lớp mới như doanh nhân, tiểu chủ, tầng lớp trung lưu... phản ánh sự đa dạng, phức tạp của cơ cấu xã hội - giai cấp trong điều kiện kinh tế nhiều thành phần.",
              "Thứ ba — Biến đổi theo xu hướng vừa đấu tranh, vừa liên minh và xích lại gần nhau: giữa các giai cấp, tầng lớp vẫn tồn tại khác biệt về lợi ích nên vẫn có mâu thuẫn, đấu tranh; đồng thời tăng cường liên minh, hợp tác, từng bước xích lại gần nhau để phát triển đất nước, hướng tới xóa bỏ bất bình đẳng và bóc lột giai cấp. Liên minh công nhân - nông dân - trí thức giữ vai trò nền tảng chính trị - xã hội của thời kỳ quá độ.",
            ],
          },
          {
            type: "summary",
            title: "Tóm tắt 3 quy luật biến đổi",
            items: [
              "Biến đổi theo cơ cấu kinh tế: kinh tế thay đổi → cơ cấu xã hội - giai cấp thay đổi; CNH-HĐH và hội nhập làm thay đổi vị trí, vai trò các giai cấp.",
              "Đa dạng và phức tạp hơn: nhiều thành phần kinh tế, nhiều tầng lớp mới, cơ cấu xã hội ngày càng phong phú.",
              "Vừa đấu tranh vừa liên minh: có mâu thuẫn nhưng hợp tác là xu hướng chủ yếu; các giai cấp từng bước xích lại gần nhau; liên minh công nhân - nông dân - trí thức là nền tảng của thời kỳ quá độ.",
            ],
          },
          {
            type: "example",
            text: "Cải cách ruộng đất (1953–1956) là chủ trương có ý nghĩa lịch sử to lớn trong việc xóa bỏ quan hệ sản xuất phong kiến ở nông thôn. Tuy nhiên, do tính chất phức tạp, quá trình thực hiện đã xảy ra một số sai lầm như quy sai thành phần giai cấp, xử lý oan một số người; sau đó Đảng, Nhà nước đã tiến hành sửa sai triệt để.",
          },
        ],
      },
    ],
  },
  {
    id: "phan-2",
    roman: "II",
    title: "Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    intro: [
      {
        type: "p",
        text: "Liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức là nền tảng chính trị - xã hội của Nhà nước xã hội chủ nghĩa, là cơ sở bảo đảm thực hiện thắng lợi sự nghiệp xây dựng chủ nghĩa xã hội.",
      },
    ],
    subsections: [
      {
        heading: "Khái niệm và tính tất yếu của liên minh giai cấp, tầng lớp",
        blocks: [
          {
            type: "p",
            text: "Khái niệm: Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội là sự liên kết, hợp tác và hỗ trợ lẫn nhau giữa các giai cấp, tầng lớp xã hội nhằm thực hiện những lợi ích chung, đồng thời tạo động lực xây dựng thành công chủ nghĩa xã hội.",
          },
          {
            type: "ul",
            items: [
              "Tính tất yếu: Liên minh giai cấp, tầng lớp là yêu cầu khách quan của quá trình cách mạng xã hội chủ nghĩa.",
              "Trong thời kỳ quá độ, dưới sự lãnh đạo của Đảng Cộng sản, giai cấp công nhân cần liên minh với giai cấp nông dân, đội ngũ trí thức và các tầng lớp lao động khác để tập hợp sức mạnh tổng hợp, bảo đảm thắng lợi của sự nghiệp xây dựng chủ nghĩa xã hội.",
            ],
          },
        ],
      },
      {
        heading: "Nội dung của liên minh giai cấp, tầng lớp — Dưới góc độ chính trị",
        blocks: [
          {
            type: "ul",
            items: [
              "Mục tiêu: tập hợp lực lượng chính trị rộng rãi; củng cố chính quyền của nhân dân; giữ vững vai trò lãnh đạo của giai cấp công nhân thông qua Đảng Cộng sản; xây dựng khối đại đoàn kết toàn dân.",
              "Nội dung: giai cấp công nhân giữ vai trò lãnh đạo; liên minh với giai cấp nông dân; mở rộng liên minh với đội ngũ trí thức và các tầng lớp lao động khác; tạo sức mạnh tổng hợp để xây dựng và bảo vệ chế độ xã hội chủ nghĩa.",
            ],
          },
        ],
      },
      {
        heading: "Nội dung của liên minh giai cấp, tầng lớp — Dưới góc độ kinh tế",
        blocks: [
          {
            type: "ul",
            items: [
              "Mục tiêu: xây dựng nền tảng vật chất - kỹ thuật của chủ nghĩa xã hội thông qua phát triển kinh tế.",
              "Nội dung: đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước; chuyển dịch cơ cấu kinh tế theo hướng hiện đại; phát triển đồng bộ công nghiệp, nông nghiệp, dịch vụ và khoa học - công nghệ; gắn kết lợi ích giữa công nhân, nông dân và trí thức; tạo điều kiện để các ngành, lĩnh vực hỗ trợ lẫn nhau cùng phát triển.",
            ],
          },
        ],
      },
      {
        heading: "Quan hệ lợi ích trong khối liên minh",
        blocks: [
          {
            type: "ul",
            items: [
              "Các giai cấp và tầng lớp đều có lợi ích chung trong phát triển đất nước.",
              "Tuy nhiên vẫn tồn tại những lợi ích riêng và có thể phát sinh mâu thuẫn.",
              "Vì vậy cần: phát hiện kịp thời các mâu thuẫn; giải quyết hài hòa lợi ích; tăng cường đồng thuận xã hội; củng cố khối liên minh ngày càng bền vững.",
            ],
          },
        ],
      },
      {
        heading: "Vai trò của các lực lượng trong khối liên minh",
        blocks: [
          {
            type: "ul",
            items: [
              "Giai cấp công nhân: giữ vai trò lãnh đạo; là lực lượng tiên phong trong công nghiệp hóa, hiện đại hóa; thông qua Đảng Cộng sản lãnh đạo toàn bộ khối liên minh.",
              "Giai cấp nông dân: là lực lượng sản xuất quan trọng; là đồng minh tự nhiên của giai cấp công nhân; góp phần bảo đảm phát triển nông nghiệp và ổn định xã hội.",
              "Đội ngũ trí thức: là lực lượng sáng tạo tri thức, khoa học và công nghệ; có vai trò quan trọng trong đổi mới sáng tạo và phát triển kinh tế tri thức; góp phần nâng cao năng suất lao động và chất lượng phát triển.",
            ],
          },
          {
            type: "example",
            text: "Xô Viết Nghệ Tĩnh (1930 - 1931) là minh chứng rõ nét về liên minh chính trị. Giai cấp công nhân ở các nhà máy (Bến Thủy) đã đình công, liên minh chặt chẽ với hàng vạn nông dân các huyện Nam Đàn, Hưng Nguyên biểu tình đòi ruộng đất, tạo nên sức mạnh chính trị to lớn làm rung chuyển chế độ thực dân.",
          },
        ],
      },
    ],
  },
  {
    id: "phan-3",
    roman: "III",
    title:
      "Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam",
    subsections: [
      {
        heading: "1. Cơ cấu giai cấp - xã hội trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam",
        blocks: [
          {
            type: "p",
            text: "Cơ cấu này đang biến đổi phức tạp, đa dạng, bao gồm các lực lượng cơ bản:",
          },
          {
            type: "ul",
            items: [
              "Giai cấp công nhân: là giai cấp lãnh đạo cách mạng thông qua đội tiên phong là Đảng Cộng sản Việt Nam; cùng với giai cấp nông dân và đội ngũ trí thức tạo thành nền tảng chính trị - xã hội vững chắc của Nhà nước.",
              "Giai cấp nông dân: cùng với nông nghiệp, nông thôn có vị trí chiến lược trong sự nghiệp công nghiệp hóa, hiện đại hóa nông nghiệp, nông thôn. Hiện nay đang có xu hướng giảm dần về số lượng và tỷ lệ do tác động của đô thị hóa.",
              "Đội ngũ trí thức: là lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế.",
              "Đội ngũ doanh nhân: đang phát triển nhanh, đóng góp tích cực vào giải quyết việc làm, tăng trưởng kinh tế, xóa đói giảm nghèo.",
              "Các lực lượng khác: thanh niên, phụ nữ, cựu chiến binh, đồng bào các dân tộc và đồng bào có tôn giáo đều có vị trí, vai trò xác định, cùng tạo nên khối đại đoàn kết toàn dân tộc.",
            ],
          },
          {
            type: "example",
            text: "Nghị quyết số 09-NQ/TW ngày 9/12/2011 của Bộ Chính trị về xây dựng và phát huy vai trò đội ngũ doanh nhân Việt Nam trong thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế đã khẳng định sự tôn vinh và vị trí của tầng lớp này trong cơ cấu xã hội mới.",
          },
        ],
      },
      {
        heading: "2. Liên minh giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam",
        blocks: [
          {
            type: "p",
            text: "Nội dung liên minh bao gồm 3 khía cạnh:",
          },
          {
            type: "ul",
            items: [
              "Nội dung kinh tế: là nội dung cơ bản, quyết định nhất. Nhằm thỏa mãn các nhu cầu, lợi ích kinh tế thiết thân; đẩy mạnh hợp tác giữa công nghiệp - nông nghiệp - khoa học công nghệ.",
              "Nội dung chính trị: giữ vững lập trường chính trị - tư tưởng của giai cấp công nhân; bảo vệ vững chắc chế độ chính trị, phát huy quyền làm chủ của nhân dân, hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa.",
              "Nội dung văn hóa - xã hội: tổ chức liên minh để cùng xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc; nâng cao dân trí, chăm sóc sức khỏe, xóa đói giảm nghèo.",
            ],
          },
          {
            type: "p",
            text: "Tiểu kết: Ba nội dung của liên minh có mối quan hệ chặt chẽ với nhau; trong đó nội dung kinh tế giữ vai trò cơ bản, quyết định, còn nội dung chính trị và văn hóa - xã hội tạo điều kiện bảo đảm cho liên minh được củng cố và phát triển bền vững.",
          },
          {
            type: "example",
            text: "Sự kết hợp sau Khoán 10 (1988): Sau khi thực hiện Khoán 10, các nhà khoa học nông nghiệp đã nghiên cứu, chuyển giao nhiều giống lúa năng suất cao cho nông dân. Sự kết hợp giữa chính sách đổi mới của Nhà nước, đội ngũ trí thức và người nông dân đã góp phần đưa Việt Nam từ nước thiếu lương thực trở thành một trong những nước xuất khẩu gạo hàng đầu thế giới.",
          },
        ],
      },
    ],
  },
];

export const chapterConclusion =
  "Trong thời kỳ quá độ lên chủ nghĩa xã hội, cơ cấu xã hội - giai cấp luôn vận động, biến đổi theo sự phát triển của cơ cấu kinh tế. Việc xây dựng và củng cố liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức có ý nghĩa quyết định trong việc phát huy sức mạnh đại đoàn kết toàn dân tộc, tạo nền tảng chính trị - xã hội vững chắc để thực hiện thành công mục tiêu xây dựng chủ nghĩa xã hội ở Việt Nam.";
