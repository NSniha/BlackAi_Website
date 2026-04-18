// =============== Blog Page Section Start ===============
document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.getElementById("blogPageGrid");
  const blogCards = Array.from(document.querySelectorAll(".blog-page-card[data-blog-id]"));
  const searchInput = document.getElementById("blogSearchInput");
  const searchBox = document.getElementById("blogSearchBox");
  const searchClearBtn = document.getElementById("blogSearchClearBtn");
  const searchResultText = document.getElementById("blogSearchResultText");
  const loadMoreBtn = document.getElementById("blogLoadMoreBtn");
  const emptyState = document.getElementById("blogPageEmpty");

  if (!blogCards.length) return;

  const initialVisibleCount = 6;
  let currentVisibleCount = initialVisibleCount;
  let filteredCards = [...blogCards];
  let lastSearchValue = "";

  function saveBlogData(card) {
    const blogData = {
      id: card.dataset.blogId || "",
      title: card.dataset.blogTitle || "",
      readTime: card.dataset.blogRead || "",
      excerpt: card.dataset.blogExcerpt || "",
      image: card.dataset.blogImage || ""
    };

    localStorage.setItem("selectedBlogPost", JSON.stringify(blogData));
  }

  blogCards.forEach((card) => {
    card.addEventListener("click", () => {
      saveBlogData(card);
    });
  });

  function updateSearchUI(value) {
    if (!searchBox) return;
    searchBox.classList.toggle("has-value", value.trim().length > 0);
  }

  function updateSearchMeta() {
    if (!searchResultText) return;

    const keyword = lastSearchValue.trim();

    if (!keyword) {
      searchResultText.textContent = `Showing ${Math.min(filteredCards.length, currentVisibleCount)} of ${blogCards.length} articles`;
      return;
    }

    if (filteredCards.length === 0) {
      searchResultText.textContent = `No articles found for “${keyword}”`;
      return;
    }

    searchResultText.textContent = `${filteredCards.length} article${filteredCards.length > 1 ? "s" : ""} found for “${keyword}”`;
  }

  function highlightVisibleCards() {
    filteredCards.slice(0, currentVisibleCount).forEach((card) => {
      card.classList.remove("is-search-match");
      void card.offsetWidth;
      card.classList.add("is-search-match");

      setTimeout(() => {
        card.classList.remove("is-search-match");
      }, 500);
    });
  }

  function updateVisibleCards() {
    blogCards.forEach((card) => card.classList.add("is-hidden"));

    filteredCards.slice(0, currentVisibleCount).forEach((card) => {
      card.classList.remove("is-hidden");
    });

    if (emptyState) {
      emptyState.classList.toggle("active", filteredCards.length === 0);
    }

    if (loadMoreBtn) {
      if (filteredCards.length <= currentVisibleCount || filteredCards.length === 0) {
        loadMoreBtn.classList.add("is-hidden");
      } else {
        loadMoreBtn.classList.remove("is-hidden");
      }
    }

    updateSearchMeta();
  }

  function filterBlogs(keyword) {
    const searchValue = keyword.trim().toLowerCase();
    lastSearchValue = keyword;

    filteredCards = blogCards.filter((card) => {
      const title = (card.dataset.blogTitle || "").toLowerCase();
      const excerpt = (card.dataset.blogExcerpt || "").toLowerCase();
      const read = (card.dataset.blogRead || "").toLowerCase();
      const cardText = card.textContent.toLowerCase();

      return (
        title.includes(searchValue) ||
        excerpt.includes(searchValue) ||
        read.includes(searchValue) ||
        cardText.includes(searchValue)
      );
    });

    currentVisibleCount = initialVisibleCount;
    updateSearchUI(keyword);
    updateVisibleCards();

    if (searchValue && filteredCards.length > 0) {
      highlightVisibleCards();
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      filterBlogs(event.target.value);
    });

    searchInput.addEventListener("focus", () => {
      if (searchBox) {
        searchBox.classList.add("is-focused");
      }
    });

    searchInput.addEventListener("blur", () => {
      if (searchBox) {
        searchBox.classList.remove("is-focused");
      }
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        searchInput.value = "";
        filterBlogs("");
        searchInput.blur();
      }
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      filterBlogs("");
      searchInput.focus();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentVisibleCount += 3;
      updateVisibleCards();
    });
  }

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    const isTypingField =
      activeTag === "INPUT" ||
      activeTag === "TEXTAREA" ||
      document.activeElement?.isContentEditable;

    if (event.key === "/" && !isTypingField && searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  updateSearchUI("");
  updateVisibleCards();

  if (blogGrid && typeof window.initializeRevealItems === "function") {
    window.initializeRevealItems(blogGrid);
  }
});
// =============== Blog Page Section End ===============



