var NONE = "None";
var ORDER_ASEC = "Ascending Order";
var ORDER_DESC = "Descending Order";
var orderingFields = ["orderAttribute"];

hideElements(orderingFields);

$('select').on('change', function () {
    if ($(this).attr("name") === "dataOrder") {
        var orderType = $(this).find(":selected").val();
        switch (orderType) {
            case NONE:
                hideElements(orderingFields);
                break;
            case ORDER_ASEC:
                getDataTableColumns();
                showElements(orderingFields);
                break;
            case ORDER_DESC:
                getDataTableColumns();
                showElements(orderingFields);
                break;
        }
    }
    if ($(this).attr("name") === "tableName") {
        $("select").each(function () {
            if ($(this).attr("name") === "orderAttribute") {
                $(this).html('');
                hideElements(orderingFields);
                $("select").each(function () {
                    if ($(this).attr("name") === "dataOrder") {
                        $(this)[0].selectedIndex = 0;
                    }
                });
            }
        });
    }
});

function hideElements(elementsNames) {
    $('#provider-config-form :input').each(function (index, data) {
        if (elementsNames.includes($(this).attr("name"))) {
            $(this).closest('div').fadeOut();
        }
    });
}

function showElements(elementsNames) {
    $('#provider-config-form :input').each(function (index, data) {
        if (elementsNames.includes($(this).attr("name"))) {
            $(this).closest('div').fadeIn();
        }
    });
}

function getDataTableColumns() {
    $("select").each(function () {
        if ($(this).attr("name") === "tableName") {
            var tableName = $(this).find(":selected").val();
            var data = {};
            data.tableName = tableName;
            $.ajax({
                url: '/portal/extensions/providers/home/homeClientInvoker.jag',
                method: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                async: true,
                success: function (data) {
                    $("select").each(function () {
                        if ($(this).attr("name") === "orderAttribute") {
                            $(this).html('');
                            var element = $(this);
                            $.each(data.columns, function (column) {
                                element.append($("<option></option>").attr("value",column).text(column));
                            });
                        }
                    });
                }
            });
        }
    });
}



