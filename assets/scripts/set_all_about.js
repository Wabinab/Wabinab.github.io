function set_bmc() {
  try {
    let g = window.bmcBtnWidget(
      "Buy me a coffee", 
      "wabinab",
      "#FFDD00",
      "",
      "Cookie",
      "#000000",
      "#000000",
      "#ffffff"
    );
    // console.log(g)
    // document.getElementById('bmc')!.innerHTML += g;
    // this.bmc = this.sanitizer.bypassSecurityTrustHtml(g);
    document.getElementsByClassName('bmc')[0].innerHTML = g;
    // this.data += this.sanitizer.bypassSecurityTrustHtml(g);
  } catch {
    setTimeout(() => set_bmc(), 15)
  }
}
set_bmc();