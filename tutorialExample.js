javascript:(function() {
  const fontAwesomeScript = document.createElement('script');
fontAwesomeScript.src = 'https://kit.fontawesome.com/30588cc5d7.js';
fontAwesomeScript.crossOrigin = 'anonymous';
    
    ['Start Game', 'Options'].forEach(label => {
        const button = document.querySelector(`button[aria-label="${label}"]`);
        if (button) {
          const currentBottom = parseInt(window.getComputedStyle(button).bottom) || 0;
          button.style.position = 'absolute'; // Ensure absolute positioning
          button.style.bottom = `${currentBottom + 150}px`; // Move up by 150 pixels
        } else {
          console.warn(`Button with aria-label "${label}" not found.`);
        }
      });
      
    const slides = [
        { content: '<p>Hey there! You\'re learning with the <strong>Gimkit Basics</strong> module. This chapter will introduce you to basic Gimkit concepts, including devices, terrain, and props. This module was written by the community, huge shout out to them. To get started, <strong>click the  <i class="fas fa-chevron-right fa-xs"></i> forward button</strong> in the bottom right of the screen.</p> ' },
        { content: 'This module assumes that you\'ve already completed the official Gimkit Creative tutorial. <span>New to Gimkit? Check out the <a href="https://www.gimkit.com/creative/tutorial" target="_blank" style="color:#fff"> official tutorial</a>.</span><br><span>Want help building your maps in creative? The <a href="https://forum.creative.gimkit.com" target="_blank" style="color:#fff"> Discourse-powered community forum</a> is a friendly place where you can ask questions about anything creative.</span><br><span>Interested in hanging out with other Gimkit-minded folks? You can take a look at the <a href="https://gimkitcreative.wixsite.com/game-sharing" target="_blank" style="color:#fff"> Gimkit wixsite</a>, <a href ="https://discord.com/invite/K7ZPTtz7SJ" target="_blank" style="color:#fff">Discord</a>, or the <a href="https://discord.gg/cCpa5HMAyk" target="_blank" style="color:#fff">Gimkit Technical Club</a>.</span><br></br>' },
        { content: 'Dummy text example, as this was a demo!' }
      ];
      const style = document.createElement('style');

style.innerHTML = `
body {
    line-height: '5px';
}
.icon {
    width: 2em;
    height: 2em;
    vertical-align: -0.125em;
  }
*
  /* Hover effects for icons */
  button:hover i {
    transform: scale(1.2);
    opacity: 0.5;
  }
  button i {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  div::-webkit-scrollbar {
    width: 10px;
  }
  div::-webkit-scrollbar-thumb {
    background: #2C2F3A;
    border-radius: 5px;
  }
  div::-webkit-scrollbar-track {
    background: #2C2F3A;
  }

`;
document.head.appendChild(style);


  let currentSlide = 0;

  // Create the tutorial area thingy
  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.height = '150px';
  banner.style.backgroundColor = '#2C2F3A';
  banner.style.color = '#FFF';
  banner.style.display = 'flex';
  banner.style.flexDirection = 'column';
  banner.style.justifyContent = 'space-between';
  banner.style.boxShadow = '0 -4px 8px rgba(0, 0, 0, 0.2)';
  banner.style.fontFamily = 'Arial, sans-serif';
  banner.style.paddingBottom = '30px';

  
  // Close button in the top left corner, so, you know, you can just exit out
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '<i class="fa-solid fa-xmark fa-xs"></i>';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.left = '10px';

  closeButton.onclick = () => {
    banner.remove();
  };

  // Shows the actual slides content on the banner
  const content = document.createElement('div');
  content.style.flex = '1';
  content.style.textAlign = 'center';
  content.style.fontSize = '18px';
  content.style.overflowY = 'auto';
  content.style.padding = '30px';
  content.innerHTML = slides[currentSlide].content;

  // Navigation buttons (to move forward a slide and back a slide)
  const backButton = document.createElement('button');
  backButton.innerHTML = '<i class="fas fa-chevron-left fa-xs"></i>';
  backButton.style.position = 'absolute';
  backButton.style.bottom = '10px';
  backButton.style.left = '20px';
  backButton.style.background = 'none';
  backButton.style.border = 'none';
  backButton.style.color = 'white';
  backButton.style.fontSize = '24px';
  backButton.style.cursor = 'pointer';
  backButton.style.zIndex = '9999'

  const forwardButton = document.createElement('button');
  forwardButton.innerHTML = '<i class="fas fa-chevron-right fa-xs"></i>';
  forwardButton.style.position = 'absolute';
  forwardButton.style.bottom = '10px';
  forwardButton.style.right = '20px';
  forwardButton.style.background = 'none';
  forwardButton.style.border = 'none';
  forwardButton.style.color = 'white';
  forwardButton.style.fontSize = '24px';
  forwardButton.style.cursor = 'pointer';
  forwardButton.style.zIndex = '9999'


  backButton.onclick = () => {
    if (currentSlide > 0) {
      currentSlide--;
      content.innerHTML = slides[currentSlide].content;
    }
  };

  forwardButton.onclick = () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      content.innerHTML = slides[currentSlide].content;
    }
  };
  
