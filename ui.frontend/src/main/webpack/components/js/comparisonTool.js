const compareData = {
    'Score': [
        ['0-31', '0-4', ''],
        ['32-34', '4.5', ''],
        ['35-45', '5', ''],
        ['46-59', '5.5', ''],
        ['60-78', '6', ''],
        ['79-93', '6.5', ''],
        ['94-101', '7', ''],
        ['102-109', '7.5', ''],
        ['110-114', '8', ''],
        ['115-117', '8.5', ''],
        ['118-120', '9', ''],
    ]
};

const $table = $('#comparison-table-has-draggable');
const $tbody = $table.find('tbody');
const $wrapDrag = $('#comparison-wrap-draggable');
const $toeflScore = $('#compare-current-score');
const $ieltsScore = $('#compare-current-ielts');


function doComparison(check, data) {
    const score = (check) ? parseInt(check) : 0;
    let ielts;
    let confidence;

    data.forEach(function (compareArray) {
        const range = compareArray[0].split('-');

        if (range.length == 1) {                 // if there is just a single value
            if (score === parseInt(range[0])) {   // and it matches the check value
                ielts = compareArray[1];
                confidence = compareArray[2];
            }

        } else {
            if (score >= parseInt(range[0]) && score <= parseInt(range[1])) { // see if the check value is in the range
                ielts = compareArray[1];
                confidence = compareArray[2];
            }
        }
    });

    // console.log( score +' === '+ ielts +''+ confidence );
    return ielts + '' + confidence;

}; // end doComparison
function updateSelectedRow(row) {
    // console.log('row: '+ row);

    $table.find('thead > tr').removeClass('before-highlight');
    $tbody.find('> tr').removeClass('highlight before-highlight after-highlight');
    $tbody.find('> tr').eq(row).addClass('highlight');
    $tbody.find('> tr').eq(row - 1).addClass('before-highlight');
    $tbody.find('> tr').eq(row + 1).addClass('after-highlight');

    if (row === 0) {
        $table.find('thead > tr').addClass('before-highlight');
        $tbody.find('> tr').removeClass('before-highlight');
    }

    (row > 2 && row < 8) ? $('#comparison-shaded-scores').removeClass('not-confident') : $('#comparison-shaded-scores').addClass('not-confident');
    (row === 10) ? $table.addClass('no-bottom-border') : $table.removeClass('no-bottom-border');

    $toeflScore.attr({ placeholder: $tbody.find('tr > th').eq(row).text() });
    $ieltsScore.attr({ placeholder: $tbody.find('tr > td').eq(row).text() });

}; // end updateSelectedRow


$(window).on('load', function () {
    var comparisonTool = document.querySelector('.comparison-tool-table-draggable');
    if (comparisonTool) {
        // where is the start of the table body?
        var tbodyOffset = ($tbody.offset().top) - ($table.offset().top);
        var tbodyHeight = $tbody.outerHeight();

        $table.find('th, td').wrapInner('<span class="value-container" />');

        $wrapDrag.css({ 'top': tbodyOffset + 'px', 'height': tbodyHeight + 'px' }); // move the handle wrapper to the top of the tbody

        // juice the first row
        $table.find('thead > tr').addClass('before-highlight');
        $tbody.find('tr').eq(0).addClass('highlight');
        $tbody.find('tr').eq(1).addClass('after-highlight');

        // juice the confidence message
        $('#comparison-shaded-scores').addClass('js not-confident');

        $('#comparison-handle-draggable').draggable({
            containment: "#comparison-wrap-draggable",
            scroll: false,
            grid: [30, 30],
            stop: function (event, ui) {
                const row = ui.position.top / 30; // -1 as rows are 0-indexed
                $toeflScore.val('');
                $ieltsScore.val('');
                updateSelectedRow(row);
            }
        });

        $toeflScore.on('keydown', function (event) {
            const keyName = event.key;
            const maxToeflScore = 120;

            if ((parseInt(keyName) !== NaN) || (keyName === 'Backspace' || keyName === 'Delete' || keyName === '0')) {
                if ($toeflScore.val() === '' && keyName === '0') {
                    event.preventDefault();
                } else {
                    const check = parseInt($toeflScore.val() + keyName);
                    if (check <= maxToeflScore) {
                        // console.log('keydown: '+keyName +''+ $toeflScore.val() );
                        const compValue = doComparison(check, compareData.Score);
                        $ieltsScore.attr('value', compValue);

                        // find the td that contain the ielts score
                        const $row = $tbody.find('td:contains("' + compValue + '")').filter(function () {
                            return $(this).text() === compValue;
                        }).parents('tr');
                        const rowOffset = (($row[0].rowIndex) - 1);
                        $('#comparison-handle-draggable').css({ top: (rowOffset * 30) + 'px' });
                        updateSelectedRow(rowOffset);

                    } else {
                        event.preventDefault();
                    }
                }
            }; // end if keyname...
        }); // end on keydown

        $toeflScore.on('blur', function (event) {
            if ($toeflScore.val() === '') {
                $toeflScore.val(''); // expose the placeholder
                $ieltsScore.val('');
            }
        });
    }
});