// =============== Blog Details Page Start ===============
document.addEventListener("DOMContentLoaded", () => {
  const blogDatabase = [
    {
      id: "power-of-clayai-framer-template",
      title: "How Black.ai Helps Teams Work Smarter",
      date: "April 28, 2026",
      readTime: "2 min read",
      image: "images/blog-1.png",
      shortExcerpt: "See how modern teams can reduce manual work and move with more clarity.",
      relatedExcerpt: "A practical look at how structured AI systems help teams reduce friction, improve speed, and work with more confidence.",
      content: `
        <h2>Introduction</h2>
        <p>Modern teams are under constant pressure to move faster, communicate more clearly, and produce stronger results with fewer wasted steps. Yet in many organizations, work is still slowed by disconnected tools, repeated manual effort, unclear ownership, and a lack of visibility across day-to-day operations. Black.ai is designed to solve that challenge by helping teams work with more structure, more speed, and more confidence.</p>
        <p>Rather than forcing people to jump between scattered systems, Black.ai brings clarity into the workflow. It helps teams centralize activity, create more consistent processes, and keep progress visible without turning every task into a complicated operational burden. The result is not only higher efficiency, but also better alignment across product, marketing, operations, and leadership teams.</p>

        <h3>Why Smarter Workflows Matter</h3>
        <p>Many businesses do not struggle because they lack talent. They struggle because information moves too slowly, decisions happen too late, and teams spend too much time maintaining process instead of moving outcomes forward. Black.ai supports a smarter model where visibility, coordination, and execution happen in a more connected way.</p>
        <p>When workflows are clear, teams make better decisions faster. Managers can identify blockers earlier, contributors understand what matters most, and reporting becomes easier to interpret. This shift has a direct effect on productivity because teams spend less time chasing information and more time doing meaningful work.</p>

        <blockquote>"The most productive teams are not necessarily the busiest teams. They are the teams with the clearest systems, strongest visibility, and fewest unnecessary interruptions."</blockquote>

        <h3>Reducing Operational Friction</h3>
        <p>Black.ai helps reduce friction by improving how information is organized and how activities are tracked across the workflow. Instead of relying on fragmented updates or manually stitched reporting, teams can work from a more reliable structure that supports daily momentum.</p>
        <ul>
          <li>Important tasks become easier to prioritize because progress is visible in one place.</li>
          <li>Team coordination improves when responsibilities and updates are easier to review.</li>
          <li>Reporting becomes more useful when performance data is presented with clarity instead of noise.</li>
          <li>Leaders gain stronger oversight without creating extra reporting pressure for the team.</li>
        </ul>

        <h3>Supporting Better Collaboration</h3>
        <p>One of the strongest advantages of Black.ai is how it supports collaboration without overcomplicating the process. Teams need systems that help them stay connected, but they also need enough flexibility to adapt to different roles, departments, and project types. Black.ai helps create that balance.</p>
        <p>Product teams can monitor rollout progress, operations teams can track execution more clearly, and growth teams can evaluate campaign performance without relying on disconnected updates. When collaboration feels more natural, teams move more confidently and with fewer avoidable delays.</p>

        <h3>Clear Reporting Improves Decision-Making</h3>
        <p>Speed alone is not enough. Teams also need visibility into what is happening and why. Black.ai helps turn activity into insight by making performance reporting easier to review and easier to trust. Strong reporting gives businesses a better understanding of where momentum is building, where attention is needed, and where resources can be used more effectively.</p>
        <p>When teams can see progress clearly, they can react faster, plan better, and improve execution across future cycles. That is why smarter work is not only about automation. It is also about presenting information in a way that supports confident action.</p>

        <h3>Conclusion</h3>
        <p>Black.ai helps teams work smarter by replacing confusion with clarity and replacing repeated effort with more intentional systems. It supports faster execution, better collaboration, and stronger visibility across the work that matters most.</p>
        <p>For modern teams that want to reduce operational drag and create a more reliable way of working, Black.ai offers more than a productivity tool. It offers a smarter operational foundation for sustainable growth.</p>

        <hr />
      `
    },
    {
      id: "practical-guide-for-clayai-template",
      title: "A Practical Guide to Smarter AI Workflows",
      date: "May 02, 2026",
      readTime: "5 min read",
      image: "images/blog-2.png",
      shortExcerpt: "Learn how to build more efficient systems for teams and operations.",
      relatedExcerpt: "A deeper look at how thoughtful systems, automation, and reporting can help teams operate more effectively every day.",
      content: `
        <h2>Introduction</h2>
        <p>Building smarter AI workflows is not only about adding automation to existing tasks. It is about designing a system where information flows clearly, priorities remain visible, and teams can move from planning to execution with fewer delays. Black.ai supports this kind of operational clarity by helping businesses structure their work around consistency, visibility, and practical decision-making.</p>
        <p>For many teams, workflow problems do not begin with scale. They begin with inconsistency. Tasks are managed differently by different people, updates are scattered across tools, and reporting often arrives too late to be useful. A smarter workflow begins by creating a system that is dependable, easy to understand, and flexible enough to support real business needs.</p>

        <h3>Start with Process Clarity</h3>
        <p>The first step in improving a workflow is understanding what should happen, when it should happen, and who is responsible at each stage. AI becomes more effective when it is supporting a defined process rather than trying to repair a chaotic one. Black.ai helps teams bring structure to this process by making progress, activity, and ownership easier to review.</p>
        <p>When process clarity improves, teams reduce repeated questions, lower coordination friction, and strengthen the reliability of daily operations. This makes automation more valuable because the underlying workflow is already strong enough to support it.</p>

        <h3>Use Automation Where It Adds Real Value</h3>
        <p>Automation should reduce friction, not create confusion. The most effective AI workflows are those where automation removes repetitive effort while still keeping human oversight where it matters most. Black.ai helps teams identify where automation can support execution, reporting, and coordination without weakening visibility.</p>
        <ul>
          <li>Routine status updates can be simplified through structured tracking systems.</li>
          <li>Repeated reporting processes can be made more consistent and easier to review.</li>
          <li>Operational handoffs become smoother when expectations are clearly defined.</li>
          <li>Teams can spend more time on strategy, quality, and improvement rather than repetitive admin work.</li>
        </ul>

        <blockquote>"A strong workflow does not feel complicated. It feels clear, dependable, and easy to move through even as the business grows."</blockquote>

        <h3>Build Around Visibility</h3>
        <p>Visibility is one of the most important qualities of a high-performing system. Teams need to know what is in progress, what is blocked, what is ahead of schedule, and what is falling behind. Without visibility, even smart teams waste time rechecking information, clarifying ownership, and reconstructing status from scattered sources.</p>
        <p>Black.ai makes visibility a practical advantage by helping teams keep important signals in view. This helps reduce reporting delays and supports faster, better decisions across every stage of execution.</p>

        <h3>Create Better Feedback Loops</h3>
        <p>Workflows improve when teams can learn from outcomes. That means systems should not only move work forward but also create useful feedback about what is working and what is not. When reporting is clear and performance is easier to interpret, businesses can refine their process over time rather than repeating the same inefficiencies.</p>
        <p>A practical AI workflow is not static. It evolves through iteration, better data, and stronger team habits. Black.ai supports that evolution by making it easier to connect daily execution with long-term operational improvement.</p>

        <h3>Conclusion</h3>
        <p>Smarter AI workflows are built through clarity, thoughtful automation, and visible progress. Teams do not need more complexity. They need systems that are easier to trust, easier to manage, and easier to improve over time.</p>
        <p>Black.ai helps create that foundation by supporting structured execution, better reporting, and more reliable coordination across modern teams.</p>

        <hr />
      `
    },
    {
      id: "why-you-should-invest-in-our-templates",
      title: "Why Modern Teams Need Better Workflow Visibility",
      date: "May 06, 2026",
      readTime: "3 min read",
      image: "images/blog-3.png",
      shortExcerpt: "Better visibility creates better planning, stronger communication, and faster delivery.",
      relatedExcerpt: "Visibility is not just a reporting feature. It is one of the strongest drivers of better planning and better team execution.",
      content: `
        <h2>Introduction</h2>
        <p>Workflow visibility is one of the most overlooked advantages in modern business operations. Teams often focus on speed, automation, and output, but without visibility those efforts become harder to manage and harder to improve. Visibility creates understanding. It shows what is moving forward, what needs support, and where resources should be focused.</p>
        <p>When teams do not have visibility, work becomes reactive. Decisions are delayed, reporting loses value, and managers spend more time asking for updates than using them. Better workflow visibility changes that by turning progress into something measurable, reviewable, and actionable.</p>

        <h3>Visibility Reduces Uncertainty</h3>
        <p>One of the biggest operational costs in any organization is uncertainty. When people do not know the current status of work, they create manual workarounds. They send extra messages, schedule unnecessary check-ins, or duplicate effort simply to feel informed. A visible workflow reduces that uncertainty and makes the whole system more dependable.</p>
        <p>Black.ai helps teams improve this by creating a more structured view of work, making it easier to understand priorities, review progress, and respond to issues before they grow larger.</p>

        <h3>Better Visibility Supports Better Planning</h3>
        <p>Planning improves when teams can clearly see what has happened and what is happening now. Historical insight and present visibility together create better forecasting, smarter allocation decisions, and stronger expectations around timing and performance.</p>
        <ul>
          <li>Leaders gain clearer insight into team capacity and workload balance.</li>
          <li>Teams can identify recurring blockers and refine process design.</li>
          <li>Project planning becomes more realistic when past execution is easy to review.</li>
          <li>Campaigns and launches are easier to manage when progress remains visible from start to finish.</li>
        </ul>

        <blockquote>"What teams can see clearly, they can improve more confidently."</blockquote>

        <h3>Communication Becomes Stronger</h3>
        <p>Visibility improves communication because it reduces ambiguity. Instead of discussing assumptions, teams can discuss actual progress. This changes the tone of internal collaboration. Meetings become more useful, updates become more precise, and accountability becomes easier to maintain without micromanagement.</p>
        <p>When communication improves, the entire operational system becomes more stable. Teams spend less time interpreting status and more time acting on it.</p>

        <h3>Conclusion</h3>
        <p>Modern teams need workflow visibility because execution is too important to manage in the dark. Better visibility improves planning, strengthens communication, and helps businesses move with more confidence.</p>
        <p>Black.ai supports that need by making work easier to understand, easier to track, and easier to improve over time.</p>

        <hr />
      `
    },
    {
      id: "building-a-successful-template-business",
      title: "Building Scalable Systems for High-Performing Teams",
      date: "May 10, 2026",
      readTime: "4 min read",
      image: "images/blog-4.png",
      shortExcerpt: "Create a stronger operational foundation that supports long-term growth.",
      relatedExcerpt: "Scalable systems help growing teams maintain clarity, performance, and consistency without creating unnecessary complexity.",
      content: `
        <h2>Introduction</h2>
        <p>As teams grow, the systems that once felt simple can quickly become unstable. What worked for a small team handling a narrow scope of work may no longer support multiple stakeholders, larger reporting needs, and higher execution speed. That is why scalable systems are essential for high-performing teams. They allow growth to happen without causing confusion, operational drag, or a collapse in quality.</p>
        <p>Black.ai supports scalable operations by helping teams move beyond informal coordination and into a more structured way of working. Instead of relying on memory, fragmented updates, or repeated manual reporting, teams can operate through a system that supports consistency and clearer visibility as complexity increases.</p>

        <h3>Why Scalability Requires Structure</h3>
        <p>Scalability is not just about doing more. It is about doing more without losing control. Teams that scale successfully usually have one thing in common: their systems are designed to carry growth. This means ownership is clearer, reporting is stronger, and daily execution is not dependent on a few people constantly filling in the gaps.</p>
        <p>Without structure, growth creates friction. More people means more communication paths, more handoffs, more approvals, and more opportunities for inconsistency. A scalable system helps reduce that friction by making the workflow easier to understand and easier to repeat.</p>

        <h3>Consistency Improves Performance</h3>
        <p>High-performing teams are rarely built on effort alone. They are built on consistency. When systems are clear, teams can maintain stronger quality standards, improve timing, and avoid unnecessary delays. Black.ai helps support this consistency by creating a more organized environment for execution, insight, and review.</p>
        <ul>
          <li>Teams can keep priorities visible across growing workloads.</li>
          <li>Managers can monitor progress without relying on constant follow-up.</li>
          <li>Operational reporting stays more useful as team activity increases.</li>
          <li>Processes become easier to improve because the workflow is more visible.</li>
        </ul>

        <blockquote>"Scalable systems do not remove the human side of work. They support it by reducing chaos and making coordination easier."</blockquote>

        <h3>Design for Long-Term Growth</h3>
        <p>Scalability is strongest when systems are designed with flexibility in mind. Teams should be able to adjust workflows, expand collaboration, and improve reporting without needing to rebuild their entire operational structure every few months. Black.ai helps businesses create a stronger long-term foundation by supporting systems that grow more smoothly with the organization.</p>
        <p>That kind of design matters because growth should feel like progress, not pressure. A scalable system gives teams the confidence to expand while preserving clarity and control.</p>

        <h3>Conclusion</h3>
        <p>High-performing teams need systems that can grow with them. Scalable operations reduce friction, improve visibility, and make it easier to maintain quality even as complexity increases.</p>
        <p>Black.ai helps teams build that stronger foundation, creating a more dependable path toward sustainable performance and long-term business growth.</p>

        <hr />
      `
    },
    {
      id: "envisioning-the-future-of-framer-templates",
      title: "The Future of AI-Powered Team Operations",
      date: "May 14, 2026",
      readTime: "3 min read",
      image: "images/blog-5.png",
      shortExcerpt: "See where modern workflows are heading and how AI will shape daily execution.",
      relatedExcerpt: "The future of operations will be shaped by better systems, more useful automation, and stronger visibility across everyday work.",
      content: `
        <h2>Introduction</h2>
        <p>The future of team operations will be defined by how effectively businesses turn complexity into clarity. As organizations grow more dependent on digital systems, the need for better workflow design, stronger visibility, and more useful automation becomes increasingly important. AI is not simply adding speed to existing processes. It is changing how teams plan, coordinate, and execute work every day.</p>
        <p>Black.ai reflects this shift by supporting a more connected and structured approach to team operations. It helps organizations move away from fragmented processes and toward a model where information, reporting, and execution are more closely aligned.</p>

        <h3>AI Will Support Operational Clarity</h3>
        <p>One of the most important changes AI brings to operations is improved clarity. Teams increasingly need help organizing large volumes of activity, identifying meaningful signals, and reducing the amount of manual effort required to keep work on track. AI-powered systems make this easier when they are built around visibility and useful reporting rather than complexity for its own sake.</p>
        <p>This means the future of operations will rely less on reactive management and more on informed oversight. Leaders will spend less time collecting updates and more time making decisions from clearer, faster insight.</p>

        <h3>Automation Will Become More Strategic</h3>
        <p>As AI systems mature, automation will become less about isolated actions and more about coordinated support across the workflow. This creates better continuity between planning, execution, reporting, and review.</p>
        <ul>
          <li>Routine steps will be handled more consistently across teams.</li>
          <li>Reporting cycles will become more reliable and easier to interpret.</li>
          <li>Operational bottlenecks will become easier to detect earlier.</li>
          <li>Cross-functional coordination will improve through better shared visibility.</li>
        </ul>

        <blockquote>"The future of operations is not just faster work. It is clearer work supported by smarter systems."</blockquote>

        <h3>Human Judgment Still Matters</h3>
        <p>Even as AI becomes more powerful, human judgment will remain essential. The most effective systems will not replace people. They will support people by reducing repeated effort, improving context, and making better decisions easier to reach. AI-powered operations succeed when technology strengthens the human side of collaboration instead of making it harder to navigate.</p>
        <p>Black.ai helps support that balance by making operational insight more accessible while keeping the system practical and easy to understand.</p>

        <h3>Conclusion</h3>
        <p>The future of AI-powered team operations will belong to organizations that build clarity into their systems. Better automation, better visibility, and better coordination will define the next generation of high-performing teams.</p>
        <p>Black.ai is built to support that future by helping businesses create workflows that are more structured, more scalable, and more intelligent from the inside out.</p>

        <hr />
      `
    },
    {
      id: "why-choose-clayai-framer-template",
      title: "Why Black.ai Is Built for Modern Business Teams",
      date: "May 18, 2026",
      readTime: "5 min read",
      image: "images/blog-6.png",
      shortExcerpt: "Discover why structured AI workflows matter for performance, scale, and clarity.",
      relatedExcerpt: "Black.ai is designed for modern teams that need smarter systems, cleaner reporting, and better execution without extra complexity.",
      content: `
        <h2>Introduction</h2>
        <p>Modern business teams do not simply need more tools. They need better systems. As operations grow more complex and expectations for speed continue to increase, the real advantage comes from platforms that improve coordination, visibility, and execution without adding confusion. Black.ai is built for exactly that environment.</p>
        <p>Rather than approaching productivity as a collection of disconnected features, Black.ai supports a more complete operational model. It helps teams bring structure to their workflow, maintain visibility across progress, and make smarter decisions with less effort.</p>

        <h3>Built for the Reality of Modern Work</h3>
        <p>Today’s teams operate across multiple priorities, faster timelines, and higher standards of accountability. This creates pressure not only to deliver quickly but to stay aligned while doing it. Black.ai helps meet that challenge by giving teams a clearer system for tracking work, reviewing activity, and keeping important signals visible.</p>
        <p>This is especially important for growing businesses, where the gap between strategy and execution can widen quickly if systems are weak. Black.ai helps close that gap by creating a more dependable structure for daily work.</p>

        <h3>More Than Productivity</h3>
        <p>Productivity alone is not enough if it comes at the cost of clarity. Teams need systems that support meaningful progress, not just busier schedules. Black.ai is built around this idea, combining operational visibility with practical workflow support so businesses can scale with more control.</p>
        <ul>
          <li>Work becomes easier to understand across departments and roles.</li>
          <li>Reporting becomes more useful for both contributors and decision-makers.</li>
          <li>Teams gain stronger visibility without relying on constant manual updates.</li>
          <li>Operational systems become easier to improve as the business evolves.</li>
        </ul>

        <blockquote>"Modern teams perform best when their systems create clarity, not just activity."</blockquote>

        <h3>Designed for Growth and Adaptability</h3>
        <p>Black.ai is built to support businesses that need both structure and flexibility. Teams can improve how they work today while also building a stronger foundation for tomorrow. This matters because growth does not only increase workload. It increases complexity, and complexity needs better systems.</p>
        <p>By making workflows more visible and reporting more reliable, Black.ai helps teams adapt without losing momentum. That creates a stronger environment for execution, leadership, and long-term operational maturity.</p>

        <h3>Conclusion</h3>
        <p>Black.ai is built for modern business teams because modern work requires more than disconnected effort. It requires structured systems, better oversight, and practical tools that help people perform with greater clarity.</p>
        <p>For teams that want to improve execution, reduce friction, and build a more scalable operational foundation, Black.ai provides a smart and dependable way forward.</p>

        <hr />
      `
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  const titleEl = document.getElementById("blogDetailsTitle");
  const dateEl = document.getElementById("blogDetailsDate");
  const readTimeEl = document.getElementById("blogDetailsReadTime");
  const imageEl = document.getElementById("blogDetailsImage");
  const contentEl = document.getElementById("blogDetailsContent");
  const relatedGrid = document.getElementById("relatedPostsGrid");

  if (!titleEl || !dateEl || !readTimeEl || !imageEl || !contentEl || !relatedGrid) return;

  function getBlogPost() {
    const savedBlog = JSON.parse(localStorage.getItem("selectedBlogPost") || "{}");

    return (
      blogDatabase.find((item) => item.id === blogId) ||
      blogDatabase.find((item) => item.id === savedBlog.id) ||
      blogDatabase[0]
    );
  }

  function renderBlogDetails(post) {
    if (!post) return;

    document.title = `${post.title} | Black.ai`;

    titleEl.textContent = post.title;
    dateEl.textContent = post.date;
    readTimeEl.textContent = post.readTime;
    imageEl.src = post.image;
    imageEl.alt = post.title;
    contentEl.innerHTML = post.content;

    localStorage.setItem(
      "selectedBlogPost",
      JSON.stringify({
        id: post.id,
        title: post.title,
        readTime: post.readTime,
        excerpt: post.shortExcerpt,
        image: post.image
      })
    );
  }

  function renderRelatedPosts(currentPost) {
    const relatedPosts = blogDatabase
      .filter((post) => post.id !== currentPost.id)
      .slice(0, 3);

    relatedGrid.innerHTML = relatedPosts
      .map(
        (post, index) => `
          <a href="blog-details.html?id=${post.id}"
             class="related-post-card reveal-up reveal-delay-${index + 1}"
             data-blog-id="${post.id}">
            <div class="related-post-image-wrap">
              <img src="${post.image}" alt="${post.title}" class="related-post-image" />
            </div>
            <div class="related-post-content">
              <span class="related-post-read">${post.readTime}</span>
              <h3>${post.title}</h3>
              <p>${post.relatedExcerpt}</p>
            </div>
          </a>
        `
      )
      .join("");

    const relatedCards = relatedGrid.querySelectorAll(".related-post-card");

    relatedCards.forEach((card) => {
      card.addEventListener("click", () => {
        const selectedId = card.dataset.blogId;
        const selectedPost = blogDatabase.find((item) => item.id === selectedId);

        if (!selectedPost) return;

        localStorage.setItem(
          "selectedBlogPost",
          JSON.stringify({
            id: selectedPost.id,
            title: selectedPost.title,
            readTime: selectedPost.readTime,
            excerpt: selectedPost.shortExcerpt,
            image: selectedPost.image
          })
        );
      });
    });

    requestAnimationFrame(() => {
      if (typeof window.initializeRevealItems === "function") {
        window.initializeRevealItems(relatedGrid);
      }
    });
  }

  const currentPost = getBlogPost();
  renderBlogDetails(currentPost);
  renderRelatedPosts(currentPost);
});
// =============== Blog Details Page End ===============