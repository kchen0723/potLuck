$(document).ready(function() {
    $('#dataTables-example').DataTable({
        responsive: true
    });

    // Adding Dish Rows
    $('#add-dish').on('click', function() {
        var dishCode = $('#dish-code').val();
        var dishName = $('#dish-name').val();
        var dishPrice = $('#dish-price').val();
        var dishType = $('#dish-type').val();
        var dishAvail = $('#dish-avail').val();
        var dishDescription = $('#dish-description').val();

        var addDishNames = {
            'dishCode': dishCode,
            'dishName': dishName,
            'dishPrice': dishPrice,
            'dishType': dishType,
            'dishAvail': dishAvail,
            'dishDescription': dishDescription,
        }

        $.ajax({
            type: "POST",
            url: "../pages/addDish.php",
            dataType: 'JSON',
            data: addDishNames,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, status) {
                //alert("---"+data);
                console.log(status + "新菜品已经登记");
                window.location.reload(true);
            },
            error: function(xhr, desc, err) {
                console.log(err);
            }
        });

        $.ajax({
            type: "POST",
            url: "../pages/addDishImg.php",
            dataType: 'JSON',
            data: new FormData($('#add-img-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, status) {
                //alert("---"+data);
                console.log(status + "新菜品已经登记");
                window.location.reload(true);
            },
            error: function(xhr, desc, err) {
                console.log(err);
            }
        });

    });

    // Deleting Dish Rows
    $("#delete-row").on('click', function() {
        if (confirm("是否确定要删除？")) {
            var checkedRow = $('input:checkbox:checked').parents("tr")
            var delDishCodes = {
                dishCode: []
            };
            for (i = 0; i < checkedRow.length; i++) {
                delDishCodes.dishCode[i] = checkedRow.children(".dish-code").text();
                checkedRow.remove();
            };

            $.ajax({
                type: "POST",
                url: "../pages/delDish.php",
                data: delDishCodes,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, status) {
                    //alert("---"+data);
                    console.log(status + "所选菜品已经删除");
                    window.location.reload(true);
                },
                error: function(xhr, desc, err) {
                    console.log(err);
                }
            });
        }
        return false;

    });

    // Editing Dish Rows
    $('#edit-row').on('click', function() {

        // For each ":checked" check-box...
        $('.select-box INPUT:checked').each(function() {
            // Get the parent row...
            var row = $(this).closest('tr');

            // And that row's "editable" columns...
            var editable = row.children('.editable');
            var editablePrice = row.children('.editable-price');
            var editableType = row.children('.editable-type');
            var editableAvail = row.children('.editable-avail');
            var editableNotreq = row.children('.editable-notreq');

            // Add the "editing" class...
            editable.addClass('editing');
            editablePrice.addClass('editing');
            editableType.addClass('editing');
            editableAvail.addClass('editing');
            editableNotreq.addClass('editing');

            // And change all strings to INPUT fields.
            editable.each(function() {
                $(this).html('<input value="' + $(this).text() + '"/>');
            });
            editablePrice.each(function() {
                $(this).html('<input type="number" step="any" value="' + $(this).text() + '"/>');
            });
            editableType.each(function() {
                $(this).html('<select id="dish-type"><option value="默认">默认</option><option value="热菜">热菜</option><option value="凉菜">凉菜</option><option value="酒水">酒水</option><option value="主食">主食</option><option value="点心">点心</option></select>');
            });
            editableAvail.each(function() {
                $(this).html('<select id="dish-avail"><option value="Y">Y</option><option value="N">N</option></select>');
            });
            editableNotreq.each(function() {
                $(this).html('<input value="' + $(this).text() + '"/>');
            });

            // Uncheck the check-box
            $(".check-box").prop("checked", false);

        });

    });


    // Also...
    // Any time an .editing INPUT receives a keypress...
    $('table').on('keypress', '.editing', function(e) {

        // If the key pressed is ENTER...
        if (e.which == 13) {

            // Get the current row...
            var row = $(this).closest('tr');

            // Get the editable columns...
            var editable = $('.editable', row);
            var editablePrice = $('.editable-price', row);
            var editableType = $('.editable-type', row);
            var editableAvail = $('.editable-avail', row);
            var editableNotreq = $('.editable-notreq', row);

            // Check for empty inputs...
            for (i = 0; i < editable.length; i++) {
                if ($(editable[i]).find('INPUT').val() == "") {
                    alert("请输入完整的菜品详情")
                    return;
                }
            }
            for (i = 0; i < editablePrice.length; i++) {
                if ($(editablePrice[i]).find('INPUT').val() == "") {
                    alert("请输入完整的菜品价格")
                    return;
                }
            }

            // Remove the class...
            editable.removeClass('editing');
            editablePrice.removeClass('editing');
            editableType.removeClass('editing');
            editableAvail.removeClass('editing');
            editableNotreq.removeClass('editing');

            // Change back to string...
            editable.each(function() {
                $(this).html($(this).find('INPUT').val());
            });
            editablePrice.each(function() {
                $(this).html($(this).find('INPUT').val());
            });
            editableType.each(function() {
                $(this).html($(this).find('SELECT').val());
            });
            editableAvail.each(function() {
                $(this).html($(this).find('SELECT').val());
            });
            editableNotreq.each(function() {
                $(this).html($(this).find('INPUT').val());
            });


            var dishCode = row.children('.dish-code').text();
            var editedDishName = row.children('.dish-name').text();
            var editedDishPrice = row.children('.dish-price').text();
            var editedDishType = row.children('.dish-type').text();
            var editedDishAvail = row.children('.dish-avail').text();
            var editedDishDescription = row.children('.dish-description').text();
            var editedDishNames = {
                'dishCode': dishCode,
                'dishName': editedDishName,
                'dishPrice': editedDishPrice,
                'dishType': editedDishType,
                'dishAvail': editedDishAvail,
                'dishDescription': editedDishDescription
            };

            //AJAX call
            $.ajax({
                type: "POST",
                url: "../pages/editDish.php",
                data: editedDishNames,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, status) {
                    //alert("---"+data);
                    console.log(status + "所选菜品已经更改");
                },
                error: function(xhr, desc, err) {
                    console.log(err);
                }
            });

        };

    });


});
