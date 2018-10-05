function hideAnt() {
    var x = document.getElementById("antDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
        window.scrollTo(0,document.body.scrollHeight);
    } else {
        x.style.display = "none";
    }
 }