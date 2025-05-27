// 포스트 데이터 (실제로는 API에서 가져올 데이터)
const postsData = [
    {
      id: 1,
      title: "팀 프로젝트에서의 문제 해결 경험",
      date: "2024.03.15",
      excerpt: "부트캠프 팀 프로젝트 진행 중 발생한 데이터베이스 성능 이슈를 팀원들과 함께 분석하고 해결한 과정을 정리했습니다. 문제 정의부터 해결책 도출, 구현까지의 전 과정에서 배운 점들과 팀워크의 중요성에 대해 다룹니다.",
      tags: ["팀워크", "문제해결", "데이터베이스", "성능최적화"],
      readTime: "5분"
    },
    {
      id: 2,
      title: "협업을 위한 커뮤니케이션 스킬",
      date: "2024.02.28",
      excerpt: "개발자로서 기술적 역량만큼 중요한 것이 팀원들과의 원활한 소통이라는 것을 깨달았습니다. 부트캠프에서 다양한 백그라운드를 가진 팀원들과 협업하며 배운 효과적인 커뮤니케이션 방법들을 공유합니다.",
      tags: ["커뮤니케이션", "협업", "팀워크", "소프트스킬"],
      readTime: "4분"
    },
    {
      id: 3,
      title: "NestJS 프로젝트 구조 설계 경험",
      date: "2024.02.10",
      excerpt: "NestJS를 사용한 첫 번째 프로젝트에서 확장 가능한 구조를 설계하며 배운 점들을 정리했습니다. 모듈 구조, 의존성 주입, 예외 처리 등 실제 개발 과정에서 고민했던 부분들을 공유합니다.",
      tags: ["NestJS", "아키텍처", "백엔드", "설계"],
      readTime: "7분"
    },
    {
      id: 4,
      title: "Redis 캐시 최적화 실습",
      date: "2024.01.20",
      excerpt: "실시간 마피아 게임 프로젝트에서 랭킹 조회 API가 매번 DB를 탐색하고 정렬하는 방식이라 트래픽이 몰리면 응답 속도가 1.5초 이상 지연되는 문제가 있었습니다. Cache Aside 패턴을 도입하여 해결한 과정을 공유합니다.",
      tags: ["Redis", "캐시", "성능최적화", "백엔드"],
      readTime: "6분"
    }
  ];
  
  // 현재 상태 관리
  let currentPosts = [...postsData];
  let activeFilters = [];
  
  // DOM 요소들
  const postsGrid = document.getElementById('postsGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const filterTags = document.getElementById('filterTags');
  
  // 포스트 카드 생성 함수
  function createPostCard(post) {
    const card = document.createElement('a');
    card.className = 'post-card fade-in';
    card.href = `post-detail.html?id=${post.id}`;
    
    card.innerHTML = `
      <div class="post-card-header">
        <h3 class="post-card-title">${post.title}</h3>
        <span class="post-card-date">${post.date}</span>
      </div>
      
      <p class="post-card-excerpt">${post.excerpt}</p>
      
      <div class="post-card-tags">
        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
      </div>
      
      <div class="post-card-footer">
        <span class="read-more">
          자세히 보기
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </span>
        <span class="read-time">${post.readTime} 읽기</span>
      </div>
    `;
    
    return card;
  }
  
  // 포스트 목록 렌더링 함수
  function renderPosts(posts) {
    postsGrid.innerHTML = '';
    
    if (posts.length === 0) {
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    
    posts.forEach((post, index) => {
      const card = createPostCard(post);
      setTimeout(() => {
        postsGrid.appendChild(card);
      }, index * 100);
    });
  }
  
  // 필터 태그 생성 함수
  function createFilterTags() {
    const allTags = [...new Set(postsData.flatMap(post => post.tags))];
    
    filterTags.innerHTML = allTags.map(tag => 
      `<span class="filter-tag" onclick="toggleFilter('${tag}')">${tag}</span>`
    ).join('');
  }
  
  // 필터 토글 함수
  function toggleFilter(tag) {
    const tagElement = event.target;
    
    if (activeFilters.includes(tag)) {
      activeFilters = activeFilters.filter(f => f !== tag);
      tagElement.classList.remove('active');
    } else {
      activeFilters.push(tag);
      tagElement.classList.add('active');
    }
    
    filterPosts();
  }
  
  // 포스트 필터링 함수
  function filterPosts() {
    let filteredPosts = [...postsData];
    
    // 검색어 필터링
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // 태그 필터링
    if (activeFilters.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        activeFilters.every(filter => post.tags.includes(filter))
      );
    }
    
    currentPosts = filteredPosts;
    renderPosts(currentPosts);
  }
  
  // 포스트 검색 함수
  function searchPosts() {
    filterPosts();
  }
  
  // 포스트 데이터 로드 함수
  async function loadPosts() {
    try {
      loadingState.style.display = 'block';
      
      // API 호출: GET /api/posts
      // 실제 구현에서는 서버에서 포스트 목록을 가져오는 API를 호출
      // const response = await fetch('/api/posts');
      // const posts = await response.json();
      
      // 현재는 하드코딩된 데이터 사용 (API 연동 시 위 코드로 교체)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
      
      loadingState.style.display = 'none';
      renderPosts(postsData);
      createFilterTags();
      
    } catch (error) {
      console.error('포스트 로드 실패:', error);
      loadingState.style.display = 'none';
      showNotification('포스트를 불러오는데 실패했습니다.', 'error');
    }
  }
  
  // 알림 메시지 표시 함수
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
      color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 활성 상태 설정
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          (currentPath.includes('posts') && link.textContent === 'Posts')) {
        link.classList.add('active');
      }
    });
    
    // 검색 입력 이벤트 리스너
    searchInput.addEventListener('input', filterPosts);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPosts();
      }
    });
    
    // 포스트 데이터 로드
    loadPosts();
  });
  
  // 스크롤 이벤트로 네비게이션 숨김/표시
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  navbar.style.transition = 'transform 0.3s ease-in-out';
  
  // 애니메이션 CSS 추가
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);