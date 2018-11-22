function hide(DIV) {
    var x = document.getElementById(DIV);
    if (x.style.display === "none") {
        x.style.display = "block";
        x.scrollIntoView();
        // window.scrollTo(0,document.body.scrollHeight);
    } else {
        x.style.display = "none";
    }
 }