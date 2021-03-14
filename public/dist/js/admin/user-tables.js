$(document).ready(function() {
    $('#dataTables-example').DataTable({
        responsive: true
    });

    // Adding User Rows
    $('#add-employee').on('click', function() {
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var userName = $('#user-name').val();
        var tipLevel = $('#tip-level').val();

        var addUserNames = {
            'firstName': firstName,
            'lastName': lastName,
            'userName': userName,
            'tipLevel': tipLevel
        }

        $.ajax({
            type: "POST",
            url: "../pages/addEmployee.php",
            dataType: 'JSON',
            data: addUserNames,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, status) {
                //alert("---"+data);
                console.log(status + "新用户已经注册");
                window.location.reload(true);
            },
            error: function(xhr, desc, err) {
                console.log(err);
            }
        });

    });

    // Deleting User Rows
    $("#delete-row").on('click', function() {
        if (confirm("是否确定要删除？")) {
            var checkedRow = $('input:checkbox:checked').parents("tr")
            var delUserNames = {
                userName: []
            };
            for (i = 0; i < checkedRow.length; i++) {
                delUserNames.userName[i] = checkedRow.children(".user-name").text();
                checkedRow.remove();
            };

            $.ajax({
                type: "POST",
                url: "../pages/delEmployee.php",
                data: delUserNames,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, status) {
                    //alert("---"+data);
                    console.log(status + "所选用户已经删除");
                    window.location.reload(true);
                },
                error: function(xhr, desc, err) {
                    console.log(err);
                }
            });
        }

        return false;

    });

    // Editing User Rows
    $('#edit-row').on('click', function() {

        // For each ":checked" check-box...
        $('.select-box INPUT:checked').each(function() {
            // Get the parent row...
            var row = $(this).closest('tr');

            // And that row's "editable" columns...
            var editable = row.children('.editable');
            var editableTip = row.children('.editable-tip');

            // Add the "editing" class...
            editable.addClass('editing');
            editableTip.addClass('editing');

            // And change all strings to INPUT/SELECT fields.
            editable.each(function() {
                $(this).html('<input value="' + $(this).text() + '"/>');
            });
            editableTip.each(function() {
                $(this).html('<select><option value="--请选择--">--请选择--</option><option value="等级 1">等级 1</option><option value="等级 2">等级 2</option><option value="等级 3">等级 3</option></select>');
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
            var editableTip = $('.editable-tip', row);

            // Check for empty inputs...
            for (i = 0; i < editable.length; i++) {
                if ($(editable[i]).find('INPUT').val() == "") {
                    alert("请输入员工姓名以及小费等级")
                    return;
                }
            }
            // Remove the class...
            editable.removeClass('editing');
            editableTip.removeClass('editing');
            // Change back to string...
            editable.each(function() {
                $(this).html($(this).find('INPUT').val());
            });
            editableTip.each(function() {
                $(this).html($(this).find('SELECT').val());
            });


            var editedFirstName = row.children('.first-name').text();
            var editedLastName = row.children('.last-name').text();
            var editedTipLevel = row.children('.tip-level').text();
            var userName = row.children('.user-name').text();
            var editedUserNames = {
                'firstName': editedFirstName,
                'lastName': editedLastName,
                'userName': userName,
                'tipLevel': editedTipLevel
            };

            //AJAX call
            $.ajax({
                type: "POST",
                url: "../pages/editEmployee.php",
                data: editedUserNames,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data, status) {
                    //alert("---"+data);
                    console.log(status + "所选用户已经更改");
                },
                error: function(xhr, desc, err) {
                    console.log(err);
                }
            });

        };

    });


});
