//alert("Alert test");


var theForm = $(".login").hide();


var moreInfoBtn =$("#moreInfoBtn");
moreInfoBtn.on("click", function FuntionNameisOptional () {
    alert("Moving to additional information section");
})

var activities_list = $(".activities-list");

activities_list.on("click", function () {
    console.log("you clicked on " + $(this).text());
});

var $popupForm = $(".popupForm");
var $loginToggle = $("#loginToggle").on("click", function () {
    $popupForm.fadeToggle(500);
})