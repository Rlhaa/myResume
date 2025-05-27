// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.style.color = '#1a1a1a';
        link.style.fontWeight = '600';
      }
    });
  });
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Add transition to navbar
  navbar.style.transition = 'transform 0.3s ease-in-out';
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Enhanced typing effect for the intro text
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Apply typing effect to name on page load
  window.addEventListener('load', function() {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    
    setTimeout(() => {
      typeWriter(nameElement, originalText, 100);
    }, 500);
  });
  
  // Project and resume functions (keeping original functionality)
  function goProjects() {
    window.location.href = "/projects/index.html";
  }
  
  function downloadResume() {
    window.open("/resume/resume.pdf", "_blank");
  }
  
  // Add loading state for external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function() {
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 200);
    });
  });
  
  // Enhanced hover effects for interactive elements
  document.querySelectorAll('.skill-tag, .post-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  
  // Highlight key phrases in intro text
  document.addEventListener('DOMContentLoaded', function() {
    const introDescription = document.querySelector('.intro-description');
    
    // Add subtle animation to the goal section
    const goalSection = document.querySelector('.intro-goal');
    if (goalSection) {
      setTimeout(() => {
        goalSection.style.animation = 'fadeInUp 0.8s ease forwards';
      }, 1000);
    }
  });
  
  // Add CSS animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);