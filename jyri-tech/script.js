document.getElementById("year").textContent = new Date().getFullYear();

(function(){
  const opener=document.getElementById("openMobileMenu");
  const closer=document.getElementById("closeMobileMenu");
  const drawer=document.getElementById("jyriSideMenu");
  const backdrop=document.getElementById("jyriMenuBackdrop");
  if(!opener||!closer||!drawer||!backdrop)return;
  let previousFocus=null;
  function openMenu(){
    previousFocus=document.activeElement;
    drawer.inert=false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden","false");
    opener.setAttribute("aria-expanded","true");
    backdrop.hidden=false;
    document.body.classList.add("jyri-menu-open");
    closer.focus();
  }
  function closeMenu(){
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden","true");
    drawer.inert=true;
    opener.setAttribute("aria-expanded","false");
    backdrop.hidden=true;
    document.body.classList.remove("jyri-menu-open");
    if(previousFocus&&typeof previousFocus.focus==="function")previousFocus.focus();
  }
  opener.addEventListener("click",openMenu);
  closer.addEventListener("click",closeMenu);
  backdrop.addEventListener("click",closeMenu);
  drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",function(e){
    if(!drawer.classList.contains("is-open"))return;
    if(e.key==="Escape"){e.preventDefault();closeMenu();return}
    if(e.key==="Tab"){
      const nodes=Array.from(drawer.querySelectorAll('button,a[href]')).filter(el=>!el.disabled);
      if(!nodes.length)return;
      const first=nodes[0],last=nodes[nodes.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
})();
