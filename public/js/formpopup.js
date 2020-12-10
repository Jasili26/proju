function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function newStory() {
    document.getElementById("newstory").style.display = "block";
    document.getElementById("userinfo").style.display = "none";
    document.getElementById("newend").style.display = "none";
    document.getElementById("showstory").style.display = "none";
}

function newEnd() {
    document.getElementById("newstory").style.display = "none";
    document.getElementById("userinfo").style.display = "none";
    document.getElementById("newend").style.display = "block";
    document.getElementById("showstory").style.display = "none";
}
function showAll() {
    document.getElementById("newstory").style.display = "none";
    document.getElementById("userinfo").style.display = "none";
    document.getElementById("newend").style.display = "none";
    document.getElementById("showstory").style.display = "block";
}

