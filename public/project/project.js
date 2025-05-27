// 프로젝트 데이터 (실제로는 API에서 가져올 데이터)
const projectsData = [
    {
      id: 1,
      title: "실시간 마피아 게임",
      period: "2024.01 ~ 2024.03",
      description: "WebSocket을 활용한 실시간 멀티플레이어 마피아 게임입니다. 사용자들이 실시간으로 소통하며 게임을 진행할 수 있고, Redis 캐시를 통한 랭킹 시스템과 JWT 인증을 구현했습니다.",
      technologies: ["NestJS", "WebSocket", "Redis", "MySQL", "JWT"],
      status: "completed",
      pdfUrl: "/portfolios/mafia-game.pdf",
      githubUrl: "https://github.com/username/mafia-game",
      demoUrl: "https://mafia-game-demo.com"
    },
    {
      id: 2,
      title: "DevTrack 프로젝트 관리 도구",
      period: "2023.08 ~ 2023.12",
      description: "개발자를 위한 프로젝트 관리 도구입니다. 이슈 트래킹, 시간 관리, 팀 협업 기능을 제공하며, RESTful API 설계와 TypeORM을 활용한 데이터베이스 설계를 경험했습니다.",
      technologies: ["NestJS", "TypeORM", "PostgreSQL", "AWS", "Docker"],
      status: "completed",
      pdfUrl: "/portfolios/devtrack.pdf",
      githubUrl: "https://github.com/username/devtrack"
    },
    {
      id: 3,
      title: "팀 협업 채팅 시스템",
      period: "2024.04 ~ 진행중",
      description: "팀 내 효율적인 소통을 위한 실시간 채팅 시스템입니다. 파일 공유, 멘션 기능, 채널 관리 등을 포함하며, 마이크로서비스 아키텍처로 설계하고 있습니다.",
      technologies: ["NestJS", "Socket.io", "MongoDB", "Redis", "Kubernetes"],
      status: "ongoing",
      pdfUrl: "/portfolios/chat-system.pdf",
      githubUrl: "https://github.com/username/chat-system"
    }
  ];
  
  // DOM 요소들
  const projectsGrid = document.getElementById('projectsGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  
  // 프로젝트 상태별 한글 텍스트
  const statusText = {
    completed: '완료',
    ongoing: '진행중',
    planned: '계획중'
  };
  
  // 프로젝트 카드 생성 함수
  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    const statusBadge = project.status ? 
      `<div class="project-status status-${project.status}">${statusText[project.status]}</div>` : '';
    
    const githubButton = project.githubUrl ? 
      `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
        <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>` : '';
    
    const demoButton = project.demoUrl ? 
      `<a href="${project.demoUrl}" target="_blank" class="btn btn-secondary">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        데모
      </a>` : '';
    
    card.innerHTML = `
      ${statusBadge}
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <span class="project-period">${project.period}</span>
      </div>
      
      <p class="project-description">${project.description}</p>
      
      <div class="project-tech">
        <span class="tech-label">사용 기술</span>
        <div class="tech-tags">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      
      <div class="project-actions">
        <button class="btn btn-primary" onclick="downloadPDF('${project.pdfUrl}', '${project.title}')">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          포트폴리오 PDF
        </button>
        ${githubButton}
        ${demoButton}
      </div>
    `;
    
    return card;
  }
  
  // PDF 다운로드 함수
  function downloadPDF(pdfUrl, projectTitle) {
    // API 호출: GET /api/projects/{id}/portfolio-pdf
    // 실제 구현에서는 서버에서 PDF 파일을 제공하는 API를 호출
    
    try {
      // 로딩 상태 표시
      const button = event.target.closest('.btn-primary');
      const originalText = button.innerHTML;
      button.innerHTML = `
        <div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
        다운로드 중...
      `;
      button.disabled = true;
      
      // 실제 API 호출 부분 (현재는 시뮬레이션)
      setTimeout(() => {
        // API 응답 처리
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${projectTitle}_포트폴리오.pdf`;
        link.target = '_blank';
        
        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 버튼 상태 복원
        button.innerHTML = originalText;
        button.disabled = false;
        
        // 성공 메시지 (선택적)
        showNotification('포트폴리오 PDF 다운로드가 시작되었습니다.', 'success');
      }, 1000);
      
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      showNotification('PDF 다운로드에 실패했습니다. 다시 시도해주세요.', 'error');
      
      // 버튼 상태 복원
      const button = event.target.closest('.btn-primary');
      button.innerHTML = originalText;
      button.disabled = false;
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
  
  // 프로젝트 목록 렌더링 함수
  function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    
    if (projects.length === 0) {
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    
    projects.forEach((project, index) => {
      const card = createProjectCard(project);
      // 카드 애니메이션을 위한 지연
      setTimeout(() => {
        projectsGrid.appendChild(card);
      }, index * 100);
    });
  }
  
  // 프로젝트 데이터 로드 함수
  async function loadProjects() {
    try {
      loadingState.style.display = 'block';
      
      // API 호출: GET /api/projects
      // 실제 구현에서는 서버에서 프로젝트 목록을 가져오는 API를 호출
      // const response = await fetch('/api/projects');
      // const projects = await response.json();
      
      // 현재는 하드코딩된 데이터 사용 (API 연동 시 위 코드로 교체)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
      const projects = projectsData;
      
      loadingState.style.display = 'none';
      renderProjects(projects);
      
    } catch (error) {
      console.error('프로젝트 로드 실패:', error);
      loadingState.style.display = 'none';
      showNotification('프로젝트를 불러오는데 실패했습니다.', 'error');
    }
  }
  
  // 새 프로젝트 추가 함수 (관리자용)
  async function addProject(projectData) {
    try {
      // API 호출: POST /api/projects
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(projectData)
      // });
      // const newProject = await response.json();
      
      // 현재는 로컬 데이터에 추가
      const newProject = { ...projectData, id: Date.now() };
      projectsData.push(newProject);
      
      // 새 카드 추가
      const card = createProjectCard(newProject);
      projectsGrid.appendChild(card);
      
      showNotification('새 프로젝트가 추가되었습니다.', 'success');
      
    } catch (error) {
      console.error('프로젝트 추가 실패:', error);
      showNotification('프로젝트 추가에 실패했습니다.', 'error');
    }
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 활성 상태 설정
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          (currentPath.includes('projects') && link.textContent === 'Projects')) {
        link.classList.add('active');
      }
    });
    
    // 프로젝트 데이터 로드
    loadProjects();
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