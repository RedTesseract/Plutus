$("#refreshBtn").click(function () {
    $('#budgetRow1').transition('fly up');
    $('#budgetRow2').transition('fly up');
});

$("#addBtn").click(function () {
    $('#budgetDisplay').hide();
    $('#budgetAdd').show();
});