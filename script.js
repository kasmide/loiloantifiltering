beingScrolled = false
window.onload = function () {
  this.scrolled();
  document.addEventListener("scroll", scrolled, { passive: true });
}
async function scrolled() {
  if (document.documentElement.scrollTop > 50) {
    document.getElementsByTagName("header")[0].style["animation-name"] = "hide"
  } else {
    document.getElementsByTagName("header")[0].style["animation-name"] = "show"
  }
  for (let i = 0; document.getElementsByClassName("fade-in").length > i;i++) {
    if (document.getElementsByClassName("fade-in")[i].getBoundingClientRect().top < document.documentElement.scrollTop + window.innerHeight && !document.getElementsByClassName("fade-in")[i].classList.contains("shown")) {
      await sleep(100);
      document.getElementsByClassName("fade-in")[i].classList.add("shown");
    };
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}