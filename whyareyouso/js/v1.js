window.onload = init;

function init() {
    d3.csv("./data/v1.csv", function (data) {
        $.each(data, function (index, value) {
            $('.jobs').append($('<option>').text(value.job_singular).attr('value', value.search_term));
        })

        $('.jobs').on('change', function (event) {
            var selectedJob = this.value;
            $.each(data, function (index, value) {
                if (value.search_term == selectedJob) {
                    $('.results').empty();
                    $.each(['1', '2', '3', '4'], function (i, v) {
                        var adj = value['so_suggestion' + v];
                        if (adj !== '') {
                            $('.results').append($('<p>').attr('class', 'result').append('<span').text('why are ' + selectedJob + ' so ').append($('<span>').attr('class', 'strong').text(adj)));
                        }
                    })
                }
            })
        })
    });
}
