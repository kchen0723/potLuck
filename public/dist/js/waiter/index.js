$(document).ready(function() {

    var socket;
    //setup socket.io
    socket = io.connect('http://localhost:8080');

    //Shake window
    function shake(selector, func) {
        var l = 20;

        for (var i = 0; i <= 3; i++) {
            selector.animate({
                'margin-left': '+=' + (l = -l) + 'px',
                'margin-right': '-=' + l + 'px'
            }, 20, function() {
                return false;
            });
        }
    }
    //Calcualtes Sub-total
    function tally(selector) {
        $(selector).each(function() {
            var total = 0,
                column = $(this).siblings(selector).addBack().index(this);
            $(this).parents().prevUntil(':has(' + selector + ')').each(function() {
                total += parseFloat($('td.price:eq(' + column + ')', this).html()) || 0;
            })
            $(this).html(total);
        });
    }

    tally('td.subtotal');

    // Calculates Taxes
    function taxes(selector) {
        var taxRate = 12,
            taxes = ((taxRate / 100) * parseFloat($('td.subtotal').html())) || 0;

        $(selector).html(taxes.toFixed(2));
    }

    taxes('td.taxes');

    // Calculates Total
    function total(selector) {
        var total = parseFloat($('td.subtotal').html()) + parseFloat($('td.taxes').html()) || 0;
        $(selector).html(total.toFixed(2));
    }

    total('td.total');

    // Display buttons according to the status of the table
    function tableStatus() {
        var panels = $('.panel');
        panels.each(function() {
            if ($(this).hasClass('panel-free')) {
                $('.sit', this).show();
                $('.order-details', this).hide();
                $('.checkout', this).hide()
            } else {
                $('.sit', this).hide();
                $('.order-details', this).show();
                $('.checkout', this).show();
            }
        });
    }

    // Change Status: free->deciding
    $('#table-sit-modal').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);
        $('#confirm-sit').on('click', function(e) {
            e.preventDefault();
            trigger.closest('.panel-free').removeClass('panel-free').addClass('panel-info').addClass('panel-deciding').children('.panel-heading').children('span').removeClass('free').addClass('deciding');
            tableStatus();
            // add AJAX here...


            $('#table-sit-modal').modal('hide');
            $('#table-sit-modal').removeClass('modal-open')
            $('.modal-backdrop').remove();
        });
    });

    // Change Status: deciding -> ordered, req-assist ->
    $('#table-details-modal').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);
        $('#confirm-add-dish').on('click', function(e) {
            e.preventDefault();
            if (trigger.closest('.panel').hasClass('panel-deciding')) {
                trigger.closest('.panel').removeClass('panel-info').removeClass('panel-deciding').addClass('panel-info').addClass('panel-ordered').children('.panel-heading').children('span').removeClass('deciding').addClass('ordered');
                tableStatus();
            }
            //add AJAX here(db and print)...



            $('#add-dish-modal').modal('hide');
            $('#add-dish-modal').removeClass('modal-open')
            $('#table-details-modal').modal('hide');
            $('#table-details-modal').removeClass('modal-open');
            $('.modal-backdrop').remove();

        });
    });

    //change Status: waiting -> ordered
    $('#table-details-modal').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);
        $('#confirm-print-dish').on('click', function(e) {
            e.preventDefault();
            if (trigger.closest('.panel').hasClass('panel-waiting')) {
                if (trigger.closest('.panel').hasClass('panel-deciding')) {
                    trigger.closest('.panel').removeClass('panel-deciding').removeClass('panel-yellow').removeClass('panel-waiting').addClass('panel-info').addClass('panel-ordered').children('.panel-heading').children('span').removeClass('waiting').addClass('ordered');
                    tableStatus();

                    //add AJAX here (db and print)


                } else {
                    trigger.closest('.panel').hasClass('panel-waiting').children('.panel-heading').children('span').removeClass('waiting');
                    tableStatus();

                    //add AJAX here (db and print)


                }
            } else {
                shake($('#print-dish-modal'));
                return false;
            }



            $('#print-dish-modal').modal('hide');
            $('#print-dish-modal').removeClass('modal-open');
            $('#table-details-modal').modal('hide');
            $('#table-details-modal').removeClass('modal-open');
            $('.modal-backdrop').remove();

        });
    });

    //change status: req-assist -> whatever the status was from before
    $('#table-details-modal').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);
        $('#assist').on('click', function(e) {
            e.preventDefault();
            if (trigger.closest('.panel').hasClass('panel-req-assist')) {
                trigger.closest('.panel').removeClass('panel-req-assist').removeClass('panel-yellow').children('.panel-heading').children('span').removeClass('req-assist');
                tableStatus();

                //add AJAX here (db)

                //socket to customer
                var data = {
                    msg: 'Your server is on the way.'
                };
                socket.emit('assist-otw', data);

            } else {
                shake($("#table-details-modal"));
                return false;
            }


            $('#table-details-modal').modal('hide');
            $('#table-details-modal').removeClass('modal-open');
            $('.modal-backdrop').remove();

        });
    });

    //change status: checkout -> free
    $('#table-details-modal').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);

        $('#checkout3').on('click', function(e) {
            e.preventDefault();

            // if (trigger.closest('.panel').hasClass('panel-checkout')) {
            trigger.closest('.panel').attr('class', 'panel panel-free').children('.panel-heading').children('span').attr('class', 'status free');
            tableStatus();

            // }

            $('#checkout-modal').modal('hide');
            $('#checkout-modal').removeClass('modal-open');
            $('#table-details-modal').modal('hide');
            $('#table-details-modal').removeClass('modal-open');
            $('.modal-backdrop').remove();
        });

    });

    $('#checkout-modal2').on('show.bs.modal', function(e) {
        var trigger = $(e.relatedTarget);
        if (trigger.is('.glass-checkout')) {
            $('#checkout4').on('click', function(e) {
                e.preventDefault();
                trigger.closest('.panel').attr('class', 'panel panel-free').children('.panel-heading').children('span').attr('class', 'status free');
                tableStatus();


                $('#checkout-modal2').modal('hide');
                $('#checkout-modal2').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });
        }

    });

    // socket.on('addDish', function() {
    //     tableStatus();
    // });

    tableStatus();
});
