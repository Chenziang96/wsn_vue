$(document).ready();
$("input").focus(function () {
    $(this).css({border:" 1px solid blue"});
});
$("input").blur(function () {
    $(this).css({border:"1px solid black"});
});
$("input").mouseover(function () {
    $(this).css({border:"1px solid red"});
});
$("input").mouseout(function () {
    $(this).css({border:"1px solid black"});
});
