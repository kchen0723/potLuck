$(document).ready(function() {
    $('#dataTables-example').DataTable({
        responsive: true
    });

    // Adding Table Rows
    $('#add-table').on('click', function() {
        var tableCode = $('#table-code').val();
        var tableAvail = $('#table-avail').val();

        var addTableNames = {
            'tableCode': tableCode,
            'tableAvail': tableAvail
        }

        $.ajax({
            type: "POST",
            url: "../pages/addTable.php",
            dataType: 'JSON',
            data: addTableNames,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, status) {
                //alert("---"+data);
                console.log(status + "新餐桌已经添加");
                window.location.reload(true);
            },
            error: function(xhr, desc, err) {
                console.log(err);
            }
        });
    });

    // Deleting Table Rows
    $("#delete-row").on('click', function() {
        if (confirm("是否确定要删除？")) {
            var checkedRow = $('input:checkbox:checked').parents("tr")
            var delTableCodes = {
                tableCode: []
            };
            for (i = 0; i < checkedRow.length; i++) {
                delTableCodes.tableCode[i] = checkedRow.children(".table-code").text();
                checkedRow.remove();
            };

            $.ajax({
                type: "POST",
                url: "../pages/delTable.php",
                data: delTableCodes,
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

    // Editing Table Rows
    $('#edit-row').on('click', function() {

        // For each ":checked" check-box...
        $('.select-box INPUT:checked').each(function() {
            // Get the parent row...
            var row = $(this).closest('tr');

            // And that row's "editable-avail" columns...
            var editableAvail = row.children('.editable-avail');

            // Add the "editing" class...
            editableAvail.addClass('editing');

            // And change all strings to INPUT fields.
            editableAvail.each(function() {
                $(this).html('<select id="table-avail"><option value="Y">Y</option><option value="N">N</option></select>');
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

            // Get the editableAvail columns...
            var editableAvail = $('.editable-avail', row);

            // Remove the class...
            editableAvail.removeClass('editing');

            // Change back to string...
            editableAvail.each(function() {
                $(this).html($(this).find('SELECT').val());
            });


            var tableCode = row.children('.table-code').text();
            var editedTableAvail = row.children('.table-avail').text();
            var editedTableNames = {
                'tableCode': tableCode,
                'tableAvail': editedTableAvail
            };

            //AJAX call
            $.ajax({
                type: "POST",
                url: "../pages/editTable.php",
                data: editedTableNames,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, status) {
                    //alert("---"+data);
                    console.log(status + "所选餐桌已经更改");
                },
                error: function(xhr, desc, err) {
                    console.log(err);
                }
            });

        };

    });


});