// Allows the user to minimize the banner (great animation)
const minimizeButton = document.createElement('button');
minimizeButton.innerHTML = '<i class="fas fa-minus fa-xs"></i>';
minimizeButton.style.background = 'none';
minimizeButton.style.border = 'none';
minimizeButton.style.color = 'white';
minimizeButton.style.fontSize = '24px';
minimizeButton.style.cursor = 'pointer';
minimizeButton.style.position = 'absolute';
minimizeButton.style.top = '10px';
minimizeButton.style.right = '10px';

let isMinimized = false;
// Maximize button appears when the banner is minimized, right to the left of the forward arrow
const maximizeButton = document.createElement('button');
maximizeButton.innerHTML = '<i class="fas fa-plus fa-xs"></i>';
maximizeButton.style.background = 'none';
maximizeButton.style.border = 'none';
maximizeButton.style.color = 'white';
maximizeButton.style.fontSize = '24px';
maximizeButton.style.cursor = 'pointer';
maximizeButton.style.position = 'absolute';
maximizeButton.style.bottom = '10px';
maximizeButton.style.right = '60px';
maximizeButton.style.display = 'none';

// Minimize/Maximize actual functionality
minimizeButton.onclick = () => {
    if (!isMinimized) {
        banner.style.transition = 'height 0.5s ease';
        banner.style.height = '27px';
        content.style.display = 'none';
        minimizeButton.style.opacity = '0.5';
        maximizeButton.style.display = 'block';
        isMinimized = true;
    }
};
// Same thing as above but for minimizing the tutorial
maximizeButton.onclick = () => {
    if (isMinimized) {
        banner.style.transition = 'height 0.5s ease';
        banner.style.height = '150px';
        content.style.display = 'block';
        maximizeButton.style.transition = 'opacity 0.5s ease';
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = 'block';
        minimizeButton.style.opacity = '1';
        isMinimized = false;
    }
};
  // Footer section (info and such, to be added onto later)
  const footer = document.createElement('div');
  footer.classList.add('footer');
  footer.innerHTML = `
   <div>
      <p style="margin: 0; text-align: center;">Intended for use with the <strong>December 11th, 2024</strong> version of <a href="https://gimkit.com/creative" target="_blank" style="color: #FFF; text-decoration: underline;">Gimkit Creative</a><br>
      &copy; <strong>2024</strong> <span>@Turtle. Like the project or have feedback? Let me know on GitHub or Discourse.</span></p>
   </div>
  `;
  footer.style.backgroundColor = '#5a8fce';
  footer.style.padding = '10px';
  footer.style.textAlign = 'center';
  footer.style.color = '#FFF';
  footer.style.borderRadius = '0';
  footer.style.width = '100%';
  footer.style.margin = '0';
  footer.style.position = 'absolute';
  footer.style.bottom = '0';
  footer.style.left = '0';


// "Append" (as we say, pretty much means add onto really) minimize button to the banner
banner.appendChild(minimizeButton);
// Append maximize button to the footer
footer.appendChild(maximizeButton);

  // Append elements to banner
  banner.appendChild(closeButton);
  banner.appendChild(content);
  banner.appendChild(backButton);
  banner.appendChild(forwardButton);
  banner.appendChild(footer);

  // Append banner to the document body
  document.body.appendChild(banner);
;

// Makes the awesome icons appear! Currently not working :(

document.head.appendChild(fontAwesomeScript);
})();
